const express = require('express')
const Blog = require('../models/blog')

const route = express.Router()
//blog routes
route.get('/', (req, res) => {
  Blog.find().sort({createdAt: -1}).then((result) => {
    res.render('index', {title: 'All Blogs', blogs: result})

  }).catch(err => {
    console.log(err)
  })
})

// post blog
route.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.redirect('/blogs')
  }).catch((err) => {
    console.log(err)
  })

})

// create a new blog handler
route.get('/create', (req, res) => {
  res.render('create', {title: "Create a blog"})
})


//route params
route.get('/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id).then((result) => {
    res.render('details', {blog: result, title: "Blog Detail"})
  }).catch((err) => {
    console.log(err)
  })

})
//delete request handler
route.delete('/:id', (req, res) => {
  const id = req.params.id

  Blog.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: '/blogs'})
  }).catch((err) => {
    console.log(err)
  })
})


module.exports = route