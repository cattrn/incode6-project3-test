const express = require('express')
const db = require('../database')
const router = express.Router()

// Get all posts
router.get('/', (req, res) => {

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
router.get('/add', (req, res) => {
  res.render('pages/new-post')
})

// Create new post
router.post('/', (req, res) => {
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


module.exports = router