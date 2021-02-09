import functions from '../services/image'
import { nameTable, name, url, type } from '../constants/image'
import { nameTableR, imgR, tagR } from '../constants/imageTag'
import db from '../db/db'

const dest = 'http://localhost:8080/images/upload'
const tagTable = 'tags'

/** 
 * Get all image by `offset`
 */
const allImage = (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 0

    // Selection SQL query
    const query = `SELECT * FROM ${nameTable} LIMIT ${limit} OFFSET ${page}`
    if (page < 0 || limit <= 0) res.status(500).json({message: "Page/Limit number not correct"})
    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) res.status(500).json({message: err.sqlMessage})
        else res.status(200).json(result)
    })
}

/** 
 * Upload an image then store informations into db
 */
const upload = (req, res) => {
    if (req.file.filename) {
        functions.detail(req, `${dest}/${req.file.filename}`)
        res.status(201).json({
            message: "Image upload successfully",
            url: `${dest}/${req.file.filename}`
        })
    } else {
        res.status(500).json({
            message: "An error occurs during the upload process",
        })
    }
}


/** 
 * Insert into the Database the relation (image,tag)
 */
const addTags = (req, res) => {
    const body = req.body
    // Check if the tags is existant
    const check = `SELECT COUNT(*) FROM ${tagTable} WHERE ${tagR} = '${body.tagName}'`
    db.query(check, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        if(result) {
            if(Object.values(result[0])[0] == 0){
                const query = `INSERT INTO ${tagTable} (${tagR}) VALUES ('${body.tagName}')`
                db.query(query, function (err, result) {
                    if (err)
                    res.status(500).json({ message: err.sqlMessage })
                    else
                    addAfterCheck(req, res) // To add it after checking tag table
                })
            } else
            addAfterCheck(req, res) // To add it after checking tag table
        }
    })
}

const addAfterCheck = (req, res) => {
    const body = req.body
    // Insertion SQL query
    const query = `INSERT INTO ${nameTableR} (${tagR}, ${imgR}) VALUES ('${body.tagName}', '${req.params.id}')`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        res.status(201).json(result)
    })
}

/**
 * Get the list of tag of an image
 */
const getTags = (req, res) => {
    const query = `SELECT ${tagR} FROM ${nameTableR} WHERE ${imgR} = '${req.params.id}'`

    db.query(query, function (err, result) {
        if(err) res.status(500).json({ message: err.sqlMessage })
        else res.status(200).json(result.map( val => val.tagName))
    })
}

/**
 * get all image that have a tag paginate
 */
const getAllImageTags = (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 0
    const query = `SELECT DISTINCT ${imgR}, ${url}, ${name}, ${type} FROM ${nameTableR} INNER JOIN ${nameTable} USING(${imgR}) LIMIT ${limit} OFFSET ${page}`

    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        else res.status(200).json(result)
    })
}

export default {
    upload,
    allImage,
    addTags,
    getTags,
    getAllImageTags
}
