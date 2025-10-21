# 超簡單的 HTTPS 測試網站 Dockerfile
# Coolify 會處理反向代理和 HTTPS，我們只需要提供靜態文件
FROM python:3.11-alpine

# 設置工作目錄
WORKDIR /app

# 複製 HTML 文件
COPY index.html .

# 暴露端口 8000
EXPOSE 8000

# 使用 Python 內建的 HTTP 服務器提供靜態文件
CMD ["python", "-m", "http.server", "8000"]