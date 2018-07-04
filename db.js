const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

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

const readUserEmail = params => {
  console.log('PARAMS ' + params)
  return exec(`SELECT * FROM users WHERE email=?`, [ params ])
}

const readUserToken = params => {
  console.log('PARAMS ' + params)
  return exec(`SELECT * FROM users WHERE token=?`, [ params ])
}

const createUser = (params, token) => {
  const randomPass = Math.random().toString(36).slice(-8)
  const status = false
  bcrypt.hash(randomPass, saltRounds)
  .then(hash => {
    exec(`
    INSERT INTO users (firstName, lastName, email, password, status)
    VALUES (?, ?, ?, ?, ?)`, [ params.firstName, params.lastName, params.email, hash, status ])
  })
}

const updateUser = (params, id) => {
  const status = true
  bcrypt.hash(params.password, saltRounds)
  .then(hash => {
    console.log(params)
    exec(`
    UPDATE users SET firstName=?, lastName=?, email=?, password=?, status=? WHERE id=?`, [ params.firstName, params.lastName, params.email, hash, status, id ])
  })
}

const updateUserToken = ( token, params) => {
  return exec(`UPDATE users SET token=? WHERE email=?`, [ token, params ])
}

const updatePassword = (params) => {
  bcrypt.hash(params.password, saltRounds)
  .then(hash => {
    console.log(params)
    exec(`
    UPDATE users SET password=?, token='0' WHERE email=?`, [ hash, params.email ])
  })
}

const deleteUser = params => {
  return exec(`DELETE FROM users WHERE id=?`, [ params ])
}


// readUser(1)
//    .then(result => console.log(result))
//    .catch()

module.exports = {
  readUsers,
  readUser,
  readUserEmail,
  readUserToken,
  createUser,
  updateUser,
  updatePassword,
  updateUserToken,
  deleteUser
}

