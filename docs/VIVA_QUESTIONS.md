# MBSTU ICT Department Examination & Semester Bill Management System
## Viva Voce Questions & Answers (20 Key Questions with Bangla Explanations)

**Document File:** `docs/VIVA_QUESTIONS.md`  
**Purpose:** Prepare the undergraduate ICT student to explain system architecture, business rules, financial logic, and software engineering principles during teacher evaluation.  

---

### Q1: What is the primary problem this software project solves?
- **English Answer:** It automates the preparation, calculation, tracking, and disbursement reconciliation of semester examination remuneration bills in the MBSTU ICT Department, replacing error-prone manual paper calculation with an auditable, transparent digital ledger.
- **বাংলা ব্যাখ্যা:** এটি মাভাবিপ্রবির আইসিটি বিভাগের সেমিস্টার ফাইনাল পরীক্ষার বিভিন্ন দায়িত্বের পারিশ্রমিক হিসাব, বিল প্রস্তুত এবং কোন শিক্ষক কত টাকা পেয়েছেন আর কত টাকা বকেয়া আছে তা সম্পূর্ণ নির্ভুল ও স্বচ্ছভাবে হিসাব করার সমস্যার সমাধান করে।

---

### Q2: Why is the separation between "Bill Generation" and "Payment" critical in university accounting?
- **English Answer:** Generating a bill only documents a proposed or approved financial liability. An actual payment occurs only when the university accounts office disburses funds via cheque or transfer with a voucher. Conflating the two creates false financial reporting.
- **বাংলা ব্যাখ্যা:** বিল তৈরি করলেই টাকা পাওয়া যায় না। বিল হচ্ছে পাওনার দাবি বা অনুমোদন। আর পেমেন্ট হচ্ছে একাউন্টস থেকে প্রকৃতপক্ষে টাকা প্রদান। দুইটাকে আলাদা না রাখলে শিক্ষকের বকেয়া পাওনা জানা অসম্ভব হয়ে পড়ে।

---

### Q3: What technology stack did you use, and why?
- **English Answer:** Plain HTML5, CSS3, ES6 Vanilla JavaScript, and browser `localStorage`. This achieves a 100% zero-cost budget, requires zero server hosting or third-party paid APIs, runs completely offline, and is lightweight and beginner-friendly.
- **বাংলা ব্যাখ্যা:** প্লেইন এইচটিএমএল, সিএসএস, ভ্যানিলা জাভাস্ক্রিপ্ট এবং লোকাল স্টোরেজ ব্যবহার করেছি। এতে কোনো সার্ভার বা পেইড এপিআই লাগে না, ইন্টারনেট ছাড়া চলে এবং প্রজেক্টের খরচ পুরোপুরি শূন্য টাকা (Zero Cost)।

---

### Q4: How does your system calculate Answer Script Evaluation remuneration?
- **English Answer:** It uses the formula $\text{Amount} = \max(N_{\text{scripts}} \times R_{\text{script}}, M_{\text{min\_charge}})$, where the default MBSTU undergraduate rate is ৳120.00 per script with a minimum threshold charge of ৳500.00.
- **বাংলা ব্যাখ্যা:** খাতার সংখ্যাকে প্রতি খাতার রেট (৳১২০) দিয়ে গুণ করা হয়। খাতা খুব কম হলেও নূন্যতম চার্জ (যেমন ৳৫০০) নিশ্চিত করা হয়।

---

### Q5: How do you handle Practical / Lab Examination remuneration?
- **English Answer:** By multiplying the number of candidates examined by the configured sessional rate (observed as ৳100.00 per examinee in the MBSTU official slips): $\text{Amount} = N_{\text{students}} \times ৳100.00$.
- **বাংলা ব্যাখ্যা:** ল্যাব বা সেশনাল কোর্সে উপস্থিত পরীক্ষার্থীর সংখ্যাকে পরীক্ষার্থী প্রতি রেট (মাভাবিপ্রবিতে ১০০ টাকা) দিয়ে গুণ করে হিসাব করা হয় (যেমন ৫৭ জন পরীক্ষার্থী হলে ৫৭ × ১০০ = ৫৭০০ টাকা)।

---

### Q6: How is Results Tabulation remuneration calculated?
- **English Answer:** Tabulators are remunerated at ৳75.00 per examinee across regular, backlog, and special candidates: $\text{Amount} = N_{\text{total\_examinees}} \times ৳75.00$. For example, 86 examinees $\implies 86 \times 75 = ৳6,450.00$.
- **বাংলা ব্যাখ্যা:** ট্যাবুলেশনের ক্ষেত্রে নিয়মিত, ব্যাকলগ ও স্পেশাল পরীক্ষার্থীর মোট সংখ্যাকে ৭৫ টাকা দিয়ে গুণ করে ট্যাবুলেটরগণের পাওনা বের করা হয় (যেমন ৮৬ জন হলে ৮৬ × ৭৫ = ৬,৪৫০ টাকা)।

