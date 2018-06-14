const mysql = require('mysql2/promise')

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

//read = () => exec(`SELECT * FROM users`)

// read()
//    .then(result => console.log(result))
//    .catch()

