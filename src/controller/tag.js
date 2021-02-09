import db from '../db/db'
import { nameTable, name } from '../constants/tag'

/** 
 * Get all tags of the data base
 */
const allTags = (req, res) => {
    // Insertion SQL query
    const query = `SELECT * FROM ${nameTable}`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) 
            res.status(500).json({message: err.sqlMessage})
        else
            res.status(200).json(result)
    })
}

/** 
 * Insert into the Database the informations of an image
 */
const createTag = (req, res) => {
    // Insertion SQL query
    const body = req.body
    const query = `INSERT INTO ${nameTable} (${name}) VALUES ('${body.name}')`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err)
            res.status(500).json({message: err.sqlMessage})
    })
    res.status(201).json({ message: "success"})
}

export {
    allTags,
    createTag
}
