const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users')
})

router.get('/:id', (req, res) => {
    res.send('Users by Id ' + req.params.id)
})

router.put('/:id', (req, res) => {
    res.send('Modify Users ' + req.params.id)
})

router.post('/', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    res.send('Delete Users ' + req.params.id)
})

module.exports = router