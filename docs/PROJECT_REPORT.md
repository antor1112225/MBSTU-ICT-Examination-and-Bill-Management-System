# MBSTU ICT Department Examination & Semester Bill Management System
## Comprehensive Project Report

**Project Title:** MBSTU ICT Department Examination & Semester Bill Management System  
**Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Tangail, Bangladesh  
**Department:** Information and Communication Technology (ICT)  
**Student Name:** Md Tahmid Hasib Antor (ID: IT24055)  
**Academic Session:** 2023–2024 (2nd Year, 2nd Semester)  
**Project Credit:** 1.0 Credit  
**Implementation Status:** Completed & Fully Functional  

---

## 1. System Overview

The **MBSTU ICT Department Examination & Semester Bill Management System** is a production-ready, client-side enterprise academic billing platform engineered to streamline the administrative, calculation, and financial reconciliation workflows of semester examinations in the Department of ICT, MBSTU.

Built entirely on zero-cost web standards (HTML5, CSS3, ES6 Vanilla JavaScript, and `localStorage`), the system eliminates the administrative overhead of manual calculation while providing complete transparency into examination expenditures, teacher honoraria, accounts disbursements, and outstanding liabilities.

---

## 2. Core Functional Modules

### Module 1: Executive Dashboard & Analytics
- Provides top-level KPIs: Total Active Semesters, Courses, Faculty Members, Recorded Activities, Total Gross Billed, Total Approved, Total Disbursed, and Current Outstanding Payable.
- Displays quick-action shortcuts and recent disbursement history.

### Module 2: Semester & Exam Session Management
- Manages academic sessions, years, levels, regular/backlog/special examinee cohorts, and examination periods.
- Keeps each semester's records logically partitioned while enabling consolidated departmental analytics.

### Module 3: Course & Curriculum Management
- Categorizes Theory and Lab/Sessional courses with credit hours and assigned internal/external teachers.
- Links student batch enrollments directly to automated script evaluation and practical lab workload calculations.

### Module 4: Teacher & Staff Registry
- Universal faculty registry for internal MBSTU professors, associate professors, assistant professors, lecturers, and external faculty from other universities (e.g., RUET, DUET, PUST, BDU, NSTU, JU).
- Supports dynamic, multi-semester duty assignments without hardcoding individuals to static roles.

### Module 5: 14-Category Examination Activity Logger
- Captures all 14 statutory examination duties: Question Paper Setting, Moderation, Script Evaluation, Viva-Voce, Practical Exams, Tabulation, Verification, Committee Allowance, Question Typing, Thesis/Project, Seminars, Internships, Class Tests, and Incidental Charges.
- Automatically calculates amounts using configured rates while allowing teacher and course-specific adjustments.

### Module 6: Teacher Earning & Payment Ledger (Core Financial Engine)
- Dedicated course-by-course and activity-by-activity financial ledger for every teacher.
- Accurately tracks **Accrued Work $\implies$ Bill Prepared $\implies$ Chairman Approved $\implies$ Paid $\implies$ Outstanding**.
- Records individual payment vouchers and updates remaining balances without duplicate entries.

### Module 7: Official 1:1 Printable Bill Slip Generator
- Automatically compiles recorded activities into the official 14-row MBSTU Bill Form (`মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় - পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`).
- Formatted with exact institutional headers, 12-column grid, Bengali typography, signature lines, revenue stamp section, and browser print (`Ctrl+P`) styling.

### Module 8: Configurable Billing Rule Engine
- Administrative console to review and customize unit rates (e.g. ৳120/script, ৳100/lab student, ৳75/tabulator examinee, ৳200/question, ৳2,250 chairman allowance).
- Maintains historical immutability for past finalized bills.

### Module 9: Data Backup, Restore & CSV Reporting
- Exports complete database state to validated JSON format.
- Restores database with schema validation and confirmation dialogs.
- Exports financial reports to CSV for spreadsheet analysis.

---

## 3. Financial Reconciliations & Quality Assurance

All financial aggregations adhere to strict accounting invariants:
$$\text{Gross Total} = \sum \text{Activity Amounts}$$
$$\text{Outstanding Balance} = \text{Approved Bill Amount} - \sum \text{Recorded Payments}$$
$$\text{Outstanding Balance} \ge 0$$

Over 20 distinct verification scenarios were executed across multiple semesters and course types to ensure that data integrity, calculations, and print outputs strictly comply with MBSTU departmental norms.
