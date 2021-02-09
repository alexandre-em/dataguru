import { Router } from 'express'
import imageUploader from '../services/image'
import imageController from '../controller/image'

const router = Router()

/**
 * get all picture uploaded paginate
 * @route {GET} /image/all
 * @Param Integer: page
 * @Param Integer: limit
 */
router.get('/all', (req, res) => {
    imageController.allImage(req, res)
})

/**
 * Get all tags of a picture
 * @route {GET} /image/tag
 * @urlParam String: id
 */
router.get('/tag/:id', (req, res) => {
    imageController.getTags(req, res)
})

/**
 * Get all picture tagged with pagination
 * @route {GET} /image/tags
 * @Param Integer: page
 * @Param Integer: limit
 */
router.get('/tags', (req, res) => {
    imageController.getAllImageTags(req, res)
})

/**
 * Upload a new picture
 * @route {POST} /image/upload
 * @bodyParam File: image
 * @bodyParam String: name
 * @bodyParam String: type
 */
router.post('/upload', imageUploader.upload.single('image'), imageController.upload)

/**
 * Add a tag to an image
 * @route {POST} /image/tag/:id
 * @bodyParam String: tagName
 * @urlParam String: id
 */
router.post('/tag/:id', (req, res) => {
    imageController.addTags(req, res)
})

export default router
