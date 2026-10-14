# MBSTU ICT Department Examination & Semester Bill Management System
## Demo Analysis and Requirements Specification

**Document File:** `docs/DEMO_ANALYSIS_AND_REQUIREMENTS.md`  
**Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Tangail-1902  
**Department:** Information and Communication Technology (ICT)  
**Academic Level:** Undergraduate ICT Software Engineering Project  
**Inspection Date:** October 2026  
**Status:** Verified Against Real Scanned Documents and Physical Bill Slips  

---

## 1. Executive Summary

This document presents a comprehensive, empirical analysis of the actual demonstration materials provided for the **MBSTU ICT Department Examination & Semester Bill Management System**. The materials consist of:
1. **An 11-page scanned official internal departmental examination distribution dossier** (`Scanned with CamScanner`), containing committee compositions, question paper setters, internal and external examiners, 3rd examiner assignments, tabulator assignments, and examinee statistics across four distinct semesters and academic sessions.
2. **Four (4) physical photographs of completed and signed official MBSTU examination remuneration bill slips** (`মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় - পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`) containing actual course codes, student counts, activity breakdowns, rates, calculations, revenue stamps, and official signature blocks.

Every data entity, calculation rule, column structure, and operational workflow in this system has been directly reverse-engineered from this authentic evidence.

---

## 2. Evidence Extracted from Physical Demonstration Files

### 2.1 The Official MBSTU Remuneration Bill Form (`পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`)
The physical bill form has an official 14-row standardized activity matrix. Each row corresponds to a specific statutory exam duty:

| SL (ক্রমিক) | Activity Name in Bengali (কাজের নাম) | English Activity Description | Typical Formula / Basis Observed | Observed Rates & Examples |
|---|---|---|---|---|
| **01** | প্রশ্নপত্র প্রণয়ন | Question Setting | Per full paper (3 Cr) or partial | ৳4,000/- (Full paper), ৳2,000/- (Half) |
| **02** | প্রশ্নপত্র সমীক্ষণ | Question Moderation | Per moderation session / committee share | ৳2,000/-, ৳4,700/- |
| **03** | উত্তর পত্র মূল্যায়ন | Answer Script Evaluation | Script Count × Rate per script | **৳120/- per script** (Min threshold ৳500–700) |
| **04** | মৌখিক পরীক্ষা / কম্প্রেহেনসিভ মৌখিক পরীক্ষা | Oral / Comprehensive Viva-Voce | Examinee Count × Rate / Day | ৳120/- per student or daily allowance |
| **05** | ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা | Practical / Lab / Sessional Exam | Student Count × Rate per student | **৳100/- per student** (e.g. 54 × 100 = ৳5,400) |
| **06** | ট্যাবুলেশন | Results Tabulation | Total Examinees × Rate per student | **৳75/- per examinee** (e.g. 86 × 75 = ৳6,450) |
| **07** | কম্প্রেহেনসিভ ট্যাবুলেশন / ভেরিফিকেশন | Comprehensive Tabulation / Verification | Verified Examinees × Rate | Configurable rate per examinee |
| **08** | সভাপতি / সদস্যর ভাতা | Exam Committee Chairman / Member Allowance | Fixed honorarium per committee role | **৳2,250/- (Chairman)**; Member allowance |
| **09** | প্রশ্নপত্র লিখন ও যাচাই | Question Typing and Verification | Number of Questions × Rate per question | **৳200/- per question** (e.g. 6 × 200 = ৳1,200) |
| **10** | থিসিস / রিসার্চ প্রজেক্ট | Thesis / Research Project Evaluation | Per project / student count | Configurable rate per thesis/project |
| **11** | স্পেশাল টপিক সেমিনার / টার্মপেপার / ইন্ডাস্ট্রিয়াল ট্রেনিং এন্ড ভাইভা-ভসি | Seminar / Term Paper / Industrial Training & Viva | Per candidate or report | Configurable per candidate/session |
| **12** | ইন্টার্নশিপ / ইনপ্ল্যান্ট ট্রেনিং / মনোগ্রাফ / ইন্ডিপেন্ডেন্ট স্টাডি / প্রেজেন্টেশন | Internship / In-plant Training / Monograph & Presentation | Per report / presentation | Configurable per candidate/session |
| **13** | ক্লাস টেস্ট | Class Test Conduction & Evaluation | Student Count × Credit × Tests formula | ৳2,740/-, ৳5,400/- (Configurable rule) |
| **14** | ইনসিডেন্টাল চার্জ | Incidental Expenses (Stationery, Dispatch) | Attached Voucher / Actual Receipt | Voucher-backed reimbursement |

