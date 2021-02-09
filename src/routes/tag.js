import { Router } from 'express'
import { allTags, createTag } from '../controller/tag'

const router = Router()

/**
 * Get all tags created
 * @route {GET} /tag/all
 */
router.get('/all', (req, res) => {
    allTags(req, res)
})

/**
 * Create a new tag with a `name`
 * @route {POST} /image/tag
 * @bodyParam String: name
 */
router.post('/create', (req, res) => {
    createTag(req, res)
})

export default router
