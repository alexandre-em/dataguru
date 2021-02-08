import { Router } from 'express'
import imageUploader from '../services/image'
import imageController from '../controller/image'

const router = Router()
const endpoint = 'http://localhost:8080/images/upload'

router.get('/all', (req, res) => {
    console.log("get all image")
})

router.get('/:id', (req, res) => {
    console.log("get image")
})

router.post('/upload', imageUploader.upload.single('image'), imageController.upload)

router.delete('/:id', (req, res) => {
    console.log("delete image")
})

export default router