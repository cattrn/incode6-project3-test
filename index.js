const express = require('express')
const app = express() // invoke express in order to create an instance

const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})