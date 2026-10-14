# MBSTU ICT Department Examination & Semester Bill Management System

**Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Tangail-1902, Bangladesh  
**Department:** Department of Information and Communication Technology (ICT)  
**Academic Level:** Undergraduate ICT Software Engineering Project (1.0 Credit)  
**Project Team Members:**
- **Md Tahmid Hasib Antor** (Lead Developer & Maintainer, ID: IT24055, Session: 2023–2024)
- **Saiba Khan** (Collaborator, GitHub: [@saibakhan1104-png](https://github.com/saibakhan1104-png))
- **Samiul** (Collaborator, ID: IT24011, GitHub: [@SAMIUL-01](https://github.com/SAMIUL-01))  
**Budget:** STRICTLY ZERO FINANCIAL COST (BDT 0.00)  
**Storage Architecture:** Client-Side `localStorage` with JSON Import/Export  

---

## 📌 Executive Summary

The **MBSTU ICT Department Examination & Semester Bill Management System** is a standalone, client-side academic financial management system engineered for the Department of Information and Communication Technology (ICT) at Mawlana Bhashani Science and Technology University (MBSTU).

It addresses the real-world operational challenge of tracking semester examinations, individual courses, internal course teachers, external examiners, examination committees, 14 statutory examination duties, remuneration calculations, accounts bill preparation, and actual payment disbursements.

### 🌟 Core Highlights
1. **Authentic MBSTU Ground Truth:** Directly reverse-engineered from genuine departmental examination distribution dossiers and real physical signed bill slips (`মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় - পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`).
2. **14 Official MBSTU Activity Rows:** Exactly models all 14 statutory duties printed on the university bill form (Question Setting, Moderation, Script Evaluation, Viva, Practical/Lab, Tabulation, Verification, Committee Allowance, Question Typing, Thesis, Seminars, Internships, Class Tests, Incidental Charges).
3. **Strict Financial Accounting Separation:** Firmly enforces the accounting separation between **Work Accrued $\implies$ Bill Prepared $\implies$ Chairman Approved $\implies$ Actually Paid $\implies$ Outstanding Due**. A bill is NEVER marked as paid merely because it was prepared or approved.
4. **Granular Teacher Financial Ledger:** Every course teacher has a real-time, interactive ledger displaying work, approvals, actual payments, and remaining balances broken down course-by-course and activity-by-activity.
5. **1:1 Official Printable Bill Slip:** Produces an exact replica of the official MBSTU 14-row printable bill slip with Bengali headers, 12-column matrix, signature lines, and ৳10 revenue stamp receipt block.
6. **Zero Cost & Zero Setup:** Runs 100% offline in any modern browser using plain HTML5, CSS3, and ES6 Vanilla JavaScript. No Node.js, npm, backend servers, or paid cloud databases required.

---

## 🚀 Quick Start Guide

### Step 1: Open the Application
Simply double-click on `index.html` or open it in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox).

### Step 2: Load Authentic MBSTU Demo Data
Click the **"Load MBSTU Demo Data"** button in the header toolbar to explore pre-seeded authentic academic records across 5 academic sessions (2020–2021 to 2024–2025).

---

## 📂 Project Directory Structure

```text
MBSTU_ICT_EXAM_BILL_SYSTEM/
├── index.html                           # Single-Page Application Master Interface
├── css/
│   └── style.css                        # Academic styling & A4 print stylesheet
├── js/
│   └── app.js                           # State controller, calculation engine & demo data
├── data/                                # Relational CSV datasets
│   ├── COURSE_MASTER.csv
│   ├── COURSE_TEACHER_ASSIGNMENTS.csv
│   └── TEACHER_MASTER.csv
├── docs/                                # Detailed technical specifications & guides
├── pdf_exports/                         # Authentic generated PDF artifacts
├── README.md                            # Main project overview & user guide
└── PROJECT_COMPLETION_SUMMARY.md        # Final deliverable verification report
```
