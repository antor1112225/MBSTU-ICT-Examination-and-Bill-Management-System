# MBSTU ICT Department Examination & Semester Bill Management System
## Database and Relational Data Model Specification

**Document File:** `docs/DATABASE_OR_DATA_MODEL.md`  
**Storage Architecture:** Browser `localStorage` / Client-Side Relational Store with JSON Export/Import  
**Namespace Key:** `mbstu_ict_exam_bills_v1`  
**Target Environment:** 100% Offline, Zero Financial Cost, Standalone Web App  

---

## 1. Architectural Overview

The application utilizes a normalized, relational client-side document store structured in JavaScript objects and serialized to `localStorage`. Every entity possesses a unique, immutable primary key (`UUID` or prefixed slug, e.g. `sem_2025_21`, `tchr_nargis`, `bill_2026_001`).

Referential integrity is strictly enforced by the service layer:
- Courses cannot be orphaned without a valid Semester.
- Examination activities must link to an existing Semester, Course, and Teacher.
- Payments must reference an existing Bill and cannot exceed the current outstanding balance.
- Finalized bills maintain frozen historical calculation snapshots so future rule changes never alter historical records.

```
+---------------+        1:N        +-------------+        1:N        +------------------+
|   SEMESTER    | ----------------> |   COURSE    | ----------------> |  EXAM_ACTIVITY   |
+---------------+                   +-------------+                   +------------------+
        |                                                                      |
        | 1:N                                                                  | 1:N
        v                                                                      v
+---------------+        1:N        +-------------+        1:N        +------------------+
| EXAM_COMMITTEE|                   |   TEACHER   | <---------------- |    BILL_ITEM     |
+---------------+                   +-------------+                   +------------------+
                                           |                                   |
                                           | 1:N                               | N:1
                                           v                                   v
                                    +-------------+        1:N        +------------------+
                                    |   PAYMENT   | <---------------- |       BILL       |
                                    +-------------+                   +------------------+
```

---

## 2. Entity Schemas and Field Definitions

### 2.1 Entity: `Semester` (`semesters`)
Represents an academic term and its corresponding final examination cycle.
```typescript
interface Semester {
    id: string;                    // Primary Key: e.g. "sem-2025-2-1"
    session: string;               // e.g. "2023-2024" or "2021-2022"
    academicYear: string;          // e.g. "2025"
    yearLevel: string;             // e.g. "2nd Year" or "4th Year"
    semesterNumber: string;        // e.g. "1st Semester" or "2nd Semester"
    semesterName: string;          // e.g. "2nd Year 1st Semester Final Examination 2025"
    examPeriod: string;            // e.g. "February-March 2026"
    examineeCountRegular: number;  // e.g. 57
    examineeCountBacklog: number;  // e.g. 18
    examineeCountSpecial: number;  // e.g. 11
    totalExaminees: number;        // Auto-computed: 57 + 18 + 11 = 86
    status: 'Upcoming' | 'In Progress' | 'Evaluation Complete' | 'Billed' | 'Archived';
    notes?: string;
    createdAt: string;
}
```

### 2.2 Entity: `Teacher` (`teachers`)
Represents internal MBSTU faculty or external examiners from other universities.
```typescript
interface Teacher {
    id: string;                    // Primary Key: e.g. "tchr-nargis"
    nameBn: string;                // e.g. "ড. মোসাঃ নার্গিস আক্তার"
    nameEn: string;                // e.g. "Dr. Mst. Nargis Aktar"
    designation: string;           // e.g. "Professor" or "Associate Professor"
    department: string;            // e.g. "Dept. of ICT"
    institution: string;           // e.g. "MBSTU" or "RUET" or "DUET"
    isExternal: boolean;           // true if outside MBSTU
    phone?: string;                // e.g. "01701876194"
    email?: string;                // e.g. "nargis_ict@mbstu.ac.bd"
    status: 'Active' | 'Inactive';
    createdAt: string;
}
```

### 2.3 Entity: `Course` (`courses`)
Represents a theory or laboratory/sessional course offered in a semester.
```typescript
interface Course {
    id: string;                    // Primary Key: e.g. "crs-ict-2101"
    semesterId: string;            // Foreign Key -> semesters.id
    code: string;                  // e.g. "ICT-2101", "ICT-2102"
    title: string;                 // e.g. "Computer Organization and Architecture"
    credit: number;                // e.g. 3.00, 1.50
    courseType: 'Theory' | 'Lab/Sessional';
    assignedInternalTeacherId: string; // Foreign Key -> teachers.id
    assignedExternalTeacherId?: string; // Foreign Key -> teachers.id (Optional for lab)
    studentCount: number;          // e.g. 57
    classTestCount: number;        // e.g. 4
    notes?: string;
}
```

