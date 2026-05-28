const cron = require('node-cron')

const {
    setThemes,
    setNewReleases,
    setRandomGames,
    setPopularGames,
    setOldGames
} = require('./cron')

// run once
setThemes()
setNewReleases()
setRandomGames()
setPopularGames()
setOldGames()

// run every 24 hours
cron.schedule('0 0 * * *', setThemes)
cron.schedule('0 0 * * *', setNewReleases)
cron.schedule('0 0 * * *', setRandomGames)
cron.schedule('0 0 * * *', setPopularGames)
cron.schedule('0 0 * * *', setOldGames)