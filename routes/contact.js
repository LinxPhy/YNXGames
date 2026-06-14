const express = require('express');
const axios = require('axios');
const { pool } = require('../scripts/db');
const app = express();


app.post('/api/contact', async (req, res) => {

    try {

        const { name, email, message } = req.body

        await pool.promise().query('INSERT INTO contact (name, email, message) VALUES (?, ?, ?)', [name, email, message])

        res.send('Message sent successfully')

    } catch (error) {
        console.log(error)
    }
})



module.exports = app