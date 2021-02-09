import image from './src/routes/image'
import tag from './src/routes/tag'
import express from 'express'
import dotenv from 'dotenv'
import db from './src/db/db'

// Initialisation
dotenv.config()
const PORT = process.env.PORT || 8080
const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/image', image)
app.use('/tag', tag)


// Path to uploaded images
app.use(express.static(__dirname + '/public'));

// Connection
app.listen(PORT, () => {
    console.log(`Running server at port: ${PORT}...`)
    db.on('connection', function (connection) {
        connection.query('SET SESSION auto_increment_increment=1')
    });
})
