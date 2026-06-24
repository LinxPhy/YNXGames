const cache = require('../utils/cache');
const { pool } = require('../scripts/db');

const LIMIT = 20


async function setThemes() {

    try {

        const themes = ['action', 'fantasy', 'mystery', 'open world', 'romance', 'educational', 'science fiction', 'drama']

        for (const theme of themes) {

            const query =
                `
                    SELECT DISTINCT g.*, ANY_VALUE(c.url) AS 'image', ANY_VALUE(ge.name) AS 'genre'
                    FROM games g
                    LEFT JOIN game_themes gt ON g.id = gt.id
                    LEFT JOIN themes t ON gt.theme = t.id
                    LEFT JOIN covers c ON g.id = c.game
                    LEFT JOIN game_platforms gp ON g.id = gp.id
                    LEFT JOIN platforms p ON gp.platform = p.id
                    LEFT JOIN game_genres gg ON g.id = gg.id
                    LEFT JOIN genres ge ON gg.genre = ge.id
                    WHERE 
                        g.first_release_date >= DATE_SUB(CURDATE(), INTERVAL 15 YEAR) 
                        AND g.first_release_date < CURRENT_DATE() 
                        AND t.name = ?
                    GROUP BY g.id
                    ORDER BY random_rank
                    LIMIT ?;
                `

            const [result] = await pool.promise().query(query, [theme, LIMIT])
            if (!result) return

            cache.set(theme.replace(' ', '_'), result)
            console.log("Finished setting theme", theme)
            
        }

    } catch (error) {
        console.log("Failed to set themes", error)
    }
}


async function setNewReleases() {


    try {

        const cacheKey = 'new_releases'

        const query =
            `
                SELECT DISTINCT g.*, ANY_VALUE(c.url) AS 'image', ANY_VALUE(ge.name) AS 'genre'
                FROM games g
                LEFT JOIN game_themes gt ON g.id = gt.id
                LEFT JOIN themes t ON gt.theme = t.id
                LEFT JOIN covers c ON g.id = c.game
                LEFT JOIN game_platforms gp ON g.id = gp.id
                LEFT JOIN platforms p ON gp.platform = p.id
                LEFT JOIN game_genres gg ON g.id = gg.id
                LEFT JOIN genres ge ON gg.genre = ge.id
                WHERE 
                    g.first_release_date >= DATE_SUB(CURDATE(), INTERVAL 15 YEAR) 
                    AND g.first_release_date < CURRENT_DATE() 
                    AND first_release_date IS NOT NULL
                GROUP BY g.id
                ORDER BY first_release_date DESC
                LIMIT ?;
            `

        const [result] = await pool.promise().query(query, [LIMIT])
        if (!result) return

        cache.set(cacheKey, result)
        console.log("Finished setting new releases")


    } catch (error) {
        console.log("Failed to set new releases", error)
    }

}

async function setRandomGames() {

    try {

        const cacheKey = 'random'

        const query =
            `
                SELECT DISTINCT g.*, ANY_VALUE(c.url) AS 'image', ANY_VALUE(ge.name) AS 'genre'
                FROM games g
                LEFT JOIN game_themes gt ON g.id = gt.id
                LEFT JOIN themes t ON gt.theme = t.id
                LEFT JOIN covers c ON g.id = c.game
                LEFT JOIN game_genres gg ON g.id = gg.id
                LEFT JOIN genres ge ON gg.genre = ge.id
                GROUP BY g.id
                ORDER BY g.random_rank
                LIMIT ?;
            `

        const [result] = await pool.promise().query(query, [LIMIT])
        if (!result) return
        cache.set(cacheKey, result)
        console.log("Finished setting random games")


    } catch (error) {
        console.log("Failed to set new games", error)
    }

}

async function setPopularGames() {

    try {

        const cacheKey = 'popular'
        
        const query =
            `
                SELECT DISTINCT g.*, ANY_VALUE(c.url) AS 'image', ANY_VALUE(ge.name) AS 'genre'
                FROM games g
                LEFT JOIN game_themes gt ON g.id = gt.id
                LEFT JOIN themes t ON gt.theme = t.id
                LEFT JOIN covers c ON g.id = c.game
                LEFT JOIN game_platforms gp ON g.id = gp.id
                LEFT JOIN platforms p ON gp.platform = p.id
                LEFT JOIN game_genres gg ON g.id = gg.id
                LEFT JOIN genres ge ON gg.genre = ge.id
                WHERE g.id IN 
                    (
                        134709, 27912, 112875, 11156, 219027,
                        1942, 103205, 136178, 252729, 149275,
                        180259, 1905, 115, 372158, 387369,
                        324852, 121, 17269, 294041, 228530
                    )
                GROUP BY g.id
            `

        const [result] = await pool.promise().query(query, [LIMIT])
        if (!result) return
        cache.set(cacheKey, result)
        console.log("Finished setting popular games")


    } catch (error) {
        console.log("Failed to set new games", error)
    }

}

async function setOldGames() {

    try {

        const cacheKey = 'old_games'

        const query =
            `
                SELECT DISTINCT g.*, ANY_VALUE(c.url) AS 'image', ANY_VALUE(ge.name) AS 'genre'
                FROM games g
                LEFT JOIN game_themes gt ON g.id = gt.id
                LEFT JOIN themes t ON gt.theme = t.id
                LEFT JOIN covers c ON g.id = c.game
                LEFT JOIN game_platforms gp ON g.id = gp.id
                LEFT JOIN platforms p ON gp.platform = p.id
                LEFT JOIN game_genres gg ON g.id = gg.id
                LEFT JOIN genres ge ON gg.genre = ge.id
                WHERE g.first_release_date <= DATE_SUB(CURDATE(), INTERVAL 15 YEAR) 
                GROUP BY g.id
                ORDER BY random_rank
                LIMIT ?;
            `

        const [result] = await pool.promise().query(query, [LIMIT])
        if (!result) return

        cache.set(cacheKey, result)
        console.log("Finished setting old games")


    } catch (error) {
        console.log("Failed to set new games", error)
    }

}

module.exports = { setThemes, setNewReleases, setRandomGames, setPopularGames, setOldGames }