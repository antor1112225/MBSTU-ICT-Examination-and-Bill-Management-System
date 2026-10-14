# MBSTU ICT Department Examination & Semester Bill Management System

**Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Tangail-1902, Bangladesh  
**Department:** Department of Information and Communication Technology (ICT)  
**Academic Level:** Undergraduate ICT Software Engineering Project (1.0 Credit)  
**Project Team Members:**
- **Md Tahmid Hasib Antor** (Lead Developer & Maintainer, ID: IT24055, Session: 2023–2024)
- **Saiba Khan** (Collaborator, ID: IT24006 GitHub: [@saibakhan1104-png](https://github.com/saibakhan1104-png))
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
Simply double-click on `index.html` or open it in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox):
```text
file:///C:/Users/Antor/.gemini/antigravity/scratch/MBSTU_ICT_EXAM_BILL_SYSTEM/index.html
```

### Step 2: Load Authentic MBSTU Demo Data
Click the **"Load MBSTU Demo Data"** button in the header toolbar. The system immediately populates:
- 4 full semesters from the MBSTU ICT Department.
- 11 faculty members (including external examiners from RUET, DUET, and BDU).
- Genuine course assignments (Theory and Lab).
- Real examination activities reflecting the photographed bill slips (e.g. Dr. Mst. Nargis Aktar's ৳55,600 bill and Mr. Rakib Hossen's ৳10,980 bill).
- Realistic accounts payment vouchers and outstanding balances.

---

## 📂 Project Directory Structure

```text
MBSTU_ICT_EXAM_BILL_SYSTEM/
├── index.html                           # Single-Page Application Master Interface
├── css/
│   └── style.css                        # Academic styling & A4 print stylesheet
├── js/
│   └── app.js                           # State controller, calculation engine & demo data
├── docs/
│   ├── DEMO_ANALYSIS_AND_REQUIREMENTS.md   # Analysis of scanned dossier & real bill slips
│   ├── OFFICIAL_RESEARCH_AND_SOURCES.md     # UGC, NBR & MBSTU regulatory framework
│   ├── DATABASE_OR_DATA_MODEL.md            # Normalized client-side relational schema
│   ├── BILL_CALCULATION_RULES.md            # Formulas for all 14 statutory activities
│   ├── TEACHER_EARNINGS_AND_PAYMENT_WORKFLOW.md # Financial state machine & ledger
│   ├── PROJECT_PROPOSAL.md                  # Formal 1-credit undergraduate proposal
│   ├── PROJECT_REPORT.md                    # Comprehensive engineering report
│   ├── USER_GUIDE.md                        # Beginner-friendly guide in Bangla
│   ├── TEST_CASES.md                        # 20 rigorous functional & financial test cases
│   ├── VIVA_QUESTIONS.md                    # 20 viva defense questions (English + Bangla)
│   └── KNOWN_LIMITATIONS.md                 # Technical & operational boundaries
├── README.md                            # Main project overview & user guide
└── PROJECT_COMPLETION_SUMMARY.md        # Final deliverable verification report
```

---

## 📊 Summary of the 14 Official MBSTU Billing Rates

| SL | Activity Name (বাংলা) | Activity Description | Default Unit Rate (BDT / ৳) | Calculation Basis |
|:--:|---|---|:---:|---|
| **01** | প্রশ্নপত্র প্রণয়ন | Question Paper Setting | ৳4,000.00 | Per full 3.00 Cr paper (৳2,000 half) |
| **02** | প্রশ্নপত্র সমীক্ষণ | Question Moderation | ৳2,000.00 | Per member session honorarium |
| **03** | উত্তর পত্র মূল্যায়ন | Script Evaluation | ৳120.00 | Per script (Min threshold ৳500) |
| **04** | মৌখিক পরীক্ষা / কম্প্রেহেনসিভ | Viva-Voce / Oral Exam | ৳120.00 | Per examined candidate |
| **05** | ব্যবহারিক / ল্যাব / সেশনাল | Practical / Lab Exam | ৳100.00 | Per examinee in practical lab |
| **06** | ট্যাবুলেশন | Results Tabulation | ৳75.00 | Per examinee (Regular + BL + Special) |
| **07** | কম্প্রেহেনসিভ ট্যাবুলেশন | Comprehensive Verification | ৳50.00 | Per verified candidate |
| **08** | সভাপতি / সদস্যর ভাতা | Committee Allowance | ৳2,250.00 | Fixed Chairman honorarium |
| **09** | প্রশ্নপত্র লিখন ও যাচাই | Question Typing & Check | ৳200.00 | Per approved typed question |
| **10** | থিসিস / রিসার্চ প্রজেক্ট | Thesis / Project Evaluation | ৳1,500.00 | Per student project report |
| **11** | স্পেশাল টপিক সেমিনার | Seminar / Term Paper / Training | ৳250.00 | Per evaluated candidate |
| **12** | ইন্টার্নশিপ / প্রেজেন্টেশন | Internship / Monograph | ৳500.00 | Per candidate presentation |
| **13** | ক্লাস টেস্ট | Class Test Assessment | Configurable | Dynamic formula / departmental rate |
| **14** | ইনসিডেন্টাল চার্জ | Incidental Expenses | Actual | Attached voucher receipt |

---

## 🔒 Data Protection and Backup Protocol

Because the application uses browser `localStorage`:
- Click **"Backup JSON"** in the top navigation bar to download a timestamped copy of your entire database.
- Move or restore your data to any other device via the **"Backup & Restore"** tab.
- Export accounting reports to CSV for spreadsheet verification.
