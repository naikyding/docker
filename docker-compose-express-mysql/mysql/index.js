const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'mysql_server',
  user: 'user',
  password: '1234',
  database: 'todo_list',
})

module.exports = db
