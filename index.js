const Joi = require('joi')
const users = require('./routes/users');
const express = require('express')
const app = express()

app.use(express.json())
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('OK')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))