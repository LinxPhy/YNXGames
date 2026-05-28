const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache')
const cache = require('../utils/cache')
const { pool } = require('../scripts/db');
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

        const [
            [platforms],
            [genres],
            [companies],
            [themes],
            [modes],
        ] = await Promise.all([
            pool.promise().query(query),
            pool.promise().query(query2),
            pool.promise().query(query3),
            pool.promise().query(query4),
            pool.promise().query(query5),
        ]);

        const filters = {
            platforms,
            genres,
            companies,
            themes,
            modes,
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
            'old_games'
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


// app.get('/api/test_games', async (req, res) => {

//     try {

//         const data = cache.get('action')

//         res.send({ data });

//     } catch (error) {
//         console.error('Error fetching games:', error);
//         res.status(500).send({ error: 'Failed to fetch games' });
//     }

// })

module.exports = app;