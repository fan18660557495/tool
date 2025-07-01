# 财务工具系统

基于React + TypeScript + Ant Design的财务工具后台管理系统，用于处理分摊和结转等财务业务。

## 项目特性

- ✨ **现代化技术栈**：React 18 + TypeScript + Ant Design
- 🎨 **精美UI设计**：基于Figma设计图实现，遵循现代设计规范
- 📱 **响应式布局**：支持多种屏幕尺寸，提供良好的移动端体验
- 🔧 **完整功能模块**：包含分摊管理、结转管理、账户管理等核心功能

## 功能模块

### 🏠 首页
- 系统概览和快速导航
- 数据统计展示

### 📊 分摊管理
- **分摊列表**：查看和管理所有分摊记录
- **分摊表单**：6步骤分摊流程
  - 填写分摊基础信息
  - 设置分摊科目
  - 计算分摊明细
  - 确定辅助默认值
  - 开始分摊
  - 分摊结果
- **分摊依据管理**：分摊依据列表和表单

### 🔄 结转管理
- **结转列表**：查看和管理所有结转记录
- **结转表单**：6步骤结转流程
  - 填写结转基础信息
  - 设置结转科目
  - 设置结转项目（多行表头设计）
  - 确定辅助默认值
  - 开始结转
  - 结转结果

### 👥 账户管理
- 用户账户信息管理
- 权限控制

### ⚙️ 系统管理
- 系统配置和参数设置

## 技术亮点

### 🎯 多行表头表格
- 实现复杂的多行表头结构
- 支持嵌套列配置
- 自定义表头样式

### 🌳 树形选择器
- 科目树形结构选择
- 辅助值分类选择
- 支持搜索和展开/收起

### 📦 弹窗组件系统
- **数据更新弹窗**：支持批量数据更新
- **进度查看弹窗**：实时显示处理进度
- **下载弹窗**：文件下载管理

### 🔍 高级搜索
- 多条件筛选
- 实时搜索
- 搜索结果高亮

## 技术栈

- **前端框架**：React 18.2.0
- **开发语言**：TypeScript 4.9.5
- **UI组件库**：Ant Design 5.x
- **路由管理**：React Router Dom 6.x
- **日期处理**：Day.js
- **构建工具**：Create React App
- **样式方案**：CSS Modules

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

应用将在 http://localhost:3000 启动。

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 项目结构

```
src/
├── components/          # 通用组件
│   ├── Breadcrumb/     # 面包屑导航
│   ├── CommonTable/    # 通用表格
│   ├── DataProgressModal/  # 进度弹窗
│   ├── DataUpdateModal/    # 数据更新弹窗
│   ├── DownloadModal/      # 下载弹窗
│   └── Header/         # 页面头部
├── pages/              # 页面组件
│   ├── Home/           # 首页
│   ├── Login/          # 登录页
│   ├── AllocationList/ # 分摊列表
│   ├── AllocationForm/ # 分摊表单
│   ├── AllocationBasisList/  # 分摊依据列表
│   ├── AllocationBasisForm/  # 分摊依据表单
│   ├── TransferList/   # 结转列表
│   ├── TransferForm/   # 结转表单
│   ├── AccountManagement/    # 账户管理
│   └── SystemManagement/     # 系统管理
├── assets/             # 静态资源
└── index.css          # 全局样式
```

## 样式设计规范

### 🎨 设计系统
- **主色调**：#165DFF（品牌蓝）
- **辅助色**：#F2F3F5（背景灰）
- **文字色**：#1D2129（主文字）、#86909C（次要文字）
- **圆角**：统一使用 3px
- **字体**：PingFang SC

### 📏 组件尺寸规范
- **输入框**：高度 44px（大尺寸）、32px（紧凑尺寸）
- **按钮**：高度 44px（主要）、32px（次要）
- **表格行高**：40px（标准）、32px（紧凑）

## 开发规范

### 📝 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 组件使用函数式组件 + Hooks
- CSS 使用 Modules 避免样式冲突

### 🗂️ 文件命名
- 组件文件：PascalCase（如：`DataUpdateModal/index.tsx`）
- 样式文件：`index.module.css`
- 工具函数：camelCase

### 🔄 状态管理
- 使用 React Hooks（useState, useEffect等）
- 复杂状态使用 useReducer
- 全局状态考虑使用 Context API

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 更新日志

### v1.0.0 (2025-01-01)
- ✨ 完成分摊管理模块
- ✨ 完成结转管理模块（包含多行表头）
- ✨ 完成弹窗组件系统
- ✨ 完成响应式布局设计
- 🐛 修复样式兼容性问题
- 🎨 优化用户交互体验

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 Email: fan18660557495@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/fan18660557495/tool/issues)

---

**财务工具系统** - 让财务管理更高效 🚀 