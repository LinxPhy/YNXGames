const express = require('express');
const { pool } = require('../scripts/db');
const app = express();

app.get('/api/games_options', async (req, res) => {

    try {

        const genres = `SELECT * FROM genres`
        const themes = `SELECT * FROM themes`

        const [
            [genresData],
            [themesData]
        ] = await Promise.all([
            pool.promise().query(genres),
            pool.promise().query(themes)
        ])

        res.send({ genres: genresData, themes: themesData });

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }

})

function getThemes() {

    let query =
        `
        SELECT
            g.*,

            (
                SELECT c.url
                FROM covers c
                WHERE c.game = g.id
                LIMIT 1
            ) AS image,

            (
                SELECT ge.name
                FROM game_genres gg
                JOIN genres ge ON ge.id = gg.genre
                WHERE gg.id = g.id
                LIMIT 1
            ) AS genre

        FROM games g
        WHERE EXISTS (
            SELECT 1
            FROM game_themes gt
            JOIN themes t ON t.id = gt.theme
            WHERE gt.id = g.id
            AND t.name = ?
        )
        ORDER BY g.random_rank
        LIMIT ? OFFSET ?
    `

    return query

}

function getGenres() {

    let query =
        `
        SELECT
            g.*,

            (
                SELECT c.url
                FROM covers c
                WHERE c.game = g.id
                LIMIT 1
            ) AS image,

            (
                SELECT ge.name
                FROM game_genres gg
                JOIN genres ge ON ge.id = gg.genre
                WHERE gg.id = g.id
                AND ge.name = ?
                LIMIT 1
            ) AS genre

        FROM games g
        ORDER BY g.random_rank
        LIMIT ? OFFSET ?
    `

    return query

}

function getNewReleases() {


    let query =
        `
        SELECT
            g.*,

            (
                SELECT c.url
                FROM covers c
                WHERE c.game = g.id
                LIMIT 1
            ) AS image,

            (
                SELECT ge.name
                FROM game_genres gg
                JOIN genres ge ON ge.id = gg.genre
                WHERE gg.id = g.id
                LIMIT 1
            ) AS genre

        FROM games g
        WHERE
            g.first_release_date >= DATE_SUB(CURDATE(), INTERVAL 15 YEAR)
            AND g.first_release_date < CURRENT_DATE()
            AND first_release_date IS NOT NULL
        ORDER BY g.first_release_date DESC
        LIMIT ? OFFSET ?
    `

    return query

}

function getRandomGames() {

    let query =
        `
        SELECT
            g.*,

            (
                SELECT c.url
                FROM covers c
                WHERE c.game = g.id
                LIMIT 1
            ) AS image,

            (
                SELECT ge.name
                FROM game_genres gg
                JOIN genres ge ON ge.id = gg.genre
                WHERE gg.id = g.id
                LIMIT 1
            ) AS genre

        FROM games g
        ORDER BY g.random_rank
        LIMIT ? OFFSET ?
    `

    return query

}

function getAllGames() {

    let query =
        `
        SELECT
            g.*,

            (
                SELECT c.url
                FROM covers c
                WHERE c.game = g.id
                LIMIT 1
            ) AS image,

            (
                SELECT ge.name
                FROM game_genres gg
                JOIN genres ge ON ge.id = gg.genre
                WHERE gg.id = g.id
                LIMIT 1
            ) AS genre

        FROM games g
        ORDER BY g.name
        LIMIT ? OFFSET ?
    `

    return query

}

function getPopularGames() {

    let query =
        `
        SELECT
            g.*,

            (
                SELECT c.url
                FROM covers c
                WHERE c.game = g.id
                LIMIT 1
            ) AS image,

            (
                SELECT ge.name
                FROM game_genres gg
                JOIN genres ge ON ge.id = gg.genre
                WHERE gg.id = g.id
                LIMIT 1
            ) AS genre

        FROM games g
        ORDER BY g.hypes DESC
        LIMIT ? OFFSET ?
    `

    return query

}

// ["all_games", 'popular', 'new_releases', 'random']

app.get('/api/return_games/:search_type', async (req, res) => {

    try {

        const { search_type } = req.params;
        const { type, page } = req.query;

        // if (!type || !page) return res.status(400).send({ error: 'Missing required parameters' });

        const limit = 20
        const fetchSize = limit + 1
        const offset = (page - 1) * limit;

        let query = ``

        if (search_type === 'all_games') query = getAllGames()
        else if (search_type === 'popular') query = getPopularGames()
        else if (search_type === 'new_releases') query = getNewReleases()
        else if (search_type === 'random') query = getRandomGames()

        if (type === 'theme') query = getThemes()
        else if (type === 'genre') query = getGenres()

        let response = ''

        if (type === 'theme' || type === 'genre') {
            [response] = await pool.promise().query(query, [type, fetchSize, offset]);
        } else {
            [response] = await pool.promise().query(query, [fetchSize, offset]);
        }

        const games = response.slice(0, limit);
        const hasMore = response.length > limit;

        res.json({ games, hasMore, nextPage: parseInt(page) + 1 });


    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }

})

module.exports = app