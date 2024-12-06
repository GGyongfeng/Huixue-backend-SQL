require('module-alias/register');
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});
const app = require('./src/app');

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`管理端访问地址: http://localhost:${PORT}/manager`);
    console.log(`教师端访问地址: http://localhost:${PORT}/teacher`);
});



