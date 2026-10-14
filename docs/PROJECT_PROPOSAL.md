# MBSTU ICT Department Examination & Semester Bill Management System
## Formal Project Proposal (1-Credit Academic Software Project)

**Project Title:** MBSTU ICT Department Examination & Semester Bill Management System  
**Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Tangail, Bangladesh  
**Department:** Department of Information and Communication Technology (ICT)  
**Student Name:** Md Tahmid Hasib Antor  
**Student ID:** IT24055  
**Academic Session:** 2023–2024  
**Academic Level:** 2nd Year, 2nd Semester  
**Course Credit:** 1.0 Credit  
**Financial Budget:** Strictly Zero Cost (BDT 0.00)  

---

## 1. Introduction

In modern academic administration, managing semester final examinations, course assignments, examiner appointments, and teacher remuneration is a critical operational task. In the Department of Information and Communication Technology (ICT) at Mawlana Bhashani Science and Technology University (MBSTU), faculty members and external examiners from other universities perform varied duties including question paper setting, moderation, answer script evaluation, practical/laboratory examinations, 3rd examination, tabulation, and committee management.

Currently, remuneration claims are prepared manually using paper-based 14-row bill forms (`মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় - পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`). Tracking which teacher earned how much from which course, whether a bill has been approved, how much has actually been disbursed, and what amount remains outstanding across semesters is tedious and error-prone. This project proposes an automated, 100% offline, zero-cost web application to calculate, track, summarize, and print examination bills for the MBSTU ICT Department.

---

## 2. Problem Statement

1. **Fragmented Work Tracking:** Across four concurrent semesters and backlog/special examinations, tracking multiple teachers' duties (theory, lab, tabulation, 3rd examiner) manually in paper registers leads to delays and reconciliation errors.
2. **Conflation of Bills and Payments:** In manual record-keeping, teachers often lack clarity on whether a prepared bill has been sanctioned or actually paid by the university accounts office, making it difficult to know outstanding amounts.
3. **Complex Mathematical Rules:** Different exam duties use different billing formulas (e.g. ৳120/script with minimum charge, ৳100/lab student, ৳75/tabulator examinee, ৳200/question, ৳2,250 chairman allowance). Calculating these manually for dozens of teachers invites arithmetic errors.
4. **Time-Consuming Bill Preparation:** Manually writing out the 14-row official MBSTU bill form for each teacher and course consumes valuable faculty and staff time.

---

## 3. Proposed Solution

The **MBSTU ICT Department Examination & Semester Bill Management System** is a lightweight, zero-cost, offline-first single page application (SPA) designed to:
- Manage semesters, courses, and teacher rosters dynamically.
- Record all 14 official examination activities with automated rate-based amount calculations.
- Maintain an auditable **Teacher Financial Ledger** showing:
  $$\text{Work Accrued} \implies \text{Bill Prepared} \implies \text{Chairman Approved} \implies \text{Payment Recorded} \implies \text{Outstanding Balance}$$
- Generate a 1:1 replica of the official printable MBSTU bill slip with Bengali headers, 12-column grid, and signature blocks.
- Provide data backup, restore, and CSV reporting with zero external hosting or subscription costs.

---

## 4. Main & Specific Objectives

### Main Objective:
Develop a functional, transparent, and easy-to-demonstrate software system that manages semester examinations, tracks teacher-wise examination earnings by course and activity, records actual accounts disbursements, and generates printable bill slips.

### Specific Objectives:
1. Implement dynamic semester management supporting regular, backlog, and special examination tracks.
2. Implement course management for both theory and laboratory/sessional courses.
3. Implement reusable faculty profiles for internal MBSTU teachers and external examiners.
4. Automate remuneration calculations for all 14 official MBSTU exam duties using configurable billing rules.
5. Provide a course-by-course and activity-by-activity earning breakdown for every course teacher.
6. Track approved vs. paid vs. outstanding amounts, strictly preventing unrecorded disbursements from being marked as paid.
7. Generate professional, browser-printable A4 bill slips matching the physical MBSTU bill format.
8. Support full JSON database backup and restore for data reliability.

---

## 5. Technology Stack & Zero-Cost Architecture

- **Frontend Structure:** Plain semantic HTML5.
- **Styling & Layout:** Responsive, modern CSS3 with A4 print stylesheets (`@media print`).
- **Application Logic:** Clean ES6+ Vanilla JavaScript.
- **Data Persistence:** Browser `localStorage` (Namespace: `mbstu_ict_exam_bills_v1`).
- **Total Project Cost:** **BDT 0.00 (Zero Financial Cost)**. No paid hosting, cloud databases, or third-party APIs required.
