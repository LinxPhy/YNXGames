const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache')
const cache = require('../utils/cache')
const { pool } = require('../scripts/db');
const mysql = require('mysql2');
const app = express();

// const cache = new NodeCache({
//     stdTTL: 0,
//     checkperiod: 0,
// });


app.get('/api/filters', async (req, res) => {

    try {

        const query = `
            SELECT id, name FROM platforms WHERE id IN (48, 167, 169, 6, 130, 508)
            ORDER BY FIELD(id, 6, 48, 167, 169, 130, 508)
        `

        const query2 = `
            SELECT id, name FROM genres WHERE id IN (4, 5, 9, 10, 13, 14, 15, 42, 36)
        `

        const query3 = `
            SELECT id, name FROM companies WHERE id IN (1, 29, 41, 56, 129, 617, 10282)
        `

        const query4 = `
            SELECT id, name FROM themes WHERE id < 30
        `

        const query5 = `
            SELECT id, name FROM modes
        `

        const query6 = `
            SELECT YEAR(first_release_date) AS 'initial_year' FROM games
            WHERE first_release_date IS NOT NULL 
            ORDER BY first_release_date ASC
            LIMIT 1;
        `

        const query7 = `
            SELECT YEAR(first_release_date) AS 'final_year' FROM games
            WHERE first_release_date IS NOT NULL 
            ORDER BY first_release_date DESC
            LIMIT 1;
        `

        const [
            [platforms],
            [genres],
            [companies],
            [themes],
            [modes],
            [initial_year],
            [final_year]
        ] = await Promise.all([
            pool.promise().query(query),
            pool.promise().query(query2),
            pool.promise().query(query3),
            pool.promise().query(query4),
            pool.promise().query(query5),
            pool.promise().query(query6),
            pool.promise().query(query7)
        ]);

        const filters = {
            platforms,
            genres,
            companies,
            themes,
            modes,
            initial_year: initial_year[0].initial_year,
            final_year: final_year[0].final_year
        };



        res.send({ filters });

    } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).send({ error: 'Failed to fetch filters' });
    }

});


app.get('/api/games', async (req, res) => {
    try {
        const keys = [
            'action',
            'fantasy',
            'mystery',
            'open_world',
            'new_releases',
            'random',
            'popular',
            'old_games',
            'romance',
            'educational',
            'science_fiction',
            'drama'
        ];

        const values = await Promise.all(
            keys.map(key => cache.get(key))
        );

        const formatGames = (games = []) =>
            games.map(game => ({
                ...game,
                image: game.image
                    ? `https:${game.image.replace('t_thumb', 't_1080p')}`
                    : game.image,
                total_rating: game.total_rating
                    ? (game.total_rating / 20).toFixed(1)
                    : game.total_rating
            }));

        const response = Object.fromEntries(
            keys.map((key, index) => [
                key,
                formatGames(values[index])
            ])
        );

        res.send(response);

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }
});


