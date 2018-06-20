const auth = require('../middleware/auth')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db = require('../db.js')
const express = require('express');
const router = express.Router();

router.get('/:id', auth, async (req, res, next) => {
    const user = await db.readUser(req.params.id)
    if (!user) return res.status(404).send('No user with this id')
    res.send(user)
})

module.exports = router