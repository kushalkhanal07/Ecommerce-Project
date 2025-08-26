
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     // your host
  user: 'root',          // your MySQL username
  password: ''   // your MySQL password
});

// Create database
connection.query(`CREATE DATABASE IF NOT EXISTS shoe_commerce`, (err, results) => {
  if (err) {
    console.error('Error creating database:', err);
    return;
  }
  console.log('Database created or already exists');
});

connection.end();