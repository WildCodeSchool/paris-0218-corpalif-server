const db = require('../db.js')
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const config = require('config')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'test.corpalif@gmail.com',
           pass: 'CorpalifSara'
       }
   })

   
/*************Get all users and by ID*****************/
router.get('/', async (req, res, next) => {
    const users = await db.readUsers()
    res.send(users)
})

router.get('/:id', async (req, res, next) => {
    const user = await db.readUser(req.params.id)
    if (!user) return res.status(404).send('No user with this id')
    res.send(user)
})

/************* Admin validate user *****************/
router.put('/validate/:id', async (req, res, next) => {
    const putUser = await db.updateUser(req.body, req.params.id) // change status de l'user pour le valider
    const token = await db.readUserEmail(req.body.email) // récupère email de l'user pour lui envoyer le mail

    /* Envoi de l'email */
    const mailOptions = {
        from: 'test.corpalif@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Profil accepté', // Subject line
        html: `<p>Welcome to corpalif cliquez ici pour créer votre mot de passe http://localhost:3000/password/${token[0].token}</p>`
      }
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     })

    res.send(putUser)
})

/************* User met à jour son mot de passe *****************/
/* Son token est remis à zéro pour ne pas le conserver dans la bd */
router.put('/password/:id', async (req, res, next) => {
    const user = await db.readUserToken(req.params.id) // verifie que le token est bon
    if (!user[0]) return res.status(404).send('Desolé impossible de changer votre mot de passe') // si pas bon error
    const putUser = await db.updatePassword(req.body) // Mise à jour du password
    res.send(putUser)
})

/************* User met à jour son mot de passe *****************/
router.put('/:id', async (req, res, next) => {
    const putUser = await db.updateUser(req.body, req.params.id)
    res.send(putUser)
})

/************* Créer un nouvel user *****************/
router.post('/', async (req, res, next) => {
    const email = req.body.email
    const postUser = await db.createUser(req.body)
    res.send(postUser)
})

/************* Mot de passe perdu *****************/
router.post('/lost-password', async (req, res, next) => {
    const user = await db.readUserEmail(req.body.email) // verif si email existe dans db
    if (!user[0]) return res.status(404).send('No user with this email') // si existe pas error
    const token = jwt.sign({email: req.body.email}, config.get('jwtPrivateKey')) // création d'un token
    const updateToken = await db.updateUserToken(token, req.body.email) // ajoute token dans db

    /* Envoi de l'email avec lien URL+TOKEN pour mettre à jour son mot de passe */
    const mailOptions = {
        from: 'test.corpalif@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Changement Mot de passe', // Subject line
        html: `<p>Welcome to corpalif cliquez ici pour changer votre mot de passe http://localhost:3000/users/password/${token}</p>`
      }
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     })

    res.send(updateToken)
})

/************* Effacer user *****************/
router.delete('/:id', async (req, res, next) => {
    const deleteUser = await db.deleteUser(req.params.id)
    //if (!deleteUser) return res.status(404).send('No user with this id')
    res.send(deleteUser)
})

module.exports = router