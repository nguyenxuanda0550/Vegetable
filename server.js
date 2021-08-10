const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const methodOverride = require('method-override')
const categoryRouter = require('./routes/categories')
const productRouter = require('./routes/product')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()




app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.set('layout', 'layouts/layout')
app.use(express.static('public'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))



//connectDataBase
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.STR_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Connect successfully")
    } catch (e) {
        console.log(e)
        console.log("Connect failed")
    }
}
connectDB()

app.use(methodOverride('_method'))
app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)

app.listen(process.env.PORT || 4000)