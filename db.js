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
const exec = async (query, params) => {
  const connection = await pendingConnection
  console.log('QUERY' + query)
  console.log('executing', query)

  const result = await connection.execute(query, params)
  return result[0]
}

const readUsers = () => exec(`SELECT * FROM users`)

const readUser = params => {
  console.log('PARAMS ' + params)
  return exec(`SELECT * FROM users WHERE id=?`, [ params ])
}

const createUser = params => bcrypt.hash(params.password, saltRounds)
  .then(hash => {
    exec(`
    INSERT INTO users (firstName, lastName, email, password)
    VALUES (?, ?, ?, ?)`, [ params.firstName, params.lastName, params.email, hash ])
  })

const updateUser = (params, id) => bcrypt.hash(params.password, saltRounds)
  .then(hash => {
    console.log(params)
    exec(`
    UPDATE users SET firstName=?, lastName=?, email=?, password=? WHERE id=?`, [ params.firstName, params.lastName, params.email, hash, id ])
  })

const deleteUser = params => {
  return exec(`DELETE FROM users WHERE id=?`, [ params ])
}


// readUser(1)
//    .then(result => console.log(result))
//    .catch()

module.exports = {
  readUsers,
  readUser,
  createUser,
  updateUser,
  deleteUser
}


