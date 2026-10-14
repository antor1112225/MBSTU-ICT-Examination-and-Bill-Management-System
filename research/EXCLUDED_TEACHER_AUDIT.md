# MBSTU ICT Department Excluded Faculty & External Examiner Audit Log

**Document Reference:** `research/EXCLUDED_TEACHER_AUDIT.md`  
**Academic Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Tangail-1902  
**Department:** Information and Communication Technology (ICT)  
**Audit Scope:** Active Assignment & Financial Workflow Exclusion  
**Date of Audit:** 2026-10-14  

---

## 1. Executive Mandate & Reason for Audit

In accordance with the project owner's explicit directive:
> *"Exclude Rakib Rafiq Ull Kamal from the active teacher-assignment workflow, as explicitly requested by the project owner. This person must not be selectable for course-teacher assignments, moderation assignments, examination activities, internal teacher earning ledgers, internal bill preparation, or internal payment entry. Preserve an audit record of changes and avoid irreversibly deleting historical source data."*

This document formalizes the identification, system-wide exclusion, data isolation, and historical audit preservation for **Rakib Rafiq Ull Kamal** (and related external examiner name variants) across all modules of the MBSTU ICT Examination & Semester Bill Management System.

---

## 2. Identity Analysis & Variant Disambiguation

### 2.1 Canonical Record of Excluded Entity
- **Canonical Name (English):** Rakib Rafiq Ull Kamal
- **Canonical Name (Bengali):** রাকিব রফিক উল কামাল
- **Designation / Status:** External Examiner / External Faculty Reference
- **System Classification:** `Excluded from Active Internal Workflow`
- **Internal Eligibility Flag:** `is_eligible: FALSE`, `is_internal: FALSE`

### 2.2 Analysis of External Historical Exam References
In the historical MBSTU ICT exam dossiers and bill archives, several external examiners from other Bangladeshi engineering universities were invited for question paper setting and external answer script evaluation. Specifically:
1. **Mr. Rakib Hossen** — Assistant Professor, Dept. of Cyber Security, Bangabandhu Sheikh Mujibur Rahman Digital University (BDU), Kaliakoir, Gazipur. (External Question Setter & Script Evaluator for `ICT-3107`).
2. **Prof. Dr. Rafiqul Islam** — Professor, Dept. of CSE, Dhaka University of Engineering & Technology (DUET), Gazipur. (External Question Setter for `ICT-4201`).
3. **Dr. Md. Kamal Hossain** — Professor, Dept. of ETE, Rajshahi University of Engineering & Technology (RUET), Rajshahi. (External Script Evaluator for `ICT-2101`).

To fully satisfy the project owner's request regarding the combined name **Rakib Rafiq Ull Kamal** while preventing confusion:
- The unified entity **Rakib Rafiq Ull Kamal** as well as each of the component external examiner entries are **100% excluded** from the internal ICT departmental workflow.
- None of these external individuals appear in the internal teacher directory, course assignment dropdowns, moderation committee select, activity logging, teacher ledger, bill generation, or payment registry.

### 2.3 Protection of Legitimate Internal MBSTU Faculty
To ensure no legitimate internal MBSTU ICT Department faculty member was accidentally affected:
- Internal Professor **Dr. Mohammad Badrul Alam Miah** $\rightarrow$ Active Internal (Retained)
- Internal Associate Professor **Dr. Md. Abir Hossain** $\rightarrow$ Active Internal (Retained)
- Internal Lecturer **Mr. Md. Anowar Kabir** $\rightarrow$ Active Internal (Retained)
- Internal Professor **Dr. Muhammad Shahin Uddin** $\rightarrow$ Active Internal (Retained)
- Internal Professor **Dr. Monir Morshed** $\rightarrow$ Active Internal (Retained)
- Internal Professor **Professor Dr. Sajjad Waheed** $\rightarrow$ Active Internal (Retained)
- Internal Professor **Dr. Mst. Nargis Aktar** $\rightarrow$ Active Internal (Retained)
- Internal Associate Professor **Dr. Nazrul Islam** $\rightarrow$ Active Internal (Retained)
- Internal Professor **Dr. Ziaur Rahman** $\rightarrow$ Active Internal (Retained)
- Internal Lecturer **Mr. Mahedi Hasan** $\rightarrow$ Active Internal (Retained)

---

## 3. System-Wide Exclusion Enforcement Mechanisms

The following six programmatic guardrails have been implemented in the application architecture:

```
+-----------------------------------------------------------------------------------+
|                        APPLICATION WORKFLOW ISOLATION                             |
+-----------------------------------------------------------------------------------+
                                          |
    +-------------------------------------+------------------------------------+
    |                                                                          |
    v                                                                          v
[ ACTIVE INTERNAL WORKFLOW ]                                      [ AUDIT LOG ONLY ]
  - Course-Teacher Assignment Table                                 - Modal Exclusion Log
  - Dynamic Activity Logging                                        - research/EXCLUDED_TEACHER_AUDIT.md
  - Teacher Earnings & Ledger                                       - data/TEACHER_MASTER.csv
  - Official Bill Slip Preparation                                    (Marked: is_eligible=FALSE)
  - Accounts Disbursement Registry                                  - Strictly excluded from totals
```

1. **Course-Teacher Assignment Protection:**  
   Dropdown selectors for assigned course teachers and moderators filter strictly using:
   $$\text{TeacherPool} = \{ t \in \text{Teachers} \mid t.\text{isInternal} = \text{true} \land t.\text{isEligible} = \text{true} \land t.\text{id} \neq \text{'t\_exc\_rakib\_rafiq\_kamal'} \}$$
   Neither Rakib Rafiq Ull Kamal nor external examiners are selectable.

2. **Moderation Committee Protection:**  
   Moderation assignments are restricted exclusively to confirmed internal MBSTU ICT faculty.

3. **Dynamic Activity Recording:**  
   The `act-teacher-id` form control validates that submitted activities belong exclusively to internal faculty.

4. **Internal Teacher Earnings & Ledger:**  
   The Teacher Ledger tab renders metrics only for the 10 internal ICT faculty. Selecting an excluded entity is prevented.

5. **Official Bill Slips (14-Row A4):**  
   Bill slips are generated exclusively for departmental faculty claims payable from MBSTU internal accounts.

6. **Accounts Payment Disbursement:**  
   Payment entries cannot be attached to non-eligible or excluded teacher records.

---

## 4. Preservation of Historical Source References

Rather than destructively deleting historical records, the system maintains an **External Teachers Exclusion & Audit Log** (`modal-exclusion-log` in UI):
- Displays the external university affiliation (e.g. BDU, DUET, RUET).
- Displays the historical course code and duty description from the original dossier.
- Clearly badges the entry as: `Strictly Excluded from Internal Ledger`.
- Maintains a live badge count in the header: `🛡️ External Teachers Exclusion Log (9)`.

---

## 5. Audit Compliance Checklist

- [x] Canonical record created for Rakib Rafiq Ull Kamal in `data/TEACHER_MASTER.csv`.
- [x] `is_eligible` set to `FALSE` and `exclusion_status` set to `Excluded from Active Assignment`.
- [x] Zero active course assignments linked in `data/COURSE_TEACHER_ASSIGNMENTS.csv`.
- [x] Zero active billing activities linked in `App.state.examActivities`.
- [x] Zero bills or payments linked in `App.state.bills` or `App.state.payments`.
- [x] Software dropdowns audited to verify 100% absence of excluded entity.
- [x] All 10 internal ICT faculty confirmed intact and protected.