app.get('/api/game/:slug', async (req, res) => {

    try {

        const { slug } = req.params

        const queries = {

            themes: `
                    SELECT t.id, t.name, t.slug FROM themes t 
                    LEFT JOIN game_themes gt ON t.id = gt.theme 
                    WHERE gt.id = ?;
                    `,

            covers: `SELECT id, width, height, url FROM covers c WHERE c.game = ?;`,

            genres: `SELECT ge.id, ge.name, ge.slug
                    FROM game_genres gg
                    JOIN genres ge ON ge.id = gg.genre
                    WHERE gg.id = ?;`,

            platforms: `SELECT p.id, p.name
                    FROM game_platforms gp
                    JOIN platforms p ON p.id = gp.platform
                    WHERE gp.id = ?;`,

            screenshots: `SELECT s.id, s.width, s.height, s.url FROM screenshots s WHERE s.game = ? ;`,

            videos: `SELECT v.video_id FROM videos v WHERE v.game = ? ;`,

            modes: `SELECT m.id, m.name, m.slug FROM modes m
                    JOIN game_modes gm ON m.id = gm.mode 
                    WHERE gm.id = ?;`,

            similar_games: `SELECT g.id, g.name, g.slug, g.storyline, g.summary, c.url
                        FROM similar_games sg
                        JOIN games g ON sg.similar_game = g.id
                        LEFT JOIN covers c ON g.id = c.game
                        WHERE sg.id = ?;
                    `,

            collections: `SELECT * FROM collections c
                    LEFT JOIN game_collections gc ON c.id = gc.collection
                    WHERE gc.id = ?;`,

            franchises: `SELECT * FROM franchises f
                    LEFT JOIN game_franchises gf ON f.id = gf.franchise
                    WHERE gf.id = ?;`,

            player_perspectives: `SELECT pp.id, pp.name FROM games g
                    LEFT JOIN game_player_perspectives gpp ON g.id = gpp.id
                    LEFT JOIN player_perspectives pp ON gpp.perspective = pp.id
                    WHERE g.id = ?;`,

            companies: `SELECT c.name, c.slug, ic.developer, ic.publisher, ic.supporting FROM games g
                    LEFT JOIN involved_companies ic ON g.id = ic.game
                    LEFT JOIN companies c ON ic.company = c.id
                    WHERE g.id = ?;`
        }


        const formatItems = (game) => ({
            ...game,

            url: game.url && (!game.url.includes("https:"))
                ? `https:${game.url.replace('t_thumb', 't_1080p')}`
                : game.url,

            screenshot: game.screenshot
                ? `https:${game.screenshot.replace('t_thumb', 't_1080p')}`
                : game.screenshot,

            video_id: game.video_id ? `https://www.youtube.com/watch?v=${game.video_id}` : game.video_id,

            rating: game.rating
                ? (game.rating / 20).toFixed(1)
                : game.rating,

            total_rating: game.total_rating
                ? (game.total_rating / 20).toFixed(1)
                : game.total_rating
        });

        const loadGameRelations = async (gameId) => {
            const entries = Object.entries(queries);

            const results = await Promise.all(
                entries.map(([key, sql]) =>
                    pool.promise().query(sql, [gameId]).then(([rows]) => [key, rows])
                )
            );

            return Object.fromEntries(results);
        };

        const [game] = await pool.promise().query(`SELECT * FROM games WHERE slug = ? LIMIT 1`, [slug])

        if (!game) {
            return res.status(404).send({ error: 'Game not found' });
        }

        const relations = await loadGameRelations(game[0].id);

        for (const [key, games] of Object.entries(relations)) {
            relations[key] = games.map(formatItems);
        }

        const gameData = {
            game: formatItems(game[0])
        }

        const gameWithRelations = {
            ...gameData,
            ...relations
        };

        res.send(gameWithRelations);

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }

})

app.get('/api/search/:search_query', async (req, res) => {

    try {

        const { search_query } = req.params
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const offset = (page - 1) * limit

        const query = `
            SELECT g.id, g.name, g.summary, g.storyline, g.slug, c.url, GROUP_CONCAT(DISTINCT p.name ORDER BY p.name SEPARATOR ', ') AS platforms FROM games g 
            LEFT JOIN covers c ON g.id = c.game 
            LEFT JOIN game_platforms gp ON g.id = gp.id
            LEFT JOIN platforms p ON gp.platform = p.id
            WHERE g.name LIKE ? 
            GROUP BY g.id, g.name, g.slug, c.url
            LIMIT ? OFFSET ?;
        `
        const [response] = await pool.promise().query(query, [`%${search_query}%`, limit + 1, offset])

        const data = response.map((game) => ({
            ...game,

            url: game.url
                ? `https:${game.url.replace('t_thumb', 't_1080p')}`
                : game.url
        }))

        let hasMore = false;

        if (data.length > limit) hasMore = true
        const gamesData = data.slice(0, limit)

        res.send({ data: gamesData, hasMore, nextPage: parseInt(page) + 1 });

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }

})

