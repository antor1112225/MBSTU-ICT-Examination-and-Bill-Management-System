# MBSTU ICT Department Examination & Semester Bill Management System
## Official Research, Policy Framework, and Regulatory Sources

**Document File:** `docs/OFFICIAL_RESEARCH_AND_SOURCES.md`  
**Institution:** Mawlana Bhashani Science and Technology University (MBSTU), Santosh, Tangail-1902, Bangladesh  
**Department:** Information and Communication Technology (ICT)  
**Supervising Office:** Office of the Controller of Examinations (পরীক্ষা নিয়ন্ত্রক দপ্তর), MBSTU  
**Research Scope:** University Examination Ordinances, UGC Financial Guidelines, National Tax Rules, and Syndicate Remuneration Circulars  
**Verification Date:** October 2026  

---

## 1. Institutional Framework and Statutory Authority

In Bangladesh public universities, semester examination administration and teacher remuneration operate under well-defined statutory frameworks:

1. **The University Act / Ordinance:**
   - **Mawlana Bhashani Science and Technology University Act, 2001 (মওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় আইন, ২০০১ - Act No. 34 of 2001)**: Sections 27 and 28 empower the Academic Council and Syndicate to enact Ordinances and Regulations governing examinations, appointment of examiners, exam committees, and payment of remuneration.
   - Official Portal: [MBSTU Official Portal](https://mbstu.ac.bd)  
   - Controller of Examinations: [MBSTU Controller of Examinations](https://mbstu.ac.bd/controller-of-examinations)
2. **University Grants Commission of Bangladesh (UGC):**
   - Official Portal: [UGC Bangladesh](http://www.ugc.gov.bd)  
   - UGC Financial Rules and Regulations for Public Universities (সরকারি বিশ্ববিদ্যালয়সমূহের জন্য আর্থিক নীতিমালা ও পরীক্ষা সংক্রান্ত সম্মানী বিধিমালা) establishing national baseline principles for examiner honorarium and financial compliance.
3. **National Board of Revenue (NBR) & Bangladesh Stamp Act:**
   - Income Tax Act 2023: TDS (Tax Deducted at Source) guidelines for professional honoraria and examination allowances.
   - Bangladesh Stamp Act: Mandatory **৳10.00 Revenue Stamp (রেভিনিউ স্ট্যাম্প)** for cash or bearer disbursements exceeding ৳500.

---

## 2. Comparative Analysis: Official MBSTU Empirical Evidence vs. National Baselines

Our system incorporates **two layers of financial truth**:
1. **Primary Ground Truth (Empirical MBSTU Slips):** Extracted directly from official signed and stamped bills (`মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় - পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম`) provided for the ICT department.
2. **Comparative Bangladesh Public University Standards (UGC Baseline):** Sourced from standard university codes (e.g. DU, RUET, DUET, SUST, JUST, PUST) to provide default parameters for configurable rules.

| Examination Activity | Official MBSTU Rate (Observed on Signed Slips) | National Public University / UGC Baseline Range | System Config Status |
|---|---|---|---|
| **Question Paper Setting (প্রশ্নপত্র প্রণয়ন)** | **৳4,000.00** (Full Paper - 3.00 Cr); ৳2,000.00 (Half Paper) | ৳1,500 – ৳2,500 per paper | Pre-loaded Default; Editable by Admin |
| **Question Moderation (প্রশ্নপত্র সমীক্ষণ)** | **৳2,000.00 – ৳4,700.00** per member allocation | ৳800 – ৳1,500 per paper moderated | Pre-loaded Default; Editable by Admin |
| **Script Evaluation (উত্তরপত্র মূল্যায়ন)** | **৳120.00** per full answer script | ৳50 – ৳80 per full script | Pre-loaded Default (৳120); Editable by Admin |
| **Minimum Script Fee Threshold** | **৳500.00 – ৳700.00** minimum threshold | ৳500 – ৳1,000 minimum threshold | Enforced via configurable threshold rule |
| **Practical / Lab Exam (ব্যবহারিক/ল্যাব)** | **৳100.00** per candidate/student | ৳30 – ৳60 per student (or daily allowance) | Pre-loaded Default (৳100); Editable by Admin |
| **Tabulation (ট্যাবুলেশন)** | **৳75.00** per examinee | ৳20 – ৳40 per course/student (or ৳100 composite) | Pre-loaded Default (৳75); Editable by Admin |
| **Question Typing & Verification (লিখন ও যাচাই)** | **৳200.00** per question paper typed/verified | ৳150 – ৳250 per question paper | Pre-loaded Default (৳200); Editable by Admin |
| **Committee Chairman Allowance (সভাপতির ভাতা)** | **৳2,250.00** fixed allowance per semester | ৳3,000 – ৳5,000 per semester | Pre-loaded Default (৳2,250); Editable by Admin |
| **Class Test Conduction & Evaluation (ক্লাস টেস্ট)** | Course student count × credit × tests formula (৳2,740 – ৳5,400) | Varies by departmental guidelines | Configurable rule formula |
| **Incidental Expenses (ইনসিডেন্টাল চার্জ)** | Actual voucher receipt amount | Actual voucher / conveyance bill | Voucher-backed dynamic input |

---

## 3. Dissecting the Official 14-Row MBSTU Bill Form

The physical bills verify that the MBSTU Accounts and Controller of Examinations offices use a standardized 14-row printable format. Each teacher's claim must be categorized into one of these 14 statutory rows:
1. `প্রশ্নপত্র প্রণয়ন` (Question Setting)
2. `প্রশ্নপত্র সমীক্ষণ` (Question Moderation)
3. `উত্তর পত্র মূল্যায়ন` (Answer Script Evaluation)
4. `মৌখিক পরীক্ষা / কম্প্রেহেনসিভ মৌখিক পরীক্ষা` (Oral / Comprehensive Viva)
5. `ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা` (Practical / Lab / Sessional Exam)
6. `ট্যাবুলেশন` (Tabulation)
7. `কম্প্রেহেনসিভ ট্যাবুলেশন / ভেরিফিকেশন` (Comprehensive Tabulation / Verification)
8. `সভাপতি / সদস্যর ভাতা` (Chairman / Member Allowance)
9. `প্রশ্নপত্র লিখন ও যাচাই` (Question Typing & Verification)
10. `থিসিস / রিসার্চ প্রজেক্ট` (Thesis / Research Project Evaluation)
11. `স্পেশাল টপিক সেমিনার / টার্মপেপার / ইন্ডাস্ট্রিয়াল ট্রেনিং এন্ড ভাইভা-ভসি`
12. `ইন্টার্নশিপ / ইনপ্ল্যান্ট ট্রেনিং / মনোগ্রাফ / ইন্ডিপেন্ডেন্ট স্টাডি / প্রেজেন্টেশন`
13. `ক্লাস টেস্ট` (Class Test)
14. `ইনসিডেন্টাল চার্জ` (Incidental Expenses)

---

## 4. Academic Integrity & Transparency Protocol

1. **Zero Fabrication:** The system makes a clear distinction between **empirically observed MBSTU rates** and **admin-configured default rates**.
2. **Audit Logging:** Any update to a billing rate creates an audit record with timestamp and user notes.
3. **Separation of Work vs. Financial Realization:** An examination activity is classified as `Accrued Work`. When included in a bill, it is `Billed`. When sanctioned by the Examination Committee Chairman, it becomes `Approved`. Only when an explicit `Payment Transaction` is posted does it count as `Paid`.
