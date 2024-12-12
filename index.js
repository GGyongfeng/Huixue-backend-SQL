require('module-alias/register');

// 明确指定环境变量文件路径
const path = require('path');
require('dotenv').config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`)
});

console.log('Current ENV:', process.env.NODE_ENV);
console.log('Loading config from:', path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`));

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}, in ${process.env.NODE_ENV || 'development'} mode`);
});



