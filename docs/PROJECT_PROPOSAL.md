# CAPSTONE PROJECT PROPOSAL (PART I)
## Design and Implementation of an Automated Examination, Moderation, Faculty Remuneration & Bill Management System for MBSTU ICT Department

---

### 🏛️ Institutional Identification
* **University:** Mawlana Bhashani Science and Technology University (MBSTU), Santosh, Tangail-1902, Bangladesh
* **Faculty:** Faculty of Engineering
* **Department:** Department of Information and Communication Technology (ICT)
* **Course Title:** Software Engineering Capstone Project / Course Project (Part I: Project Proposal & Prototyping)
* **Academic Session:** 2023–2024 / 2024–2025
* **Submission Date:** October 2026

### 👥 Project Team Members
1. **Md Tahmid Hasib Antor** (Lead Technical Architect & Developer) — **Student ID: IT24055**  
   Email: `tahmidantor123@gmail.com` | GitHub: [@antor1112225](https://github.com/antor1112225)
2. **Saiba Khan** (Requirements Analyst & Quality Assurance)  
   Email: `saibakhan1104@gmail.com` | GitHub: [@saibakhan1104-png](https://github.com/saibakhan1104-png)
3. **Samiul Islam** (Systems Analyst & UI/UX Designer) — **Student ID: IT24011**  
   Email: `it24011@mbstu.ac.bd` | GitHub: [@SAMIUL-01](https://github.com/SAMIUL-01)

### 🔗 Project Access Links
* **🌐 Official Live Interactive System (GitHub Pages):**  
  [https://antor1112225.github.io/MBSTU-ICT-Examination-and-Bill-Management-System/](https://antor1112225.github.io/MBSTU-ICT-Examination-and-Bill-Management-System/)
* **📁 Source Code Repository (GitHub):**  
  [https://github.com/antor1112225/MBSTU-ICT-Examination-and-Bill-Management-System](https://github.com/antor1112225/MBSTU-ICT-Examination-and-Bill-Management-System)

---

## 📑 Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Background Motivation](#2-problem-statement--background-motivation)
3. [Project Objectives & Scope](#3-project-objectives--scope)
4. [Software Process Model & Methodology](#4-software-process-model--methodology)
5. [Work Breakdown, Milestones & Gantt Chart](#5-work-breakdown-milestones--gantt-chart)
6. [Comprehensive Software Engineering Diagrams (UML & Structural Models)](#6-comprehensive-software-engineering-diagrams)
   - 6.1 Data Flow Diagram (DFD Level 0 & Level 1)
   - 6.2 Use Case Diagram
   - 6.3 Activity Diagram
   - 6.4 Entity Relationship Diagram (ERD)
   - 6.5 Class Diagram
   - 6.6 Object Diagram (Runtime Instance Model)
7. [System Architecture & Prototyping Architecture](#7-system-architecture--prototyping-architecture)
8. [Statutory Remuneration Rules & Mathematical Modeling](#8-statutory-remuneration-rules--mathematical-modeling)
9. [Physical Bill Form Replica & Single-Page A4 Fidelity](#9-physical-bill-form-replica--single-page-a4-fidelity)
10. [Technology Stack & Architectural Decisions](#10-technology-stack--architectural-decisions)
11. [Verification, Testing & Results](#11-verification-testing--results)
12. [Conclusion & Academic Declaration](#12-conclusion--academic-declaration)

---

## 1. Executive Summary

In higher academic institutions like **Mawlana Bhashani Science and Technology University (MBSTU)**, examination management is a core statutory undertaking governed by rigorous academic council ordinances. Each semester, the Department of Information and Communication Technology (ICT) coordinates examination committees, syllabus-specific question paper setting (Section-A and Section-B), question moderation sessions, answer script evaluations, practical/laboratory sessions, viva-voce examinations, class tests, results tabulation, and confidential parcel transits.

Currently, faculty remuneration billing is executed through manual, paper-based forms (`মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় - পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`). This manual process is plagued by calculation discrepancies, delayed submissions, complex moderation splits across internal and external university examiners (e.g., RUET, DUET, JU, HSTU), carrier/courier charge tracking, and backlog/special carry duty confusion.

This project delivers an automated, client-side, zero-cost **MBSTU ICT Department Examination, Moderation, Faculty Remuneration, and Bill Management System**. The system automates statutory remuneration calculations across 14 statutory university categories, maintains teacher financial ledgers, manages external examiner coordination, tracks confidential courier vouchers, and generates pixel-perfect, single-page A4 printable replicas of the official university bill form complete with the official MBSTU emblem, 12 designated columns, dotted examiner information lines, Bengali number-to-words translation, and revenue stamp compliance.

---

## 2. Problem Statement & Background Motivation

### 2.1 The Existing Manual Workflow
At the conclusion of each semester final examination, course examiners and examination committee members must compile and submit detailed remuneration bills to the Controller of Examinations via the Examination Committee Chairman.

The physical bill form requires:
1. Identifying course codes, credits, and candidate counts across multiple examination categories.
2. Applying credit-dependent class test rules (3.00 Credits $\implies$ 4 CTs; 2.00 Credits $\implies$ 3 CTs; 1.00 Credit $\implies$ 2 CTs).
3. Calculating moderation honorarium splits among 4 committee members (including an external professor from another university).
4. Recording confidential question paper courier receipts (carrier charges).
5. Segregating regular examinees from Backlog (BL) and Special Carry (SC) candidates.
6. Manually writing the grand total in formal Bengali words (কথায় রূপান্তর).
7. Affixing a BDT 50 statutory revenue stamp with dated signatures.

### 2.2 Operational Inefficiencies & Deficiencies
* **High Human Calculation Error Rate:** Manual arithmetic across 14 statutory rows often leads to mismatched subtotals or incorrect script rates (e.g., ৳120 per script vs. minimum charge).
* **Delayed Accounts Approval:** Errors discovered by Section Officers or the Controller of Examinations require returning physical papers to teachers, causing disbursement delays of several months.
* **Lack of Historical Earning Ledgers:** Department faculty members have no centralized record of pending dues, billed amounts, and disbursed payments across semesters.
* **External Examiner Logistical Challenges:** Coordinating and billing external members from other institutions (RUET, DUET, JU, HSTU, PUST) lacks automated address and voucher tracking.
* **Formatting Non-Compliance:** Modern generic computer invoices are routinely rejected by university accounts because university regulations strictly demand the official prescribed statutory layout.

---

## 3. Project Objectives & Scope

### 3.1 Core Objectives
1. **Automate Statutory Calculation Engine:** Implement accurate automated mathematical models for all 14 statutory examination categories defined in the MBSTU examination remuneration ordinances.
2. **Faithful Physical Bill Slip Replication:** Recreate a 100% authentic, high-fidelity printable replica of the official university examination bill form (`media_1792917826310_847e96fb.png`), fitting precisely on a single A4 page with zero overflow.
3. **Internal & External Examiner Management:** Support seamless management of internal MBSTU faculty and external examiners from other universities, including dynamic "Others" examiner entry.
4. **Historical Ledger & Payment Reconciliation:** Provide individual teacher ledgers tracking accrued workloads, billed sums, approved sanctions, disbursed bank vouchers, and outstanding balances.
5. **Backlog (BL) and Special Carry (SC) Tracking:** Support distinct labeling, course tagging, and workload accounting for non-regular students.
6. **Zero-Cost, Standalone Architecture:** Deliver the solution using zero recurring infrastructure or database costs, utilizing client-side persistent storage and automated GitHub Pages CDN hosting.

### 3.2 Scope Boundaries
* **In Scope:** Undergraduate B.Sc. (Engg.) ICT curriculum examinations across 5 academic sessions (2020–2021 to 2024–2025), internal faculty directory, external examiners across partner universities, 14 statutory activity categories, moderation dossier archiving, bill generation, payment transaction recording, Bengali number-to-words converter, and A4 print engine.
* **Out of Scope:** University Central Accounts ERP integration, online payment gateway (credit card/bKash disbursement), and student grade sheet tabulation (tabulation honorarium is tracked, but actual letter grades remain within the university controller's confidential tabulation sheets).

---

## 4. Software Process Model & Methodology

The development of this system follows the **Agile Evolutionary Prototyping Model**. 

```mermaid
flowchart LR
    A["Requirements Gathering<br/>(Dossiers & Paper Slips)"] --> B["System Architecture<br/>& Data Modeling"]
    B --> C["Core Prototyping<br/>(14 Activity Engines)"]
    C --> D["Physical Slip Replication<br/>(A4 CSS Engine)"]
    D --> E["User Feedback<br/>& Department Review"]
    E -->|Refinement Loop| C
    E --> F["Production Release<br/>(GitHub Pages CDN)"]
```

### Justification for Evolutionary Prototyping
1. **Document-Centric Constraints:** The UI must adhere strictly to physical paper forms (`media_1792917826310_847e96fb.png`) and scanned dossiers (`media_1791908779648_8655bb4f.pdf`). Rapid visual prototyping allowed iterative tuning of column widths (12 columns), dotted line positions, and font sizes.
2. **Incremental Feature Rollout:** The system evolved across 4 structured sprints:
   * **Sprint 1:** Data schema, course master catalog across 5 sessions, internal teacher directory.
   * **Sprint 2:** 14-row billing calculation engine, moderation honorarium sharing, and financial ledger.
   * **Sprint 3:** Authentic single-page A4 bill slip replica, MBSTU logo embedding, and courier charge voucher integration.
   * **Sprint 4:** External examiner calculation under "Others", backlog (BL/SC) duty modal, and Bengali words converter.

---

## 5. Work Breakdown, Milestones & Gantt Chart

### 5.1 Project Milestone Table

| Milestone | Phase / Deliverable | Key Outcomes | Status |
| :--- | :--- | :--- | :--- |
| **M1** | Problem Investigation & Domain Analysis | Analysis of official MBSTU examination dossiers, rates, and paper bill forms. | ✅ Completed |
| **M2** | Data Architecture & Curriculum Seeding | Seeding 70+ courses across 5 academic sessions (1Y 1S to 4Y 2S) and internal faculty directory. | ✅ Completed |
| **M3** | Statutory Calculation Engine | Mathematical rules for all 14 statutory categories, CT credit rules, and moderation shares. | ✅ Completed |
| **M4** | A4 Physical Bill Slip Replication | Precise CSS grid layout, vector emblem/logo integration, dotted examiner lines, and revenue stamp box. | ✅ Completed |
| **M5** | External Examiner & Others Integration | Dynamic input for external professors (RUET, DUET, JU, HSTU), TA/DA and transit vouchers. | ✅ Completed |
| **M6** | Quality Assurance, Testing & Deployment | End-to-end testing, Bengali number-to-words verification, and live deployment on GitHub Pages. | ✅ Completed |

### 5.2 Project Gantt Chart

```mermaid
gantt
    title MBSTU ICT Examination & Bill Management System Schedule
    dateFormat  YYYY-MM-DD
    section Phase 1: Inception
    Domain & Document Analysis           :done, p1, 2026-10-10, 2026-10-13
    Curriculum & Rate Specifications     :done, p2, 2026-10-13, 2026-10-15
    section Phase 2: Architecture
    Database Schema & State Modeling     :done, p3, 2026-10-15, 2026-10-18
    UML Modeling & Requirements Analysis :done, p4, 2026-10-18, 2026-10-20
    section Phase 3: Development
    Statutory Calculation Engines        :done, p5, 2026-10-20, 2026-10-23
    Official A4 Bill Slip Replica        :done, p6, 2026-10-23, 2026-10-25
    External Examiner (Others) Module    :done, p7, 2026-10-25, 2026-10-27
    section Phase 4: QA & Deployment
    E2E Verification & Browser Testing   :done, p8, 2026-10-27, 2026-10-28
    GitHub Repository & Live CDN Release :done, p9, 2026-10-28, 2026-10-28
```

---

## 6. Comprehensive Software Engineering Diagrams

### 6.1 Data Flow Diagrams (DFD)

#### Level 0: Context Data Flow Diagram
```mermaid
graph TD
    Teacher["Faculty Member / Examiner<br/>(Internal / External)"]
    Chairman["Exam Committee Chairman"]
    Officer["Section Officer / Controller Office"]
    System["MBSTU ICT Exam & Bill Management System"]

    Teacher -->|Submits Workload, Scripts & Courier Vouchers| System
    Chairman -->|Moderation Dossier, Committee Approvals| System
    Officer -->|Payment Vouchers & Disbursed Accounts| System

    System -->|Official Single-Page A4 Bill Slip| Teacher
    System -->|Committee Moderation Statement & Summary| Chairman
    System -->|Sanctioned Bill Register & Audit Statements| Officer
```

#### Level 1: Detailed Functional Data Flow Diagram
```mermaid
graph TD
    D1[(Semesters & Courses DB)]
    D2[(Faculty & Examiners DB)]
    D3[(Activities & Duties DB)]
    D4[(Bills & Approvals DB)]
    D5[(Payment Accounts DB)]

    P1["1.0 Duty & Workload Recording"]
    P2["2.0 Rate & Credit Engine Calculation"]
    P3["3.0 Moderation & Committee Splitting"]
    P4["4.0 Bill Slip Compilation & A4 Rendering"]
    P5["5.0 Accounts Disbursement Reconciliation"]

    Teacher["Examiner (Internal / External)"] -->|Logs Workload| P1
    P1 <--> D1
    P1 <--> D2
    P1 -->|Stored Activities| D3

    D3 --> P2
    P2 -->|Calculated Remuneration| D3

    D3 --> P3
    P3 -->|Allocated Member Shares| D4

    D4 --> P4
    P4 -->|Generated A4 Bill Slip with Emblem & Stamp| Teacher
    P4 -->|Sanction Note| Accounts["Accounts Section Officer"]

    Accounts -->|Disbursement Record| P5
    P5 <--> D4
    P5 -->|Payment Voucher| D5
```

---

### 6.2 Use Case Diagram

```mermaid
flowchart LR
    subgraph Actors
        T["Faculty / Examiner<br/>(Internal / External)"]
        C["Exam Committee Chairman"]
        A["Department Administrator"]
        O["Accounts / Section Officer"]
    end

    subgraph "MBSTU ICT Examination System"
        UC1(["UC-01: Log Dynamic Exam Duties (Date, Workload)"])
        UC2(["UC-02: Manage Backlog (BL) & Special Carry (SC)"])
        UC3(["UC-03: Input External Examiner under Others"])
        UC4(["UC-04: Compile Official Moderation Dossier"])
        UC5(["UC-05: Generate 14-Row Statutory Bill Slip"])
        UC6(["UC-06: Apply Courier / Carrier Charge Vouchers"])
        UC7(["UC-07: Track Teacher Ledger & Due Balances"])
        UC8(["UC-08: Record Accounts Disbursement & Revenue Stamp"])
        UC9(["UC-09: Export Full JSON System Backup"])
        UC10(["UC-10: Print Formal Single-Page A4 Bill Form"])
    end

    T --> UC1
    T --> UC2
    T --> UC7
    T --> UC10

    C --> UC4
    C --> UC5
    C --> UC6
    C --> UC10

    A --> UC3
    A --> UC9
    A --> UC4

    O --> UC8
    O --> UC7
    O --> UC10
```

---

### 6.3 Activity Diagram (End-to-End Examination Billing Workflow)

```mermaid
stateDiagram-v2
    [*] --> ExaminationConducted
    ExaminationConducted --> RecordWorkload : Question Paper, Evaluation, Lab, CT
    RecordWorkload --> CheckCandidateType
    
    state CheckCandidateType <<choice>>
    CheckCandidateType --> RegularCandidate : Scope == Regular
    CheckCandidateType --> BacklogCandidate : Scope == BL / SC
    
    RegularCandidate --> CalculateRate
    BacklogCandidate --> TagBacklogAndCalculate : Add (BL) / (SC) Identifier
    
    TagBacklogAndCalculate --> CalculateRate
    CalculateRate --> CheckCourierVoucher
    
    state CheckCourierVoucher <<choice>>
    CheckCourierVoucher --> AddCarrierCharge : Courier Memo Present (Row 14)
    CheckCourierVoucher --> SumGrossAmount : No Courier Memo
    AddCarrierCharge --> SumGrossAmount
    
    SumGrossAmount --> ConvertToBanglaWords : Mathematical Total to Words
    ConvertToBanglaWords --> RenderA4BillSlip : 12 Columns, Emblem, Stamp Box
    RenderA4BillSlip --> ChairmanApproval : Committee Counter-Signature
    ChairmanApproval --> OfficeSanction : Section Officer & Controller Seal
    OfficeSanction --> PaymentDisbursed : Bank Cheque / EFT + Revenue Stamp
    PaymentDisbursed --> [*]
```

---

### 6.4 Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    SEMESTER {
        string id PK
        string session
        string yearLevel
        string semesterNumber
        int regularExaminees
        int backlogExaminees
        string examPeriod
        string status
    }

    COURSE {
        string id PK
        string semesterId FK
        string code
        string title
        float credit
        string courseType
        string assignedTeacherId FK
        int classTestCount
        int studentCount
    }

    TEACHER {
        string id PK
        string nameBn
        string nameEn
        string designation
        string department
        string institution
        boolean isExternal
        string phone
        string email
    }

    EXAM_ACTIVITY {
        string id PK
        string semesterId FK
        string courseId FK
        string teacherId FK
        int categoryNumber
        string activityDate
        string activityNameEn
        string activityNameBn
        string candidateType
        float workloadQuantity
        float rateApplied
        float calculatedAmount
        string relatedBillId FK
        string billStatus
    }

    BILL {
        string id PK
        string billNo UK
        string semesterId FK
        string teacherId FK
        string preparationDate
        boolean carrierEnabled
        float carrierCharge
        string carrierVoucherNo
        float grossAmount
        float approvedAmount
        float paidAmount
        float outstandingBalance
        string status
    }

    PAYMENT {
        string id PK
        string billId FK
        string teacherId FK
        string semesterId FK
        string paymentDate
        float amountPaid
        string paymentMethod
        string receiptVoucherNo
        boolean hasRevenueStamp
        string recordedBy
    }

    SEMESTER ||--o{ COURSE : "contains"
    SEMESTER ||--o{ EXAM_ACTIVITY : "hosts"
    COURSE ||--o{ EXAM_ACTIVITY : "references"
    TEACHER ||--o{ EXAM_ACTIVITY : "executes"
    TEACHER ||--o{ BILL : "receives"
    BILL ||--o{ EXAM_ACTIVITY : "compiles"
    BILL ||--o{ PAYMENT : "settled_by"
```

---

### 6.5 Class Diagram (Object-Oriented Design)

```mermaid
classDiagram
    class AppController {
        +AppState state
        +init()
        +loadState()
        +saveState()
        +renderAll()
        +switchTab(tabId)
        +handleGlobalSemesterChange(semId)
        +updateTeacherDropdowns()
        +renderPrintableBillSlip(billId)
        +exportFullJSONBackup()
    }

    class AppState {
        +List~Semester~ semesters
        +List~Course~ courses
        +List~Teacher~ teachers
        +List~ExamActivity~ examActivities
        +List~Bill~ bills
        +List~Payment~ payments
        +List~BillingRate~ billingRules
        +BillFormConfig formConfig
        +string currentSemesterId
        +string selectedTeacherId
    }

    class Teacher {
        +string id
        +string nameBn
        +string nameEn
        +string designation
        +string department
        +string institution
        +boolean isExternal
        +string phone
        +string email
        +getFormattedAddress() string
    }

    class Course {
        +string id
        +string semesterId
        +string code
        +string title
        +float credit
        +string courseType
        +string assignedTeacherId
        +int calculateRequiredCTs()
    }

    class ExamActivity {
        +string id
        +string activityDate
        +string semesterId
        +string courseId
        +string teacherId
        +int categoryNumber
        +string candidateType
        +float workloadQuantity
        +float rateApplied
        +float calculatedAmount
        +calculateTotal() float
    }

    class Bill {
        +string id
        +string billNo
        +string semesterId
        +string teacherId
        +string preparationDate
        +boolean carrierEnabled
        +float carrierCharge
        +string carrierVoucherNo
        +float grossAmount
        +float approvedAmount
        +float paidAmount
        +float outstandingBalance
        +recalculateTotals()
        +convertToBengaliWords() string
    }

    class Payment {
        +string id
        +string billId
        +string teacherId
        +string paymentDate
        +float amountPaid
        +string paymentMethod
        +string receiptVoucherNo
        +boolean hasRevenueStamp
    }

    AppController o-- AppState
    AppState *-- Teacher
    AppState *-- Course
    AppState *-- ExamActivity
    AppState *-- Bill
    AppState *-- Payment
    Bill "1" o-- "1..*" ExamActivity : compiles
    Bill "1" o-- "0..*" Payment : receives
```

---

### 6.6 Object Diagram (Runtime Instance Snapshot)

This diagram visualizes two genuine runtime bill instances currently operating within the MBSTU ICT system:

```mermaid
flowchart TD
    subgraph "Instance 1: Internal Faculty Bill (Assoc. Prof. Rupali Sultana)"
        T_Rupali["teacher1: Teacher<br/>id = 't_rupali'<br/>nameEn = 'Rupali Sultana'<br/>nameBn = 'রুপালী সুলতানা'<br/>institution = 'MBSTU'"]
        C_2111["course1: Course<br/>code = 'ICT-2111'<br/>title = 'Statistics for Engineers'<br/>credit = 3.00"]
        
        Act_QS["act1: ExamActivity (Cat 1: Question Setting)<br/>amount = ৳4,000.00"]
        Act_Eval["act2: ExamActivity (Cat 3: Script Evaluation)<br/>qty = 57, rate = ৳120, amount = ৳6,840.00"]
        Act_CT["act3: ExamActivity (Cat 13: Class Tests)<br/>qty = 4 CTs (3 Cr), amount = ৳5,400.00"]
        
        Bill_Rupali["bill1: Bill<br/>billNo = 'MBSTU/ICT/BILL/2025/RUPALI'<br/>carrierCharge = ৳800.00 (SA-PARCEL-8812)<br/>grossAmount = ৳17,040.00<br/>words = 'সতেরো হাজার চল্লিশ টাকা মাত্র'"]
        
        T_Rupali --> Bill_Rupali
        C_2111 --> Act_QS
        C_2111 --> Act_Eval
        C_2111 --> Act_CT
        Act_QS --> Bill_Rupali
        Act_Eval --> Bill_Rupali
        Act_CT --> Bill_Rupali
    end

    subgraph "Instance 2: External Examiner Bill (Prof. Dr. Abdullah Al Mamun, HSTU)"
        T_Abdullah["teacher2: Teacher<br/>id = 'ext_abdullah_hstu'<br/>nameEn = 'Dr. Abdullah Al Mamun'<br/>nameBn = 'ড. আব্দুল্লাহ আল মামুন'<br/>institution = 'HSTU, Dinajpur'<br/>isExternal = true"]
        
        Act_ExtMod["act4: ExamActivity (Cat 2: Question Moderation)<br/>amount = ৳4,500.00 (External Member Share)"]
        Act_ExtQS["act5: ExamActivity (Cat 1: Question Setting Part-B)<br/>amount = ৳4,000.00"]
        
        Bill_Abdullah["bill2: Bill<br/>billNo = 'MBSTU/ICT/BILL/2025/11/EXT-01'<br/>carrierCharge = ৳1,500.00 (VR-HSTU-TA-88)<br/>grossAmount = ৳10,000.00<br/>words = 'দশ হাজার টাকা মাত্র'"]
        
        T_Abdullah --> Bill_Abdullah
        Act_ExtMod --> Bill_Abdullah
        Act_ExtQS --> Bill_Abdullah
    end
```

---

## 7. System Architecture & Prototyping Architecture

The application is structured into **11 interconnected modules** accessed through a high-contrast academic dashboard:

```
MBSTU ICT Examination & Bill Management Portal
├── 1. 📊 Executive Dashboard (Financial KPIs, Accruals, Outstanding Sums)
├── 2. 🗓️ Semesters Registry (Session 2020-21 through 2024-25)
├── 3. 📚 Courses & Earnings (Curriculum Codes, Credits, Workloads)
├── 4. 📑 Exam & Moderation Dossier Archive (Committee Allocations)
├── 5. 👨‍🏫 Faculty & Examiners Directory (Internal MBSTU & External/Others)
├── 6. 📝 Dynamic Exam Activities (Workloads, Scripts, Dates, BL/SC)
├── 7. 💰 Teacher Financial Ledger (Accrued, Billed, Paid, Balances)
├── 8. 📄 Bills & Approvals (Bill Slips Compilation & Audit Sanction)
├── 9. 💳 Payment Transactions (Disbursement Vouchers & Revenue Stamps)
├── 10. ⚙️ Statutory Rates Configurator (14 Ordinance Categories)
└── 11. 🖨️ Official Bill Slip (14-Row A4 Single-Page Formal University Form)
```

---

## 8. Statutory Remuneration Rules & Mathematical Modeling

The system implements strict MBSTU examination remuneration ordinances:

### 8.1 Statutory Rate Formulas
$$\text{Remuneration} = \begin{cases} 
\text{Fixed Rate} & \text{for Cat 1 (Setting: } \text{৳}4000\text{), Cat 8 (Chairman: } \text{৳}2250\text{)} \\
\text{Quantity} \times \text{Unit Rate} & \text{for Cat 3 (Scripts } \times \text{৳}120\text{), Cat 5 (Lab } \times \text{৳}100\text{)} \\
\frac{\text{Total Moderation Sum}}{4} & \text{for Cat 2 (Moderation: 4-way committee split)} \\
\text{Voucher Amount} & \text{for Cat 14 (Courier memos, TA/DA)}
\end{cases}$$

### 8.2 Class Test (CT) Assessment Engine
$$\text{Required CTs} = \begin{cases}
4 \text{ Tests} & \text{if Course Credit} \ge 3.00 \\
3 \text{ Tests} & \text{if Course Credit} = 2.00 \\
2 \text{ Tests} & \text{if Course Credit} = 1.00
\end{cases}$$

$$\text{CT Remuneration} = \text{Required CTs} \times \text{৳}1,350.00$$

### 8.3 Courier / Carrier Charge Formulation
$$\text{Grand Bill Total} = \sum_{i=1}^{13} \text{ActivityAmount}_i + \text{CarrierCharge}_{\text{Row 14}}$$

---

## 9. Physical Bill Form Replica & Single-Page A4 Fidelity

Unlike ordinary software invoices, university regulatory audits reject non-conforming paperwork. The generated bill slip in **Tab 11** matches physical document `media_1792917826310_847e96fb.png`:

1. **Header Block:**
   * High-resolution official emblem of Mawlana Bhashani Science and Technology University.
   * Prominent Bengali title: `মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়`.
   * Form subtitle: `পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`.
   * Dotted line examiner bio-data block (Bengali name, uppercase English name, designation, department, and university address).
2. **Standard 12-Column Table Grid:**
   * ১. ক্রমিক নং | ২. কাজের নাম | ৩. পরীক্ষার নাম | ৪. পরীক্ষার সন | ৫. বিভাগ | ৬. কোর্স নম্বর | ৭. পরীক্ষার্থী/খাতা সংখ্যা | ৮. দিন/সদস্য সংখ্যা | ৯. কোর্সের ক্রেডিট | ১০. টেস্টের সংখ্যা | ১১. টাকা | ১২. পয়সা
3. **14 Official Statutory Work Rows:**
   * Rows 1 to 14 permanently anchored in institutional sequence.
4. **Approval & Revenue Stamp Block:**
   * Written amount in Bengali words (e.g., *সতেরো হাজার চল্লিশ টাকা মাত্র*).
   * 50 Taka statutory revenue stamp box with examiner signature line.
   * Three statutory signing blocks: (1) Chairman, Exam Committee; (2) Section Officer / Asst. Controller; (3) Controller of Examinations.
5. **Zero Page Overflow:** Strict print stylesheet (`@media print`) locking margins to `8mm 12mm`, grid font to `7.4pt`, and page height to `297mm`, ensuring 100% single-page A4 output.

---

## 10. Technology Stack & Architectural Decisions

| Layer / Concern | Technology Chosen | Technical Justification |
| :--- | :--- | :--- |
| **Front-End View Engine** | Semantic HTML5 & CSS3 Grid/Flexbox | Fast, accessible rendering with strict A4 print geometry. |
| **Client Logic & State** | Vanilla Modern JavaScript (ES6+) | Eliminates heavy node/npm dependencies; runs directly in any browser offline. |
| **Data Persistence** | Browser `localStorage` API + JSON Export | Zero server infrastructure costs; departmental privacy preserved locally. |
| **Branding & Assets** | High-Res PNG Logo + Clean Vector Typography | Authentic university visual identity compliant with paper standards. |
| **Hosting & Deployment** | GitHub Pages CDN | Highly reliable, SSL-certified global hosting updated via Git commits. |
| **Version Control** | Git & GitHub Team Collaboration | Full commit history and distributed team workflow. |

---

## 11. Verification, Testing & Results

The prototype has undergone extensive validation:

1. **Authentic Baseline Verification:** Validated against Associate Professor Rupali Sultana's actual paper bill slip (`media_1792917826310_847e96fb.png`):
   * Question Setting (৳4,000) + 57 Scripts @ ৳120 (৳6,840) + 4 CTs for 3 Cr (৳5,400) + Courier (৳800) = **৳17,040.00**.
   * Words Conversion: `সতেরো হাজার চল্লিশ টাকা মাত্র` (100% Match).
2. **External Examiner Verification:** Tested with Prof. Dr. Abdullah Al Mamun (HSTU) for 1Y 1S (`sem_2024_11`) and Prof. Dr. Anwar Hossain (RUET) for 2Y 1S (`sem_2023_21`). All address details and moderation split calculations passed.
3. **A4 Single-Page Print Verification:** Verified via automated headless browser print emulation (`window.print()`). Page 2 spillover is strictly zero.
4. **Browser Compatibility:** Tested and verified on Google Chrome, Mozilla Firefox, and Microsoft Edge.

---

## 12. Conclusion & Academic Declaration

The **MBSTU ICT Department Examination, Moderation, Faculty Remuneration, and Bill Management System** bridges the gap between traditional university administrative paper bureaucracy and modern automated software engineering. By adhering strictly to the university's official paper form geometry while offering modern financial analytics, multi-semester ledgers, and external examiner flexibility, this project delivers immediate, practical utility to the Department of Information and Communication Technology.

We submit this proposal as our formal **Software Engineering Capstone Project Proposal (Part I)**.

### Student Signatures & Endorsement

```
____________________________          ____________________________          ____________________________
  Md Tahmid Hasib Antor                  Saiba Khan                            Samiul Islam
  Student ID: IT24055                    Collaborator                          Student ID: IT24011
  Dept. of ICT, MBSTU                    Dept. of ICT, MBSTU                   Dept. of ICT, MBSTU
```

---
*Generated & Submitted for Department of ICT, Mawlana Bhashani Science and Technology University (MBSTU).*
