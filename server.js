require('dotenv').config({ quiet: true })
const express = require('express');
const cors = require('cors')
const scripts = require('./routes/scripts')
const games = require('./routes/games')
require('./scripts/schedule')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set("trust proxy", 1);

app.use(scripts)
app.use(games)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})