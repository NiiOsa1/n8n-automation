# 🌐 NGINX Deployment Notes

This folder contains NGINX reverse proxy configurations for:

- **n8n** → served at `https://n8n.niiosalabs.com`
- **PocketBase** → served at `https://pb.niiosalabs.com`

## 🔁 Restore Configs on New Server

```bash
sudo cp deploy/nginx-n8n.conf /etc/nginx/sites-available/n8n
sudo cp deploy/nginx-pocketbase.conf /etc/nginx/sites-available/pb.niiosalabs.com

sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/pb.niiosalabs.com /etc/nginx/sites-enabled/

sudo nginx -t && sudo systemctl reload nginx

🔒 TLS Setup (Let's Encrypt)

Make sure Certbot is installed and run:

sudo certbot --nginx -d n8n.niiosalabs.com -d pb.niiosalabs.com


