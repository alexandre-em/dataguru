import { Router } from 'express'
import VersionController from '../controller/version'

const router = Router()

/**
 * Get all version of an image
 * @route {GET} /versions/all/:id
 */
router.get('/all/:id', (req, res) => {
    VersionController.allVersions(req, res)
})

/**
 * add a new version of the image's list of tag
 * @route {POST} /versions/add/:id
 * @bodyParam Array(String): tags
 * @urlParam String: id
 */
router.post('/add/:id', (req, res) => {
    console.log(req.body.tags)
    VersionController.addVersion(req, res)
    // res.status(201).send("OK")
})

export default router