### 2.4 Entity: `BillingRule` (`billing_rules`)
Admin-configurable rate definitions corresponding to the 14 official MBSTU bill items.
```typescript
interface BillingRule {
    categoryNumber: number;        // 1 to 14
    categoryNameBn: string;        // e.g. "উত্তর পত্র মূল্যায়ন"
    categoryNameEn: string;        // e.g. "Answer Script Evaluation"
    calcUnit: 'per_script' | 'per_student' | 'per_question' | 'per_committee' | 'fixed' | 'class_test_formula' | 'voucher';
    defaultRate: number;           // e.g. 120.00, 100.00, 75.00, 200.00, 2250.00
    minCharge?: number;            // e.g. 500.00
    description: string;
    isActive: boolean;
}
```

### 2.5 Entity: `ExamActivity` (`exam_activities`)
Records work performed by a specific teacher for a course or committee duty.
```typescript
interface ExamActivity {
    id: string;                    // Primary Key: e.g. "act-2026-001"
    semesterId: string;            // Foreign Key -> semesters.id
    courseId?: string;             // Foreign Key -> courses.id (optional for committee/tabulation)
    teacherId: string;             // Foreign Key -> teachers.id
    categoryNumber: number;        // 1 to 14
    activityDescription: string;   // e.g. "Answer Script Evaluation (54 scripts)"
    workloadQuantity: number;      // e.g. 54 (scripts/students/questions)
    rateApplied: number;           // e.g. 120.00
    creditHour?: number;           // e.g. 3.00
    classTestCount?: number;       // e.g. 4
    calculatedAmount: number;      // e.g. 6480.00
    approvedAmount: number;        // e.g. 6480.00
    billStatus: 'Recorded' | 'Billed' | 'Approved' | 'Partially Paid' | 'Paid';
    relatedBillId?: string;        // Foreign Key -> bills.id
    referenceNote?: string;        // e.g. "Course ICT-2101 Final Exam"
    createdAt: string;
}
```

### 2.6 Entity: `Bill` (`bills`)
Represents an official generated bill slip ready for review, approval, and printing.
```typescript
interface Bill {
    id: string;                    // Primary Key: e.g. "bill-2026-nargis"
    billNo: string;                // e.g. "MBSTU/ICT/BILL/2026/012"
    semesterId: string;            // Foreign Key -> semesters.id
    teacherId: string;             // Foreign Key -> teachers.id
    preparationDate: string;       // e.g. "2026-03-15"
    grossAmount: number;           // Sum of items: e.g. 55600.00
    deductions: number;            // e.g. 0.00
    approvedAmount: number;        // e.g. 55600.00
    paidAmount: number;            // Accumulated payments: e.g. 30000.00
    outstandingBalance: number;    // approvedAmount - paidAmount: e.g. 25600.00
    status: 'Draft' | 'Approved' | 'Partially Paid' | 'Paid';
    chairmanSigned: boolean;
    approvalDate?: string;
    remarks?: string;
    createdAt: string;
}
```

### 2.7 Entity: `PaymentRecord` (`payment_records`)
Records actual financial disbursements made by the accounts office to a teacher.
```typescript
interface PaymentRecord {
    id: string;                    // Primary Key: e.g. "pay-2026-001"
    billId: string;                // Foreign Key -> bills.id
    teacherId: string;             // Foreign Key -> teachers.id
    semesterId: string;            // Foreign Key -> semesters.id
    paymentDate: string;           // e.g. "2026-03-20"
    amountPaid: number;            // e.g. 30000.00
    paymentMethod: 'Cash' | 'Cheque' | 'Bank Transfer';
    receiptVoucherNo: string;      // e.g. "VR-2026-8842"
    hasRevenueStamp: boolean;      // true if ৳10 revenue stamp acknowledged
    recordedBy: string;            // e.g. "Section Officer (Accounts)"
    notes?: string;
}
```

---

## 3. Data Integrity & Validation Rules

1. **Anti-Orphan Enforcement:** Deleting a semester prompts a confirmation cascade check. If existing bills or payment transactions exist, hard deletion is blocked to protect financial records.
2. **Payment Ceiling Invariant:** For any payment $P$ linked to bill $B$:
   $$\sum P_{\text{amount}} \le B_{\text{approvedAmount}}$$
   Overpayments beyond the approved bill balance trigger an immediate validation error.
3. **State Separation Invariant:** Generating a bill never updates `paidAmount`. The state changes to `Paid` if and only if valid `PaymentRecord` transactions sum up to `approvedAmount`.
4. **Historical Rate Preservation:** When an activity is added to a bill, `rateApplied` and `calculatedAmount` are stored permanently in the activity and bill items. Updating global system rates never modifies historical finalized records.
