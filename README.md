📘 Journal Suggestion Application

Frontend Module — Developed with Vite + React

<p align="center"> <img src="./public/logo.png" width="120" alt="App Logo" /> </p>
🔧 Tech Badges
<p align="center"> <img src="https://img.shields.io/badge/Vite-Frontend-blue" /> <img src="https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white" /> <img src="https://img.shields.io/badge/LocalStorage-Auth-orange" /> <img src="https://img.shields.io/badge/License-MIT-green" /> </p>

📝 Overview

The Journal Suggestion Application allows users to log in, upload journal data, download templates, and manage journal information. This version includes only the frontend implementation with localStorage-based authentication for a single user.

✨ Key Features

✔ Single user login using localStorage
✔ Journal file upload & template download
✔ Modern and responsive UI
✔ Error handling for invalid data
✔ Fast build with Vite
✔ React Router navigation management

🛠️ Installation & Setup
git clone <repo_url>
cd journal-frontend

npm install
npm run dev

Build for production:

npm run build

🔐 Authentication Flow

LocalStorage stores login state

No multi-user handling

Redirects automatically if already logged in
Example:

localStorage.setItem("user", "active");


Logout:

localStorage.removeItem("user");
🚀 Deployment on AWS EC2 + Nginx
1️⃣ Install Dependencies on Server
sudo apt update
sudo apt install nginx
sudo apt install nodejs npm -y

2️⃣ Upload Build Files
npm run build
scp -r dist/* ubuntu@server_ip:/var/www/html/

3️⃣ Configure Nginx
sudo nano /etc/nginx/sites-available/default


Set the config:

server {
    listen 80;
    root /var/www/html;
    index index.html;
    location / {
        try_files $uri /index.html;
    }
}


Enable and restart:

sudo systemctl restart nginx
sudo systemctl enable nginx


🌍 Now you can access your site using server IP in browser.

👨‍💻 Developer

Sai Krishna H
Frontend Developer | Vite + React
