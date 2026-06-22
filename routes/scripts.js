const express = require('express')
const axios = require('axios')
const { pool } = require('../scripts/db')
const { UnixToDateTime } = require('../scripts/unix_converter')
const app = express()


// What I need
// All the games (yes)
// The cover of the games (yes)
// Game modes (yes)
// Genres of the games (yes)
// The platforms of the games (yes)
// Age ratings of the games (yes)
// Videos and screenshots of the games (yes)
// Company maybe?

// Game modes

const base = process.env.BASE_URL
const clientId = process.env.IGDB_CLIENT_ID
const accessToken = process.env.IGDB_ACCESS_TOKEN

// Genres
app.get('/create_genres', async (req, res) => {

    try {

        const response = await axios.post(`${base}/genres`, 'fields *; limit 500;',
            {
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'text/plain'
                }
            })

        const genres = response.data

        for (const genre of genres) {
            const { id, name, slug, url, created_at, updated_at } = genre
            await pool.promise().query('INSERT INTO genres (id, name, slug, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [id, name, slug, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)])
        }

        res.send('Genres inserted successfully')

    } catch (error) {
        console.log(error)
    }

})

// Modes
app.get('/create_modes', async (req, res) => {

    try {

        const response = await axios.post(`${base}/game_modes`, 'fields *; limit 500;',
            {
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'text/plain'
                }
            })

        const genres = response.data

        for (const genre of genres) {
            const { id, name, slug, url, created_at, updated_at } = genre
            await pool.promise().query('INSERT INTO modes (id, name, slug, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [id, name, slug, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)])
        }

        res.send('Game modes inserted successfully')

    } catch (error) {
        console.log(error)
    }

})

// player_perspectives
app.get('/create_player_perspectives', async (req, res) => {

    try {

        const response = await axios.post(`${base}/player_perspectives`, 'fields *; limit 500;',
            {
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'text/plain'
                }
            })

        const player_perspectives = response.data

        for (const perspective of player_perspectives) {
            const { id, name, slug, url, created_at, updated_at } = perspective
            await pool.promise().query('INSERT INTO player_perspectives (id, name, slug, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [id, name, slug, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)])
        }

        res.send('Player perspectives inserted successfully')

    } catch (error) {
        console.log(error)
    }

})


// Themes
app.get('/create_themes', async (req, res) => {

    try {

        const response = await axios.post(`${base}/themes`, 'fields *; limit 500;',
            {
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'text/plain'
                }
            })

        const themes = response.data

        for (const theme of themes) {
            const { id, name, slug, url, created_at, updated_at } = theme
            await pool.promise().query('INSERT INTO themes (id, name, slug, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [id, name, slug, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)])
        }

        res.send('Themes inserted successfully')

    } catch (error) {
        console.log(error)
    }

})

// Platforms
app.get('/create_platforms', async (req, res) => {

    try {

        let platforms = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/platforms`, `fields *; where id = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508); limit 500; offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const platforms = response.data

            for (const platform of platforms) {
                const { id, name, slug, url, created_at, updated_at } = platform
                await pool.promise().query(
                    'INSERT INTO platforms (id, name, alternative_name, slug, generation, platform_logo, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [id, name, platform.alternative_name, slug, platform.generation, platform.platform_logo, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)]
                )
            }

            if (platforms.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Platforms inserted successfully')

    } catch (error) {
        console.log(error)
    }
})

// Platforms logos
app.get('/create_platforms_logos', async (req, res) => {

    try {

        let platforms = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/platform_logos`, `fields *; where id = (670, 867, 831, 248, 231, 329, 825, 606, 892, 561, 896); limit 500; offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const platforms = response.data

            for (const platform of platforms) {
                const { id, animated, width, height, url } = platform
                await pool.promise().query(
                    'INSERT INTO platform_logos (id, animated, width, height, url) VALUES (?, ?, ?, ?, ?)',
                    [id, animated, width, height, url]
                )
            }

            if (platforms.length < 500) {
                break
            }

            offset += 500
        }

        res.send('Platforms logos inserted successfully')

    } catch (error) {
        console.log(error)
    }

})


