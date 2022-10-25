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

//to specify different folder like myviews instead of views
// app.set('views', 'myviews')

//listen for requests
// app.listen(3000)



//top middleware runs for all requests
// app.use((req, res, next) => {
//   console.log('new request made')
//   console.log('host: ', req.hostname)
//   console.log('path: ', req.path)
//   console.log('method: ', req.method)
//   next()
  
// })

//second middleware

// app.use((req, res, next) => {
//   console.log('in the second middleware')
//   next()
// })

// third party middlware logger
app.use(morgan('dev'))

//middleware to use static files

app.use(express.static('public'))

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: "Sport",
    snippet: "Liverpool 'could soon end 20-year transfer wait' as Naby Keïta truth is about to become clear",
    body: "A 20-year Liverpool transfer wait could come to an end as Chelsea, Arsenal and Tottenham Hotspur reportedly weigh up a move for one of Jürgen Klopp's stars."
  })

  blog.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  })
})
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yayner teaches React', snippet: 'lorem ispsum dolor sit amet consectelur'},
    {title: 'Mario balatoli signs for mancity', snippet: 'lorem ispsum dolor sit amet consectelur'},
    {title: 'lorem ispsum dolor sit amet consectelur', snippet: 'lorem ispsum dolor sit amet consectelur'},
  ]
  res.render('index', {title: 'Home', blogs})
})

app.get('/about', (req, res) => {
  res.render('about', {title: "About"})
})

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: "Create blog"})
})

// app.get('/about-us', (req, res) => {
//   res.redirect('/about')
// })

//404 page
app.use((req, res) => {
  res.status(404).render('404', {title: "404"})
})