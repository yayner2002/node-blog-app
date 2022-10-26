const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { result } = require('lodash')

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


// third party middlware logger
app.use(morgan('dev'))

//middleware to use static files

app.use(express.static('public'))




app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', {title: "About"})
})

//blog routes

app.get('/blogs', (req, res) => {
  Blog.find().sort({createdAt: -1}).then((result) => {
    res.render('index', {title: 'All Blogs', blogs: result})

  }).catch(err => {
    console.log(err)
  })
})
app.get('/blogs/create', (req, res) => {
  res.render('create', {title: "Create blog"})
})

//404 page
app.use((req, res) => {
  res.status(404).render('404', {title: "404"})
})