app.get('/api/popular', async (req, res) => {

    try {

        const query = `
            SELECT 
                DISTINCT g.*, 
                ANY_VALUE(c.url) AS 'image', 
                ANY_VALUE(ge.name) AS 'genre',
                c.width,
                c.height
            FROM games g
            LEFT JOIN game_themes gt ON g.id = gt.id
            LEFT JOIN themes t ON gt.theme = t.id
            LEFT JOIN covers c ON g.id = c.game
            LEFT JOIN game_genres gg ON g.id = gg.id
            LEFT JOIN genres ge ON gg.genre = ge.id
            WHERE g.id IN 
                (
                    134709, 27912, 112875, 11156, 219027,
                    1942, 103205, 136178, 252729, 149275,
                    180259, 1905, 115, 372158, 387369,
                    324852, 121, 17269, 294041, 228530
                )
            GROUP BY g.id, c.width, c.height
        `

        const [response] = await pool.promise().query(query)


        const data = response.map((game) => ({
            ...game,

            image: game.image
                ? `https:${game.image.replace('t_thumb', 't_1080p')}`
                : game.image,

            rating: game.rating
                ? (game.rating / 20).toFixed(1)
                : game.rating,

            total_rating: game.total_rating
                ? (game.total_rating / 20).toFixed(1)
                : game.total_rating
        }))

        res.send(data);

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }

})


app.get('/api/explore', async (req, res) => {

    try {

        const { page: pageValue, genre, platform, company, theme, mode, initial_year, final_year, search_type, unknown_releases } = req.query

        const conditions = [];
        const params = [];
        const page = parseInt(pageValue) || 1
        const limit = 20
        const offset = (page - 1) * limit

        if (genre?.length) {
            conditions.push('ge.id IN (?)');
            params.push(genre);
        }

        if (platform?.length) {
            conditions.push('p.id IN (?)');
            params.push(platform);
        }

        if (company?.length) {
            conditions.push('g.id IN (?)'); // needs to be changed when companies table is created
            params.push(company);
        }

        if (theme?.length) {
            conditions.push('t.id IN (?)');
            params.push(theme);
        }

        if (mode?.length) {
            conditions.push('m.id IN (?)');
            params.push(mode);
        }

        if (initial_year) {
            conditions.push('g.first_release_date >= YEAR(?)');
            const year = `${initial_year}-01-01`;
            params.push(year);
        }

        if (final_year) {
            conditions.push('g.first_release_date <= YEAR(?)');
            const year = `${final_year}-12-31`;
            params.push(year);
        }

        const searchTypeValue = search_type === 'similar' ? ' OR ' : ' AND ';

        const query = `
            SELECT DISTINCT g.*, ANY_VALUE(c.url) AS 'image', ANY_VALUE(ge.name) AS 'genre'
            FROM games g
            LEFT JOIN game_themes gt ON g.id = gt.id
            LEFT JOIN themes t ON gt.theme = t.id
            LEFT JOIN covers c ON g.id = c.game
            LEFT JOIN game_platforms gp ON g.id = gp.id
            LEFT JOIN platforms p ON gp.platform = p.id
            LEFT JOIN game_genres gg ON g.id = gg.id
            LEFT JOIN genres ge ON gg.genre = ge.id
            LEFT JOIN game_modes gm ON g.id = gm.id
            LEFT JOIN modes m ON gm.mode = m.id
            ${conditions.length ? `WHERE ${conditions.join(searchTypeValue)}` : ''}
            GROUP BY g.id
            LIMIT ? OFFSET ?
        `

        const fullQuery = mysql.format(query, [...params, limit + 1, offset]);
        console.log(fullQuery);

        const [response] = await pool.promise().query(query, [...params, limit + 1, offset])

        const data = response.map((game) => ({
            ...game,

            image: game.image
                ? `https:${game.image.replace('t_thumb', 't_1080p')}`
                : game.image,

            rating: game.rating
                ? (game.rating / 20).toFixed(1)
                : game.rating,

            total_rating: game.total_rating
                ? (game.total_rating / 20).toFixed(1)
                : game.total_rating
        }))

        let hasMore = false;
        if (data.length > limit) hasMore = true

        const gamesData = data.slice(0, limit)

        res.send({ data: gamesData, currentPage: page, hasMore, nextPage: page + 1 });



    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }

})



module.exports = app;