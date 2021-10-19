const express = require('express')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const db = require('./database')
const data = require('./data')
const app = express() // invoke express in order to create an instance

const PORT = process.env.PORT || 3000

// JSON and form parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use(morgan('dev'))

// Set view engine
app.set('view engine', 'ejs')

// Set static folder
app.use(express.static('public'))

// ROUTES
// Welcome
app.get('/', (req, res) => {
  res.render('pages/home')
})

// Get all posts
app.get('/posts', (req, res) => {

  db.any('SELECT * FROM posts;')
  .then((posts) => {
    console.log(posts)

    res.render('pages/posts', {
      posts,
      message: req.query.message
    })
  })
  .catch((error) => {
    console.log(error)
    res.redirect("/error?message=" + error.message)
  })
})

// Display form for adding a new post
app.get('/posts/add', (req, res) => {
  res.render('pages/new-post')
})

// Create new post
app.post('/posts', (req, res) => {
  const {username, title, body} = req.body
  // TODO: Validate data

  // Add post to db
  db.none('INSERT INTO posts (username, title, body) VALUES ($1, $2, $3);', [username, title, body])
  .then(() => {
    // success, what do we do want to do?
    res.redirect('/posts?message=Post+successfully+added')
  })
  .catch((error) => {
    console.log(error)
    res.redirect("/error?message=" + error.message)
  })
})

app.get("*", (req, res) => {
  res.render('pages/error', {
    message: req.query.message || "This page cannot be found"
  })
})



// CRUD -          Create, Read, Update,    Delete
// HTTP METHODS  - post,   get,  put/patch, delete


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})