---

### Q7: What are the 14 standard categories printed on the official MBSTU bill form?
- **English Answer:** 1. Question Setting, 2. Moderation, 3. Script Evaluation, 4. Viva-Voce, 5. Practical/Lab Exam, 6. Tabulation, 7. Comprehensive Tabulation, 8. Committee Allowance, 9. Question Typing, 10. Thesis/Project, 11. Seminar/Term Paper, 12. Internship, 13. Class Test, and 14. Incidental Charges.
- **বাংলা ব্যাখ্যা:** মাভাবিপ্রবির আসল বিলে হুবহু এই ১৪টি নির্দিষ্ট কাজের ক্রমিক নম্বর রয়েছে—প্রশ্নপত্র প্রণয়ন থেকে শুরু করে ইনসিডেন্টাল চার্জ পর্যন্ত।

---

### Q8: What happens if the university syndicate changes remuneration rates next year?
- **English Answer:** The system includes a Configurable Billing Rules module where an admin can update rates. Crucially, finalized historical bills preserve their frozen historical rates so older accounting records are never corrupted.
- **বাংলা ব্যাখ্যা:** আমাদের সিস্টেমে রেট কনফিগারেশন অপশন আছে যেখান থেকে রেট আপডেট করা যায়। তবে অতীতের ফাইনাল বিলের হিসাব অপরিবর্তিত থাকে, ফলে অডিটের সময় কোনো গড়মিল হয় না।

---

### Q9: How do you prevent overpayment on an approved bill?
- **English Answer:** The payment transaction handler asserts that $P_{\text{amount}} \le B_{\text{outstandingBalance}}$. If an operator inputs an amount higher than the outstanding balance, the system rejects the transaction with a validation error.
- **বাংলা ব্যাখ্যা:** সফটওয়্যার চেক করে যে প্রদত্ত টাকা বকেয়া টাকার চেয়ে বেশি কি না। বেশি হলে সিস্টেম এরর দিয়ে ট্রানজেকশন আটকে দেয়।

---

### Q10: How does the system handle partial payments?
- **English Answer:** When a payment is recorded for an amount less than the approved bill, the paid accumulator increases, the outstanding balance decreases accordingly ($OB = \text{Approved} - \text{Paid}$), and the bill status updates to "Partially Paid".
- **বাংলা ব্যাখ্যা:** যদি কোনো বিলের পুরো টাকা একবারে না দিয়ে কিছু টাকা দেওয়া হয়, সিস্টেম তা "Partially Paid" হিসেবে দেখায় এবং বাকি টাকা বকেয়া (Outstanding) হিসেবে ট্র্যাক করে।

---

### Q11: How do you support external examiners from other universities?
- **English Answer:** Teachers have an `isExternal` flag and an `institution` field (e.g. RUET, DUET, PUST, BDU). They can be assigned as Question Setters or External Members, and their bills and payments are tracked with identical precision.
- **বাংলা ব্যাখ্যা:** শিক্ষক তালিকায় মাভাবিপ্রবির বাইরের বিশ্ববিদ্যালয়ের শিক্ষকদেরও যুক্ত করা যায় এবং তাদের প্রতিষ্ঠানের নাম উল্লেখ থাকে। তাদের প্রশ্ন প্রণয়ন বা উত্তরপত্র মূল্যায়নের বিলও আলাদাভাবে তৈরি হয়।

---

### Q12: How are multiple semesters kept independent in the database?
- **English Answer:** Through relational scoping using foreign keys. Every course, examination duty, and bill is tagged with a unique `semesterId`. Queries and filters isolate records by semester ID.
- **বাংলা ব্যাখ্যা:** প্রতিটি সেমিস্টারের একটি ইউনিক আইডি থাকে এবং সমস্ত কোর্স ও বিল ওই আইডির সাথে যুক্ত থাকে। ফলে একটি সেমিস্টারের ডাটা কখনোই অন্য সেমিস্টারের ডাটার সাথে মিশ্রিত হয় না।

---

### Q13: Can a teacher see their earnings across multiple semesters in one place?
- **English Answer:** Yes. The Teacher Financial Ledger provides both a semester-specific view and a consolidated multi-semester statement showing total earnings, total paid, and total outstanding across their entire departmental career.
- **বাংলা ব্যাখ্যা:** হ্যাঁ, টিচার লেজারে নির্দিষ্ট সেমিস্টারের পাশাপাশি "All Semesters" কনসোলিডেটেড ভিউ আছে, যা দিয়ে শিক্ষক তার পুরো কর্মজীবনের মোট আয়, প্রাপ্ত টাকা এবং বকেয়া দেখতে পারেন।

---

