# SEMESTER-WISE COURSE AND TEACHER ASSIGNMENT WORKFLOW

**Department:** Department of Information and Communication Technology (ICT)  
**Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Tangail-1902  
**Document Code:** MBSTU/ICT/SYS/WORKFLOW-COURSE-ASG-01  
**Project:** MBSTU ICT Examination, Moderation, Teacher Earnings & Semester Bill Management System  
**Author:** Md Tahmid Hasib Antor (Student ID: IT24055, Session: 2023–2024)  

---

## 1. System Architecture Overview

The Semester-Wise Course and Teacher Assignment subsystem manages the relationships between academic sessions, semesters, curriculum courses, faculty members, and examination-related responsibilities.

```
+-----------------------------------------------------------------------------------------+
|                                  ACTIVE SEMESTER SELECTOR                               |
|   "All Semesters (Consolidated)" | "2024-2025 • 1Y 1S" | "2023-2024 • 2Y 1S" | ...      |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------------+
|                                    APPLICATION STATE                                    |
|   - App.state.courses (45 courses from 4 syllabus images + historical offerings)       |
|   - App.state.teachers (10 internal eligible faculty + exclusion audit record)          |
|   - App.state.assignments (Initial 5-course plans, priority labs, provisional flags)    |
|   - App.state.activities (Dynamic examination activities tied to semester & course)     |
|   - App.state.bills & payments (Accrual vs. Billed vs. Approved vs. Paid ledgers)       |
+-----------------------------------------------------------------------------------------+
               |                               |                              |
               v                               v                              v
+-----------------------------+ +-----------------------------+ +---------------------------+
|    COURSE-TEACHER MATRIX    | |    TEACHER REMUNERATION     | |     7 PRINTABLE REPORTS   |
| - Filtered by Semester      | | - Filtered by Semester      | | 1. Assignment Register    |
| - Assignment status badge   | | - Accrued vs Paid Ledgers   | | 2. Semester Course List   |
| - Dynamic Edit Modal        | | - 14-Row Official Slips     | | 3. Lab Course Register    |
| - 5-assignment quota rule   | | - Strict External Exclusion | | 4. Moderation Register    |
| - Unassigned course tracking| | - Zero Unassigned Teachers  | | 5. Teacher Earnings Stmt  |
+-----------------------------+ +-----------------------------+ | 6. Teacher Ledger         |
                                                                | 7. Consolidated Bill Stmt |
                                                                +---------------------------+
```

---

## 2. Active Semester Selector & State Synchronization

The application features a global **Active Semester Selector** located in the top navigation header:

1. **"All Semesters (Consolidated)" (Default View):**
   - Displays aggregated data spanning all 5 academic sessions (`2020–2021` through `2024–2025`).
   - Shows the comprehensive 45-course catalog and all course-teacher allocations.
   - Shows cross-semester earnings, payment disbursements, and outstanding institutional dues.
   - Every row displays its originating academic session and semester badge.

2. **Individual Semester Selection (Isolated Scoped View):**
   - Available options include:
     - `2024-2025` • 1st Year 1st Semester Final Examination
     - `2023-2024` • 2nd Year 1st Semester Final Examination
     - `2023-2024` • 2nd Year 1st Semester Backlog Examination
     - `2022-2023` • 3rd Year 1st Semester Final Examination
     - `2021-2022` • 4th Year 1st Semester Final Examination
     - `2020-2021` • 4th Year 2nd Semester Final Examination
   - Upon changing the dropdown:
     - The `App.handleGlobalSemesterChange(semId)` method fires.
     - The global scope banner updates dynamically (e.g., `"Active Semester: 2024-2025 • 1st Year 1st Semester"`).
     - The course-teacher table filters exclusively to courses belonging to that semester.
     - Unassigned syllabus courses remain visible with the status `"Not Yet Assigned"`.
     - Examination activity records, committee rosters, financial cards, teacher ledgers, and printable slips filter exclusively to that semester.
     - Cross-semester contamination is strictly prevented by state-level filtering (`course.semesterId === currentSemId`).

---

## 3. Course Master Data Integration