### 2.2 Table Columns of the Official Bill Grid
As seen on the official form, the billing grid contains 12 exact columns:
1. `ক্রমিক নম্বর` (Serial Number: 01 to 14)
2. `কাজের নাম` (Activity Name)
3. `পরীক্ষার নাম` (Examination Name: e.g. 2nd Year 1st Semester Final Examination 2025)
4. `বৎসর` (Academic Year: e.g. 2025, 2024)
5. `বিভাগ` (Department: ICT)
6. `কোর্স কোড` (Course Code: e.g. ICT-2101, ICT-3105, ICT-3201)
7. `খাতা/পরীক্ষার্থীর সংখ্যা` (Script / Examinee Count)
8. `মোট দিন/সদস্য সংখ্যা` (Total Days / Members Count)
9. `ক্রেডিট আওয়ার` (Credit Hour: e.g. 3.00)
10. `ক্লাস টেস্টের সংখ্যা` (Number of Class Tests: e.g. 4.00)
11. `টাকা` (Amount in Taka)
12. `পয়সা` (Poisa: typically 00)

### 2.3 Signatures, Approvals, and Payment Workflow Extracted
The bottom half of the official bill slip contains the following institutional authorities:
1. **প্রতি স্বাক্ষর: সভাপতি, পরীক্ষা কমিটি (সীলমোহর)** — Counter-signature of the Examination Committee Chairman with Official Seal.
2. **পরীক্ষকের স্বাক্ষর** — Signature of the Examiner / Course Teacher.
3. **Office Sanction Order:**
   `বিভাগঃ আইসিটি, পরীক্ষাঃ বিএসসি (ইঞ্জিঃ) ফাইনাল পরীক্ষা ২০২৪, সেশনঃ ২০২৩-২০২৪`  
   `প্রফেসর/ড./জনাব ................................-কে টাকা = ............/- (কথায়ঃ ....................................... টাকা মাত্র) প্রদান করুন।`
4. **Disbursement Acknowledgement:**
   `[রেভিনিউ স্ট্যাম্প (Revenue Stamp)] বুঝিয়া পাইলাম, তারিখসহ স্বাক্ষর` (Received payment with signature and date).
5. **Administrative Approvers:**
   - `সেকশন অফিসার / সহকারী পরীক্ষা নিয়ন্ত্রক` (Section Officer / Assistant Controller of Examinations)
   - `পরীক্ষা নিয়ন্ত্রক, মাভাবিপ্রবি` (Controller of Examinations, MBSTU)

---

## 3. Departmental Data Inventory from Scanned Dossier (11 Pages)

### Semester 1: 3rd Year 2nd Semester Final Examination 2024 (Session: 2021-2022) & BL
- **Exam Period:** February–March 2026
- **Examination Committee:**
  - Chairman (সভাপতি): Dr. Muhammad Shahin Uddin (Professor, ICT, MBSTU)
  - Member (সদস্য): Dr. Md. Abir Hossain (Associate Professor, ICT, MBSTU)
  - Member (সদস্য): Mr. Mahedi Hasan (Lecturer, ICT, MBSTU)
  - External Member (বহিঃস্থ সদস্য): Prof. Dr. Rafiqul Islam (Dept of CSE, DUET, Gazipur)
- **Courses & Examiners:**
  - `ICT-3201` Computer Networks (3.00 Cr): Internal: Dr. Nazrul Islam; External: Md. Mahmudul Hasan (Lecturer, SE, Univ of Frontier Tech)
  - `ICT-3203` Web Application Development (3.00 Cr): Internal: Mr. Md. Anowar Kabir; External: Nitun Kumar Podder (PUST)
  - `ICT-3205` Digital Signal Processing (3.00 Cr): Internal: Dr. Mst. Nargis Aktar; External: Dr. Md. Kamal Hossain (RUET)
  - `ICT-3207` Computer Organization and Architecture (3.00 Cr): Internal: Mr. Md. Anowar Kabir; External: Ishtiaq Ahammad (NSTU)
  - `ICT-3209` Ethical and Professional Conduct (3.00 Cr): Internal: Dr. Ziaur Rahman; External: Dr. Md. Sarwar Hosain (PUST)
  - Backlog Courses: `ICT-3201 (BL)` Microwave Engineering, `ICT-3203 (BL)` Compiler Design, `ICT-3211 (BL)` Bio-Informatics
- **Question Typing & Verification (8 questions total):**
  - Shahin Uddin: 3 questions
  - Abir Hossain: 3 questions
  - Mahedi Hasan: 2 questions
- **Sessional / Lab Courses:** ICT-3202, ICT-3204, ICT-3206, ICT-3208, ICT-3210
- **3rd Examiners:**
  - ICT-3205: Mr. Md. Anowar Kabir (1 script: IT22042)
  - ICT-3207: Dr. Mohammad Badrul Alam Miah (2 scripts: IT22006, IT22031)

### Semester 2: 4th Year 2nd Semester (Session 2020-2021) & 4th Year 1st Semester SC
- **Courses:** `ICT-4201`, `ICT-4203`, `ICT-4205`, `ICT-4211`, `ICT-4103 (SC)`, `ICT-4105 (SC)`, `ICT-4107 (SC)`, `ICT-4111 (SC)`
- **Sessional Courses:** `ICT-4202` (58 students), `ICT-4206` (58), `ICT-4212` (58), `ICT-4000` (58 - All Teachers), `ICT-4110` (03)
- **Tabulators:** 28 Regular + 04 Special = 32 Examinees

