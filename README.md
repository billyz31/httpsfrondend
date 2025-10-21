# 全端測試網站

一個使用 React 和 Node.js 構建的現代化全端 Web 應用程序，專為 Coolify 部署平台優化。

## 🚀 技術棧

### 前端
- **React 18** - 現代化的用戶界面框架
- **Styled Components** - CSS-in-JS 樣式解決方案
- **React Router** - 客戶端路由
- **Axios** - HTTP 客戶端
- **Serve** - 生產環境靜態文件服務器

### 後端
- **Node.js** - JavaScript 運行時
- **Express.js** - Web 應用框架
- **CORS** - 跨域資源共享
- **Helmet** - 安全中間件
- **Morgan** - HTTP 請求日誌記錄

### 部署
- **Docker** - 容器化
- **Docker Compose** - 多容器編排
- **Coolify** - 部署平台（內建 Traefik 反向代理）

## 📁 項目結構

```
newHttps/
├── backend/                 # Node.js API 服務
│   ├── server.js           # Express 服務器
│   ├── package.json        # 後端依賴
│   ├── .env               # 環境變量
│   ├── Dockerfile         # 生產環境容器配置
│   └── Dockerfile.dev     # 開發環境容器配置
├── frontend/               # React 前端應用
│   ├── src/               # 源代碼
│   │   ├── App.js         # 主應用組件
│   │   ├── components/    # 可重用組件
│   │   └── pages/         # 頁面組件
│   ├── public/            # 靜態資源
│   ├── package.json       # 前端依賴
│   ├── Dockerfile         # 生產環境容器配置
│   └── Dockerfile.dev     # 開發環境容器配置
├── docker-compose.yml      # 生產環境編排
├── docker-compose.dev.yml  # 開發環境編排
└── README.md              # 項目文檔
```

## 🌟 功能特性

- **響應式設計** - 適配各種設備屏幕
- **用戶管理** - 添加和查看用戶列表
- **系統統計** - 實時系統狀態監控
- **健康檢查** - 服務狀態監控
- **安全性** - 內建安全中間件
- **容器化** - 完整的 Docker 支持

## 🔧 Coolify 部署指南

### 前置要求
- Coolify 部署平台
- Git 倉庫（GitHub/GitLab/Bitbucket）

### 部署步驟

1. **創建新項目**
   - 在 Coolify 中創建新的 Docker Compose 項目
   - 連接您的 Git 倉庫

2. **配置環境變量**
   ```env
   # 後端環境變量
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=http://frontend:3000
   
   # 可選：數據庫配置（未來擴展）
   # DATABASE_URL=postgresql://user:password@host:port/database
   # JWT_SECRET=your-jwt-secret-key
   ```

3. **Docker Compose 配置**
   - Coolify 會自動使用項目根目錄的 `docker-compose.yml`
   - 確保服務使用 `expose` 而非 `ports`（Traefik 會處理路由）

4. **域名配置**
   - 在 Coolify 中配置您的域名
   - Traefik 會自動處理 SSL 證書和反向代理

5. **部署**
   - 推送代碼到 Git 倉庫
   - Coolify 會自動觸發部署

### 服務端點

部署完成後，您的應用將在以下端點可用：

- **前端**: `https://your-domain.com`
- **後端 API**: `https://your-domain.com/api`
  - `GET /api/health` - 健康檢查
  - `GET /api/users` - 獲取用戶列表
  - `POST /api/users` - 添加新用戶
  - `GET /api/stats` - 系統統計

## 🛠️ 本地開發

### 開發環境設置

1. **克隆倉庫**
   ```bash
   git clone <your-repo-url>
   cd newHttps
   ```

2. **使用 Docker Compose 開發**
   ```bash
   # 開發模式（支持熱重載）
   docker-compose -f docker-compose.dev.yml up --build
   
   # 生產模式
   docker-compose up --build
   ```

3. **訪問應用**
   - 前端: http://localhost:3000
   - 後端 API: http://localhost:3001

### 手動安裝（可選）

**後端設置**
```bash
cd backend
npm install
npm run dev
```

**前端設置**
```bash
cd frontend
npm install
npm start
```

## 🔒 安全特性

- **Helmet.js** - 設置各種 HTTP 頭部以增強安全性
- **CORS** - 配置跨域資源共享
- **非 root 用戶** - Docker 容器使用非特權用戶運行
- **環境變量** - 敏感配置通過環境變量管理

## 📊 監控和日誌

- **健康檢查** - 內建的容器健康檢查
- **請求日誌** - Morgan 中間件記錄 HTTP 請求
- **錯誤處理** - 統一的錯誤處理機制

## 🚀 擴展功能

項目已為以下功能預留接口：

- **數據庫集成** - PostgreSQL/MySQL 支持
- **用戶認證** - JWT 令牌認證
- **文件上傳** - 多媒體文件處理
- **實時通信** - WebSocket 支持

## 📝 API 文檔

### 健康檢查
```http
GET /api/health
```
返回服務狀態和系統信息。

### 用戶管理
```http
GET /api/users
```
獲取所有用戶列表。

```http
POST /api/users
Content-Type: application/json

{
  "name": "用戶名",
  "email": "user@example.com"
}
```
添加新用戶。

### 系統統計
```http
GET /api/stats
```
獲取系統運行統計信息。

## 🤝 貢獻指南

1. Fork 項目
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 許可證

本項目採用 MIT 許可證 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 🆘 故障排除

### 常見問題

**Q: 容器無法啟動**
A: 檢查 Docker 是否正在運行，並確保端口未被占用。

**Q: API 請求失敗**
A: 確認後端服務正在運行，檢查網絡配置和 CORS 設置。

**Q: 前端無法連接後端**
A: 檢查 `proxy` 配置和環境變量設置。

### 日誌查看

```bash
# 查看所有服務日誌
docker-compose logs

# 查看特定服務日誌
docker-compose logs backend
docker-compose logs frontend
```

## 📞 支持

如有問題或建議，請：
- 創建 GitHub Issue
- 聯繫項目維護者
- 查看項目文檔

---

**享受編碼！** 🎉