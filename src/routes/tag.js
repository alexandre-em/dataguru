import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    console.log("get tags")
})

router.post('/', (req, res) => {
    console.log("post tags")
})

router.delete('/:id', (req, res) => {
    console.log("deletes tags")
})

export default router