const { cache } = require('../utils/cache');
const { pool } = require('../scripts/db');

const LIMIT = 20

async function updateGames() { }


async function setThemes() {

    try {

        const themes = ['action', 'fantasy', 'mystery', 'open world']

        for (const theme of themes) {

            console.log("Setting theme", theme)
            const query =
                `
                    SELECT DISTINCT g.*, c.url AS 'image', ge.name
                    FROM games g
                    LEFT JOIN game_themes gt ON g.id = gt.id
                    LEFT JOIN themes t ON gt.theme = t.id
                    LEFT JOIN covers c ON g.id = c.game
                    LEFT JOIN game_platforms gp ON g.id = gp.id
                    LEFT JOIN platforms p ON gp.platform = p.id
                    LEFT JOIN game_genres gg ON g.id = gg.id
                    LEFT JOIN genres ge ON gg.genre = ge.id
                    WHERE 
                        p.id IN (48, 167, 169, 6, 130, 508)
                        AND g.first_release_date >= DATE_SUB(CURDATE(), INTERVAL 15 YEAR) 
                        AND g.first_release_date < CURRENT_DATE() 
                        AND t.name = ?
                    ORDER BY RAND()
                    LIMIT ?;
                `

            const [result] = await pool.promise().query(query, [theme, LIMIT])
            console.log(result)
            if (!result) continue
            cache.set(theme, result)

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
                SELECT DISTINCT g.*, c.url AS 'image', ge.name
                FROM games g
                LEFT JOIN game_themes gt ON g.id = gt.id
                LEFT JOIN themes t ON gt.theme = t.id
                LEFT JOIN covers c ON g.id = c.game
                LEFT JOIN game_platforms gp ON g.id = gp.id
                LEFT JOIN platforms p ON gp.platform = p.id
                LEFT JOIN game_genres gg ON g.id = gg.id
                LEFT JOIN genres ge ON gg.genre = ge.id
                WHERE 
                    p.id IN (48, 167, 169, 6, 130, 508)
                    AND g.first_release_date >= DATE_SUB(CURDATE(), INTERVAL 15 YEAR) 
                    AND g.first_release_date < CURRENT_DATE() 
                ORDER BY RAND()
                LIMIT ?;
            `

        const [result] = await pool.promise().query(query, [LIMIT])
        // if (!result) continue
        cache.set(cacheKey, result)


    } catch (error) {
        console.log("Failed to set new games", error)
    }

}

async function setRandomGames() {

    try {

        const cacheKey = 'random'

        const query =
            `
                SELECT DISTINCT g.*, c.url AS 'image', ge.name
                FROM games g
                LEFT JOIN game_themes gt ON g.id = gt.id
                LEFT JOIN themes t ON gt.theme = t.id
                LEFT JOIN covers c ON g.id = c.game
                LEFT JOIN game_platforms gp ON g.id = gp.id
                LEFT JOIN platforms p ON gp.platform = p.id
                LEFT JOIN game_genres gg ON g.id = gg.id
                LEFT JOIN genres ge ON gg.genre = ge.id
                WHERE p.id IN (48, 167, 169, 6, 130, 508)
                ORDER BY first_release_date DESC
                LIMIT ?;
            `

        const [result] = await pool.promise().query(query, [LIMIT])
        // if (!result) continue
        cache.set(cacheKey, result)


    } catch (error) {
        console.log("Failed to set new games", error)
    }

}

async function setPopularGames() {

    try {

        const cacheKey = 'popular'

        const query =
            `
                SELECT DISTINCT g.*, c.url AS 'image', ge.name
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

            `

        const [result] = await pool.promise().query(query, [LIMIT])
        // if (!result) continue
        cache.set(cacheKey, result)


    } catch (error) {
        console.log("Failed to set new games", error)
    }

}

// old but gold

async function setOldGames() {

    try {

        const cacheKey = 'old_games'

        const query =
            `
                SELECT DISTINCT g.*, c.url AS 'image', ge.name
                FROM games g
                LEFT JOIN game_themes gt ON g.id = gt.id
                LEFT JOIN themes t ON gt.theme = t.id
                LEFT JOIN covers c ON g.id = c.game
                LEFT JOIN game_platforms gp ON g.id = gp.id
                LEFT JOIN platforms p ON gp.platform = p.id
                LEFT JOIN game_genres gg ON g.id = gg.id
                LEFT JOIN genres ge ON gg.genre = ge.id
                WHERE 
                    p.id IN (48, 167, 169, 6, 130, 508)
                    AND g.first_release_date <= DATE_SUB(CURDATE(), INTERVAL 15 YEAR) 
                ORDER BY RAND()
                LIMIT ?;
            `

        const [result] = await pool.promise().query(query, [LIMIT])
        // if (!result) continue
        cache.set(cacheKey, result)


    } catch (error) {
        console.log("Failed to set new games", error)
    }

}

module.exports = { setThemes, setNewReleases, setRandomGames, setPopularGames, setOldGames }