import multer from 'multer'
import path from 'path'
import db from '../db/db'
import { nameTable, name, url, type } from '../constants/image'

/** 
 * define the path of the file that will be uploaded
 */
const storage = multer.diskStorage({
    // file destination path
    destination: function (req, file, cb) {
        cb(null, 'public/images/upload')
    },
    // give an unique name to the file uploaded
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

/** 
 * Check if the file is an image
 */
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error('Not an image'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
})

/** 
 * Insert into the Database the informations of an image
 */
const detail = (req, generateUrl) => {
    // Insertion SQL query
    const body = req.body
    const query = `INSERT INTO ${nameTable} (${name}, ${url}, ${type}) VALUES ('${body.name}', '${generateUrl}', '${body.type}')`

    // Call a pool connecrion and Apply the query
    db.query(query, function (err, result) {
        if (err) console.error("An error occurs during the insertion into the db", err)
        console.log("image inserted in the db")
    })
}

export default {
    upload,
    detail,
}
