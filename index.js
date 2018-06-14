const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/users', (req, res) => {
    res.send('Users')
})

app.get('/users/:id', (req, res) => {
    res.send('Users by Id ' + req.params.id)
})

app.post('users', (req, res) => {
    
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))