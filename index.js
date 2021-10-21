const express = require('express')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
// const data = require('./data')
const homeRouter = require('./routes/home')
const postsRouter = require('./routes/posts')
const errorRouter = require('./routes/error')

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
app.use('/posts', postsRouter)
app.use('/', homeRouter)
app.use('*', errorRouter)



// CRUD -          Create, Read, Update,    Delete
// HTTP METHODS  - post,   get,  put/patch, delete


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})