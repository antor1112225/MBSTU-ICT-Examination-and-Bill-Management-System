# MBSTU ICT Department Examination & Semester Bill Management System
## Teacher Earnings, Audit Ledger, and Payment Workflow Specification

**Document File:** `docs/TEACHER_EARNINGS_AND_PAYMENT_WORKFLOW.md`  
**Core Purpose:** Explain the end-to-end financial lifecycle from completed academic duty to final disbursement.  
**Critical Principle:** **Generating or approving a bill NEVER marks it as paid.** Work accrual, bill creation, approval sanction, and actual payment disbursement are strictly independent states.

---

## 1. The Financial Lifecycle State Machine

Every financial obligation progresses through five distinct, auditable states:

```
[ 1. WORK ACCRUED ]
  Teacher performs examination duty (sets paper, checks scripts, conducts lab).
  Activity logged with quantity, applied rate, and gross calculated amount.
  Status: "Recorded" (Payable: Pending Bill Preparation)
         |
         v
[ 2. BILL PREPARATION ]
  Biller / Exam Controller compiles recorded activities into an official 14-row Bill Slip.
  Bill Slip Number assigned (e.g. MBSTU/ICT/BILL/2026/012).
  Status: "Draft" (Payable: Bill Prepared)
         |
         v
[ 3. CHAIRMAN REVIEW & APPROVAL ]
  Examination Committee Chairman verifies work quantity and rates.
  Countersigns with official seal (প্রতি স্বাক্ষর: সভাপতি, পরীক্ষা কমিটি).
  Status: "Approved" (Legally Payable, Outstanding Balance = Approved Amount)
         |
         v
[ 4. ACCOUNTS DISBURSEMENT / PAYMENT RECORDING ]
  Section Officer / Accounts Office issues cheque/cash/transfer.
  Payment transaction posted with Voucher Number, Date, and Revenue Stamp flag.
  Status: "Partially Paid" (if payment < approved) or "Paid" (if payment == approved).
         |
         v
[ 5. RECONCILED & ARCHIVED ]
  Teacher acknowledges receipt (বুঝিয়া পাইলাম). Outstanding balance = ৳0.00.
```

---

## 2. Granular Teacher Financial Ledger

For each course teacher, the system provides a comprehensive financial dashboard answering all 11 critical questions required by the department:

1. **Which semester was the work completed in?** (e.g., `2nd Year 1st Semester Final Examination 2025`)
2. **Which course was involved?** (e.g., `ICT-2101 Computer Organization and Architecture`)
3. **What specific examination activity was performed?** (e.g., `Category 03: উত্তর পত্র মূল্যায়ন`)
4. **How many scripts or sessions were completed?** (e.g., `54 scripts`)
5. **What billing rate was applied?** (e.g., `৳120.00 / script`)
6. **What is the calculated amount?** (e.g., `৳6,480.00`)
7. **How much has been approved?** (e.g., `৳6,480.00`)
8. **How much has actually been paid?** (e.g., `৳3,000.00`)
9. **How much remains outstanding?** (e.g., `৳3,480.00`)
10. **When was each payment recorded?** (e.g., `2026-03-20 via VR-2026-8842`)
11. **Which bill slip documents the amount?** (e.g., `Bill Slip #MBSTU/ICT/BILL/2026/012`)

---

## 3. Teacher-Course Financial Breakdown Matrix

For every teacher across all their assigned courses, the system renders an interactive, real-time matrix:

```
+---------------------------------------------------------------------------------------------------------------+
| Course Code & Title: ICT-2101 Computer Organization and Architecture (Credit: 3.00)                           |
+--------------------------+----------+---------+-------------------+------------+------------+-----------------+
| Activity Category        | Workload | Rate    | Calculated Amount | Approved   | Paid       | Outstanding     |
+--------------------------+----------+---------+-------------------+------------+------------+-----------------+
| Question Setting (01)    | 1 Paper  | ৳4,000  | ৳4,000.00         | ৳4,000.00  | ৳4,000.00  | ৳0.00           |
| Script Evaluation (03)   | 54 Scrp  | ৳120    | ৳6,480.00         | ৳6,480.00  | ৳3,000.00  | ৳3,480.00       |
| Class Test Conduction(13)| 4 Tests  | Dynamic | ৳2,740.00         | ৳2,740.00  | ৳0.00      | ৳2,740.00       |
+--------------------------+----------+---------+-------------------+------------+------------+-----------------+
| COURSE SUB-TOTAL         |          |         | ৳13,220.00        | ৳13,220.00 | ৳7,000.00  | ৳6,220.00       |
+--------------------------+----------+---------+-------------------+------------+------------+-----------------+
```

---

## 4. Multi-Semester Consolidated Statements

Teachers frequently teach across multiple semesters concurrently (e.g., a 2nd-year theory course and a 4th-year lab course). The system supports:
1. **Semester-Specific View:** Shows earnings and payment history for a selected term.
2. **Consolidated All-Time View:** Reconciles total earnings, total disbursements, and overall university payable across all terms.
3. **Filterable Search:** Filter by Course, Activity Category, Bill Status, or Payment Status.

---

## 5. Audit Logging and Invariant Protection

- **Audit Trail:** Every payment insertion, bill approval, or rate edit logs the timestamp, action, and operator ID.
- **Strict Ledger Invariant:** At all times:
  $$\sum \text{Approved Amounts} = \sum \text{Paid Amounts} + \sum \text{Outstanding Balances}$$
  Any data inconsistency detected during page load or JSON restore triggers an automatic diagnostic alert.
