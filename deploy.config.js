module.exports = {
  // 需要复制到部署目录的文件
  files: [
    'package.json',
    'index.js',
    'src/**/*',
    '.env.production',
    '.npmrc',
    'ecosystem.config.js',
    'start.sh'
  ],
  // 排除的文件
  exclude: [
    'node_modules',
    '*.log',
    'src/**/*.test.js',
    'src/**/*.spec.js'
  ]
} 