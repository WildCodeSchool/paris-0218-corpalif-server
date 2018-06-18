const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// connection database with a promise
const pendingConnection = mysql.createConnection({
  user: 'server',
  host: 'localhost',
  database: 'corpalif',
  password: 'mysql',
  namedPlaceholders: true
})


// function to execute query
const exec = async (query) => {
  const connection = await pendingConnection
  console.log('QUERY' + query)
  console.log('executing', query)
  const result = await connection.execute(query)
  return result[0]
}

const readUsers = () => exec(`SELECT * FROM users`)
const readUser = params => exec(`SELECT * FROM users WHERE id = ? `, [params.id])
const createUser = params => bcrypt.hash(params.password, saltRounds)
.then(function(hash) {
  exec(`
  INSERT INTO users (firstName, lastName, email, password)
  VALUES (?, ?, ?, ?)`, [ params.firstName, params.lastName, params.email, hash ])
})
const updateUser = params => bcrypt.hash(params.password, saltRounds)
.then(function(hash) {
  exec(`
  UPDATE users SET firstName=?, lastName=?, email=?, password=? WHERE id=?`, [ params.firstName, params.lastName, params.email, hash, params.id ])
})
const deleteUser = params => exec(`DELETE FROM users WHERE id=?`, [ params.id ])


// read()
//    .then(result => console.log(result))
//    .catch()

module.exports = {
  readUsers,
  readUser,
  createUser,
  updateUser,
  deleteUser
}


