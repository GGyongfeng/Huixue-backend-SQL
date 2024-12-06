module.exports = {
  apps: [{
    name: 'huixue-backend',
    script: 'index.js',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 2,
    exec_mode: 'cluster',
    // ... 其他配置
  }]
} 