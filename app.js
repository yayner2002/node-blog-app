const express = require('express')
const path = require('path')
const morgan = require('morgan')

//express app
const app = express()

//register view engine and a views folder as default
app.set('view engine', 'ejs')

//to specify different folder like myviews instead of views
// app.set('views', 'myviews')

//listen for requests
app.listen(3000)



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