The course database is initialized with 45 courses:
- **40 Courses directly extracted from the 4 user-supplied syllabus images:**
  - **1Y 1S (17 Credits):** 5 Theory (`ICT 1101`, `1103`, `1105`, `1107`, `1109`) + 2 Labs (`ICT 1102`, `1104`).
  - **2Y 1S (22 Credits):** 6 Theory (`ICT 2101`, `2103`, `2105`, `2107`, `2109`, `2111`) + 4 Labs (`ICT 2102`, `2104`, `2106`, `2108`).
  - **3Y 1S (21 Credits):** 5 Theory (`ICT 3101`, `3103`, `3105`, `3107`, `3109`) + 5 Labs (`ICT 3102`, `3104`, `3106`, `3108`, `3110`) + 1 Project (`ICT 3100`).
  - **4Y 1S (22 Credits):** 4 Core Theory (`ICT 4101`, `4103`, `4105`, `4107`) + 3 Core Labs (`ICT 4102`, `4104`, `4106`) + 1 Project (`ICT 4000`) + 4 Elective Options (`ICT 4109`, `4111`, `4113`, `4115`).
- **5 Historical Offerings from 4Y 2S Session 2020–2021:**
  - `ICT 4201`, `ICT 4202` (Lab), `ICT 4203`, `ICT 4205`, `ICT 4206` (Lab).

---

## 4. Initial Course-Teacher Allocation Rules

The system establishes an initial allocation plan governed by four mathematical constraints:

1. **Exactly Five (5) Course Assignments Per Semester:**
   - Each regular semester is seeded with exactly 5 initial course assignments.
   - Any syllabus course not included in the initial 5 remains explicitly listed in the catalog with status `"Not Yet Assigned"` (unassigned).
2. **Laboratory Priority Rule:**
   - In semesters offering 3 or more laboratory courses (2Y 1S, 3Y 1S, 4Y 1S), **exactly three (3) laboratory courses are prioritized and assigned** before theory courses are assigned.
   - In **1Y 1S**, where the official curriculum contains only 2 laboratory courses, both available labs (`ICT 1102` and `ICT 1104`) are allocated alongside 3 theory courses (`ICT 1101`, `ICT 1103`, `ICT 1105`), totaling 5 assignments. Under no circumstances is a fictitious 3rd lab course created.
3. **100% Internal Faculty Coverage:**
   - All 10 eligible internal faculty members in the Department of ICT receive at least one course assignment across the curriculum:
     1. Dr. Monir Morshed (`T_MONIR`): `ICT 1101` (1Y 1S), `ICT 4103` & `ICT 4104` (4Y 1S), `ICT 2101 BL` (2Y 1S BL), `ICT 4205` & `ICT 4206` (4Y 2S).
     2. Dr. Mst. Nargis Aktar (`T_NARGIS`): `ICT 2102` & `ICT 2104` (2Y 1S).
     3. Prof. Dr. Sajjad Waheed (`T_SAJJAD`): `ICT 3101` & `ICT 3102` (3Y 1S).
     4. Dr. Mohammad Badrul Alam Miah (`T_BADRUL`): `ICT 3106` & `ICT 3107` (3Y 1S), `ICT 4203` (4Y 2S).
     5. Dr. Muhammad Shahin Uddin (`T_SHAHIN`): `ICT 1105` (1Y 1S), `ICT 2103` (2Y 1S), `ICT 4201` & `ICT 4202` (4Y 2S).
     6. Dr. Md. Abir Hossain (`T_ABIR`): `ICT 2101` (2Y 1S), `ICT 3108` (3Y 1S).
     7. Dr. Nazrul Islam (`T_NAZRUL`): `ICT 2106` (2Y 1S), `ICT 4101` (4Y 1S).
     8. Dr. Ziaur Rahman (`T_ZIAUR`): `ICT 1103` (1Y 1S).
     9. Mr. Mahedi Hasan (`T_MAHEDI`): `ICT 1104` (1Y 1S), `ICT 4102` (4Y 1S).
     10. Mr. Md. Anowar Kabir (`T_ANOWAR`): `ICT 1102` (1Y 1S), `ICT 4106` (4Y 1S).
