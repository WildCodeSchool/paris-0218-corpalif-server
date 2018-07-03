const db = require('../db.js')
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'test.corpalif@gmail.com',
           pass: 'CorpalifSara'
       }
   })

   


router.get('/', async (req, res, next) => {
    const users = await db.readUsers()
    res.send(users)
})

router.get('/:id', async (req, res, next) => {
    const user = await db.readUser(req.params.id)
    if (!user) return res.status(404).send('No user with this id')
    res.send(user)
})

router.put('/validate/:id', async (req, res, next) => {
    const putUser = await db.updateUser(req.body, req.params.id)
    const mailOptions = {
        from: 'test.corpalif@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Profil accepté', // Subject line
        html: '<p>Welcome to corpalif</p>'// plain text body
      }
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     })

    res.send(putUser)
})

router.put('/password', async (req, res, next) => {
    const putUser = await db.updatePassword(req.body)
    res.send(putUser)
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