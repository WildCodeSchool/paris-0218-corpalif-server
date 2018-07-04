const auth = require('../middleware/auth')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db = require('../db.js')
const express = require('express');
const router = express.Router();


/******** Accès page profil avec vérif du token *****/
router.get('/:id', auth, async (req, res, next) => { // utilisation middleware auth pour vérifier le token (voir fichier middleware auth)
    const user = await db.readUser(req.params.id) // verif user dans db
    if (!user) return res.status(404).send('No user with this id') // sinon error
    res.send(user) // renvoi les données de l'user
})

module.exports = router