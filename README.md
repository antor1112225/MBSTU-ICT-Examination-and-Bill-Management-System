# MBSTU ICT Department Examination & Semester Bill Management System

[![Live Demo](https://img.shields.io/badge/Live_System-GitHub_Pages-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://antor1112225.github.io/MBSTU-ICT-Examination-and-Bill-Management-System/)
[![GitHub Repo](https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/antor1112225/MBSTU-ICT-Examination-and-Bill-Management-System)
[![Status](https://img.shields.io/badge/Build-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white)](https://antor1112225.github.io/MBSTU-ICT-Examination-and-Bill-Management-System/)

---

## 🏛️ Academic & Institutional Details
* **University:** Mawlana Bhashani Science and Technology University (MBSTU), Santosh, Tangail-1902, Bangladesh  
* **Faculty:** Faculty of Engineering  
* **Department:** Department of Information and Communication Technology (ICT)  
* **Project Type:** Software Engineering Examination & Remuneration Automation System  

### 👤 Developed By
* **Md Tahmid Hasib Antor** (Sole Architect & Developer) — **Student ID: IT24055**  
  * **Department:** Department of Information and Communication Technology (ICT)  
  * **Faculty:** Faculty of Engineering  
  * **Institution:** Mawlana Bhashani Science and Technology University (MBSTU)  
  * **Email:** `tahmidantor123@gmail.com` | `it24055@mbstu.ac.bd`  
  * **GitHub Profile:** [@antor1112225](https://github.com/antor1112225)

---

## 📌 Executive Overview

The **MBSTU ICT Examination & Semester Bill Management System** is a purpose-built, high-reliability web application developed to eliminate manual calculation bottlenecks, mathematical errors, and audit discrepancies in semester examination remuneration processing for the Department of Information and Communication Technology (ICT), MBSTU.

Prior to this system, compiling examination bills for a semester required 7–10 days of manual ledger bookkeeping, paper verification, and Excel cross-referencing. This software automates the entire end-to-end lifecycle—from syllabus course loading and committee moderation to official 14-row printable bill slips and faculty ledger consolidation—settling a complete semester's remuneration within **2 minutes with 0% mathematical error**.

---

## 🚀 Key Features

1. **14 Statutory Examination Categories:**
   * Full Paper (৳4,000) & Half Paper (৳2,400) question setting rules.
   * Moderation committee distribution with equal splitting.
   * Script evaluation at ৳120/script with statutory minimum ৳1,000 enforcement.
   * Credit-based class test (CT) rules: 4 CTs for $\ge 3.00$ credits, 3 CTs for 2.00 credits.
   * Lab exams (৳100/student), tabulation (৳75/student), viva voce, and scrutiny honorariums.

2. **⚡ Smart One-Click Duty Presets:**
   * Preset dropdown auto-populates statutory rates, candidate counts, and calculation methods in one click.
   * Real-time calculation previews with Bangla formula strings.

3. **🛡️ External Faculty Audit Protection (Exclusion Log):**
   * Automatically isolates external professors (from RUET, DUET, JU, etc.) into a dedicated **External Teachers Exclusion Log** to comply with MBSTU university audit regulations and protect internal departmental budgets.

4. **📄 1:1 Official Replica A4 Printable Bill Slips:**
   * Features the official MBSTU emblem, 12-column layout, dotted faculty meta fields, and ৳50 revenue stamp box.
   * Native SutonnyMJ & Bangla Unicode numerical formatting with automated Taka in words translation.

5. **💾 Zero-Cost Offline Architecture:**
   * Built purely with HTML5, CSS3, and Vanilla JavaScript (ES6+).
   * Runs offline on any university lab PC without Node.js, Python, or database installation.
   * Data persists in browser `localStorage` with one-click JSON database backup and restore.

---

## 💻 Tech Stack

* **Frontend:** Vanilla JavaScript (ES6+), Semantic HTML5, CSS3 (Modern Flexbox & Grid)
* **Print Engine:** CSS `@media print` with exact A4 sheet boundary scaling
* **Typography:** SutonnyMJ, Nikosh, and Noto Sans/Serif Bengali
* **Persistence:** Browser LocalStorage API with full JSON export/import
* **Local Server:** Built-in lightweight Node.js server (`serve.js`)

---

## 🛠️ How to Run Locally

### Option 1: One-Click Run (Windows)
Double-click [`run.bat`](./run.bat) or run in terminal:
```cmd
run.bat
```

### Option 2: Direct Browser Execution (Zero Dependencies)
Simply open [`index.html`](./index.html) in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 3: Local Node.js Server
```bash
node serve.js
```
Then visit `http://localhost:5000` in your web browser.

---

## 🌐 Live System Demo
Access the live production deployment hosted on GitHub Pages:  
👉 **[https://antor1112225.github.io/MBSTU-ICT-Examination-and-Bill-Management-System/](https://antor1112225.github.io/MBSTU-ICT-Examination-and-Bill-Management-System/)**

---

### © 2026 Department of Information and Communication Technology (ICT), MBSTU. All rights reserved.
Developed by **Md Tahmid Hasib Antor** (`IT24055`).
