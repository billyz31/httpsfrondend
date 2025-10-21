# 簡單的 HTTPS 測試網站 Dockerfile
FROM nginx:alpine

# 複製 HTML 文件到 nginx 默認目錄
COPY index.html /usr/share/nginx/html/

# 創建簡單的 nginx 配置
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # 添加安全標頭 \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    \
    # 啟用 gzip 壓縮 \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json; \
}' > /etc/nginx/conf.d/default.conf

# 暴露端口 80
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]