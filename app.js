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

//this middleware enables to pass the data sent from the web form to the req object and attache them to req.body
app.use(express.urlencoded({extended: true}))

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

// post blog
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.redirect('./blogs')
  }).catch((err) => {
    console.log(err)
  })

})

//route params
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id).then((result) => {
    res.render('details', {blog: result, title: "Blog Detail"})
  }).catch((err) => {
    console.log(err)
  })

})
//delete request handler
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id

  Blog.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: '/blogs'})
  }).catch((err) => {
    console.log(err)
  })
})

// create a new blog handler
app.get('/blogs/create', (req, res) => {
  res.render('create', {title: "Create a blog"})
})

//404 page
app.use((req, res) => {
  res.status(404).render('404', {title: "404"})
})