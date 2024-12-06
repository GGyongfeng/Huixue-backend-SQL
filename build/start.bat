@echo off
echo 正在检查环境...

:: 检查 Node.js
node -v > nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 Node.js！
    echo 请访问 https://nodejs.org 下载并安装 Node.js
    pause
    exit /b 1
)
echo [√] Node.js 已安装

:: 检查 PNPM
pnpm -v > nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 PNPM！
    echo 正在尝试安装 PNPM...
    npm install -g pnpm
    if %errorlevel% neq 0 (
        echo [错误] PNPM 安装失败！
        pause
        exit /b 1
    )
)
echo [√] PNPM 已安装

:: 检查 PM2
pm2 -v > nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 PM2！
    echo 正在尝试安装 PM2...
    npm install -g pm2
    if %errorlevel% neq 0 (
        echo [错误] PM2 安装失败！
        pause
        exit /b 1
    )
)
echo [√] PM2 已安装

:: 检查目录结构
if not exist "index.js" (
    echo [错误] 未找到 index.js 文件！
    echo 请确保在正确的目录下运行此脚本
    pause
    exit /b 1
)

if not exist "ecosystem.config.js" (
    echo [错误] 未找到 ecosystem.config.js 文件！
    pause
    exit /b 1
)

echo [√] 目录检查通过
echo.

:: 创建日志目录
if not exist "logs" mkdir logs
echo [√] 日志目录已创建

echo 正在安装依赖...
call pnpm install --production
if %errorlevel% neq 0 (
    echo [错误] 依赖安装失败！
    pause
    exit /b 1
)
echo [√] 依赖安装完成

echo 正在配置自启动服务...
call pm2 delete huixue-backend 2>nul
call pm2 start ecosystem.config.js --env production
if %errorlevel% neq 0 (
    echo [错误] 服务启动失败！
    pause
    exit /b 1
)

call pm2 save
call pm2 startup

echo.
echo [√] 服务已成功启动！
echo.
echo 常用命令：
echo   pm2 logs          - 查看日志
echo   pm2 status        - 查看状态
echo   pm2 restart all   - 重启服务
echo   pm2 stop all      - 停止服务
echo.
echo 访问地址：
echo   管理端: http://49.232.239.149/manager
echo   教师端: http://49.232.239.149/teacher
echo.

pause 