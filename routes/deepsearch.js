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

        if (search.length == 0) return res.status(200).send({ games: [] })

        const platforms_prompts = platforms.length > 0 ? `Platforms: ${platforms.join(', ')}` : `Platforms: Any`
        const genres_prompts = genres.length > 0 ? `Genres: ${genres.join(', ')}` : `Genres: Any`
        const themes_prompts = themes.length > 0 ? `Themes: ${themes.join(', ')}` : `Themes: Any`
        const similar_games_prompts = similar_games.length > 0 ? `Similar Games: ${similar_games.join(', ')}` : `Similar Games: Any`

        const prompt = `
            You are a video game recommendation engine.

            Find exactly 10 video games matching the criteria below.

            Criteria:
            - Search: ${search || 'Any'}
            - Platforms: ${platforms.length ? platforms.join(', ') : 'Any'}
            - Genres: ${genres.length ? genres.join(', ') : 'Any'}
            - Themes: ${themes.length ? themes.join(', ') : 'Any'}
            - Similar Games: ${similar_games.length ? similar_games.join(', ') : 'Any'}

            Excluded Games:
            ${prevGames && prevGames?.join('\n') || 'None'}

            Rules:
            1. Return ONLY valid JSON.
            2. Do NOT wrap JSON in markdown.
            3. Do NOT include explanations.
            4. Do NOT include any excluded games.
            5. Return exactly 10 unique games.
            6. Never recommend different editions/remasters of the same game in the same response.
            7. Release date should be in {DateNumber MonthName, Year} format.
            8. Release date and Developer should be null if not available.
            9. Game Description should be between 300 characters and 800 characters.
            10. AI Match should be a score between 0 and 100 about how similar the game is to the search criteria.
            11. Return results by highest AI Match score.
        `

        const response = await client.chat.completions.create({
            model: "grok-4.3",  
            messages: [
                {
                    role: "system",
                    content: "You are an expert video game recommendation engine."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "items_list",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            items: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        description: { type: "string" },
                                        genres: {
                                            type: "array",
                                            description: "Array of strings"
                                        },
                                        themes: {
                                            type: "array",
                                            description: "Array of strings"
                                        },
                                        platforms: {
                                            type: "array",
                                            description: "Array of strings"
                                        },
                                        release_date: { type: "string" },
                                        developer: { type: "string" },
                                        average_play_time: { type: "string", description: "Range in hours" },
                                        ai_match: { type: "number", minimum: 0, maximum: 100 }
                                    },
                                    required: ["name", "description", "genres", "themes", "platforms", "average_play_time", "release_date", "developer", "ai_match"],
                                    additionalProperties: false
                                }
                            }
                        },
                        required: ["items"],
                        additionalProperties: false
                    }
                }
            }
        });

        const result = JSON.parse(response.choices[0].message.content);
        const usedGames = result.items.map(item => item.name)

        res.send({ data: result, newPage: page, prevGames: usedGames })

    } catch (error) {
        console.log(error)
    }


})

module.exports = app