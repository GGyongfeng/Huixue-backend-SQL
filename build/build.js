const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { minify } = require('terser');
const { files, exclude } = require('../deploy.config.js');

// 创建构建目录
const BUILD_DIR = path.resolve(__dirname, '../dist');
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
}

// 生成启动脚本和配置文件
function generateDeployFiles() {
    // 生成 ecosystem.config.js
    const ecosystemContent = `module.exports = {
  apps: [{
    name: 'huixue-backend',
    script: 'index.js',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 2,
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_restarts: 10,
    restart_delay: 4000
  }]
}`;

    // 写入 ecosystem.config.js
    fs.writeFileSync(path.join(BUILD_DIR, 'ecosystem.config.js'), ecosystemContent);

    console.log('生成部署文件完成');
}

// 复制并压缩文件函数
async function copyAndMinifyFile(src, dest) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // 读取文件内容
    const content = fs.readFileSync(src, 'utf-8');
    
    // 如果是 JS 文件，进行压缩
    if (src.endsWith('.js')) {
        try {
            const minified = await minify(content, {
                compress: {
                    drop_console: true,  // 删除 console.* 调用
                    drop_debugger: true, // 删除 debugger 语句
                    pure_funcs: ['console.log', 'console.info', 'console.debug'], // 删除特定的函数调用
                },
                mangle: true,
                output: {
                    comments: false  // 删除所有注释
                }
            });
            fs.writeFileSync(dest, minified.code);
            console.log(`压缩并复制: ${src} -> ${dest}`);
        } catch (err) {
            console.error(`压缩失败: ${src}`, err);
            fs.copyFileSync(src, dest);
        }
    } else {
        // 非 JS 文件直接复制
        fs.copyFileSync(src, dest);
        console.log(`复制: ${src} -> ${dest}`);
    }
}

// 开始构建
console.log('开始构建...');

// 处理每个文件模式
async function build() {
    for (const pattern of files) {
        // 使用 glob 查找匹配的文件
        const matches = glob.sync(pattern, {
            cwd: path.resolve(__dirname, '..'),
            nodir: true,
            ignore: exclude
        });

        // 复制每个匹配的文件
        for (const file of matches) {
            const srcPath = path.resolve(__dirname, '..', file);
            const destPath = path.resolve(BUILD_DIR, file);
            await copyAndMinifyFile(srcPath, destPath);
        }
    }
    
    // 生成部署相关文件
    generateDeployFiles();
    
    console.log('构建完成！输出目录:', BUILD_DIR);
}

build().catch(err => {
    console.error('构建过程中发生错误:', err);
    process.exit(1);
}); 

// 读取原始 package.json
const pkg = require('../package.json');

// 修改为生产环境配置
const prodPkg = {
    ...pkg,
    scripts: {
        // 只保留生产相关的命令
        "start": "cross-env NODE_ENV=production node index.js"
    }
};

// 写入到 dist 目录
fs.writeFileSync(
    path.resolve(__dirname, '../dist/package.json'),
    JSON.stringify(prodPkg, null, 2)
); 