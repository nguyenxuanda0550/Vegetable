const express = require('express')
const router = express.Router()

router.get('/'), (req, res) => {
    res.render('categories/list')

}

router.get('/add'), (req, res) => {
    res.render('categories/add')
}

module.exports = router