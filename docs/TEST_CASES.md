# MBSTU ICT Department Examination & Semester Bill Management System
## Test Cases and Verification Protocol (20 Test Scenarios)

**Document File:** `docs/TEST_CASES.md`  
**Execution Environment:** Modern Web Browser (Chrome/Edge/Firefox) with Local Storage  
**Total Test Scenarios:** 20 Rigorous Functional & Financial Verification Cases  

---

## Summary Test Results Matrix

| Test ID | Test Scenario Description | Expected Outcome | Execution Result | Status |
|---|---|---|---|---|
| **TEST-01** | Create two separate semesters | Data and counts are strictly partitioned; no bleed across terms. | Verified | **PASS** |
| **TEST-02** | Add multiple courses to one semester | Courses bind only to target semester with code and credits. | Verified | **PASS** |
| **TEST-03** | Assign different teachers to different courses | Internal and external teachers mapped correctly without role lock. | Verified | **PASS** |
| **TEST-04** | Record class test activity for a course | Workload quantity and rate compute accurate course amount. | Verified | **PASS** |
| **TEST-05** | Record script-evaluation activity | $N_{\text{scripts}} \times ৳120$ computes accurate amount with min threshold. | Verified | **PASS** |
| **TEST-06** | Record laboratory examination activity | Practical student count $\times ৳100$ appears in course ledger. | Verified | **PASS** |
| **TEST-07** | Add multiple activities for one teacher in same course | Individual items logged and course sub-total reconciles exactly. | Verified | **PASS** |
| **TEST-08** | Assign different billing rate to another activity | Applicable rule binds correctly without cross-activity interference. | Verified | **PASS** |
| **TEST-09** | Prepare and approve a bill | Status changes to Approved; bill is strictly NOT marked as paid. | Verified | **PASS** |
| **TEST-10** | Record a payment transaction | Paid amount increases; outstanding balance decreases by equal value. | Verified | **PASS** |
| **TEST-11** | Record partial payment for an outstanding bill | Paid accumulates accurately; remaining balance = Approved - Paid. | Verified | **PASS** |
| **TEST-12** | Generate individual teacher bill slip | Form matches official 14-row layout with exact figures & Bengali text. | Verified | **PASS** |
| **TEST-13** | Generate consolidated multi-semester statement | Reconciles all eligible courses and duties across all terms. | Verified | **PASS** |
| **TEST-14** | Generate semester-wise financial summary | Semester totals reconcile with sum of individual teacher bills. | Verified | **PASS** |
| **TEST-15** | Edit activity quantity before bill finalization | Gross and calculated amounts recalculate immediately. | Verified | **PASS** |
| **TEST-16** | Update global billing rate for future activities | Finalized historical bills retain frozen historical rates. | Verified | **PASS** |
| **TEST-17** | Export JSON database backup and restore it | Full system state, payments, and ledgers restore consistently. | Verified | **PASS** |
| **TEST-18** | Attempt invalid transaction (overpayment / orphan record) | Validation blocks overpayment beyond outstanding balance. | Verified | **PASS** |
| **TEST-19** | Print bill slip using browser print | Slip renders cleanly on A4 paper; UI toolbars and buttons hidden. | Verified | **PASS** |
| **TEST-20** | Refresh browser | All data persists seamlessly in browser `localStorage`. | Verified | **PASS** |

---

## Detailed Test Case Specifications

### TEST-01: Multi-Semester Partitioning
- **Input:** Create Semester A (`3rd Year 2nd Sem 2024`) and Semester B (`2nd Year 1st Sem 2025`).
- **Assertion:** Adding courses or activities in Semester A does not alter Semester B's course count, teacher list, or total financial obligations.
- **Result:** Pass.

### TEST-05: Answer Script Evaluation Calculation
- **Input:** 54 scripts for `ICT-3107`, rate = ৳120.00/script.
- **Assertion:** $54 \times 120 = ৳6,480.00$.
- **Result:** Pass.

### TEST-09 & TEST-10: Separation of Bill Approval and Payment Disbursement
- **Input:** Bill prepared for ৳55,600.00. Chairman marks "Approved".
- **Assertion:** `paidAmount` remains ৳0.00; `outstandingBalance` = ৳55,600.00.
- **Action:** Record disbursement payment of ৳30,000.00.
- **Assertion:** `paidAmount` = ৳30,000.00; `outstandingBalance` drops to ৳25,600.00. Bill status = `Partially Paid`.
- **Result:** Pass.

### TEST-18: Overpayment Prevention
- **Input:** Attempting to record payment of ৳35,000.00 on a bill with outstanding balance of ৳25,600.00.
- **Assertion:** System displays error `"Payment amount (৳35,000.00) cannot exceed current outstanding balance (৳25,600.00)"`. Transaction rejected.
- **Result:** Pass.
