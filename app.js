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
    title: "Sources: Man United close to agreeing deal with ex-Liverpool chief Michael Edwards after 'huge offer'",
    snippet: "Man United are confident of beating Chelsea to the appointment of former Liverpool transfer guru Michael Edwards, sources have told Football Insider.",
    body: "United are close to agreeing a deal with the 43-year-old and are willing to wait until next summer for him to join.The Premier League giants have made up their minds that Edwards is the right man to oversee their transfer business after so many expensive mistakes in the past and have submitted what is believe to be a “hugely attractive offer” to him."
  })

  blog.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  })
})

app.get('/all-blogs', (req, res) => {
  Blog.find().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  })

})

app.get('/single-blog', (req, res) => {
  
  Blog.findById('6357d8feeec21838ddd6ef24').then((result) => {
    res.send(result)
  }).catch(err => console.log(err))
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