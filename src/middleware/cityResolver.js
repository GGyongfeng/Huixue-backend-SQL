const { CITY_CODES } = require('../data/dbManager');

// 城市代码到名称的映射
const CITY_NAME_MAP = {
    'tj': '天津',
    'bj': '北京',
    'sh': '上海',
    'xa': '西安',
    'nj': '南京',
    'wh': '武汉'
};

function cityResolver(req, res, next) {
    let city = req.headers['x-city'];  // 从请求头获取

    // 如果请求头中没有城市信息，尝试从查询参数获取
    if (!city) {
        city = req.query.city;
    }

    // 如果是城市代码，转换为城市名称
    if (CITY_NAME_MAP[city]) {
        city = CITY_NAME_MAP[city];
    }

    // 如果都没有或无效，使用默认城市
    if (!city || !CITY_CODES[city]) {
        city = '天津';  // 默认城市
    }
    
    req.city = city;  // 添加到请求对象
    next();
}

module.exports = cityResolver; 