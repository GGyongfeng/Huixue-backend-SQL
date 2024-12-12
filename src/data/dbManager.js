const mysql = require('mysql2/promise');

// 城市代码映射
const CITY_CODES = {
    '天津': 'tj',
    '北京': 'bj',
    '上海': 'sh',
    '西安': 'xa',
    '南京': 'nj',
    '武汉': 'wh'
};

// 反向映射：城市代码到城市名
const CODE_TO_CITY = Object.entries(CITY_CODES).reduce((acc, [city, code]) => {
    acc[code] = city;
    return acc;
}, {});

// 数据库连接池映射 - 使用城市代码作为键
const pools = {
    'tj': mysql.createPool({
        host: process.env.TJ_DB_HOST || 'localhost',
        user: process.env.TJ_DB_USER || 'education_system',
        password: process.env.TJ_DB_PASSWORD || 'Huixue@6688',
        database: process.env.TJ_DB_DATABASE || 'tj_education_system',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }),
    'bj': mysql.createPool({
        host: process.env.BJ_DB_HOST || 'localhost',
        user: process.env.BJ_DB_USER || 'education_system',
        password: process.env.BJ_DB_PASSWORD || 'Huixue@6688',
        database: process.env.BJ_DB_DATABASE || 'bj_education_system',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }),
    'sh': mysql.createPool({
        host: process.env.SH_DB_HOST || 'localhost',
        user: process.env.SH_DB_USER || 'education_system',
        password: process.env.SH_DB_PASSWORD || 'Huixue@6688',
        database: process.env.SH_DB_DATABASE || 'sh_education_system',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }),
    'xa': mysql.createPool({
        host: process.env.XA_DB_HOST || 'localhost',
        user: process.env.XA_DB_USER || 'education_system',
        password: process.env.XA_DB_PASSWORD || 'Huixue@6688',
        database: process.env.XA_DB_DATABASE || 'xa_education_system',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }),
    'nj': mysql.createPool({
        host: process.env.NJ_DB_HOST || 'localhost',
        user: process.env.NJ_DB_USER || 'education_system',
        password: process.env.NJ_DB_PASSWORD || 'Huixue@6688',
        database: process.env.NJ_DB_DATABASE || 'nj_education_system',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }),
    'wh': mysql.createPool({
        host: process.env.WH_DB_HOST || 'localhost',
        user: process.env.WH_DB_USER || 'education_system',
        password: process.env.WH_DB_PASSWORD || 'Huixue@6688',
        database: process.env.WH_DB_DATABASE || 'wh_education_system',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
};

// 执行查询
async function query(city, sql, params) {
    // 如果传入的是城市名，转换为城市代码
    const cityCode = CITY_CODES[city] || city;
    const pool = pools[cityCode];
    
    if (!pool) {
        throw new Error(`未找到城市 ${city}(${cityCode}) 的数据库配置`);
    }
    
    const [rows] = await pool.execute(sql, params);
    return rows;
}

// 获取数据库连接
async function getConnection(city) {
    const cityCode = CITY_CODES[city] || city;
    const pool = pools[cityCode];
    
    if (!pool) {
        throw new Error(`未找到城市 ${city}(${cityCode}) 的数据库配置`);
    }
    
    return await pool.getConnection();
}

module.exports = {
    query,
    getConnection,
    CITY_CODES,
    CODE_TO_CITY
}; 