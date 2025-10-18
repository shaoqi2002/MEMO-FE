# Memoria Frontend

Vue3 笔记管理应用

## 功能特性

- 📝 添加新笔记
- 📋 查看所有笔记
- 🔄 刷新笔记列表
- 📱 响应式设计，兼容 PC 和移动端
- ⏰ 按时间降序排列

## 技术栈

- Vue 3
- Vite
- Axios

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## API 接口

- **GET** `https://memo-be.up.railway.app/api/getnotes` - 获取所有笔记
- **POST** `https://memo-be.up.railway.app/api/postnote` - 添加新笔记

## 项目结构

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── api/
│   │   └── noteService.js
│   └── components/
│       └── NoteCard.vue
```
