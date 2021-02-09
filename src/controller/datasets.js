import { nameTable, name, imgId } from '../constants/datasets'
import db from "../db/db"

const getNamesDatasets = (req, res) => {
    // Select SQL query
    const query = `SELECT DISTINCT ${name} FROM ${nameTable}`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        res.status(201).json(result.map(val => val.groupName))
    })
}

const getDatasets = (req, res) => {
    const body = req.body
    // Insertion SQL query
    const query = `SELECT * FROM ${nameTable} INNER JOIN ${"images"} USING(${imgId})`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        res.status(201).json(result)
    })
}

const addImageDatasets = (req, res) => {
    const body = req.body
    // Insertion SQL query
    const query = `INSERT INTO ${nameTable} (${imgId}, ${name}) VALUES ('${body.imgId}', '${req.params.id}')`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        res.status(201).json(result)
    })
}

const removeImageDatasets = (req, res) => {
    const body = req.body
    // Insertion SQL query
    const query = `DELETE FROM ${nameTable} WHERE ${imgId}='${body.imgId}' AND ${name}='${req.params.id}'`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        res.status(201).json(result)
    })
}

export default {
    getNamesDatasets,
    getDatasets,
    addImageDatasets,
    removeImageDatasets,
}