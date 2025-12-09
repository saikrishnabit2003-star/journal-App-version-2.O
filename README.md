<p align="center">
  <img src="https://github.com/saikrishnabit2003-star/journal-App/blob/e3d863bc90ef231ca288caa99fced005481f7908/Screenshot%202025-12-09%20135423.png?raw=true" width="800" alt="Journal App Screenshot" />
</p>

# ⚡ Journal Suggestion Application

<!-- <p align="center">
  <img src="./public/backend_logo.png" width="120" alt="Backend Logo" />
</p> -->

<p align="center">
  <img src="https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/HTML5-Markup-E34F26?logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-Styling-1572B6?logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Data-Fetch%20API-blue" />
  <img src="https://img.shields.io/badge/Auth-LocalStorage-lightgrey" />
</p>

### 📝Overview :
- The Journal Suggestion Application allows users to log in, upload journal data, download templates, and manage journal information. This version includes only the frontend implementation with localStorage-based authentication for a single user.
---

### ✨ Key Features

-  Single user login using LocalStorage  
-  Journal file upload & template download  
-  Modern and responsive UI  
-  Error handling for invalid data  
-  Fast build with Vite  
-  React Router navigation management  
---

### 🛠️ Installation & Setup

```git clone <repo_url>
cd journal-frontend

npm install
npm run dev
```
---
### 🔐 Authentication Flow

- LocalStorage stores login state
- No multi-user handling (single user default login)
- Auto redirect if user already logged in

### Login Example
```js
localStorage.setItem("user", "active");```

```
### Logout:
```
localStorage.removeItem("user");
