const db = require('../db.js')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const users = await db.readUsers()
    res.send(users)
})

router.get('/:id', async (req, res, next) => {
    const user = await db.readUser(req.params.id)
    if (!user) return res.status(404).send('No user with this id')
    res.send(user)
})

router.put('/:id', async (req, res, next) => {
    const putUser = await db.updateUser(req.body, req.params.id)
    res.send(putUser)
})

router.post('/', async (req, res, next) => {
    const postUser = await db.createUser(req.body)
    res.send(postUser)
})

router.delete('/:id', async (req, res, next) => {
    const deleteUser = await db.deleteUser(req.params.id)
    //if (!deleteUser) return res.status(404).send('No user with this id')
    res.send(deleteUser)
})

module.exports = router