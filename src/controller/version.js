import { nameTable, imgId, tagName, version } from '../constants/version'
import db from '../db/db'

const allVersions = (req, res) => {
    const id = req.params.id
    const query = `SELECT DISTINCT ${version} FROM ${nameTable} WHERE ${imgId}='${id}'`
    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        res.status(200).json(result.map(val => val.numVers).sort((a, b) => b-a))
    })
}

/**
 * Remove all tags of an image 
 */
const removeOldTags = (id, vers, array, res) => {
    // Insertion SQL query
    const query = `DELETE FROM ${"imagetags"} WHERE ${imgId}='${id}'`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        else{
            addNewTags(id, vers, array, res)
        }
    })
}
/**
 * Add new tags to the tables in case the db don't know a tag 
 */
const addNewTags = (id, vers, array, res) => {
    const query = `INSERT INTO tags (${tagName}) VALUES ? ON DUPLICATE KEY UPDATE ${tagName} = ${tagName}`
    const values = array.map(val => [val])
    db.query(query, [values], function (err) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        else{
            addImageNewTags(id, vers, array, res)
        }
    })
}

/**
 * Add the new tags to the image
 */
const addImageNewTags = (id, vers, array, res) => {
    const query = `INSERT INTO ${"imagetags"} (${tagName}, ${imgId}) VALUES ?`
    const values = array.map(val => [val, id])
    db.query(query, [values], function (err) {
        if (err) res.status(500).json({ message: err.sqlMessage })
        else {
            addVersionAfterCheck(id, vers, array, res)
        }
    })
}

/**  
 * Add the tags versions 
 */
const addVersionAfterCheck = (id, vers, array, res) => {
    const query = `INSERT INTO ${nameTable} (${tagName}, ${version}, ${imgId}) VALUES ? `
    const values = array.map(val => [val, vers, id])
    db.query(query, [values], function(err) {
        if (err) console.log({ message: err.sqlMessage })
    })
    res.status(201).json({ message: `${array.length} element added into ${nameTable}`})

}
/**
 * Add a version of tags of an image
 */
const addVersion = (req, res) => {
    const tags = req.body.tags // Tags array to add into db
    const id = req.params.id
    const query = `SELECT ${version} FROM ${nameTable} WHERE '${id}' = ${imgId}`

    db.query(query, function(err, result) {
        if(err) res.status(500).json({ message: err.sqlMessage })
        else{
            if(result.length === 0)
                removeOldTags(id, 1, tags, res)
            else{
                const lastVersion = Object.values(JSON.parse(JSON.stringify(result))).reduce((max, val) => { 
                    return max>val.numVers?max:val.numVers
                }, Number.MIN_SAFE_INTEGER)
                removeOldTags(id, lastVersion+1, tags, res)
            }
        }
    })
}

export default {
    allVersions,
    addVersion,
}