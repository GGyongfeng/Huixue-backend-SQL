# 🎓 HuiXueJiaoPei - 汇学家教管理系统（backend）

## 📋 一、项目介绍

这是一个为知名教培机构定制的综合管理展示系统，包含：
- 员工管理端：订单管理、教师管理、数据统计等（前端部分）
- 教师展示端：订单浏览、接单管理等（前端部分）
- 后端服务：RESTful API、数据处理、权限控制（后端部分）
- 数据库设计：关系型数据库设计与优化（数据库）

本人作为项目的**全栈开发者**，负责整个项目的设计与实现。

## 🔧 二、技术栈

前端
- Vue 3 (26.0%)
- TypeScript (9.4%)
- HTML (42.2%)
- SCSS/CSS (19.1%)
- JavaScript (3.3%)

构建工具
- Vite
- pnpm（包管理）

后端
- Node.js
- Express
- MySQL
- RESTful API

项目规范
- 代码风格：ESLint + Prettier
- 提交规范：Conventional Commits
- API 文档：Swagger/OpenAPI
- 错误处理：统一错误处理中间件
- 数据验证：类型检查与参数验证

## 🎯 三、主要功能

1. 订单管理
   - 订单创建、更新、删除
   - 状态管理（成交/未成交）
   - 高级搜索与筛选

2. 用户系统
   - 角色权限控制
   - 员工管理
   - 教师管理

3. 数据统计
   - 订单统计
   - 业绩分析
   - 数据可视化

## 📁 四、项目结构

```
HuiXueJiaoPei/
├── backend/           # 后端代码
│ ├── constants/       # 常量定义
│ ├── middleware/      # 中间件
│ ├── models/         # 数据模型
│ ├── routes/         # 路由控制
│ ├── types/          # 类型定义
│ └── utils/          # 工具函数
├── front-teacher/     # 教师端前端
├── front-manager/     # 管理端前端
└── index.html         # 入口文件
```

## 📜 五、开源协议

本项目采用 [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh) 协议。

您可以自由地：
- 分享 — 在任何媒介以任何形式复制、发行本作品

但必须遵守以下条件：
- 署名 — 您必须给出适当的署名，提供指向本许可协议的链接
- 非商业性使用 — 您不得将本作品用于商业目的
- 禁止演绎 — 如果您混合、转换、或者基于本作品进行创作，您不能分发修改后的作品

© 2024 古永丰。保留所有权利。

## 👨‍💻 六、作者信息

- 作者：古永丰
- 联系方式：15369998659
- GitHub：[https://github.com/GGyongfeng](https://github.com/guyongfeng)
- 📮邮箱：yonggenggu@tju.edu.cn

## 🙏 七、鸣谢

本项目管理端前端框架参考了优秀的开源项目：

### [Art Design Pro](https://github.com/Daymychen/art-design-pro)

一个基于 Vue3、TypeScript、Vite 和 Element-Plus 精心打造的后台管理系统模板：

- 优雅的界面设计
- 完善的技术栈：Vue3 + TypeScript + Vite
- 丰富的组件库：基于 Element-Plus
- 专注于用户体验和视觉设计
- 提供多种实用功能和组件

感谢以上开源项目对本项目开发的启发和帮助。