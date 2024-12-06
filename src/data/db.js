require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '6688',
    database: process.env.DB_NAME || 'education_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 封装查询方法
async function query(sql, params) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('数据库查询错误:', error);
        throw error;
    }
}

module.exports = {
    pool,
    query
}; 