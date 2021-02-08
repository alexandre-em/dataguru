import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/upload')
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

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

export default {
    upload
}
