#!/bin/bash
sudo apt install nginx -y;
sudo ufw enable;
sudo ufw allow 'Nginx HTTP';
sudo ufw allow ssh;
sudo ufw status;
sudo systemctl enable nginx;
sudo systemctl start nginx;
sudo cp ./proxy.com /etc/nginx/sites-available/;
sudo ln -s /etc/nginx/sites-available/proxy.com /etc/nginx/sites-enabled/;
sudo sed -i 's/# server_names_hash_bucket_size 64/server_names_hash_bucket_size 64/g' /etc/nginx/nginx.conf;
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t;
sudo systemctl restart nginx;