require('dotenv').config({ quiet: true })
const express = require('express');
const cors = require('cors')
const scripts = require('./routes/scripts')
const games = require('./routes/games')
const contact = require('./routes/contact')
const deepsearch = require('./routes/deepsearch')
const selections = require('./routes/selections')
require('./scripts/schedule')

const app = express();

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set("trust proxy", 1);

app.use(scripts)
app.use(games)
app.use(contact)
app.use(deepsearch)
app.use(selections)

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})