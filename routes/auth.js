const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db = require('../db.js')
const express = require('express');
const router = express.Router();


router.post('/', async (req, res, next) => {
    
    const user = await db.readUserEmail(req.body.email)
    if (!user[0]) return res.status(404).send('No user with this email')
    
    const validPassword = await bcrypt.compare(req.body.password, user[0].password)
    
    if (!validPassword) return res.status(400).send('Invalid email or password.')
    
    const token = jwt.sign({id: user[0].id}, config.get('jwtPrivateKey'))
    res.header('x-auth-token', token).send('User connected')
    
})


module.exports = router