server{
    listen 80;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}