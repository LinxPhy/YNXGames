const { cache } = require('../utils/cache');
const { pool } = require('../scripts/db');

const LIMIT = 20

async function updateGames() { }
async function setRandomGames() { }

async function setNewGames() { }

async function setThemes() {

    try {

        const themes = ['action', 'fantasy', 'mystery', 'open world']

        for (const theme of themes) {

            const query =
                `
                    SELECT DISTINCT g.*, c.url AS 'image'
                    FROM games g
                    LEFT JOIN game_themes gt ON g.id = gt.id
                    LEFT JOIN themes t ON gt.theme = t.id
                    LEFT JOIN covers c ON g.id = c.game
                    LEFT JOIN game_platforms gp ON g.id = gp.id
                    LEFT JOIN platforms p ON gp.platform = p.id
                    WHERE 
                        p.id IN (48, 167, 169, 6, 130, 508)
                        AND g.first_release_date >= DATE_SUB(CURDATE(), INTERVAL 15 YEAR) 
                        AND g.first_release_date < CURRENT_DATE() 
                        AND t.name = ?
                    ORDER BY RAND()
                    LIMIT ?;
                `

            const [result] = await pool.promise().query(query, [theme, LIMIT])
            if (!result) continue
            await cache.set(theme, result)

        }

    } catch (error) {
        console.log("Failed to set themes", error)
    }
}
