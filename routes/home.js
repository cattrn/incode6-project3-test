const express = require('express')
const router = express.Router()

// Welcome
router.get('/', (req, res) => {
  res.render('pages/home')
})

module.exports = router