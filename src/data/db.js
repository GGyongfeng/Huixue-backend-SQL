require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'education_system',
    password: process.env.DB_PASSWORD || 'H3SP6PZNZaX7jmrS',
    database: process.env.DB_DATABASE || 'education_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 添加调试信息
console.log('Database Config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// 封装查询方法
async function query(sql, params) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('数据库查询错误:', error);
        console.error('SQL:', sql);
        console.error('Values:', params);
        throw error;
    }
}

module.exports = {
    pool,
    query
}; 