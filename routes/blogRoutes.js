const express = require('express')
const {blog_index, blog_create_form, blog_create_post, blog_delete, blog_details } = require('../controllers/blogControllers')

const route = express.Router()
//blog routes
route.get('/', blog_index)

// post blog
route.post('/', blog_create_post)

// create a new blog handler
route.get('/create', blog_create_form)


//route params
route.get('/:id', blog_details)
//delete request handler
route.delete('/:id', blog_delete)


module.exports = route