// Loading and initialising the library - options would go in the empty brackets if we had any
const pgp = require('pg-promise')()

// Connection string
const cn = 'postgres://caterinaturnbull:12345678@localhost:5432/incode6_test'

// Create a new database instance
const db = pgp(cn)

module.exports = db