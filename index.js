const config = require('config')
const mysql = require('mysql2/promise')
const Joi = require('joi')
const users = require('./routes/users')
const auth = require('./routes/auth')
const profil = require('./routes/profil')
const express = require('express')
const app = express()

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1)
}

app.use(express.json())

app.use('/users', users);
app.use('/auth', auth);
app.use('/profil', profil);

app.get('/', (req, res) => {
  res.send('OK')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

//export corpalif_jwtPrivateKey=mySecureKey