# ⚡ Journal Suggestion Application

<!-- <p align="center">
  <img src="./public/backend_logo.png" width="120" alt="Backend Logo" />
</p> -->

<p align="center">
  <img src="https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F3xdgj7v9vhogcr37ar7b.png" />
  <img src="https://img.shields.io/badge/PostgreSQL-AWS%20RDS-316192?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/VectorDB-ChromaDB-purple" />
  <img src="https://img.shields.io/badge/Deployed-AWS%20EC2-orange" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

A **modular**, **scalable** FastAPI backend for:
✔ Journal Management  
✔ Excel Uploads & Updates  
✔ Similarity-based Recommendations using **ChromaDB RAG Service**

---

## 🚀 Core Features

### 📤 Excel Uploads (Bulk Insert)
Supports `.xlsx` uploads:
- Journal Data Insert  
- Associate Data Insert  
- Auto clean Excel issues (NaN, NaT, Excel errors)

### 🔄 Excel Update Logic
- Match by `_id`  
- Updates if record exists  
- Inserts if missing  
➡ Works for both **Journal** and **Associate** tables

### 🔎 Smart Search + Vector Recommendations
The RAG Service handles:
- Vector Search  
- Similarity Score  
Backend enriches:
- SQL Metadata + Vector Score

📌 Ensures **accurate + enriched** results

---

## 🧠 System Architecture

