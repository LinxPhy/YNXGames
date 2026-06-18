const express = require('express');
const axios = require('axios');
const OpenAI = require("openai")
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

const client = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: "https://api.x.ai/v1",
})

app.post('/api/deepsearch', async (req, res) => {

    try {
        const { values, page, prevGames } = req.body
        const { search, platforms, genres, themes, similar_games } = values

        // const response = await client.responses.create({
        //     model: 'grok-4.3',
        //     input: [
        //         { role: 'system', content: 'You are Grok, a highly intelligent, helpful AI assistant.' },
        //         { role: 'user', content: 'What is the meaning of life, the universe, and everything?' },
        //     ]
        // })

        const prompt = 
        `
            You are a Video Game Identifier, your role is to find a game recommendation that matches the following criteria:
            Search: ${search}
            Platforms: ${platforms}
            Genres: ${genres}
            Themes: ${themes}
            Similar Games: ${similar_games}
            You need to return a list of 10 games that match the criteria and the following
            - Name
            - Summary
            - Genres (up to 5)
            - Themes (up to 5)
            - Platforms (up to 5 - most popular)
            - Release Date (if applicable)
            Please do not return any other information.
            Do not include any of the following games in your response: ${prevGames}
        `

        console.log(prompt)

        const response = await client.completions.create({
            model: 'grok-4.3',
            input: [
                { role: 'system', content: 'You are Grok, a highly intelligent, helpful AI assistant.' },
                { role: 'user', content: prompt },
            ]
        })

        res.send({ data: response.choices[0].text, page , prevGames })

    } catch (error) {
        console.log(error)
    }


})

module.exports = app