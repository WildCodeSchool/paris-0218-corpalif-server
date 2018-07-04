const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db = require('../db.js')
const express = require('express');
const router = express.Router();


/************ AUTHENTIFICATION **************/
/****L'user rempli le formulaire email/mdp ******/

router.post('/', async (req, res, next) => {
    
    const user = await db.readUserEmail(req.body.email) // verif email dans db
    if (!user[0]) return res.status(404).send('No user with this email') // sinon error
    
    const validPassword = await bcrypt.compare(req.body.password, user[0].password) // verif password = password db avec bcrypt
    
    if (!validPassword) return res.status(400).send('Invalid email or password.') // sinon error
    
    const token = jwt.sign({id: user[0].id}, config.get('jwtPrivateKey')) // créé token avec l'id de l'user et la clé
    res.header('x-auth-token', token).send('User connected') // renvoi le token dans le header
    
})


module.exports = router