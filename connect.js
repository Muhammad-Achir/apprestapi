var mysql = require('mysql');

//make koneksi database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbrestapi',
    port: 8111
});

conn.connect((err) => {
    if (err) throw err
    console.log('Mysql connected')
})

module.exports = conn;