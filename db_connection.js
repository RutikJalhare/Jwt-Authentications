
NODEPORT=5000

HOST= 'localhost'
DB_USER= 'root'
DB_PASS= ''
DB= 'jwtauthetication',
DB_PORT=3307




require('dotenv').config();
const  mysql = require('mysql');
var conn = mysql.createConnection({
      host: process.env.HOST,
      user:process.env.DB_USER, 
      password: process.env.DB_PASS,
      database: process.env.DB,
      port:process.env.DB_PORT
    })
    conn.connect((err) => {
      if (err) {
        console.log(err)

      }
//console.log('Database connected') 
    })


    module.exports=conn ;