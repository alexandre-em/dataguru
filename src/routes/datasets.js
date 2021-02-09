import { Router } from 'express'
import datasetsController from '../controller/datasets'

const router = Router()

/**
 * Get all name of all group
 * @route {GET} /group/all
 */
router.get('/all', (req, res) => {
    datasetsController.getNamesDatasets(req, res)
})

/**
 * Get images from a group `id`
 * @route {GET} /group/:id
 * @bodyParam String: imgId
 * @urlParam String: id
 */
router.get('/:id', (req, res) => {
    datasetsController.getDatasets(req, res)
})

/**
 * Create or add an image to a group `id`
 * @route {POST} /group/:id
 * @bodyParam String: imgId
 * @urlParam String: id
 */
router.post('/:id', (req, res) => {
    datasetsController.addImageDatasets(req, res)
})

/**
 * Delete a group an images from a group `id`
 * @route {DELETE} /group/:id
 * @bodyParam String: imgId
 * @urlParam String: id
 */
router.delete('/:id', (req, res) => {
    datasetsController.removeImageDatasets(req, res)
})

export default router