### Semester 3: 2nd Year 1st Semester Final Examination 2025 (Session 2023-2024), SC & BL
- **Courses:** `ICT-2101`, `ICT-2103`, `ICT-2107`, `ICT-2109`, `ICT-2111`, plus 4 SC and 9 Backlog courses!
- **Tabulators:** 57 Regular + 18 Backlog + 11 Special = 86 Examinees (86 × ৳75 = ৳6,450)
- **Actual Bill Sample Extracted:** Prof. Dr. Mst. Nargis Aktar earned **৳55,600/-** from this single semester!

### Semester 4: 1st Year 1st Semester Final Examination 2025 (Session 2024-2025) & BL
- **Courses:** `ICT-1101` (57 students), `ICT-1103` (57), `ICT-1105` (57), `ICT-1107` (57), `ICT-1109` (57), `ICT-1111` (57)
- **Tabulators:** 57 Regular + 18 Backlog = 75 Examinees

---

## 4. Requirements Traceability Matrix

| Requirement ID | Requirement Description | Evidence from Demo Files | Proposed Implementation | Verification Status | Unresolved Questions |
|---|---|---|---|---|---|
| **REQ-01** | Multi-Semester Management | Scanned PDF covers 4 different semesters with distinct sessions, BL, and SC exams. | Fully dynamic Semester entity with Session, Year, Exam Name, Status, and independent scoping. | Verified | None |
| **REQ-02** | Theory and Lab Course Management | Scanned PDF lists 3.00 Cr theory courses and corresponding even-numbered lab courses. | Course model supporting Code, Title, Credit, Type (Theory, Lab/Sessional), and Semester link. | Verified | None |
| **REQ-03** | Internal & External Teacher Directory | Scanned PDF lists internal MBSTU teachers and external faculty from RUET, DUET, PUST, BDU, NSTU, JU. | Universal Teacher/Staff model supporting Internal/External designation, department, and university. | Verified | None |
| **REQ-04** | 14 Standard Examination Activities | Official Bill Slips explicitly enumerate 14 standard numbered rows. | Standard Activity Catalog implementing all 14 categories with dynamic quantity units. | Verified | None |
| **REQ-05** | Configurable Billing Rules & Rates | Photos show ৳120/script, ৳100/lab student, ৳75/tabulation, ৳200/question, ৳2,250 chairman. | Configurable Billing Rule Engine storing base rates per activity, with demo pre-loaded rates. | Verified | Official syndicate-approved ceiling rates may require admin customization. |
| **REQ-06** | Teacher-Wise Earning & Payment Ledger | User mandate: must show earned, approved, paid, and outstanding for every teacher and activity. | Granular Teacher Financial Ledger calculating Accrued, Approved, Paid, and Outstanding balances. | Verified | Handled with strict separation of Bill Generation vs Payment Recording. |
| **REQ-07** | Strict Separation of Bill vs Payment | Real slips show revenue stamp and date when paid, separate from approval signature. | State machine: `Recorded` ➔ `Bill Draft` ➔ `Approved` ➔ `Paid` (with support for partial payments). | Verified | None |
| **REQ-08** | Official 1:1 Printable Bill Slip Generator | Real bill slips photographed with specific 12-column layout and Bengali headers. | Browser-native print-ready A4 bill generator exactly replicating the MBSTU official layout. | Verified | None |
| **REQ-09** | Examination Committee & Roles | Scanned PDF shows Chairman, Members, External Member, Tabulators, and 3rd Examiners. | Committee & Duty Assignment module mapping teachers to specific semester responsibilities. | Verified | None |
| **REQ-10** | Zero-Cost Offline Architecture | Budget strictly ৳0.00, client-side only. | HTML5, CSS3, ES6 Vanilla JS, `localStorage` persistence, JSON import/export, CSV reports. | Verified | None |

---

## 5. Identified Assumptions & Configurable Flexibility

1. **Class Test Remuneration Formula:** The bill slips show amounts such as ৳2,740/- and ৳5,400/- for class tests. Because specific departmental formulas (e.g. rate per script × tests × credit) can vary by academic council circular, the system provides a standard default rule while allowing the administrator to edit the unit rate or input authorized amounts.
2. **Minimum Script Fee Threshold:** For courses with very few scripts (e.g., 3 or 4 scripts), the observed bill shows ৳500/- or ৳700/- rather than 4 × ৳120 = ৳480. A configurable "Minimum Evaluation Charge" rule is therefore provided.
3. **Partial Disbursements:** University accounts offices frequently disburse bills in installments or with tax/revenue deductions (৳10 revenue stamp). The payment ledger tracks exact amounts paid and leaves remaining balances as outstanding.
