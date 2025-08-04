import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    rowsAsArray: true,
    dateStrings: ['DATE', 'DATETIME', 'TIMESTAMP']
    
})

export default pool;
