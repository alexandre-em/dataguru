import image from './src/routes/image'
import tag from './src/routes/tag'
// import { connect } from './db/connection.js'
import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql'
import path from 'path'


// Initialisation
dotenv.config()
const PORT = process.env.PORT || 8080
const app = express()
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'dataguruDB'
// })

// middlewares
app.use(express.json())
// connection.connect()

// Routes
app.use('/image', image)
app.use('/tag', tag)
app.use(express.static(__dirname + '/public'));

// connection
app.listen(PORT, () => {
    console.log(`Running server at port: ${PORT}...`)
    // connect()
})