const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash')
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express()

//connection string

const dbURI = 'mongodb+srv://yayner:yaysemyay@node-blog-app.klw82nj.mongodb.net/node-blog-app?retryWrites=true&w=majority'

//connect to db using a package mongoose
mongoose.connect(dbURI).then((result) => {
  app.listen(3000, () => {
    console.log("DB connected successfully...")
  })
}).catch((err) => console.log(err))
//register view engine and a views folder as default
app.set('view engine', 'ejs')

//middleware to use static files
app.use(express.static('public'))

//this middleware enables to pass the data sent from the web form to the req object and attache them to req.body
app.use(express.urlencoded({extended: true}))

// third party middlware logger
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', {title: "About"})
})

// blog routes
app.use('/blogs', blogRoutes)
//404 page
app.use((req, res) => {
  res.status(404).render('404', {title: "404"})
})