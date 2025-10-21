# 🚀 HTTPS 測試網站

這是一個簡單的靜態網站，專門用於測試 HTTPS 連接和 SSL 證書配置。

## 📋 特點

- ✅ **純靜態網站** - 沒有複雜的依賴
- 🔒 **HTTPS 測試** - 驗證 SSL 證書和安全連接
- 🎨 **現代設計** - 響應式界面和漸變背景
- 📊 **實時信息** - 顯示協議、主機名和端口信息
- 🛡️ **安全標頭** - 包含基本的安全配置

## 🛠️ 部署到 Coolify

### 1. 創建新應用程式
```
1. 登入 Coolify 控制台
2. 點擊 "New Application"
3. 選擇 "Docker Image" 或 "Git Repository"
```

### 2. 配置設定
```
應用程式名稱: https-test
域名: billyziiii.gofun.cloud
端口: 80
健康檢查: /
```

### 3. 部署選項

#### 選項 A: 使用 Git Repository
```
Repository URL: [您的 Git 倉庫 URL]
Branch: main
Build Pack: Dockerfile
Dockerfile Path: ./test-frontend/Dockerfile
```

#### 選項 B: 本地構建並推送
```bash
# 構建 Docker 映像
docker build -t https-test ./test-frontend

# 標記並推送到註冊表
docker tag https-test your-registry/https-test
docker push your-registry/https-test
```

## 🔧 本地測試

### 使用 Docker
```bash
# 構建映像
docker build -t https-test ./test-frontend

# 運行容器
docker run -p 8080:80 https-test

# 訪問 http://localhost:8080
```

### 直接打開文件
```bash
# 在瀏覽器中打開
open index.html
```

## 📊 測試項目

這個網站會測試以下項目：

- ✅ **HTTPS 協議** - 確認使用 HTTPS 連接
- ✅ **SSL 證書** - 驗證 Cloudflare SSL 證書
- ✅ **DNS 解析** - 確認域名正確解析
- ✅ **靜態資源** - 測試 HTML、CSS、JS 載入
- ✅ **響應式設計** - 在不同設備上的顯示效果

## 🎯 預期結果

成功部署後，訪問 `https://billyziiii.gofun.cloud` 應該看到：

1. 🔒 瀏覽器地址欄顯示安全鎖圖標
2. ✅ 頁面顯示 "HTTPS 測試成功！"
3. 📊 正確的協議、主機名和端口信息
4. ⏰ 當前載入時間戳

## 🐛 故障排除

### 如果看到 404 錯誤
- 檢查 Coolify 應用程式是否正在運行
- 確認域名綁定配置正確
- 查看部署日誌中的錯誤信息

### 如果看到 SSL 錯誤
- 確認 Cloudflare SSL 模式設為 "Flexible"
- 檢查 DNS 記錄是否正確
- 等待 DNS 傳播完成（最多 24 小時）

### 如果應用程式無法啟動
- 檢查 Dockerfile 語法
- 確認所有文件都已正確上傳
- 查看容器日誌中的錯誤信息

## 📝 注意事項

- 這是一個測試網站，不包含任何敏感信息
- 所有配置都已簡化，避免複雜的環境變數
- 使用標準的 nginx:alpine 基礎映像，穩定可靠