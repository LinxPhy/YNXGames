const express = require('express');
const axios = require('axios');
const { pool } = require('../scripts/db');
const app = express();


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

        const query = `
            SELECT g.*, c.url AS image, c.width, c.height FROM games g
            LEFT JOIN covers c ON g.id = c.game
            WHERE g.id IN (99, 115, 112, 128, 225, 622, 986, 989, 967, 912, 791, 675, 594, 595, 599)
        `

        const [games] = await pool.promise().query(query);

        games.map((game) => {
            game.image = game.image.replace('t_thumb', 't_1080p');
            game.image = 'https:' + game.image

        })

        res.send({ games });

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Failed to fetch games' });
    }

})

module.exports = app;