const express = require('express')
const categoryModel = require('../models/category.model')
const productModel = require('../models/product.model')
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const products = await productModel.find().populate('category', ['name'])
        res.render('products/list', { products: products })
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }


})

router.get('/add', async(req, res) => {
    const product = new productModel()
    const category = await categoryModel.find()
    res.render('products/add', { product: product, category: category })
})

router.post('/', async(req, res) => {

    try {
        const productNew = new productModel({
            name: req.body.name,
            info: req.body.info,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category
        })

        await productNew.save()
        res.redirect('/product')
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})


router.get('/edit/:id', async(req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        const category = await categoryModel.find()
        res.render('products/edit', { product: product, category: category })
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

router.put('/edit/:id', async(req, res) => {
    try {
        let pro = await productModel.findById(req.params.id)
        pro.name = req.body.name
        pro.info = req.body.info
        pro.price = req.body.price
        pro.quantity = req.body.quantity
        pro.category = req.body.category
        await pro.save()
        res.redirect('/product')

    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const productDelete = await productModel.findById(req.params.id)
        await productDelete.remove()
        res.redirect('/product')
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }

})

module.exports = router