4. **Strict Exclusion of External Candidates from Internal Rosters:**
   - Teacher candidate `"Rakib Rafiq Ull Kamal"` (and related external examiner aliases) is programmatically barred from active course assignment dropdowns, moderation committees, activity logs, ledgers, and remuneration slips.

---

## 5. Course-Teacher Verification Status Taxonomy

Every course allocation in the system is explicitly categorized with a verified status and source badge:

| Status Badge | Semantic Definition | System Behavior |
| :--- | :--- | :--- |
| **`Verified from Supplied Document`** | Assignment is directly grounded in an inspected document (bill slip VR-2026-8842, official notice, routine). | Preserved as historical reference; cannot be accidentally erased without confirmation. |
| **`Historically Verified`** | Assignment verified from historical exam dossiers (e.g. 2020–2021 4Y 2S). | Serves as authoritative benchmark for course and remuneration rates. |
| **`User-Requested Provisional Assignment`** | Allocation assigned to meet curriculum coverage or user-specified faculty requirements (e.g. Dr. Monir Morshed's 1Y 1S and 4Y 1S assignments). | Clearly tagged with an amber/blue badge indicating provisional status; fully editable by the user. |
| **`Not Yet Assigned`** | Syllabus course belonging to the semester but not part of the initial 5-course plan. | Highlighted in gray with an **"Assign Teacher"** quick-action button in the UI. |

---

## 6. Interactive Assignment Editing Interface

The user interface provides dynamic editing and assignment capabilities:

1. **Viewing Assignments:**
   - In the **Course Management** tab, courses are grouped or filtered by the active semester.
   - Each row displays Course Code, Course Title, Type (Theory/Lab/Project), Credit Hours, Assigned Teacher, Status Badge, and Action Buttons.
2. **Assigning / Reassigning a Teacher:**
   - Clicking **"Edit Assignment"** or **"Assign Teacher"** opens the Course Assignment Modal.
   - The modal dropdown populates with the 10 eligible internal ICT faculty members.
   - Excluded teachers (Rakib Rafiq Ull Kamal) are programmatically filtered out.
   - The user selects the teacher, selects the verification status (e.g., "Provisional" or "Verified"), inputs an optional justification/source note, and clicks **"Save Assignment"**.
   - State updates instantly, saving to `localStorage` and updating the active view without page reload.
3. **Unassigning a Course:**
   - Clicking **"Clear Assignment"** resets the course teacher to `null` and status to `"Not Yet Assigned"`.

---

## 7. The Seven (7) Printable Semester Reports

The system provides 7 distinct, print-ready A4 reports formatted in high-contrast academic layout with MBSTU departmental headers, signatures, and date stamps:

1. **Course-Teacher Assignment Register (`printCourseTeacherList()`):**
   - Formal register of all course allocations in the semester with teacher names, designations, credits, and verification statuses.
2. **Semester Course List (`printSemesterCourseList()`):**
   - Complete semester curriculum including all theory, lab, and elective offerings, credit hours, and assigned teachers or unassigned badges.
3. **Lab Course Assignment Register (`printLabCourseRegister()`):**
   - Specialized report isolating all laboratory courses, lab instructors, contact hours, and sessional remuneration eligibility.
4. **Moderation Assignment Register (`printModerationRegister()`):**
   - Examination moderation committee composition (Chairman, Internal Members, External Examiner) with session and meeting dates.
5. **Teacher-Wise Earnings Statement (`printTeacherWiseEarnings()`):**
   - Comprehensive departmental breakdown showing each teacher's earned remuneration across activities (question setting, moderating, script evaluation, lab exams, tabulation).
6. **Individual Teacher Ledger (`printTeacherLedger(teacherId)`):**
   - Detailed financial ledger for an individual teacher showing all duties, gross earned amount, bill status, approved amount, paid vouchers, and outstanding institutional dues.
7. **Semester Consolidated Bill Statement (`printConsolidatedBillStatement()`):**
   - High-level administrative summary presenting total examination expenditure, total amount billed, total amount disbursed, and remaining unpaid liabilities for the semester.

Each report includes print styling rules (`@media print`) that hide navigation, buttons, and headers, ensuring clean physical or PDF printing on standard A4 paper.
