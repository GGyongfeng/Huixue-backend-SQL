#!/bin/bash

echo "正在检查环境..."

# 创建命令别名
echo "创建命令别名..."
# 添加环境变量到 .bashrc
echo "export PATH=$NPM_GLOBAL_BIN:\$PATH" >> ~/.bashrc
source ~/.bashrc

# 检查并安装 Node.js 和 npm
if ! command -v node &> /dev/null; then
    echo "[错误] 未安装 Node.js！"
    echo "正在安装 Node.js 和 npm..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs || {
        echo "[错误] Node.js 安装失败！"
        exit 1
    }
fi
echo "[√] Node.js 已安装"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "[错误] npm 未正确安装！"
    echo "请尝试重新安装 Node.js"
    exit 1
fi
echo "[√] npm 已安装"

# 检查 PNPM
# 获取 npm 全局安装目录
NPM_GLOBAL_DIR=$(npm root -g)
NPM_GLOBAL_BIN=${NPM_GLOBAL_DIR%/lib/node_modules}/bin

# 添加到 PATH
export PATH="$NPM_GLOBAL_BIN:$PATH"
hash -r  # 刷新命令哈希表

if ! command -v pnpm &> /dev/null; then
    echo "[错误] 未安装 PNPM！"
    echo "正在尝试安装 PNPM..."
    echo "设置 npm 淘宝镜像源..."
    sudo npm config set registry https://registry.npmmirror.com
    sudo npm install -g pnpm || {
        echo "[错误] PNPM 安装失败！"
        exit 1
    }
fi
echo "[√] PNPM 已安装"

# 检查 PM2
if ! command -v pm2 &> /dev/null; then
    echo "[错误] 未安装 PM2！"
    echo "正在尝试安装 PM2..."
    echo "设置 npm 淘宝镜像源..."
    sudo npm config set registry https://registry.npmmirror.com
    # 获取 npm 全局安装目录（如果还没有定义）
    if [ -z "$NPM_GLOBAL_DIR" ]; then
        NPM_GLOBAL_DIR=$(npm root -g)
        NPM_GLOBAL_BIN=${NPM_GLOBAL_DIR%/lib/node_modules}/bin
    fi
    sudo npm install -g pm2 || {
        echo "[错误] PM2 安装失败！"
        exit 1
    }
    # 添加 PM2 到 PATH
    export PATH="$NPM_GLOBAL_BIN:$PATH"
    hash -r  # 刷新命令哈希表
fi
echo "[√] PM2 已安装"

# 检查目录结构
if [ ! -f "index.js" ]; then
    echo "[错误] 未找到 index.js 文件！"
    echo "请确保在正确的目录下运行此脚本"
    exit 1
fi

if [ ! -f "ecosystem.config.js" ]; then
    echo "[错误] 未找到 ecosystem.config.js 文件！"
    exit 1
fi

echo "[√] 目录检查通过"
echo

# 创建日志目录
mkdir -p logs
echo "[√] 日志目录已创建"

echo "正在安装依赖..."
$NPM_GLOBAL_BIN/pnpm install --production || {
    echo "[错误] 依赖安装失败！"
    exit 1
}
echo "[√] 依赖安装完成"

echo "正在配置自启动服务..."
$NPM_GLOBAL_BIN/pm2 delete huixue-backend 2>/dev/null
$NPM_GLOBAL_BIN/pm2 start ecosystem.config.js --env production || {
    echo "[错误] 服务启动失败！"
    exit 1
}

$NPM_GLOBAL_BIN/pm2 save
$NPM_GLOBAL_BIN/pm2 startup

echo
echo "[√] 服务已成功启动！"
echo
echo "常用命令："
echo "  $NPM_GLOBAL_BIN/pm2 logs          - 查看日志"
echo "  $NPM_GLOBAL_BIN/pm2 status        - 查看状态"
echo "  $NPM_GLOBAL_BIN/pm2 restart all   - 重启服务"
echo "  $NPM_GLOBAL_BIN/pm2 stop all      - 停止服务"
echo
echo "访问地址："
echo "  管理端: http://49.232.239.149/manager"
echo "  教师端: http://49.232.239.149/teacher"
echo

# 配置 Nginx
echo "正在配置 Nginx..."
sudo apt-get update
sudo apt-get install -y nginx
sudo rm -f /etc/nginx/sites-enabled/default
sudo cp nginx.guyongfeng.conf /etc/nginx/sites-available/nginx.guyongfeng
sudo ln -sf /etc/nginx/sites-available/nginx.guyongfeng /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
echo "[√] Nginx 配置完成"