// Companies
app.get('/create_companies', async (req, res) => {

    try {

        let companies = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/companies`, `fields *; limit 500; offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const companies = response.data

            for (const company of companies) {
                const { id, name, description, logo, slug, url, created_at, updated_at } = company
                await pool.promise().query(
                    'INSERT INTO companies (id, name, description, logo, slug, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [id, name, description, logo, slug, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)]
                )
            }

            if (companies.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Companies inserted successfully')

    } catch (error) {
        console.log(error)
    }
})


// Company Logos
app.get('/create_company_logos', async (req, res) => {

    try {

        let companies = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/company_logos`, `fields *; limit 500; offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const companies = response.data

            for (const company of companies) {
                const { id, animated, width, height, url } = company
                await pool.promise().query(
                    'INSERT INTO company_logos (id, animated, width, height, url) VALUES (?, ?, ?, ?, ?)',
                    [id, animated, width, height, url]
                )
            }

            if (companies.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Company Logos inserted successfully')

    } catch (error) {
        console.log(error)
    }
})

// Involved Companies
app.get('/create_involved_companies', async (req, res) => {

    try {

        let companies = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/involved_companies`, `fields *; limit 500; where game.platforms = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508); offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const companies = response.data

            for (const _company of companies) {
                const { id, company, game, developer, publisher, supporting, created_at, updated_at } = _company
                await pool.promise().query(
                    'INSERT INTO involved_companies (id, company, game, developer, publisher, supporting, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [id, company, game, developer, publisher, supporting, UnixToDateTime(created_at), UnixToDateTime(updated_at)]
                )
            }

            if (companies.length < 500) {
                break
            }

            offset += 500
        }

        res.send('Involved Companies inserted successfully')

    } catch (error) {
        console.log(error)
    }

})


// Covers
app.get('/create_covers', async (req, res) => {

    try {

        let companies = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/covers`, `fields *; limit 500; where game.platforms = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508);  offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const companies = response.data

            for (const company of companies) {
                const { id, game, animated, width, height, url } = company
                await pool.promise().query(
                    'INSERT INTO covers (id, game, animated, width, height, url) VALUES (?, ?, ?, ?, ?, ?)',
                    [id, game, animated, width, height, url]
                )
            }

            if (companies.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Covers inserted successfully')

    } catch (error) {
        console.log(error)
    }
})

// Screenshots
app.get('/create_screenshots', async (req, res) => {

    try {

        let companies = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/screenshots`, `fields *; where game.platforms = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508); limit 500; offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const companies = response.data

            for (const company of companies) {
                const { id, game, animated, width, height, url } = company
                await pool.promise().query(
                    'INSERT INTO screenshots (id, game, animated, width, height, url) VALUES (?, ?, ?, ?, ?, ?)',
                    [id, game, animated, width, height, url]
                )
            }

            if (companies.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Screenshots inserted successfully')

    } catch (error) {
        console.log(error)
    }
})


// Videos
app.get('/create_videos', async (req, res) => {

    try {

        let companies = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/game_videos`, `fields *; sort id asc; limit 500; where game.platforms = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508) ; offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const companies = response.data

            for (const company of companies) {
                const { id, game, name, video_id } = company
                await pool.promise().query(
                    'INSERT INTO videos (id, game, name, video_id) VALUES (?, ?, ?, ?)',
                    [id, game, name, video_id]
                )
            }

            if (companies.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Videos inserted successfully')

    } catch (error) {
        console.log(error)
    }
})

// Collections

app.get('/create_collections', async (req, res) => {

    try {

        let collections = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/collections`, `fields *; limit 500; where games.platforms = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508); offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const collections = response.data

            for (const collection of collections) {
                const { id, name, slug, url, created_at, updated_at } = collection
                await pool.promise().query(
                    'INSERT INTO collections (id, name, slug, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
                    [id, name, slug, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)]
                )
            }

            if (collections.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Collections inserted successfully')

    } catch (error) {
        console.log(error)
    }
})


// Franchises

app.get('/create_franchises', async (req, res) => {

    try {

        let franchises = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/franchises`, `fields *; limit 500; where games.platforms = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508); offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const franchises = response.data

            for (const franchise of franchises) {
                const { id, name, slug, url, created_at, updated_at } = franchise
                await pool.promise().query(
                    'INSERT INTO franchises (id, name, slug, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
                    [id, name, slug, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)]
                )
            }

            if (franchises.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Franchises inserted successfully')

    } catch (error) {
        console.log(error)
    }
})