### Q14: How does the printable bill slip match the official physical form?
- **English Answer:** The HTML template exactly reproduces the 12-column table grid, Bengali headers, 14 statutory rows, chairman counter-signature seal, examiner signature, and revenue stamp receipt box shown on genuine MBSTU bills.
- **বাংলা ব্যাখ্যা:** আমাদের সফটওয়্যারের বিল স্লিপটি মাভাবিপ্রবির আসল হার্ডকপি বিল ফরমের মতো ১২টি কলাম, ১৪টি নির্দিষ্ট কাজের রো, সিলমোহর এবং রেভিনিউ স্ট্যাম্পের ঘরসহ নিখুঁতভাবে প্রিন্ট হয়।

---

### Q15: What is the purpose of the ৳10 Revenue Stamp on the bill form?
- **English Answer:** Under the Bangladesh Stamp Act, any cash or direct payment receipt exceeding ৳500 requires a ৳10 Revenue Stamp (রেভিনিউ স্ট্যাম্প) signed by the recipient under "বুঝিয়া পাইলাম" (Received).
- **বাংলা ব্যাখ্যা:** বাংলাদেশের স্ট্যাম্প আইন অনুযায়ী ৫০০ টাকার বেশি যেকোনো ক্যাশ বা প্রাপ্তি রসিদে ১০ টাকার রেভিনিউ স্ট্যাম্প লাগিয়ে স্বাক্ষর করতে হয়, যা আমাদের বিল স্লিপে অন্তর্ভুক্ত।

---

### Q16: How do you handle data persistence and accidental browser cache clearing?
- **English Answer:** Data is saved automatically in `localStorage`. To protect against browser resets, the system provides a one-click JSON Backup Export and JSON Restore mechanism, allowing teachers or staff to store database backups offline.
- **বাংলা ব্যাখ্যা:** ডাটা লোকাল স্টোরেজে সেভ থাকে। এছাড়া ডাটা হারানোর ঝুঁকি এড়াতে এক ক্লিকে পুরো ডাটাবেজ JSON ফাইলে ব্যাকআপ নেওয়ার এবং পরবর্তীতে রিস্টোর করার ব্যবস্থা রাখা হয়েছে।

---

### Q17: What role does the Examination Committee Chairman play in this workflow?
- **English Answer:** The Chairman reviews the recorded activities of all course teachers, verifies the script/student quantities, and provides formal approval (প্রতি স্বাক্ষর) before bills are submitted to the Controller of Examinations.
- **বাংলা ব্যাখ্যা:** পরীক্ষা কমিটির সভাপতি সকল শিক্ষকের কাজের খাতা ও ছাত্র সংখ্যা যাচাই করে বিলে প্রতি-স্বাক্ষর (অনুমোদন) প্রদান করেন, যার পর বিলটি পরীক্ষা নিয়ন্ত্রক দপ্তরে পাঠানো হয়।

---

### Q18: What is a "3rd Examiner" (তৃতীয় পরীক্ষক), and how is it tracked?
- **English Answer:** When marks given by the 1st and 2nd examiners differ by 20% or more, scripts are sent to a 3rd examiner. Our system tracks specific script IDs, assigned courses, and script counts for 3rd examiners.
- **বাংলা ব্যাখ্যা:** ১ম ও ২য় পরীক্ষকের নম্বরের ব্যবধান ২০% বা তার বেশি হলে তৃতীয় পরীক্ষকের কাছে খাতা পাঠানো হয়। আমাদের সিস্টেমে নির্দিষ্ট রোল নম্বর ও খাতা সংখ্যা দিয়ে ৩য় পরীক্ষকের দায়িত্ব রেকর্ড করা যায়।

---

### Q19: Why did you not use a backend database like MySQL or MongoDB for this project?
- **English Answer:** For a 1-credit undergraduate university project with a strict zero-cost and zero-setup requirement, a client-side relational model in Vanilla JS avoids complex server installations, database hosting costs, and security overhead while running instantaneously on any PC.
- **বাংলা ব্যাখ্যা:** ১ ক্রেডিটের প্রজেক্টে জিরো কস্ট এবং সহজে প্রদর্শন করার জন্য ক্লায়েন্ট-সাইড আর্কিটেকচার সবচেয়ে কার্যকর। এতে কোনো ডাটাবেজ সার্ভার সেটআপের ঝামেলা ছাড়াই যেকোনো কম্পিউটারে সরাসরি চালানো যায়।

---

### Q20: What are the main future improvements for this system?
- **English Answer:** Future work could include multi-user role-based authentication (separate login for Teachers, Chairman, and Accounts), PDF export via server-side libraries, and automated SMS/email alerts when bills are disbursed.
- **বাংলা ব্যাখ্যা:** ভবিষ্যতে রোল-বেসড অথেনটিকেশন (শিক্ষক, সভাপতি ও একাউন্টসের আলাদা লগইন) এবং পেমেন্ট সম্পন্ন হলে শিক্ষকের মোবাইলে স্বয়ংক্রিয় এসএমএস অ্যালার্ট যুক্ত করা যেতে পারে।
