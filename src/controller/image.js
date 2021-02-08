
const endpoint = 'http://localhost:8080/images/upload'

const upload = (req, res) => {
    if (req.file.filename) {
        res.status(201).json({
            message: "Image upload successfully",
            url: `${endpoint}/${req.file.filename}`
        })
    } else {
        res.status(500).json({
            message: "An error occurs during the upload process",
        })
    }
}

export default {
    upload,
}