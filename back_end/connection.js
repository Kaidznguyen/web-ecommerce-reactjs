const mysql = require('mysql');
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10120120',
    database: 'dshop',
    insecureAuth: true 
})

connection.connect((err) => {
    if (!err) {
        console.log('Kết nối thành công');
    } else {
        console.error('Kết Nối Thất Bại:', err);
    }
});

module.exports = connection;