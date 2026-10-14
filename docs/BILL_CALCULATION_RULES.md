# MBSTU ICT Department Examination & Semester Bill Management System
## Bill Calculation Rules and Mathematical Formulas

**Document File:** `docs/BILL_CALCULATION_RULES.md`  
**Applicability:** Semester Final Examinations, Internal Assessments, Practical/Sessional Labs, and Committee Allowances  
**Monetary Unit:** Bangladeshi Taka (BDT / ৳)  

---

## 1. Overview of Calculation Engine

The calculation engine evaluates gross remuneration for examination activities based on defined rate rules. Each rule specifies:
- **Quantity Metric ($Q$):** e.g., scripts checked, examinees evaluated, questions set, days served.
- **Base Unit Rate ($R$):** The rate in Taka per unit.
- **Credit Multiplier ($C$):** Course credit hour where applicable (e.g. 3.00 Cr).
- **Minimum Threshold Charge ($M$):** Minimum fee guaranteed to an examiner regardless of small quantity.
- **Gross Payable Amount ($A$):** The resulting calculated sum.

---

## 2. Mathematical Formulations for the 14 Official MBSTU Activity Categories

### Category 01: প্রশ্নপত্র প্রণয়ন (Question Paper Setting)
- **Rule Type:** Fixed per paper / credit-based
- **Formula:**
  $$A = R_{\text{setting}} \times N_{\text{papers}}$$
- **Default Rates:**
  - Full Paper (3.00 Credits): $R = ৳4,000.00$
  - Half Paper / Special: $R = ৳2,000.00$
- **Example:** Setting 1 full paper for `ICT-3201` $\implies 1 \times 4000 = ৳4,000.00$.

---

### Category 02: প্রশ্নপত্র সমীক্ষণ (Question Moderation)
- **Rule Type:** Fixed committee honorarium or shared per-paper rate
- **Formula:**
  $$A = R_{\text{mod}} \times N_{\text{papers}}$$ or configured committee session allocation.
- **Observed Range:** ৳2,000.00 to ৳4,700.00 per member.

---

### Category 03: উত্তর পত্র মূল্যায়ন (Answer Script Evaluation)
- **Rule Type:** Rate per script with minimum threshold
- **Formula:**
  $$A = \max\left( N_{\text{scripts}} \times R_{\text{script}}, M_{\text{min\_eval}} \right)$$
- **Default Parameters:**
  - $R_{\text{script}} = ৳120.00$ per script
  - $M_{\text{min\_eval}} = ৳500.00$
- **Examples:**
  - 54 scripts of `ICT-3107`: $54 \times 120 = ৳6,480.00$.
  - 03 scripts of `ICT-3101`: $\max(3 \times 120, 500) = \max(360, 500) = ৳500.00$ (or ৳700 as observed).

---

### Category 04: মৌখিক পরীক্ষা / কম্প্রেহেনসিভ মৌখিক পরীক্ষা (Viva-Voce)
- **Rule Type:** Rate per student or day
- **Formula:**
  $$A = N_{\text{candidates}} \times R_{\text{viva}}$$
- **Default Parameters:** $R_{\text{viva}} = ৳120.00$ per candidate.

---

### Category 05: ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা (Practical / Lab Examination)
- **Rule Type:** Rate per candidate evaluated
- **Formula:**
  $$A = N_{\text{students}} \times R_{\text{lab}}$$
- **Default Parameters:** $R_{\text{lab}} = ৳100.00$ per candidate.
- **Example:** 57 students in `ICT-2102`: $57 \times 100 = ৳5,700.00$.

---

### Category 06: ট্যাবুলেশন (Tabulation)
- **Rule Type:** Rate per candidate tabulated
- **Formula:**
  $$A = N_{\text{total\_examinees}} \times R_{\text{tabulation}}$$
- **Default Parameters:** $R_{\text{tabulation}} = ৳75.00$ per examinee.
- **Example:** 86 examinees (57 Regular + 18 Backlog + 11 Special): $86 \times 75 = ৳6,450.00$.

---

### Category 07: কম্প্রেহেনসিভ ট্যাবুলেশন / ভেরিফিকেশন (Comprehensive Verification)
- **Rule Type:** Rate per verified examinee
- **Formula:**
  $$A = N_{\text{verified}} \times R_{\text{comp\_tab}}$$

---

### Category 08: সভাপতি / সদস্যর ভাতা (Chairman / Member Allowance)
- **Rule Type:** Fixed committee honorarium
- **Default Parameters:**
  - Examination Committee Chairman: $৳2,250.00$
  - Committee Member: Configurable fixed allowance (e.g. $৳1,500.00$).

---

### Category 09: প্রশ্নপত্র লিখন ও যাচাই (Question Typing & Verification)
- **Rule Type:** Rate per typed question paper
- **Formula:**
  $$A = N_{\text{questions}} \times R_{\text{typing}}$$
- **Default Parameters:** $R_{\text{typing}} = ৳200.00$ per question.
- **Example:** 6 questions typed: $6 \times 200 = ৳1,200.00$.

---

### Category 10: থিসিস / রিসার্চ প্রজেক্ট (Thesis / Research Project Evaluation)
- **Rule Type:** Rate per student or thesis report evaluated
- **Formula:**
  $$A = N_{\text{thesis}} \times R_{\text{thesis}}$$

---

### Category 11 & 12: সেমিনার / ইন্টার্নশিপ / প্রেজেন্টেশন (Seminar / Internship / Industrial Training)
- **Rule Type:** Rate per candidate or report evaluated
- **Formula:**
  $$A = N_{\text{reports}} \times R_{\text{internship}}$$

---

### Category 13: ক্লাস টেস্ট (Class Test Assessment)
- **Rule Type:** Dynamic class test calculation
- **Formula:**
  $$A = N_{\text{students}} \times \text{Credit} \times N_{\text{tests}} \times R_{\text{ct\_unit}}$$
  *(Or direct recorded departmental allowance, e.g. ৳2,740.00 or ৳5,400.00).*

---

### Category 14: ইনসিডেন্টাল চার্জ (Incidental Charges)
- **Rule Type:** Actual expense reimbursement with voucher attachment
- **Formula:**
  $$A = \sum \text{Voucher Amounts}$$

---

## 3. Bill Summary, Gross & Net Payable Invariant

For any official bill $B$:
$$\text{Gross Amount } (G) = \sum_{i=1}^{14} A_i$$
$$\text{Approved Amount } (AP) = G - \text{Authorized Deductions}$$
$$\text{Outstanding Balance } (OB) = AP - \sum P_{\text{paid}}$$

- **Underpayment / Partial Disbursement:** Permitted.
- **Overpayment:** Strictly forbidden ($OB \ge 0$).
- **Monetary Precision:** Handled with strict rounding to 2 decimal places.
