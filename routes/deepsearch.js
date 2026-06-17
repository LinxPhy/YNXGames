const express = require('express');
const axios = require('axios');
const { pool } = require('../scripts/db');
const app = express();

app.get('/api/getdeepsearch', async (req, res) => {

    try {

        const query1 = `SELECT id, name, slug FROM genres`
        const query2 = `SELECT id, name, slug FROM themes`
        const query3 = `SELECT id, name, slug FROM modes`
        const query4 = `SELECT id, name, alternative_name FROM platforms p  WHERE id IN (48, 167, 169, 6, 130, 508)
                        ORDER BY FIELD(id, 6, 48, 167, 169, 130, 508)
                        `
        const [
            [genres],
            [themes],
            [modes],
            [platforms]
        ] = await Promise.all([
            pool.promise().query(query1),
            pool.promise().query(query2),
            pool.promise().query(query3),
            pool.promise().query(query4)
        ])

        res.send({ genres, themes, modes, platforms })

    } catch (error) {
        console.log(error)
    }

})

app.post('/api/deepsearch', async (req, res) => {
})

module.exports = app