// Games
app.get('/create_games', async (req, res) => {

    try {

        let games = []
        let offset = 0

        while (true) {

            const response = await axios.post(`${base}/games`, `fields *; sort id asc; limit 500; where platforms = (6, 14, 34, 39, 48, 82, 130, 167, 169, 508) & id > 402008; offset ${offset};`,
                {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain'
                    }
                })

            const games = response.data

            for (const game of games) {

                const {
                    id, name, parent_game, slug, cover, storyline, summary, hypes, first_release_date, rating, rating_count, total_rating, total_rating_count, url, created_at, updated_at,
                    involved_companies, similar_games, platforms, player_perspectives, genres, game_modes, themes, screenshots, videos, franchises, collections
                } = game


                // Needs to get the company id not the id of the object
                if (involved_companies) {
                    for (const company of involved_companies) {
                        await pool.promise().query(
                            'INSERT INTO game_involved_companies (id, company) VALUES (?, ?)',
                            [id, company]
                        )
                    }
                }


                if (similar_games) {
                    for (const game of similar_games) {
                        await pool.promise().query(
                            'INSERT INTO similar_games (id, similar_game) VALUES (?, ?)',
                            [id, game]
                        )
                    }
                }

                if (platforms) {
                    for (const platform of platforms) {
                        await pool.promise().query(
                            'INSERT INTO game_platforms (id, platform) VALUES (?, ?)',
                            [id, platform]
                        )
                    }
                }

                if (player_perspectives) {
                    for (const perspective of player_perspectives) {
                        await pool.promise().query(
                            'INSERT INTO game_player_perspectives (id, perspective) VALUES (?, ?)',
                            [id, perspective]
                        )
                    }
                }

                if (genres) {
                    for (const genre of genres) {
                        await pool.promise().query(
                            'INSERT INTO game_genres (id, genre) VALUES (?, ?)',
                            [id, genre]
                        )
                    }
                }

                if (game_modes) {
                    for (const mode of game_modes) {
                        await pool.promise().query(
                            'INSERT INTO game_modes (id, mode) VALUES (?, ?)',
                            [id, mode]
                        )
                    }
                }

                if (themes) {
                    for (const theme of themes) {
                        await pool.promise().query(
                            'INSERT INTO game_themes (id, theme) VALUES (?, ?)',
                            [id, theme]
                        )
                    }
                }

                if (screenshots) {
                    for (const screenshot of screenshots) {
                        await pool.promise().query(
                            'INSERT INTO game_screenshots (id, screenshot) VALUES (?, ?)',
                            [id, screenshot]
                        )
                    }
                }

                if (videos) {
                    for (const video of videos) {
                        await pool.promise().query(
                            'INSERT INTO game_videos (id, video) VALUES (?, ?)',
                            [id, video]
                        )
                    }
                }

                if (franchises) {
                    for (const franchise of franchises) {
                        await pool.promise().query(
                            'INSERT INTO game_franchises (id, franchise) VALUES (?, ?)',
                            [id, franchise]
                        )
                    }
                }

                if (collections) {
                    for (const collection of collections) {
                        await pool.promise().query(
                            'INSERT INTO game_collections (id, collection) VALUES (?, ?)',
                            [id, collection]
                        )
                    }
                }

                const releaseDate = first_release_date ? UnixToDateTime(first_release_date) : null

                await pool.promise().query(
                    'INSERT INTO games (id, name, parent_game, slug, cover, storyline, summary, hypes, first_release_date, rating, rating_count, total_rating, total_rating_count, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [id, name, parent_game, slug, cover, storyline, summary, hypes, releaseDate, rating, rating_count, total_rating, total_rating_count, url, UnixToDateTime(created_at), UnixToDateTime(updated_at)]
                )

            }

            if (games.length < 500) {
                break
            }

            offset += 500

        }

        res.send('Games inserted successfully')

    } catch (error) {
        console.log(error)
    }
})


module.exports = app