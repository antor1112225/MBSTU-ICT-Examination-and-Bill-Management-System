/**
 * MBSTU ICT Department Examination & Semester Bill Management System
 * Core Application Engine & Data Controller
 * Namespace: mbstu_ict_exam_bills_v1
 */

const STORAGE_KEY = 'mbstu_ict_exam_bills_v1';

// 14 Statutory Activity Categories matching the Official MBSTU Bill Form
const DEFAULT_MBSTU_RATES = [
    { cat: 1, nameBn: 'প্রশ্নপত্র প্রণয়ন', nameEn: 'Question Paper Setting', unit: 'per_paper', defaultRate: 4000.00, minCharge: 2000.00, desc: 'Full Paper (3.00 Cr) ৳4,000; Half Paper ৳2,000' },
    { cat: 2, nameBn: 'প্রশ্নপত্র সমীক্ষণ', nameEn: 'Question Moderation', unit: 'per_paper', defaultRate: 2000.00, minCharge: 1000.00, desc: 'Moderation session honorarium / committee allocation' },
    { cat: 3, nameBn: 'উত্তর পত্র মূল্যায়ন', nameEn: 'Answer Script Evaluation', unit: 'per_script', defaultRate: 120.00, minCharge: 500.00, desc: '৳120 per script; Min charge ৳500-700' },
    { cat: 4, nameBn: 'মৌখিক পরীক্ষা / কম্প্রেহেনসিভ মৌখিক পরীক্ষা', nameEn: 'Viva-Voce / Oral Exam', unit: 'per_student', defaultRate: 120.00, minCharge: 500.00, desc: 'Candidate count × ৳120 or board session rate' },
    { cat: 5, nameBn: 'ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা', nameEn: 'Practical / Lab / Sessional Exam', unit: 'per_student', defaultRate: 100.00, minCharge: 1000.00, desc: 'Candidate count × ৳100 per practical course' },
    { cat: 6, nameBn: 'ট্যাবুলেশন', nameEn: 'Results Tabulation', unit: 'per_examinee', defaultRate: 75.00, minCharge: 2000.00, desc: 'Total examinees (Regular + BL + Special) × ৳75' },
    { cat: 7, nameBn: 'কম্প্রেহেনসিভ ট্যাবুলেশন / ভেরিফিকেশন', nameEn: 'Comprehensive Tabulation / Verification', unit: 'per_examinee', defaultRate: 50.00, minCharge: 1500.00, desc: 'Verified candidates × rate' },
    { cat: 8, nameBn: 'সভাপতি / সদস্যর ভাতা', nameEn: 'Exam Committee Chairman / Member Allowance', unit: 'fixed', defaultRate: 2250.00, minCharge: 1500.00, desc: 'Fixed Chairman honorarium ৳2,250; Member allowance' },
    { cat: 9, nameBn: 'প্রশ্নপত্র লিখন ও যাচাই', nameEn: 'Question Typing and Verification', unit: 'per_question', defaultRate: 200.00, minCharge: 200.00, desc: 'Number of typed/verified questions × ৳200' },
    { cat: 10, nameBn: 'থিসিস / রিসার্চ প্রজেক্ট', nameEn: 'Thesis / Research Project Evaluation', unit: 'per_project', defaultRate: 1500.00, minCharge: 1500.00, desc: 'Per undergraduate/postgraduate thesis report' },
    { cat: 11, nameBn: 'স্পেশাল টপিক সেমিনার / টার্মপেপার / ইন্ডাস্ট্রিয়াল ট্রেনিং এন্ড ভাইভা-ভসি', nameEn: 'Seminar / Term Paper / Industrial Training', unit: 'per_student', defaultRate: 250.00, minCharge: 1000.00, desc: 'Per evaluated candidate / report' },
    { cat: 12, nameBn: 'ইন্টার্নশিপ / ইনপ্ল্যান্ট ট্রেনিং / মনোগ্রাফ / ইন্ডিপেন্ডেন্ট স্টাডি / প্রেজেন্টেশন', nameEn: 'Internship / Presentation / Monograph', unit: 'per_student', defaultRate: 500.00, minCharge: 1000.00, desc: 'Per student presentation / report' },
    { cat: 13, nameBn: 'ক্লাস টেস্ট', nameEn: 'Class Test Assessment', unit: 'dynamic', defaultRate: 1350.00, minCharge: 1000.00, desc: 'Class test conduction & script evaluation allowance' },
    { cat: 14, nameBn: 'ইনসিডেন্টাল চার্জ / কুরিয়ার চার্জ', nameEn: 'Incidental Charges / Courier Voucher', unit: 'voucher', defaultRate: 0.00, minCharge: 0.00, desc: 'Voucher-based reimbursement of expenses / courier memos' }
];

// Default Bengali Bill Slip Form Configuration (Persisted & Configurable via Modal)
const DEFAULT_BILL_FORM_CONFIG = {
    uniTitle: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়',
    subTitle: 'পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম',
    deptName: 'ইনফরমেশন এন্ড কমিউনিকেশন টেকনোলজি',
    instruction: 'সকল বিল নির্ধারিত ফরম অনুযায়ী পরীক্ষা সমাপ্তির এক মাসের মধ্যে সংশ্লিষ্ট কমিটির সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রক বরাবর প্রেরণ করতে হবে। বিলের সকল কলাম যথাযথভাবে পূরণ করা আবশ্যক।',
    colLabels: [
        '১. ক্রমিক নং',
        '২. কাজের নাম',
        '৩. পরীক্ষার নাম',
        '৪. পরীক্ষার সন',
        '৫. বিভাগ',
        '৬. কোর্স নম্বর',
        '৭. পরীক্ষার্থী/খাতা সংখ্যা',
        '৮. দিন/সদস্য সংখ্যা',
        '৯. কোর্সের ক্রেডিট',
        '১০. টেস্টের সংখ্যা',
        '১১. টাকা',
        '১২. পয়সা'
    ],
    sigChairman: 'সভাপতি, পরীক্ষা কমিটি',
    sigExaminer: 'পরীক্ষকের স্বাক্ষর ও মোবাইল নম্বর',
    sigOfficer: 'শাখা কর্মকর্তা / সহকারী পরীক্ষা নিয়ন্ত্রক',
    sigController: 'পরীক্ষা নিয়ন্ত্রক'
};

// Helper: Convert Numbers to Fluent Bengali Words (1 to 10,000,000)
function numberToBanglaWords(num) {
    if (!num || isNaN(num)) return 'শূন্য';
    num = Math.round(num);

    const b1To99 = [
        '', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ',
        'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোলো', 'সতেরো', 'আঠারো', 'উনিশ', 'বিশ',
        'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আটাশ', 'উনত্রিশ', 'ত্রিশ',
        'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাঁইত্রিশ', 'আটত্রিশ', 'ঊনচল্লিশ', 'চল্লিশ',
        'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'ঊনপঞ্চাশ', 'পঞ্চাশ',
        'একান্ন', 'বায়ান্ন', 'তিপ্পান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন', 'ঊনষাট', 'ষাট',
        'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'ঊনসত্তর', 'সত্তর',
        'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চৌহাত্তর', 'পঁচাত্তর', 'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'ঊনআশি', 'আশি',
        'একাশি', 'বিরাশি', 'তিরাশি', 'চুরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'অষ্টআশি', 'ঊননব্বই', 'নব্বই',
        'একানব্বই', 'বিরানব্বই', 'তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
    ];

    function convertTwoDigits(n) {
        return b1To99[n] || '';
    }

    let parts = [];
    if (num >= 10000000) {
        const cr = Math.floor(num / 10000000);
        parts.push(numberToBanglaWords(cr) + ' কোটি');
        num %= 10000000;
    }
    if (num >= 100000) {
        const lk = Math.floor(num / 100000);
        parts.push(convertTwoDigits(lk) + ' লাখ');
        num %= 100000;
    }
    if (num >= 1000) {
        const th = Math.floor(num / 1000);
        parts.push(convertTwoDigits(th) + ' হাজার');
        num %= 1000;
    }
    if (num >= 100) {
        const hu = Math.floor(num / 100);
        parts.push(convertTwoDigits(hu) + ' শত');
        num %= 100;
    }
    if (num > 0) {
        parts.push(convertTwoDigits(num));
    }
    return parts.join(' ').trim();
}

// 5 Canonical Departmental Examination & Moderation Dossiers
// Extracted 1:1 from 11-Page Scanned CamScanner PDF (media_1791908779648_8655bb4f.pdf)
const DEFAULT_DOSSIERS = [
    {
        id: 'dossier_2023_21',
        semesterId: 'sem_2023_21',
        session: '2023-2024',
        semesterTitle: '২য় বর্ষ ১ম সেমিস্টার',
        examYear: '২০২৫',
        memoNo: 'মাভাবিপ্রবি/আইসিটি/প.নি./২০২৫/১৫২',
        memoDate: '২৫/০৩/২০২৬ খ্রি.',
        examPeriod: 'মার্চ-এপ্রিল/২০২৬',
        committee: {
            chairman: { id: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সভাপতি' },
            member1: { id: 't_monir', name: 'ড. মনির মোর্শেদ', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            member2: { id: 't_nazrul', name: 'ড. নজরুল ইসলাম', designation: 'সহযোগী অধ্যাপক', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            externalMember: { name: 'ড. মোঃ আনোয়ার হোসেন', designation: 'প্রফেসর', dept: 'ইইই বিভাগ', inst: 'রুয়েট, রাজশাহী', role: 'সদস্য (বহিরাগত)' }
        },
        moderation: {
            courseCount: 16,
            questionCount: 16,
            ratePerQuestion: 2000,
            totalAmount: 32000
        },
        questionTyping: [
            { teacherId: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর', count: 6, rate: 200, total: 1200 },
            { teacherId: 't_monir', name: 'ড. মনির মোর্শেদ', designation: 'প্রফেসর', count: 6, rate: 200, total: 1200 },
            { teacherId: 't_nazrul', name: 'ড. নজরুল ইসলাম', designation: 'সহযোগী অধ্যাপক', count: 6, rate: 200, total: 1200 }
        ],
        sessionalTeachers: [
            { code: 'ICT-2102', title: 'Data Structures and Algorithms Lab', teacherId: 't_nargis', examiner: 'ড. মোসাঃ নার্গিস আক্তার', candidates: 57, rate: 100, total: 5700 },
            { code: 'ICT-2104', title: 'Digital Electronics Lab', teacherId: 't_shahin', examiner: 'ড. মুহাম্মদ শাহীন উদ্দিন', candidates: 57, rate: 100, total: 5700 },
            { code: 'ICT-2106', title: 'Object Oriented Programming Lab', teacherId: 't_ziaur', examiner: 'ড. জিয়াউর রহমান', candidates: 57, rate: 100, total: 5700 },
            { code: 'ICT-2108', title: 'Database Management Systems Lab', teacherId: 't_badrul', examiner: 'ড. মুহাম্মদ বদরুল আলম মিয়া', candidates: 57, rate: 100, total: 5700 }
        ],
        thirdExaminers: [
            { code: 'ICT-2101', title: 'Computer Organization & Architecture', teacherId: 't_badrul', teacherName: 'ড. মুহাম্মদ বদরুল আলম মিয়া', rollList: 'IT22015, IT22032', scriptCount: 2, rate: 120, total: 240 },
            { code: 'ICT-2103', title: 'Digital Electronics', teacherId: 't_anowar', teacherName: 'জনাব মোঃ আনোয়ার কবির', rollList: 'IT22008, IT22041', scriptCount: 2, rate: 120, total: 240 },
            { code: 'ICT-2107', title: 'Database Management Systems', teacherId: 't_mahedi', teacherName: 'জনাব মেহেদী হাসান', rollList: 'IT22002, IT22005, IT22011, IT22018, IT22023, IT22027, IT22033, IT22038, IT22042, IT22045, IT22049, IT22053, IT22057', scriptCount: 13, rate: 120, total: 1560 },
            { code: 'ICT-2109', title: 'Discrete Mathematics', teacherId: 't_musa', teacherName: 'জনাব মুসা মিয়া', rollList: 'IT22014, IT22029, IT22050', scriptCount: 3, rate: 120, total: 360 },
            { code: 'ICT-2111', title: 'Economics & Accounting', teacherId: 't_mahedi', teacherName: 'জনাব মেহেদী হাসান', rollList: 'IT22007, IT22021, IT22036, IT22048', scriptCount: 4, rate: 120, total: 480 },
            { code: 'ICT-2101 BL', title: 'Computer Organization (Backlog)', teacherId: 't_shahin', teacherName: 'ড. মুহাম্মদ শাহীন উদ্দিন', rollList: 'IT21012, IT21035', scriptCount: 2, rate: 120, total: 240 },
            { code: 'ICT-2105 BL', title: 'OOP (Backlog)', teacherId: 't_ziaur', teacherName: 'ড. জিয়াউর রহমান', rollList: 'IT21019', scriptCount: 1, rate: 120, total: 120 },
            { code: 'ICT-2107 BL', title: 'DBMS (Backlog)', teacherId: 't_abir', teacherName: 'ড. মোঃ আবীর হোসেন', rollList: 'IT21044', scriptCount: 1, rate: 120, total: 120 }
        ],
        tabulation: {
            tabulators: [
                { teacherId: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর' },
                { teacherId: 't_monir', name: 'ড. মনির মোর্শেদ', designation: 'প্রফেসর' },
                { teacherId: 't_nazrul', name: 'ড. নজরুল ইসলাম', designation: 'সহযোগী অধ্যাপক' }
            ],
            regularCount: 57,
            backlogCount: 18,
            specialCount: 11,
            totalCount: 86,
            rateRegular: 75,
            totalAmount: 6450
        }
    },
    {
        id: 'dossier_2021_32',
        semesterId: 'sem_2021_41',
        session: '2021-2022',
        semesterTitle: '৩য় বর্ষ ২য় সেমিস্টার',
        examYear: '২০২২',
        memoNo: 'মাভাবিপ্রবি/আইসিটি/প.নি./২০২২/৮৮',
        memoDate: '১৪/১১/২০২২ খ্রি.',
        examPeriod: 'নভেম্বর-ডিসেম্বর/২০২২',
        committee: {
            chairman: { id: 't_shahin', name: 'ড. মুহাম্মদ শাহীন উদ্দিন', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সভাপতি' },
            member1: { id: 't_abir', name: 'ড. মোঃ আবীর হোসেন', designation: 'সহযোগী অধ্যাপক', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            member2: { id: 't_mahedi', name: 'জনাব মেহেদী হাসান', designation: 'প্রভাষক', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            externalMember: { name: 'প্রফেসর ড. মোঃ রফিকুল ইসলাম', designation: 'প্রফেসর', dept: 'সিএসই বিভাগ', inst: 'ডুয়েট, গাজীপুর', role: 'সদস্য (বহিরাগত)' }
        },
        moderation: {
            courseCount: 8,
            questionCount: 8,
            ratePerQuestion: 2000,
            totalAmount: 16000
        },
        questionTyping: [
            { teacherId: 't_shahin', name: 'ড. মুহাম্মদ শাহীন উদ্দিন', designation: 'প্রফেসর', count: 3, rate: 200, total: 600 },
            { teacherId: 't_abir', name: 'ড. মোঃ আবীর হোসেন', designation: 'সহযোগী অধ্যাপক', count: 3, rate: 200, total: 600 },
            { teacherId: 't_mahedi', name: 'জনাব মেহেদী হাসান', designation: 'প্রভাষক', count: 2, rate: 200, total: 400 }
        ],
        sessionalTeachers: [
            { code: 'ICT-3202', title: 'Software Engineering Lab', teacherId: 't_nazrul', examiner: 'ড. নজরুল ইসলাম', candidates: 54, rate: 100, total: 5400 },
            { code: 'ICT-3204', title: 'Data Communication Lab', teacherId: 't_anowar', examiner: 'জনাব মোঃ আনোয়ার কবির', candidates: 54, rate: 100, total: 5400 },
            { code: 'ICT-3206', title: 'Artificial Intelligence Lab', teacherId: 't_nargis', examiner: 'ড. মোসাঃ নার্গিস আক্তার', candidates: 54, rate: 100, total: 5400 },
            { code: 'ICT-3208', title: 'Microprocessors Lab', teacherId: 't_badrul', examiner: 'ড. মুহাম্মদ বদরুল আলম মিয়া', candidates: 54, rate: 100, total: 5400 },
            { code: 'ICT-3210', title: 'Computer Networks Lab', teacherId: 't_badrul', examiner: 'ড. মুহাম্মদ বদরুল আলম মিয়া', candidates: 54, rate: 100, total: 5400 }
        ],
        thirdExaminers: [
            { code: 'ICT-3205', title: 'Artificial Intelligence', teacherId: 't_anowar', teacherName: 'জনাব মোঃ আনোয়ার কবির', rollList: 'IT20015', scriptCount: 1, rate: 120, total: 120 },
            { code: 'ICT-3207', title: 'Microprocessors and Interfacing', teacherId: 't_badrul', teacherName: 'ড. মুহাম্মদ বদরুল আলম মিয়া', rollList: 'IT20022, IT20038', scriptCount: 2, rate: 120, total: 240 }
        ],
        tabulation: {
            tabulators: [
                { teacherId: 't_shahin', name: 'ড. মুহাম্মদ শাহীন উদ্দিন', designation: 'প্রফেসর' },
                { teacherId: 't_abir', name: 'ড. মোঃ আবীর হোসেন', designation: 'সহযোগী অধ্যাপক' },
                { teacherId: 't_mahedi', name: 'জনাব মেহেদী হাসান', designation: 'প্রভাষক' }
            ],
            regularCount: 54,
            backlogCount: 6,
            specialCount: 0,
            totalCount: 60,
            rateRegular: 75,
            totalAmount: 4500
        }
    },
    {
        id: 'dossier_2020_42',
        semesterId: 'sem_2020_42',
        session: '2020-2021',
        semesterTitle: '৪র্থ বর্ষ ২য় সেমিস্টার',
        examYear: '২০২১',
        memoNo: 'মাভাবিপ্রবি/আইসিটি/প.নি./২০২১/১১২',
        memoDate: '১৮/১০/২০২১ খ্রি.',
        examPeriod: 'অক্টোবর-নভেম্বর/২০২১',
        committee: {
            chairman: { id: 't_badrul', name: 'ড. মুহাম্মদ বদরুল আলম মিয়া', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সভাপতি' },
            member1: { id: 't_shahin', name: 'ড. মুহাম্মদ শাহীন উদ্দিন', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            member2: { id: 't_nazrul', name: 'ড. নজরুল ইসলাম', designation: 'সহযোগী অধ্যাপক', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            externalMember: { name: 'ড. শামীম কায়সার', designation: 'প্রফেসর', dept: 'আইআইটি', inst: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়', role: 'সদস্য (বহিরাগত)' }
        },
        moderation: {
            courseCount: 10,
            questionCount: 10,
            ratePerQuestion: 2000,
            totalAmount: 20000
        },
        questionTyping: [
            { teacherId: 't_badrul', name: 'ড. মুহাম্মদ বদরুল আলম মিয়া', designation: 'প্রফেসর', count: 4, rate: 200, total: 800 },
            { teacherId: 't_shahin', name: 'ড. মুহাম্মদ শাহীন উদ্দিন', designation: 'প্রফেসর', count: 3, rate: 200, total: 600 },
            { teacherId: 't_nazrul', name: 'ড. নজরুল ইসলাম', designation: 'সহযোগী অধ্যাপক', count: 3, rate: 200, total: 600 }
        ],
        sessionalTeachers: [
            { code: 'ICT-4202', title: 'Distributed Systems Lab', teacherId: 't_nazrul', examiner: 'ড. নজরুল ইসলাম', candidates: 58, rate: 100, total: 5800 },
            { code: 'ICT-4206', title: 'Digital Signal Processing Lab', teacherId: 't_monir', examiner: 'ড. মনির মোর্শেদ', candidates: 58, rate: 100, total: 5800 },
            { code: 'ICT-4212', title: 'Cloud Computing Lab', teacherId: 't_mahedi', examiner: 'জনাব মেহেদী হাসান', candidates: 58, rate: 100, total: 5800 },
            { code: 'ICT-4000', title: 'Project / Thesis Defense', teacherId: 't_badrul', examiner: 'সকল শিক্ষকবৃন্দ', candidates: 58, rate: 150, total: 8700 }
        ],
        thirdExaminers: [
            { code: 'ICT-4205', title: 'Digital Signal Processing', teacherId: 't_nargis', teacherName: 'ড. মোসাঃ নার্গিস আক্তার', rollList: 'IT19001, IT19012, IT19024, IT19033, IT19041, IT19048, IT19052, IT19055', scriptCount: 8, rate: 120, total: 960 },
            { code: 'ICT-4211', title: 'Information Security', teacherId: 't_anowar', teacherName: 'জনাব মোঃ আনোয়ার কবির', rollList: 'IT19007, IT19019, IT19045', scriptCount: 3, rate: 120, total: 360 }
        ],
        tabulation: {
            tabulators: [
                { teacherId: 't_badrul', name: 'ড. মুহাম্মদ বদরুল আলম মিয়া', designation: 'প্রফেসর' },
                { teacherId: 't_shahin', name: 'ড. মুহাম্মদ শাহীন উদ্দিন', designation: 'প্রফেসর' },
                { teacherId: 't_nazrul', name: 'ড. নজরুল ইসলাম', designation: 'সহযোগী অধ্যাপক' }
            ],
            regularCount: 55,
            backlogCount: 3,
            specialCount: 0,
            totalCount: 58,
            rateRegular: 75,
            totalAmount: 4350
        }
    },
    {
        id: 'dossier_2024_11',
        semesterId: 'sem_2024_11',
        session: '2024-2025',
        semesterTitle: '১ম বর্ষ ১ম সেমিস্টার',
        examYear: '২০২৫',
        memoNo: 'মাভাবিপ্রবি/আইসিটি/প.নি./২০২৫/২১১',
        memoDate: '১০/০৪/২০২৬ খ্রি.',
        examPeriod: 'মে-জুন/২০২৬',
        committee: {
            chairman: { id: 't_ziaur', name: 'ড. জিয়াউর রহমান', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সভাপতি' },
            member1: { id: 't_sajjad', name: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            member2: { id: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            externalMember: { name: 'ড. আব্দুল্লাহ আল মামুন', designation: 'প্রফেসর', dept: 'সিএসই বিভাগ', inst: 'হাবিপ্রবি, দিনাজপুর', role: 'সদস্য (বহিরাগত)' }
        },
        moderation: {
            courseCount: 9,
            questionCount: 9,
            ratePerQuestion: 2000,
            totalAmount: 18000
        },
        questionTyping: [
            { teacherId: 't_ziaur', name: 'ড. জিয়াউর রহমান', designation: 'প্রফেসর', count: 3, rate: 200, total: 600 },
            { teacherId: 't_sajjad', name: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ', designation: 'প্রফেসর', count: 3, rate: 200, total: 600 },
            { teacherId: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর', count: 3, rate: 200, total: 600 }
        ],
        sessionalTeachers: [
            { code: 'ICT-1102', title: 'Basic Electrical Circuits Lab', teacherId: 't_shahin', examiner: 'ড. মুহাম্মদ শাহীন উদ্দিন', candidates: 60, rate: 100, total: 6000 },
            { code: 'ICT-1104', title: 'Computer Programming Lab', teacherId: 't_badrul', examiner: 'ড. মুহাম্মদ বদরুল আলম মিয়া', candidates: 60, rate: 100, total: 6000 }
        ],
        thirdExaminers: [
            { code: 'ICT-1101', title: 'Basic Electrical Circuits', teacherId: 't_anowar', teacherName: 'জনাব মোঃ আনোয়ার কবির', rollList: 'IT24001, IT24005, IT24012, IT24018, IT24025, IT24031, IT24037, IT24042, IT24048, IT24051, IT24055, IT24059', scriptCount: 12, rate: 120, total: 1440 },
            { code: 'ICT-1103', title: 'Computer Programming', teacherId: 't_mahedi', teacherName: 'জনাব মেহেদী হাসান', rollList: 'IT24002, IT24006, IT24010, IT24015, IT24021, IT24028, IT24034, IT24039, IT24044, IT24049, IT24052, IT24056, IT24058, IT24060', scriptCount: 14, rate: 120, total: 1680 },
            { code: 'ICT-1107', title: 'Differential and Integral Calculus', teacherId: 't_abir', teacherName: 'ড. মোঃ আবীর হোসেন', rollList: 'IT24014, IT24033', scriptCount: 2, rate: 120, total: 240 },
            { code: 'ICT-1105', title: 'Physics', teacherId: 't_badrul', teacherName: 'ড. মুহাম্মদ বদরুল আলম মিয়া', rollList: 'IT24022', scriptCount: 1, rate: 120, total: 120 },
            { code: 'ICT-1109', title: 'Chemistry', teacherId: 't_badrul', teacherName: 'ড. মুহাম্মদ বদরুল আলম মিয়া', rollList: 'IT24047', scriptCount: 1, rate: 120, total: 120 }
        ],
        tabulation: {
            tabulators: [
                { teacherId: 't_ziaur', name: 'ড. জিয়াউর রহমান', designation: 'প্রফেসর' },
                { teacherId: 't_sajjad', name: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ', designation: 'প্রফেসর' },
                { teacherId: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর' }
            ],
            regularCount: 57,
            backlogCount: 18,
            specialCount: 0,
            totalCount: 75,
            rateRegular: 75,
            totalAmount: 5625
        }
    },
    {
        id: 'dossier_2022_31',
        semesterId: 'sem_2022_31',
        session: '2022-2023',
        semesterTitle: '৩য় বর্ষ ১ম সেমিস্টার',
        examYear: '২০২৪',
        memoNo: 'মাভাবিপ্রবি/আইসিটি/প.নি./২০২৪/৯৪',
        memoDate: '০৫/০৮/২০২৪ খ্রি.',
        examPeriod: 'আগস্ট-সেপ্টেম্বর/২০২৪',
        committee: {
            chairman: { id: 't_sajjad', name: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সভাপতি' },
            member1: { id: 't_badrul', name: 'ড. মুহাম্মদ বদরুল আলম মিয়া', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            member2: { id: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি', role: 'সদস্য' },
            externalMember: { name: 'ড. মোঃ সারওয়ার হোসাইন', designation: 'প্রফেসর', dept: 'আইসিই বিভাগ', inst: 'পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়', role: 'সদস্য (বহিরাগত)' }
        },
        moderation: {
            courseCount: 11,
            questionCount: 11,
            ratePerQuestion: 2000,
            totalAmount: 22000
        },
        questionTyping: [
            { teacherId: 't_sajjad', name: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ', designation: 'প্রফেসর', count: 4, rate: 200, total: 800 },
            { teacherId: 't_badrul', name: 'ড. মুহাম্মদ বদরুল আলম মিয়া', designation: 'প্রফেসর', count: 4, rate: 200, total: 800 },
            { teacherId: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর', count: 3, rate: 200, total: 600 }
        ],
        sessionalTeachers: [
            { code: 'ICT-3102', title: 'Data Structures Lab', teacherId: 't_sajjad', examiner: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ', candidates: 55, rate: 100, total: 5500 },
            { code: 'ICT-3104', title: 'Operating Systems Lab', teacherId: 't_badrul', examiner: 'ড. মুহাম্মদ বদরুল আলম মিয়া', candidates: 55, rate: 100, total: 5500 },
            { code: 'ICT-3106', title: 'Database Systems Lab', teacherId: 't_nargis', examiner: 'ড. মোসাঃ নার্গিস আক্তার', candidates: 55, rate: 100, total: 5500 }
        ],
        thirdExaminers: [
            { code: 'ICT-3101', title: 'Operating Systems', teacherId: 't_monir', teacherName: 'ড. মনির মোর্শেদ', rollList: 'IT21005, IT21020', scriptCount: 2, rate: 120, total: 240 },
            { code: 'ICT-3103', title: 'Computer Networks', teacherId: 't_shahin', teacherName: 'ড. মুহাম্মদ শাহীন উদ্দিন', rollList: 'IT21014, IT21038', scriptCount: 2, rate: 120, total: 240 }
        ],
        tabulation: {
            tabulators: [
                { teacherId: 't_sajjad', name: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ', designation: 'প্রফেসর' },
                { teacherId: 't_badrul', name: 'ড. মুহাম্মদ বদরুল আলম মিয়া', designation: 'প্রফেসর' },
                { teacherId: 't_nargis', name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর' }
            ],
            regularCount: 55,
            backlogCount: 3,
            specialCount: 0,
            totalCount: 58,
            rateRegular: 75,
            totalAmount: 4350
        }
    }
];

// Global Application Controller Object
const App = {
    state: {
        semesters: [],
        courses: [],
        teachers: [], // STRICTLY Internal MBSTU ICT Department Faculty
        externalAuditExclusionLog: [], // Purely for institutional audit documentation
        dossiers: [], // Departmental Examination & Moderation Dossiers
        currentDossierSemesterId: 'sem_2023_21',
        billingRules: JSON.parse(JSON.stringify(DEFAULT_MBSTU_RATES)),
        formConfig: JSON.parse(JSON.stringify(DEFAULT_BILL_FORM_CONFIG)),
        customActivityTypes: [],
        examActivities: [],
        bills: [],
        payments: [],
        currentSemesterId: 'sem_2024_11', // Default active: 1st Year 1st Semester
        selectedTeacherId: null,
        currentReportCourseId: null
    },

    init() {
        this.loadState();
        if (this.state.semesters.length === 0 || this.state.teachers.length === 0 || this.state.courses.length < 40) {
            this.loadDemoData();
        } else {
            this.ensureRupaliDemoData();
        }
        this.setupNavigation();
        this.renderAll();
    },

    saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            alert('Warning: LocalStorage save failed. Please export a JSON backup.');
        }
    },

    loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                this.state = Object.assign(this.state, parsed);
                if (!this.state.billingRules || this.state.billingRules.length === 0) {
                    this.state.billingRules = JSON.parse(JSON.stringify(DEFAULT_MBSTU_RATES));
                }
                if (!this.state.formConfig || !this.state.formConfig.uniTitle) {
                    this.state.formConfig = JSON.parse(JSON.stringify(DEFAULT_BILL_FORM_CONFIG));
                }
                if (!this.state.customActivityTypes) this.state.customActivityTypes = [];
                if (!this.state.externalAuditExclusionLog) this.state.externalAuditExclusionLog = [];
                if (!this.state.dossiers || this.state.dossiers.length === 0) {
                    this.state.dossiers = JSON.parse(JSON.stringify(DEFAULT_DOSSIERS));
                }
                if (!this.state.currentSemesterId || this.state.currentSemesterId === 'all') {
                    this.state.currentSemesterId = 'sem_2024_11';
                }
            }
        } catch (e) {
            console.error('Error loading state from localStorage:', e);
        }
    },

    // --------------------------------------------------------------------------
    // Modal Helpers
    // --------------------------------------------------------------------------
    openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            if (id === 'modal-activity') {
                const dateEl = document.getElementById('act-date');
                if (dateEl && !dateEl.value) {
                    dateEl.value = new Date().toISOString().split('T')[0];
                }
            }
        }
    },

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    },

    handleGlobalSemesterChange(val) {
        this.state.currentSemesterId = val || 'all';
        this.updateScopeDisplay();
        this.renderAll();
    },

    // --------------------------------------------------------------------------
    // Navigation & Tab Controller
    // --------------------------------------------------------------------------
    setupNavigation() {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                this.switchTab(target);
            });
        });

        const semSelect = document.getElementById('global-semester-select');
        if (semSelect) {
            semSelect.addEventListener('change', (e) => {
                this.handleGlobalSemesterChange(e.target.value);
            });
        }

        const btnLoadDemo = document.getElementById('btn-load-demo-data');
        if (btnLoadDemo) {
            btnLoadDemo.addEventListener('click', () => {
                if (confirm('Load authentic MBSTU ICT departmental demo records from official dossiers, bill slips, and all 5 sessions?')) {
                    this.loadDemoData();
                    this.renderAll();
                    alert('Official MBSTU demonstration dataset loaded successfully!');
                }
            });
        }

        const btnExportQuick = document.getElementById('btn-export-backup-quick');
        if (btnExportQuick) {
            btnExportQuick.addEventListener('click', () => {
                this.exportFullJSONBackup();
            });
        }
    },

    switchTab(tabId) {
        if (tabId === 'assignments') tabId = 'moderation';
        document.querySelectorAll('.nav-tab').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
        });
        document.querySelectorAll('.tab-panel').forEach(p => {
            p.classList.toggle('active', p.id === `tab-${tabId}`);
        });

        if (tabId === 'moderation') this.renderModerationDossier();
        if (tabId === 'ledger') this.renderTeacherLedger();
        if (tabId === 'print-slip') this.renderPrintableBillSlip();
    },

    // --------------------------------------------------------------------------
    // Render Orchestrator
    // --------------------------------------------------------------------------
    renderAll() {
        this.updateSemesterSelectors();
        this.updateScopeDisplay();
        this.renderKPIs();
        this.renderRecentPayments();
        this.renderSemestersTable();
        this.renderCoursesTable();
        this.renderTeachersTable();
        this.renderActivitiesTable();
        this.renderModerationDossier();
        this.renderBillsTable();
        this.renderPaymentsTable();
        this.renderRatesTable();
        this.renderExclusionLog();
        this.updateTeacherDropdowns();
        this.updateBadges();
    },

    getActiveScopeName() {
        if (this.state.currentSemesterId === 'all') {
            return 'All Semesters (Consolidated)';
        }
        const s = this.state.semesters.find(x => x.id === this.state.currentSemesterId);
        return s ? `${s.session} • ${s.yearLevel} ${s.semesterNumber}` : 'All Semesters (Consolidated)';
    },

    updateScopeDisplay() {
        const scopeText = this.getActiveScopeName();
        const pillLabel = document.getElementById('active-scope-label');
        if (pillLabel) pillLabel.textContent = scopeText;

        const ids = [
            'dash-recent-scope-text',
            'courses-scope-text',
            'activities-scope-text',
            'moderation-scope-text',
            'bills-scope-text',
            'payments-scope-text'
        ];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = this.state.currentSemesterId === 'all' ? 'Consolidated' : scopeText;
        });
    },

    updateBadges() {
        const setBadge = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setBadge('badge-semester-count', this.state.semesters.length);
        setBadge('badge-course-count', this.getFilteredCourses().length);
        setBadge('badge-teacher-count', this.state.teachers.length);
        setBadge('badge-activity-count', this.getFilteredActivities().length);
        setBadge('badge-bill-count', this.getFilteredBills().length);
        setBadge('badge-payment-count', this.getFilteredPayments().length);
        setBadge('badge-external-count', this.state.externalAuditExclusionLog.length);
    },

    getFilteredCourses() {
        if (this.state.currentSemesterId === 'all') return this.state.courses;
        return this.state.courses.filter(c => c.semesterId === this.state.currentSemesterId);
    },

    getFilteredActivities() {
        if (this.state.currentSemesterId === 'all') return this.state.examActivities;
        return this.state.examActivities.filter(a => a.semesterId === this.state.currentSemesterId);
    },

    getFilteredBills() {
        if (this.state.currentSemesterId === 'all') return this.state.bills;
        return this.state.bills.filter(b => b.semesterId === this.state.currentSemesterId);
    },

    getFilteredPayments() {
        if (this.state.currentSemesterId === 'all') return this.state.payments;
        return this.state.payments.filter(p => p.semesterId === this.state.currentSemesterId);
    },

    getEligibleInternalTeachers() {
        return this.state.teachers.filter(t => !t.isExternal && t.id !== 't_exc_rakib_rafiq_kamal');
    },

    formatCurrency(val) {
        return '৳' + (Number(val) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    updateSemesterSelectors() {
        const globalSelect = document.getElementById('global-semester-select');
        const crsSemSelect = document.getElementById('crs-semester-id');
        const actSemSelect = document.getElementById('act-semester-id');
        const billSemSelect = document.getElementById('bill-semester-id');
        const ledgerSemSelect = document.getElementById('ledger-semester-select');

        let optionsHtml = '<option value="all">All Semesters (Consolidated)</option>';
        let formOptionsHtml = '';

        // Group semesters by academic session across 5 sessions
        const sessions = ['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'];
        sessions.forEach(sess => {
            const semList = this.state.semesters.filter(s => s.session === sess);
            if (semList.length > 0) {
                optionsHtml += `<optgroup label="Session ${sess}">`;
                formOptionsHtml += `<optgroup label="Session ${sess}">`;
                semList.forEach(s => {
                    const opt = `<option value="${s.id}">${s.session} • ${s.yearLevel} ${s.semesterNumber}</option>`;
                    optionsHtml += opt;
                    formOptionsHtml += opt;
                });
                optionsHtml += `</optgroup>`;
                formOptionsHtml += `</optgroup>`;
            }
        });

        // Add any other semesters
        const otherSems = this.state.semesters.filter(s => !sessions.includes(s.session));
        otherSems.forEach(s => {
            const opt = `<option value="${s.id}">${s.session} • ${s.yearLevel} ${s.semesterNumber}</option>`;
            optionsHtml += opt;
            formOptionsHtml += opt;
        });

        if (globalSelect) {
            globalSelect.innerHTML = optionsHtml;
            globalSelect.value = this.state.currentSemesterId;
        }

        const dossierSemSelect = document.getElementById('dossier-semester-select');
        if (dossierSemSelect) {
            let dossierOpts = '';
            (this.state.dossiers || []).forEach(d => {
                dossierOpts += `<option value="${d.semesterId}">${d.session} • ${d.semesterTitle} (${d.examYear}) - সভাপতি: ${d.committee.chairman.name}</option>`;
            });
            dossierSemSelect.innerHTML = dossierOpts || optionsHtml;
            if (this.state.currentDossierSemesterId) {
                dossierSemSelect.value = this.state.currentDossierSemesterId;
            }
        }

        if (crsSemSelect) crsSemSelect.innerHTML = formOptionsHtml;
        if (actSemSelect) actSemSelect.innerHTML = formOptionsHtml;
        if (billSemSelect) billSemSelect.innerHTML = formOptionsHtml;
        if (ledgerSemSelect) {
            ledgerSemSelect.innerHTML = optionsHtml;
            ledgerSemSelect.value = this.state.currentSemesterId;
        }
    },

    updateTeacherDropdowns() {
        // STRICT REQUIREMENT: Only internal ICT faculty appear in active dropdowns
        const crsInt = document.getElementById('crs-internal-teacher');
        const actTchr = document.getElementById('act-teacher-id');
        const billTchr = document.getElementById('bill-teacher-id');
        const ledgerTchr = document.getElementById('ledger-teacher-select');
        const assignTchr = document.getElementById('assign-teacher-id');
        const assignMod = document.getElementById('assign-moderator-id');

        let options = '<option value="">-- Select Internal Teacher --</option>';
        let modOptions = '<option value="">-- None / External Moderator --</option>';

        this.state.teachers.forEach(t => {
            const label = `${t.nameEn} (${t.designation}, MBSTU)`;
            options += `<option value="${t.id}">${label}</option>`;
            modOptions += `<option value="${t.id}">${label}</option>`;
        });

        if (crsInt) crsInt.innerHTML = options;
        if (actTchr) actTchr.innerHTML = options;
        if (billTchr) billTchr.innerHTML = options;
        if (assignTchr) assignTchr.innerHTML = options;
        if (assignMod) assignMod.innerHTML = modOptions;

        if (ledgerTchr) {
            ledgerTchr.innerHTML = options;
            if (this.state.selectedTeacherId) {
                ledgerTchr.value = this.state.selectedTeacherId;
            } else if (this.state.teachers.length > 0) {
                // Default to Dr. Monir Morshed if present, or first teacher
                const monir = this.state.teachers.find(t => t.id === 't_monir');
                ledgerTchr.value = monir ? monir.id : this.state.teachers[0].id;
                this.state.selectedTeacherId = ledgerTchr.value;
            }
        }
    },

    // --------------------------------------------------------------------------
    // Dashboard & Financial KPIs
    // --------------------------------------------------------------------------
    renderKPIs() {
        const filteredActs = this.getFilteredActivities();
        const filteredBills = this.getFilteredBills();
        const filteredPays = this.getFilteredPayments();

        const totalGross = filteredActs.reduce((acc, a) => acc + (a.calculatedAmount || 0), 0);
        const totalApproved = filteredBills.reduce((acc, b) => acc + (b.approvedAmount || 0), 0);
        const totalPaid = filteredPays.reduce((acc, p) => acc + (p.amountPaid || 0), 0);
        const totalOutstanding = Math.max(0, totalApproved - totalPaid);

        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setVal('kpi-total-semesters', this.state.semesters.length);
        setVal('kpi-total-courses', this.getFilteredCourses().length);
        setVal('kpi-total-teachers', this.state.teachers.length);
        setVal('kpi-total-activities', filteredActs.length);
        setVal('kpi-total-gross', '৳' + totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 }));
        setVal('kpi-total-approved', '৳' + totalApproved.toLocaleString('en-US', { minimumFractionDigits: 2 }));
        setVal('kpi-total-paid', '৳' + totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 }));
        setVal('kpi-total-outstanding', '৳' + totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 }));
    },

    renderRecentPayments() {
        const tbody = document.getElementById('tbody-recent-payments');
        if (!tbody) return;

        const filteredPays = this.getFilteredPayments();
        if (filteredPays.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 16px;">No payments recorded for this scope. Load demo data to view examples.</td></tr>';
            return;
        }

        const sorted = [...filteredPays].reverse().slice(0, 8);
        tbody.innerHTML = sorted.map(p => {
            const tchr = this.state.teachers.find(t => t.id === p.teacherId) || { nameEn: 'Unknown', designation: '' };
            const bill = this.state.bills.find(b => b.id === p.billId) || { billNo: 'N/A' };
            const sem = this.state.semesters.find(s => s.id === p.semesterId) || { session: 'N/A', yearLevel: '', semesterNumber: '' };
            
            return `
                <tr>
                    <td><strong>${p.paymentDate}</strong></td>
                    <td><code>${p.receiptVoucherNo}</code></td>
                    <td><strong>${tchr.nameEn}</strong><br><small style="color:var(--text-muted);">${tchr.designation}</small></td>
                    <td><span class="badge badge-secondary">${sem.session}</span> ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td><code>${bill.billNo}</code></td>
                    <td>${p.paymentMethod}</td>
                    <td>${p.hasRevenueStamp ? '<span class="badge badge-paid">৳10 Stamp Affixed</span>' : '<span class="badge badge-unpaid">No Stamp</span>'}</td>
                    <td style="text-align: right; font-weight: 700; color: #15803d; font-family: var(--font-mono);">৳${(p.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                </tr>
            `;
        }).join('');
    },

    // --------------------------------------------------------------------------
    // Tab 2: Semesters
    // --------------------------------------------------------------------------
    renderSemestersTable() {
        const tbody = document.getElementById('tbody-semesters');
        if (!tbody) return;

        tbody.innerHTML = this.state.semesters.map(s => `
            <tr>
                <td><strong>${s.session}</strong></td>
                <td><span class="badge badge-secondary">${s.yearLevel} ${s.semesterNumber}</span></td>
                <td><strong>${s.semesterName}</strong></td>
                <td>${s.examPeriod}</td>
                <td>${s.examineeCountRegular}</td>
                <td>${s.examineeCountBacklog}</td>
                <td>${s.examineeCountSpecial}</td>
                <td><strong>${s.totalExaminees}</strong></td>
                <td><span class="badge badge-verified">${s.status || 'Active'}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="App.deleteSemester('${s.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    },

    deleteSemester(id) {
        if (confirm('Delete this semester? (Related courses and activities may become unlinked)')) {
            this.state.semesters = this.state.semesters.filter(s => s.id !== id);
            this.saveState();
            this.renderAll();
        }
    },

    handleSaveSemester(event) {
        event.preventDefault();
        const examNameEl = document.getElementById('sem-exam-name') || document.getElementById('sem-name');
        const regEl = document.getElementById('sem-reg-count');
        const blEl = document.getElementById('sem-bl-count');
        const scEl = document.getElementById('sem-sc-count') || document.getElementById('sem-sp-count');
        const periodEl = document.getElementById('sem-period');
        const sessEl = document.getElementById('sem-session');
        const acadYearEl = document.getElementById('sem-academic-year');
        const yrLvlEl = document.getElementById('sem-year-level');
        const semNumEl = document.getElementById('sem-number');

        const regCount = parseInt(regEl ? regEl.value : 0) || 0;
        const blCount = parseInt(blEl ? blEl.value : 0) || 0;
        const scCount = parseInt(scEl ? scEl.value : 0) || 0;

        const sem = {
            id: 'sem_' + Date.now(),
            session: sessEl ? sessEl.value.trim() : '2024-2025',
            academicYear: acadYearEl ? acadYearEl.value.trim() : '2025',
            yearLevel: yrLvlEl ? yrLvlEl.value : '1st Year',
            semesterNumber: semNumEl ? semNumEl.value : '1st Semester',
            semesterName: examNameEl ? examNameEl.value.trim() : 'Semester Examination',
            examPeriod: periodEl ? periodEl.value.trim() : '',
            examineeCountRegular: regCount,
            examineeCountBacklog: blCount,
            examineeCountSpecial: scCount,
            totalExaminees: regCount + blCount + scCount,
            status: 'Active',
            createdAt: new Date().toISOString()
        };

        this.state.semesters.push(sem);
        this.saveState();
        this.closeModal('modal-semester');
        event.target.reset();
        this.renderAll();
    },

    // --------------------------------------------------------------------------
    // Tab 3: Courses & Course-Wise Financial Breakdown
    // --------------------------------------------------------------------------
    renderCoursesTable() {
        const tbody = document.getElementById('tbody-courses');
        if (!tbody) return;

        const filtered = this.getFilteredCourses();
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="13" style="text-align: center; color: var(--text-muted); padding: 16px;">No courses found for the active semester scope.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(c => {
            const sem = this.state.semesters.find(s => s.id === c.semesterId) || { session: c.session || 'N/A', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === c.assignedInternalTeacherId) || { nameEn: 'Not Assigned', nameBn: '' };
            
            // Calculate financial metrics for this course
            const activities = this.state.examActivities.filter(a => a.courseId === c.id);
            const totalAmount = activities.reduce((sum, a) => sum + (a.calculatedAmount || 0), 0);
            const approved = activities.filter(a => a.billStatus === 'Approved' || a.billStatus === 'Partially Paid' || a.billStatus === 'Paid')
                                       .reduce((sum, a) => sum + (a.calculatedAmount || 0), 0);
            
            // Prorated paid/outstanding
            let paid = 0;
            activities.forEach(act => {
                if (act.relatedBillId) {
                    const bill = this.state.bills.find(b => b.id === act.relatedBillId);
                    if (bill && bill.grossAmount > 0) {
                        const ratio = (act.calculatedAmount || 0) / bill.grossAmount;
                        paid += (bill.paidAmount || 0) * ratio;
                    }
                }
            });
            const outstanding = Math.max(0, approved - paid);

            let vBadge = 'badge-verified';
            if (c.assignmentStatus === 'Needs Verification') vBadge = 'badge-needs-verification';
            if (c.assignmentStatus === 'Proposed - Needs Confirmation') vBadge = 'badge-proposed';

            return `
                <tr>
                    <td><code>${c.code}</code></td>
                    <td><strong>${c.title}</strong></td>
                    <td><span class="badge badge-secondary">${sem.session}</span> ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td>${Number(c.credit).toFixed(2)}</td>
                    <td><span class="badge ${c.courseType === 'Theory' ? 'badge-theory' : 'badge-lab'}">${c.courseType}</span></td>
                    <td><strong>${teacher.nameEn}</strong><br><small style="color:var(--text-muted);">${teacher.nameBn}</small></td>
                    <td><span class="badge ${vBadge}">${c.assignmentStatus || 'Verified'}</span></td>
                    <td><span class="badge badge-secondary">${activities.length} entries</span></td>
                    <td style="text-align: right; font-weight: 700; font-family: var(--font-mono);">৳${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--secondary); font-family: var(--font-mono);">৳${approved.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: 700; color: #15803d; font-family: var(--font-mono);">৳${paid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: 700; color: #dc2626; font-family: var(--font-mono);">৳${outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td>
                        <div style="display: flex; gap: 4px;">
                            <button class="btn btn-primary btn-sm" onclick="App.openCourseBreakdown('${c.id}')">Breakdown</button>
                            <button class="btn btn-outline btn-sm" onclick="App.openEditAssignmentModal('${c.id}')">Assign</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    },

    handleSaveCourse(event) {
        event.preventDefault();
        const semIdEl = document.getElementById('crs-semester-id');
        const codeEl = document.getElementById('crs-code');
        const titleEl = document.getElementById('crs-title');
        const creditEl = document.getElementById('crs-credit');
        const typeEl = document.getElementById('crs-type');
        const tchrEl = document.getElementById('crs-internal-teacher');
        const statusEl = document.getElementById('crs-verification-status') || document.getElementById('crs-status');
        const sourceEl = document.getElementById('crs-assignment-source');
        const modEl = document.getElementById('crs-moderator');
        const studEl = document.getElementById('crs-students');
        const testsEl = document.getElementById('crs-tests') || document.getElementById('crs-cts');

        const course = {
            id: 'crs_' + Date.now(),
            semesterId: semIdEl ? semIdEl.value : '',
            code: codeEl ? codeEl.value.trim().toUpperCase() : '',
            title: titleEl ? titleEl.value.trim() : '',
            credit: parseFloat(creditEl ? creditEl.value : 3.00) || 3.00,
            courseType: typeEl ? typeEl.value : 'Theory',
            assignedInternalTeacherId: tchrEl ? tchrEl.value : '',
            assignmentStatus: statusEl ? statusEl.value : 'Verified',
            assignmentSource: sourceEl ? sourceEl.value.trim() : 'Manual Entry',
            moderatorTeacherId: modEl ? modEl.value || null : null,
            studentCount: parseInt(studEl ? studEl.value : 55) || 55,
            classTestCount: parseInt(testsEl ? testsEl.value : 4) || 4,
            createdAt: new Date().toISOString()
        };

        const sem = this.state.semesters.find(s => s.id === course.semesterId);
        if (sem) course.session = sem.session;

        this.state.courses.push(course);
        this.saveState();
        this.closeModal('modal-course');
        event.target.reset();
        this.renderAll();
    },

    openCourseBreakdown(courseId) {
        const course = this.state.courses.find(c => c.id === courseId);
        if (!course) return;

        this.state.currentReportCourseId = courseId;
        const sem = this.state.semesters.find(s => s.id === course.semesterId) || { session: 'N/A', yearLevel: '', semesterNumber: '', semesterName: '' };
        const teacher = this.state.teachers.find(t => t.id === course.assignedInternalTeacherId) || { nameEn: 'Not Assigned', designation: '', department: '' };
        const moderator = this.state.teachers.find(t => t.id === course.moderatorTeacherId) || { nameEn: 'None / External', designation: '' };
        const activities = this.state.examActivities.filter(a => a.courseId === course.id);

        const totalGross = activities.reduce((sum, a) => sum + (a.calculatedAmount || 0), 0);
        const approved = activities.filter(a => a.billStatus === 'Approved' || a.billStatus === 'Partially Paid' || a.billStatus === 'Paid')
                                   .reduce((sum, a) => sum + (a.calculatedAmount || 0), 0);
        
        let totalPaid = 0;
        activities.forEach(act => {
            if (act.relatedBillId) {
                const bill = this.state.bills.find(b => b.id === act.relatedBillId);
                if (bill && bill.grossAmount > 0) {
                    const ratio = (act.calculatedAmount || 0) / bill.grossAmount;
                    totalPaid += (bill.paidAmount || 0) * ratio;
                }
            }
        });
        const outstanding = Math.max(0, approved - totalPaid);

        const modalTitle = document.getElementById('modal-course-breakdown-title');
        if (modalTitle) {
            modalTitle.textContent = `Course Breakdown: ${course.code} - ${course.title}`;
        }

        const container = document.getElementById('modal-course-breakdown-content');
        if (!container) return;

        let actRowsHtml = '';
        if (activities.length === 0) {
            actRowsHtml = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 12px;">No examination activities logged for this course yet.</td></tr>';
        } else {
            actRowsHtml = activities.map(a => {
                const actTchr = this.state.teachers.find(t => t.id === a.teacherId) || { nameEn: 'N/A' };
                let catName = a.activityNameEn;
                if (!catName) {
                    const r = this.state.billingRules.find(x => x.cat === a.categoryNumber);
                    catName = r ? r.nameEn : `Category #${a.categoryNumber}`;
                }
                return `
                    <tr>
                        <td><strong>${catName}</strong></td>
                        <td>${actTchr.nameEn}</td>
                        <td>${a.workloadQuantity}</td>
                        <td>৳${Number(a.rateApplied).toFixed(2)}</td>
                        <td style="text-align: right; font-weight: 700; font-family: var(--font-mono);">৳${(a.calculatedAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td><span class="badge ${a.billStatus === 'Paid' ? 'badge-paid' : (a.billStatus === 'Approved' ? 'badge-approved' : 'badge-recorded')}">${a.billStatus}</span></td>
                        <td><code>${a.relatedBillId || 'Unbilled'}</code></td>
                    </tr>
                `;
            }).join('');
        }

        container.innerHTML = `
            <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: 6px; padding: 14px; margin-bottom: 16px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                    <div>
                        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Course Code & Title</span>
                        <div style="font-weight: 800; font-size: 1.05rem; color: var(--primary);">${course.code}: ${course.title}</div>
                        <small>${course.credit.toFixed(2)} Credit • ${course.courseType}</small>
                    </div>
                    <div>
                        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Academic Session & Semester</span>
                        <div style="font-weight: 700;">${sem.session} • ${sem.yearLevel} ${sem.semesterNumber}</div>
                        <small>${sem.semesterName || 'Semester Examination'}</small>
                    </div>
                    <div>
                        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Assigned Course Teacher</span>
                        <div style="font-weight: 700;">${teacher.nameEn}</div>
                        <small>Status: <span class="badge badge-verified">${course.assignmentStatus || 'Verified'}</span></small>
                    </div>
                    <div>
                        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Moderation Assignment</span>
                        <div style="font-weight: 700;">${moderator.nameEn}</div>
                        <small>Evidence: ${course.assignmentSource || 'Departmental Records'}</small>
                    </div>
                </div>
            </div>

            <!-- Financial Cards Summary -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px;">
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 0.7rem; color: #1e40af; font-weight: 700; text-transform: uppercase;">Total Gross</span>
                    <div style="font-size: 1.15rem; font-weight: 800; color: #1e3a8a; font-family: var(--font-mono);">৳${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div style="background: #fefce8; border: 1px solid #fef08a; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 0.7rem; color: #854d0e; font-weight: 700; text-transform: uppercase;">Approved</span>
                    <div style="font-size: 1.15rem; font-weight: 800; color: #713f12; font-family: var(--font-mono);">৳${approved.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 0.7rem; color: #166534; font-weight: 700; text-transform: uppercase;">Actually Paid</span>
                    <div style="font-size: 1.15rem; font-weight: 800; color: #14532d; font-family: var(--font-mono);">৳${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 0.7rem; color: #991b1b; font-weight: 700; text-transform: uppercase;">Outstanding Due</span>
                    <div style="font-size: 1.15rem; font-weight: 800; color: #7f1d1d; font-family: var(--font-mono);">৳${outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
            </div>

            <!-- Associated Activities Table -->
            <div style="border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden;">
                <div style="background: #f1f5f9; padding: 8px 12px; font-weight: 700; font-size: 0.84rem;">
                    📝 Logged Examination Duties for ${course.code}
                </div>
                <table class="data-table" style="margin-bottom: 0;">
                    <thead>
                        <tr>
                            <th>Activity / Category</th>
                            <th>Teacher</th>
                            <th>Workload</th>
                            <th>Rate</th>
                            <th style="text-align: right;">Amount (৳)</th>
                            <th>Status</th>
                            <th>Bill Slip</th>
                        </tr>
                    </thead>
                    <tbody>${actRowsHtml}</tbody>
                </table>
            </div>
        `;

        this.openModal('modal-course-breakdown');
    },

    // --------------------------------------------------------------------------
    // Tab 4: Course-Teacher Assignments (Dedicated Table)
    // --------------------------------------------------------------------------
    renderCourseAssignmentsTable() {
        const tbody = document.getElementById('tbody-assignments');
        if (!tbody) return;

        const filtered = this.getFilteredCourses();
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 16px;">No course assignments found for active scope.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(c => {
            const sem = this.state.semesters.find(s => s.id === c.semesterId) || { session: c.session || 'N/A', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === c.assignedInternalTeacherId) || { nameEn: 'Not Assigned', designation: '' };
            
            let statusBadge = 'badge-verified';
            if (c.assignmentStatus === 'Needs Verification') statusBadge = 'badge-needs-verification';
            if (c.assignmentStatus === 'Proposed - Needs Confirmation') statusBadge = 'badge-proposed';

            return `
                <tr>
                    <td><code>${c.code}</code></td>
                    <td><strong>${c.title}</strong></td>
                    <td><strong>${sem.session}</strong></td>
                    <td><span class="badge badge-secondary">${sem.yearLevel} ${sem.semesterNumber}</span></td>
                    <td><strong>${teacher.nameEn}</strong><br><small style="color:var(--text-muted);">${teacher.designation || 'Faculty'}</small></td>
                    <td><span class="badge ${statusBadge}">${c.assignmentStatus || 'Verified'}</span></td>
                    <td><small>${c.assignmentSource || 'Official MBSTU Dossier'}</small></td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="App.openEditAssignmentModal('${c.id}')">Edit Assignment</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    openEditAssignmentModal(courseId) {
        const course = this.state.courses.find(c => c.id === courseId);
        if (!course) return;

        const sem = this.state.semesters.find(s => s.id === course.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
        
        document.getElementById('assign-course-id').value = course.id;
        document.getElementById('assign-course-display').value = `${course.code} - ${course.title} (${sem.session} • ${sem.yearLevel} ${sem.semesterNumber})`;
        document.getElementById('assign-teacher-id').value = course.assignedInternalTeacherId || '';
        document.getElementById('assign-status').value = course.assignmentStatus || 'Verified';
        document.getElementById('assign-source').value = course.assignmentSource || '';
        document.getElementById('assign-moderator-id').value = course.moderatorTeacherId || '';
        document.getElementById('assign-notes').value = course.assignmentNotes || '';

        this.openModal('modal-edit-assignment');
    },

    handleSaveAssignmentEdit(event) {
        event.preventDefault();
        const courseId = document.getElementById('assign-course-id').value;
        const course = this.state.courses.find(c => c.id === courseId);
        if (!course) return;

        course.assignedInternalTeacherId = document.getElementById('assign-teacher-id').value;
        course.assignmentStatus = document.getElementById('assign-status').value;
        course.assignmentSource = document.getElementById('assign-source').value.trim();
        course.moderatorTeacherId = document.getElementById('assign-moderator-id').value || null;
        course.assignmentNotes = document.getElementById('assign-notes').value.trim();

        this.saveState();
        this.closeModal('modal-edit-assignment');
        this.renderAll();
    },

    // --------------------------------------------------------------------------
    // Tab 5: Internal Teachers Directory
    // --------------------------------------------------------------------------
    renderTeachersTable() {
        const tbody = document.getElementById('tbody-teachers');
        if (!tbody) return;

        tbody.innerHTML = this.state.teachers.map(t => `
            <tr>
                <td><strong>${t.nameBn}</strong></td>
                <td><strong>${t.nameEn}</strong></td>
                <td><span class="badge badge-secondary">${t.designation}</span></td>
                <td>${t.department}</td>
                <td><strong>${t.institution}</strong></td>
                <td><span class="badge badge-verified">${t.status || 'Active Internal'}</span></td>
                <td><small>📞 ${t.phone || 'N/A'}<br>✉️ ${t.email || 'N/A'}</small></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="App.deleteTeacher('${t.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    },

    deleteTeacher(id) {
        if (confirm('Delete this faculty member?')) {
            this.state.teachers = this.state.teachers.filter(t => t.id !== id);
            this.saveState();
            this.renderAll();
        }
    },

    handleSaveTeacher(event) {
        event.preventDefault();
        const teacher = {
            id: 't_' + Date.now(),
            nameBn: document.getElementById('tchr-name-bn').value.trim(),
            nameEn: document.getElementById('tchr-name-en').value.trim(),
            designation: document.getElementById('tchr-designation').value,
            department: 'Dept. of ICT',
            institution: 'MBSTU',
            phone: document.getElementById('tchr-phone').value.trim(),
            email: document.getElementById('tchr-email').value.trim(),
            isExternal: false,
            status: 'Active Internal',
            createdAt: new Date().toISOString()
        };

        this.state.teachers.push(teacher);
        this.saveState();
        this.closeModal('modal-teacher');
        event.target.reset();
        this.renderAll();
    },

    // --------------------------------------------------------------------------
    // Tab 6: Dynamic Examination Activities
    // --------------------------------------------------------------------------
    renderActivitiesTable() {
        const tbody = document.getElementById('tbody-activities');
        if (!tbody) return;

        const filtered = this.getFilteredActivities();
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="12" style="text-align: center; color: var(--text-muted); padding: 16px;">No dynamic exam activities found for the active semester scope.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(a => {
            const sem = this.state.semesters.find(s => s.id === a.semesterId) || { session: 'N/A', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === a.teacherId) || { nameEn: 'Unknown Internal Teacher' };
            const course = a.courseId ? (this.state.courses.find(c => c.id === a.courseId) || { code: a.courseId }) : { code: 'Committee Duty' };
            const dateStr = a.activityDate || (a.createdAt ? a.createdAt.split('T')[0] : '2026-03-25');
            
            let catName = a.activityNameEn;
            if (!catName) {
                const r = this.state.billingRules.find(x => x.cat === a.categoryNumber);
                catName = r ? `${r.cat}. ${r.nameEn}` : `Category #${a.categoryNumber}`;
            }

            let methodBadge = '<span class="badge badge-secondary">Qty × Rate</span>';
            if (a.calcMethod === 'fixed') methodBadge = '<span class="badge badge-warning">Fixed</span>';
            if (a.calcMethod === 'manual') methodBadge = '<span class="badge badge-manual">Manual Entered</span>';

            return `
                <tr>
                    <td><code>${a.id}</code></td>
                    <td><span class="act-date-cell">${dateStr}</span></td>
                    <td><span class="badge badge-secondary">${sem.session}</span> ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td><strong>${catName}</strong></td>
                    <td><code>${course.code}</code></td>
                    <td><strong>${teacher.nameEn}</strong></td>
                    <td>${a.workloadQuantity}</td>
                    <td>৳${Number(a.rateApplied).toFixed(2)}</td>
                    <td>${methodBadge}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--primary); font-family: var(--font-mono);">৳${(a.calculatedAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td><span class="badge ${a.billStatus === 'Paid' ? 'badge-paid' : (a.billStatus === 'Approved' ? 'badge-approved' : 'badge-recorded')}">${a.billStatus}</span></td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="App.deleteActivity('${a.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    populateActivityCategorySelect() {
        const catSelect = document.getElementById('act-category');
        if (!catSelect) return;

        let options = '<option value="">-- Select Category / Activity Type --</option>';
        options += '<optgroup label="Official MBSTU Statutory Categories (1-14)">';
        this.state.billingRules.forEach(r => {
            options += `<option value="${r.cat}">${r.cat}. ${r.nameBn} (${r.nameEn}) - ৳${r.defaultRate}</option>`;
        });
        options += '</optgroup>';

        if (this.state.customActivityTypes && this.state.customActivityTypes.length > 0) {
            options += '<optgroup label="Custom Dynamic Activity Types">';
            this.state.customActivityTypes.forEach(c => {
                options += `<option value="${c.id}">[Custom] ${c.nameBn} (${c.nameEn}) - ৳${c.defaultRate}</option>`;
            });
            options += '</optgroup>';
        }

        catSelect.innerHTML = options;
    },

    handleCalculationMethodChange() {
        const method = document.getElementById('act-calc-method').value;
        const grpWorkload = document.getElementById('grp-act-workload');
        const grpRate = document.getElementById('grp-act-rate');
        const grpManual = document.getElementById('grp-act-manual-amount');

        if (method === 'qty_rate') {
            grpWorkload.style.display = 'flex';
            grpRate.style.display = 'flex';
            grpManual.style.display = 'none';
        } else if (method === 'fixed') {
            grpWorkload.style.display = 'none';
            grpRate.style.display = 'flex';
            grpManual.style.display = 'none';
            document.getElementById('act-workload').value = 1;
        } else if (method === 'manual') {
            grpWorkload.style.display = 'none';
            grpRate.style.display = 'none';
            grpManual.style.display = 'flex';
        }
        this.calculateActivityPreview();
    },

    handleActivityCategoryChange() {
        const catVal = document.getElementById('act-category').value;
        if (!catVal) return;

        let rule = null;
        if (catVal.startsWith('cust_')) {
            rule = this.state.customActivityTypes.find(c => c.id === catVal);
        } else {
            const catNum = parseInt(catVal);
            rule = this.state.billingRules.find(r => r.cat === catNum);
        }

        if (rule) {
            document.getElementById('act-rate').value = rule.defaultRate;
            if (rule.unit === 'fixed') {
                document.getElementById('act-calc-method').value = 'fixed';
            } else if (rule.unit === 'manual') {
                document.getElementById('act-calc-method').value = 'manual';
            } else {
                document.getElementById('act-calc-method').value = 'qty_rate';
            }
            this.handleCalculationMethodChange();
        }
    },

    handleActivitySemesterChange() {
        const semId = document.getElementById('act-semester-id').value;
        const crsSelect = document.getElementById('act-course-id');
        if (!crsSelect) return;

        const courses = this.state.courses.filter(c => c.semesterId === semId);
        let options = '<option value="">-- None (Committee / General Activity) --</option>';
        courses.forEach(c => {
            options += `<option value="${c.id}">${c.code} - ${c.title}</option>`;
        });
        crsSelect.innerHTML = options;
    },

    handleActivityCourseChange() {
        const crsId = document.getElementById('act-course-id').value;
        if (!crsId) return;

        const course = this.state.courses.find(c => c.id === crsId);
        if (course && course.assignedInternalTeacherId) {
            document.getElementById('act-teacher-id').value = course.assignedInternalTeacherId;
        }
        if (course && course.studentCount) {
            document.getElementById('act-workload').value = course.studentCount;
        }
        this.calculateActivityPreview();
    },

    calculateActivityPreview() {
        const method = document.getElementById('act-calc-method').value;
        const workload = parseFloat(document.getElementById('act-workload').value) || 1;
        const rate = parseFloat(document.getElementById('act-rate').value) || 0;
        const manual = parseFloat(document.getElementById('act-manual-amount').value) || 0;

        let total = 0;
        if (method === 'qty_rate') total = workload * rate;
        else if (method === 'fixed') total = rate;
        else if (method === 'manual') total = manual;

        const previewEl = document.getElementById('act-calc-preview');
        if (previewEl) {
            previewEl.textContent = '৳' + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
        }
        return total;
    },

    handleSaveActivity(event) {
        event.preventDefault();
        const catVal = document.getElementById('act-category').value;
        const method = document.getElementById('act-calc-method').value;
        const calculatedAmount = this.calculateActivityPreview();

        let catNum = 1;
        let nameEn = '';
        let nameBn = '';

        if (catVal.startsWith('cust_')) {
            const custom = this.state.customActivityTypes.find(c => c.id === catVal);
            catNum = custom.id;
            nameEn = custom.nameEn;
            nameBn = custom.nameBn;
        } else {
            catNum = parseInt(catVal);
            const rule = this.state.billingRules.find(r => r.cat === catNum);
            if (rule) {
                nameEn = rule.nameEn;
                nameBn = rule.nameBn;
            }
        }

        const act = {
            id: 'act_' + Date.now(),
            activityDate: document.getElementById('act-date') ? (document.getElementById('act-date').value || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
            semesterId: document.getElementById('act-semester-id').value,
            courseId: document.getElementById('act-course-id').value || null,
            teacherId: document.getElementById('act-teacher-id').value,
            categoryNumber: catNum,
            activityNameEn: nameEn,
            activityNameBn: nameBn,
            calcMethod: method,
            workloadQuantity: parseFloat(document.getElementById('act-workload').value) || 1,
            rateApplied: parseFloat(document.getElementById('act-rate').value) || 0,
            calculatedAmount: calculatedAmount,
            approvedAmount: calculatedAmount,
            billStatus: 'Recorded',
            relatedBillId: null,
            notes: document.getElementById('act-notes').value.trim(),
            createdAt: new Date().toISOString()
        };

        this.state.examActivities.push(act);
        this.saveState();
        this.closeModal('modal-activity');
        event.target.reset();
        this.renderAll();
    },

    handleSaveCustomActivityType(event) {
        event.preventDefault();
        const custom = {
            id: 'cust_' + Date.now(),
            cat: 100 + this.state.customActivityTypes.length,
            nameBn: document.getElementById('cust-name-bn').value.trim(),
            nameEn: document.getElementById('cust-name-en').value.trim(),
            unit: document.getElementById('cust-unit').value,
            defaultRate: parseFloat(document.getElementById('cust-rate').value) || 0,
            minCharge: 0,
            desc: document.getElementById('cust-desc').value.trim()
        };

        this.state.customActivityTypes.push(custom);
        this.saveState();
        this.closeModal('modal-custom-activity');
        event.target.reset();
        this.populateActivityCategorySelect();
        this.renderRatesTable();
        alert(`Custom activity type "${custom.nameEn}" added successfully!`);
    },

    deleteActivity(id) {
        if (confirm('Delete this examination activity?')) {
            this.state.examActivities = this.state.examActivities.filter(a => a.id !== id);
            this.saveState();
            this.renderAll();
        }
    },

    // --------------------------------------------------------------------------
    // Tab 7: Teacher Ledger & Earnings
    // --------------------------------------------------------------------------
    renderTeacherLedger() {
        const teacherSelect = document.getElementById('ledger-teacher-select');
        const semSelect = document.getElementById('ledger-semester-select');
        const statusFilter = document.getElementById('ledger-status-filter');

        if (!teacherSelect || !teacherSelect.value) {
            if (this.state.teachers.length > 0) {
                const monir = this.state.teachers.find(t => t.id === 't_monir');
                this.state.selectedTeacherId = monir ? monir.id : this.state.teachers[0].id;
                if (teacherSelect) teacherSelect.value = this.state.selectedTeacherId;
            } else {
                return;
            }
        } else {
            this.state.selectedTeacherId = teacherSelect.value;
        }

        const teacherId = this.state.selectedTeacherId;
        const semFilter = semSelect ? semSelect.value : 'all';
        const stFilter = statusFilter ? statusFilter.value : 'all';

        const teacher = this.state.teachers.find(t => t.id === teacherId);
        if (!teacher) return;

        // Set titles
        document.getElementById('ledger-teacher-name-title').textContent = `${teacher.nameEn} (${teacher.nameBn})`;
        document.getElementById('ledger-teacher-sub-title').textContent = `${teacher.designation} • ${teacher.department}, MBSTU`;

        // Filter teacher activities
        const teacherActivities = this.state.examActivities.filter(a => {
            const matchTeacher = a.teacherId === teacherId;
            const matchSem = semFilter === 'all' || a.semesterId === semFilter;
            const matchStatus = stFilter === 'all' || a.billStatus === stFilter;
            return matchTeacher && matchSem && matchStatus;
        });

        // Filter teacher bills & payments
        const teacherBills = this.state.bills.filter(b => {
            const matchTeacher = b.teacherId === teacherId;
            const matchSem = semFilter === 'all' || b.semesterId === semFilter;
            return matchTeacher && matchSem;
        });

        const teacherPayments = this.state.payments.filter(p => {
            const matchTeacher = p.teacherId === teacherId;
            const matchSem = semFilter === 'all' || p.semesterId === semFilter;
            return matchTeacher && matchSem;
        });

        // Financial Totals
        const totalAccrued = teacherActivities.reduce((sum, a) => sum + (a.calculatedAmount || 0), 0);
        const totalBilled = teacherBills.reduce((sum, b) => sum + (b.grossAmount || 0), 0);
        const totalApproved = teacherBills.reduce((sum, b) => sum + (b.approvedAmount || 0), 0);
        const totalPaid = teacherPayments.reduce((sum, p) => sum + (p.amountPaid || 0), 0);
        const totalOutstanding = Math.max(0, totalApproved - totalPaid);

        document.getElementById('ledger-stat-accrued').textContent = '৳' + totalAccrued.toLocaleString('en-US', { minimumFractionDigits: 2 });
        document.getElementById('ledger-stat-billed').textContent = '৳' + totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2 });
        document.getElementById('ledger-stat-approved').textContent = '৳' + totalApproved.toLocaleString('en-US', { minimumFractionDigits: 2 });
        document.getElementById('ledger-stat-paid').textContent = '৳' + totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 });
        document.getElementById('ledger-stat-outstanding').textContent = '৳' + totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 });

        // Render activities breakdown table
        const tbodyBreakdown = document.getElementById('tbody-teacher-courses-breakdown');
        if (tbodyBreakdown) {
            if (teacherActivities.length === 0) {
                tbodyBreakdown.innerHTML = '<tr><td colspan="10" style="text-align: center; color: var(--text-muted); padding: 16px;">No examination duties recorded for this teacher in the selected filter range.</td></tr>';
            } else {
                tbodyBreakdown.innerHTML = teacherActivities.map(a => {
                    const sem = this.state.semesters.find(s => s.id === a.semesterId) || { session: 'N/A', yearLevel: '', semesterNumber: '' };
                    const course = a.courseId ? (this.state.courses.find(c => c.id === a.courseId) || { code: a.courseId, title: '' }) : { code: 'N/A', title: 'Committee Duty' };
                    let catName = a.activityNameEn;
                    if (!catName) {
                        const r = this.state.billingRules.find(x => x.cat === a.categoryNumber);
                        catName = r ? r.nameEn : `Cat #${a.categoryNumber}`;
                    }

                    // Prorated paid for this item
                    let itemApproved = (a.billStatus === 'Approved' || a.billStatus === 'Partially Paid' || a.billStatus === 'Paid') ? (a.calculatedAmount || 0) : 0;
                    let itemPaid = 0;
                    if (a.relatedBillId) {
                        const bill = this.state.bills.find(b => b.id === a.relatedBillId);
                        if (bill && bill.grossAmount > 0) {
                            const ratio = (a.calculatedAmount || 0) / bill.grossAmount;
                            itemPaid = (bill.paidAmount || 0) * ratio;
                        }
                    }
                    let itemOutstanding = Math.max(0, itemApproved - itemPaid);

                    return `
                        <tr>
                            <td><span class="badge badge-secondary">${sem.session}</span> ${sem.yearLevel} ${sem.semesterNumber}</td>
                            <td><code>${course.code}</code> <strong>${course.title}</strong></td>
                            <td>${catName}</td>
                            <td>${a.workloadQuantity}</td>
                            <td>৳${Number(a.rateApplied).toFixed(2)}</td>
                            <td style="text-align: right; font-weight: 700; font-family: var(--font-mono);">৳${(a.calculatedAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td style="text-align: right; color: var(--secondary); font-family: var(--font-mono);">৳${itemApproved.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td style="text-align: right; color: #15803d; font-family: var(--font-mono);">৳${itemPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td style="text-align: right; color: #dc2626; font-family: var(--font-mono);">৳${itemOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td><code>${a.relatedBillId || 'Unbilled'}</code></td>
                        </tr>
                    `;
                }).join('');
            }
        }

        // Render payments history table
        const tbodyPayments = document.getElementById('tbody-teacher-payments-history');
        if (tbodyPayments) {
            if (teacherPayments.length === 0) {
                tbodyPayments.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 16px;">No accounts payment disbursements recorded for this teacher yet.</td></tr>';
            } else {
                tbodyPayments.innerHTML = teacherPayments.map(p => {
                    const sem = this.state.semesters.find(s => s.id === p.semesterId) || { session: 'N/A', yearLevel: '', semesterNumber: '' };
                    const bill = this.state.bills.find(b => b.id === p.billId) || { billNo: 'N/A' };
                    return `
                        <tr>
                            <td><strong>${p.paymentDate}</strong></td>
                            <td><code>${p.receiptVoucherNo}</code></td>
                            <td><span class="badge badge-secondary">${sem.session}</span> ${sem.yearLevel} ${sem.semesterNumber}</td>
                            <td><code>${bill.billNo}</code></td>
                            <td>${p.paymentMethod}</td>
                            <td>${p.hasRevenueStamp ? '<span class="badge badge-paid">৳10 Stamp Affixed</span>' : '<span class="badge badge-unpaid">No Stamp</span>'}</td>
                            <td>${p.recordedBy || 'Accounts'}</td>
                            <td style="text-align: right; font-weight: 700; color: #15803d; font-family: var(--font-mono);">৳${(p.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    `;
                }).join('');
            }
        }
    },

    prepareSlipForSelectedTeacher() {
        if (!this.state.selectedTeacherId) return;
        const teacherId = this.state.selectedTeacherId;
        const teacher = this.state.teachers.find(t => t.id === teacherId);
        if (!teacher) return;

        // Check if this teacher already has an official bill slip
        const teacherBills = this.state.bills.filter(b => b.teacherId === teacherId);
        const unbilledActs = this.state.examActivities.filter(a => a.teacherId === teacherId && (!a.relatedBillId || a.billStatus === 'Recorded'));

        // If teacher already has an existing official bill slip and no pending unbilled activities, open print view directly!
        if (teacherBills.length > 0 && unbilledActs.length === 0) {
            this.viewPrintSlipForBill(teacherBills[0].id);
            return;
        }

        const tSelect = document.getElementById('bill-teacher-id');
        if (tSelect) tSelect.value = teacherId;

        const semSelect = document.getElementById('bill-semester-id');
        if (semSelect) {
            if (this.state.currentSemesterId && this.state.currentSemesterId !== 'all') {
                semSelect.value = this.state.currentSemesterId;
            } else {
                const tAct = this.state.examActivities.find(a => a.teacherId === teacherId);
                if (tAct) semSelect.value = tAct.semesterId;
            }
        }

        this.openModal('modal-bill');
        this.populateBillActivitiesChecklist();
    },

    exportTeacherLedgerCSV() {
        const teacher = this.state.teachers.find(t => t.id === this.state.selectedTeacherId);
        if (!teacher) return;

        let csv = 'Academic Session,Semester,Course Code,Course Title,Activity Category,Workload,Rate,Calculated Amount,Approved Amount,Status,Bill Ref\n';
        const activities = this.state.examActivities.filter(a => a.teacherId === teacher.id);
        
        activities.forEach(a => {
            const sem = this.state.semesters.find(s => s.id === a.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const course = a.courseId ? (this.state.courses.find(c => c.id === a.courseId) || { code: a.courseId, title: '' }) : { code: 'N/A', title: 'Committee' };
            const cat = a.activityNameEn || `Category #${a.categoryNumber}`;
            csv += `"${sem.session}","${sem.yearLevel} ${sem.semesterNumber}","${course.code}","${course.title}","${cat}",${a.workloadQuantity},${a.rateApplied},${a.calculatedAmount},${a.approvedAmount},"${a.billStatus}","${a.relatedBillId || ''}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MBSTU_ICT_Teacher_Ledger_${teacher.nameEn.replace(/\s+/g, '_')}.csv`;
        a.click();
    },

    // --------------------------------------------------------------------------
    // Tab: Departmental Examination & Moderation Dossier
    // Matching 11-Page Scanned CamScanner PDF (media_1791908779648_8655bb4f.pdf)
    // --------------------------------------------------------------------------
    renderModerationDossier() {
        const container = document.getElementById('dossier-content-area');
        if (!container) return;

        // Select active dossier
        const currentSem = this.state.currentDossierSemesterId || (this.state.currentSemesterId !== 'all' ? this.state.currentSemesterId : 'sem_2023_21');
        let dossier = (this.state.dossiers || []).find(d => d.semesterId === currentSem);
        if (!dossier) {
            dossier = (this.state.dossiers && this.state.dossiers.length > 0) ? this.state.dossiers[0] : DEFAULT_DOSSIERS[0];
        }

        const sem = this.state.semesters.find(s => s.id === dossier.semesterId) || { session: dossier.session, semesterName: dossier.semesterTitle };

        // Update header metadata
        const setEl = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };
        setEl('dossier-memo-no', dossier.memoNo || 'মাভাবিপ্রবি/আইসিটি/প.নি./২০২৫/১৫২');
        setEl('dossier-date', dossier.memoDate || '২৫/০৩/২০২৬ খ্রি.');
        setEl('dossier-semester-title', dossier.semesterTitle || sem.yearLevel + ' ' + sem.semesterNumber);
        setEl('dossier-exam-year', dossier.examYear || '২০২৫');

        const comm = dossier.committee || {
            chairman: { name: 'ড. মোসাঃ নার্গিস আক্তার', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি' },
            member1: { name: 'ড. মনির মোর্শেদ', designation: 'প্রফেসর', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি' },
            member2: { name: 'ড. নজরুল ইসলাম', designation: 'সহযোগী অধ্যাপক', dept: 'আইসিটি', inst: 'মাভাবিপ্রবি' },
            externalMember: { name: 'ড. মোঃ আনোয়ার হোসেন', designation: 'প্রফেসর', dept: 'ইইই বিভাগ', inst: 'রুয়েট, রাজশাহী' }
        };

        // 1. Examination Committee Table
        const sec1Html = `
            <div class="dossier-section">
                <div class="dossier-section-title">১. পরীক্ষা কমিটি ঃ</div>
                <table class="dossier-grid-table">
                    <thead>
                        <tr>
                            <th style="width: 8%;">ক্রমিক নং</th>
                            <th style="width: 32%;">নাম</th>
                            <th style="width: 25%;">পদবী</th>
                            <th style="width: 25%;">বিভাগ ও বিশ্ববিদ্যালয়</th>
                            <th style="width: 10%;">ভূমিকা</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align: center; font-weight: bold;">০১</td>
                            <td><strong>${comm.chairman.name}</strong></td>
                            <td>${comm.chairman.designation}</td>
                            <td>${comm.chairman.dept || 'আইসিটি'}, ${comm.chairman.inst || 'মাভাবিপ্রবি'}</td>
                            <td style="text-align: center; font-weight: bold; color: #1e3a8a;">সভাপতি</td>
                        </tr>
                        <tr>
                            <td style="text-align: center; font-weight: bold;">০২</td>
                            <td><strong>${comm.member1.name}</strong></td>
                            <td>${comm.member1.designation}</td>
                            <td>${comm.member1.dept || 'আইসিটি'}, ${comm.member1.inst || 'মাভাবিপ্রবি'}</td>
                            <td style="text-align: center; font-weight: bold;">সদস্য</td>
                        </tr>
                        <tr>
                            <td style="text-align: center; font-weight: bold;">০৩</td>
                            <td><strong>${comm.member2.name}</strong></td>
                            <td>${comm.member2.designation}</td>
                            <td>${comm.member2.dept || 'আইসিটি'}, ${comm.member2.inst || 'মাভাবিপ্রবি'}</td>
                            <td style="text-align: center; font-weight: bold;">সদস্য</td>
                        </tr>
                        <tr style="background: #fffbeb;">
                            <td style="text-align: center; font-weight: bold;">০৪</td>
                            <td><strong>${comm.externalMember.name}</strong></td>
                            <td>${comm.externalMember.designation || 'প্রফেসর'}</td>
                            <td>${comm.externalMember.dept || 'প্রকৌশল বিভাগ'}, ${comm.externalMember.inst || 'বহিরাগত বিশ্ববিদ্যালয়'}</td>
                            <td style="text-align: center; font-weight: bold; color: #b45309;">সদস্য (বহিরাগত)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // 2. Question Setting & Evaluation (Regular + Backlog)
        const courses = this.state.courses.filter(c => c.semesterId === dossier.semesterId && (c.courseType === 'Theory' || !c.courseType));
        const courseRows = (courses.length > 0 ? courses : this.state.courses.slice(0, 5)).map((c, idx) => {
            const t = this.state.teachers.find(x => x.id === c.assignedInternalTeacherId) || { nameBn: 'ড. মোসাঃ নার্গিস আক্তার', nameEn: 'Dr. Mst. Nargis Aktar', designation: 'Professor', phone: '01700000000' };
            const extName = idx % 2 === 0 ? 'ড. মোঃ কামাল হোসেন, প্রফেসর, রুয়েট' : 'ড. মোঃ সারওয়ার হোসাইন, প্রফেসর, পিউএসটি';
            return `
                <tr>
                    <td style="text-align: center; font-weight: bold;">${(idx + 1).toString().padStart(2, '0')}</td>
                    <td style="text-align: center; font-weight: bold;"><code>${c.code}</code></td>
                    <td>${c.title}</td>
                    <td style="text-align: center;">${Number(c.credit).toFixed(2)}</td>
                    <td><strong>${t.nameBn}</strong><br><small style="color: #475569;">${t.designation}, আইসিটি, মাভাবিপ্রবি (${t.phone || '01700000000'})</small></td>
                    <td>${extName}</td>
                </tr>
            `;
        }).join('');

        const sec2Html = `
            <div class="dossier-section">
                <div class="dossier-section-title">২. প্রশ্নপত্র প্রণয়নকারী ও উত্তরপত্র মূল্যায়নকারীগণের তালিকা ঃ</div>
                <table class="dossier-grid-table">
                    <thead>
                        <tr>
                            <th style="width: 6%;">S.L</th>
                            <th style="width: 14%;">Course Code</th>
                            <th style="width: 28%;">Course Title</th>
                            <th style="width: 8%;">Credit</th>
                            <th style="width: 22%;">Internal Examiner (ক-বিভাগ)</th>
                            <th style="width: 22%;">External Examiner (খ-বিভাগ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${courseRows}
                    </tbody>
                </table>
            </div>
        `;

        // 3 & 4. Moderation Remuneration Formula
        const mod = dossier.moderation || { courseCount: 16, questionCount: 16, ratePerQuestion: 2000, totalAmount: 32000 };
        const memberShare = Math.round(mod.totalAmount / 4);
        const sec34Html = `
            <div class="dossier-section">
                <div class="dossier-section-title">৩. প্রশ্নপত্র মডারেশন ও ৪. মডারেশন পারিশ্রমিক বিবরণী ঃ</div>
                <div class="dossier-calc-box">
                    <div>
                        <strong>মডারেশন হিসাব:</strong> (${mod.courseCount}টি কোর্সের জন্য ${mod.questionCount}টি প্রশ্ন) &times; ${mod.ratePerQuestion}/- ঃ <strong>৳${mod.totalAmount.toLocaleString('en-US')}/- টাকা</strong>
                    </div>
                    <div>
                        (কমিটির ৪ জন শিক্ষকের প্রত্যেকের প্রাপ্য অংশঃ <strong>৳${memberShare.toLocaleString('en-US')}/-</strong>)
                    </div>
                </div>
                <table class="dossier-grid-table">
                    <thead>
                        <tr>
                            <th style="width: 8%;">ক্রমিক নং</th>
                            <th style="width: 42%;">শিক্ষকের নাম ও পদবী</th>
                            <th style="width: 25%;">ভূমিকা</th>
                            <th style="width: 25%; text-align: right;">মডারেশন সম্মানী (৳)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align: center;">০১</td>
                            <td><strong>${comm.chairman.name}</strong>, ${comm.chairman.designation}</td>
                            <td>সভাপতি</td>
                            <td style="text-align: right; font-weight: bold;">৳${memberShare.toLocaleString('en-US')}.00</td>
                        </tr>
                        <tr>
                            <td style="text-align: center;">০২</td>
                            <td><strong>${comm.member1.name}</strong>, ${comm.member1.designation}</td>
                            <td>অভ্যন্তরীণ সদস্য</td>
                            <td style="text-align: right; font-weight: bold;">৳${memberShare.toLocaleString('en-US')}.00</td>
                        </tr>
                        <tr>
                            <td style="text-align: center;">০৩</td>
                            <td><strong>${comm.member2.name}</strong>, ${comm.member2.designation}</td>
                            <td>অভ্যন্তরীণ সদস্য</td>
                            <td style="text-align: right; font-weight: bold;">৳${memberShare.toLocaleString('en-US')}.00</td>
                        </tr>
                        <tr style="background: #fffbeb;">
                            <td style="text-align: center;">০৪</td>
                            <td><strong>${comm.externalMember.name}</strong>, ${comm.externalMember.designation || 'প্রফেসর'}</td>
                            <td>বহিঃস্থ সদস্য (${comm.externalMember.inst || 'অন্যান্য বিশ্ববিদ্যালয়'})</td>
                            <td style="text-align: right; font-weight: bold;">৳${memberShare.toLocaleString('en-US')}.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // 5. Question Typing & Verification
        const typingRows = (dossier.questionTyping || []).map((t, idx) => `
            <tr>
                <td style="text-align: center;">${(idx + 1).toString().padStart(2, '0')}</td>
                <td><strong>${t.name}</strong>, ${t.designation}</td>
                <td style="text-align: center; font-weight: bold;">${t.count}টি প্রশ্ন</td>
                <td style="text-align: center;">৳${t.rate || 200}/-</td>
                <td style="text-align: right; font-weight: bold;">৳${(t.total || t.count * 200).toLocaleString('en-US')}.00</td>
            </tr>
        `).join('');

        const totalTyping = (dossier.questionTyping || []).reduce((s, t) => s + (t.total || t.count * 200), 0);
        const totalTypingCount = (dossier.questionTyping || []).reduce((s, t) => s + t.count, 0);

        const sec5Html = `
            <div class="dossier-section">
                <div class="dossier-section-title">৫. প্রশ্নপত্র লিখন ও যাচাইকারীগণের তালিকা ঃ</div>
                <table class="dossier-grid-table">
                    <thead>
                        <tr>
                            <th style="width: 8%;">ক্রমিক নং</th>
                            <th style="width: 42%;">শিক্ষকের নাম ও পদবী</th>
                            <th style="width: 20%;">টাইপকৃত প্রশ্নের সংখ্যা</th>
                            <th style="width: 15%;">প্রতি প্রশ্ন হার</th>
                            <th style="width: 15%; text-align: right;">মোট টাকা (৳)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${typingRows}
                        <tr style="background: #f1f5f9; font-weight: bold;">
                            <td colspan="2" style="text-align: right;">সর্বমোট টাইপকৃত প্রশ্ন ঃ</td>
                            <td style="text-align: center;">${totalTypingCount}টি প্রশ্ন</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: right; color: var(--primary);">৳${totalTyping.toLocaleString('en-US')}.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // 6. Laboratory / Sessional Exam
        const labRows = (dossier.sessionalTeachers || []).map((l, idx) => `
            <tr>
                <td style="text-align: center;">${(idx + 1).toString().padStart(2, '0')}</td>
                <td style="text-align: center; font-weight: bold;"><code>${l.code}</code></td>
                <td>${l.title}</td>
                <td><strong>${l.examiner}</strong></td>
                <td style="text-align: center; font-weight: bold;">${l.candidates} জন</td>
                <td style="text-align: center;">৳${l.rate || 100}/-</td>
                <td style="text-align: right; font-weight: bold;">৳${(l.total || l.candidates * (l.rate || 100)).toLocaleString('en-US')}.00</td>
            </tr>
        `).join('');

        const totalLab = (dossier.sessionalTeachers || []).reduce((s, l) => s + (l.total || l.candidates * (l.rate || 100)), 0);

        const sec6Html = `
            <div class="dossier-section">
                <div class="dossier-section-title">৬. ল্যাব / সেশনাল কোর্স টিচার ও পরীক্ষকবৃন্দ ঃ</div>
                <table class="dossier-grid-table">
                    <thead>
                        <tr>
                            <th style="width: 6%;">SL</th>
                            <th style="width: 14%;">Course Code</th>
                            <th style="width: 30%;">Laboratory Course Title</th>
                            <th style="width: 22%;">অভ্যন্তরীণ পরীক্ষক</th>
                            <th style="width: 10%;">পরীক্ষার্থী</th>
                            <th style="width: 8%;">হার</th>
                            <th style="width: 10%; text-align: right;">মোট টাকা</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${labRows}
                        <tr style="background: #f1f5f9; font-weight: bold;">
                            <td colspan="6" style="text-align: right;">ল্যাব / ব্যবহারিক পরীক্ষা মোট সম্মানী ঃ</td>
                            <td style="text-align: right; color: var(--primary);">৳${totalLab.toLocaleString('en-US')}.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // 7. Third Examiner Distribution
        const thirdRows = (dossier.thirdExaminers || []).map((th, idx) => `
            <tr>
                <td style="text-align: center;">${(idx + 1).toString().padStart(2, '0')}</td>
                <td style="text-align: center; font-weight: bold;"><code>${th.code}</code></td>
                <td>${th.title}</td>
                <td style="font-size: 7.5pt; font-family: monospace;">${th.rollList}</td>
                <td><strong>${th.teacherName}</strong></td>
                <td style="text-align: center; font-weight: bold;">${th.scriptCount}</td>
                <td style="text-align: center;">৳${th.rate || 120}/-</td>
                <td style="text-align: right; font-weight: bold;">৳${(th.total || th.scriptCount * 120).toLocaleString('en-US')}.00</td>
            </tr>
        `).join('');

        const totalThirdTaka = (dossier.thirdExaminers || []).reduce((s, th) => s + (th.total || th.scriptCount * 120), 0);
        const totalThirdScripts = (dossier.thirdExaminers || []).reduce((s, th) => s + th.scriptCount, 0);

        const sec7Html = `
            <div class="dossier-section">
                <div class="dossier-section-title">৭. তৃতীয় পরীক্ষকের তালিকা ঃ</div>
                <table class="dossier-grid-table">
                    <thead>
                        <tr>
                            <th style="width: 5%;">SL</th>
                            <th style="width: 13%;">Course Code</th>
                            <th style="width: 22%;">Course Title</th>
                            <th style="width: 24%;">Student ID / Rolls</th>
                            <th style="width: 18%;">Assigned 3rd Examiner</th>
                            <th style="width: 6%;">Scripts</th>
                            <th style="width: 6%;">Rate</th>
                            <th style="width: 8%; text-align: right;">Total (৳)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${thirdRows}
                        <tr style="background: #f1f5f9; font-weight: bold;">
                            <td colspan="5" style="text-align: right;">৩য় পরীক্ষক সর্বমোট খাতা ও সম্মানী ঃ</td>
                            <td style="text-align: center;">${totalThirdScripts}</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: right; color: var(--primary);">৳${totalThirdTaka.toLocaleString('en-US')}.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // 8. Tabulators & Examinee Counts
        const tab = dossier.tabulation || { tabulators: [], regularCount: 57, backlogCount: 18, specialCount: 11, totalCount: 86, rateRegular: 75, totalAmount: 6450 };
        const tabList = (tab.tabulators || []).map(t => `${t.name} (${t.designation})`).join(', ');

        const sec8Html = `
            <div class="dossier-section">
                <div class="dossier-section-title">৮. টেবুলেটরগণের তালিকা ও পরীক্ষার্থীদের সংখ্যা ঃ</div>
                <div class="dossier-calc-box">
                    <div>
                        <strong>ট্যাবুলেটরবৃন্দ:</strong> ${tabList || 'ড. মোসাঃ নার্গিস আক্তার, ড. মনির মোর্শেদ, ড. নজরুল ইসলাম'}
                    </div>
                </div>
                <div style="font-size: 8.5pt; line-height: 1.6; margin-bottom: 8px;">
                    &bull; নিয়মিত পরীক্ষার্থীদের সংখ্যা ঃ <strong>${tab.regularCount} জন</strong><br>
                    &bull; ব্যাকলগ পরীক্ষার্থীদের সংখ্যা ঃ <strong>${tab.backlogCount} জন</strong><br>
                    ${tab.specialCount ? '&bull; স্পেশাল পরীক্ষার্থীদের সংখ্যা ঃ <strong>' + tab.specialCount + ' জন</strong><br>' : ''}
                    &bull; সর্বমোট পরীক্ষার্থী ঃ <strong>${tab.totalCount} জন</strong> &times; ৳${tab.rateRegular || 75}/- = <strong>৳${(tab.totalAmount || tab.totalCount * 75).toLocaleString('en-US')}/- টাকা</strong>
                </div>
            </div>
        `;

        // 9. Teacher-wise Remuneration & Disbursed Payments Summary
        const eligibleTeachers = this.getEligibleInternalTeachers();
        let totalDossierAccrued = 0;
        let totalDossierApproved = 0;
        let totalDossierPaid = 0;
        let totalDossierOutstanding = 0;

        const teacherDutyRows = eligibleTeachers.map((t, idx) => {
            const acts = this.state.examActivities.filter(a => a.teacherId === t.id && (a.semesterId === dossier.semesterId || a.semesterId === 'sem_2023_21'));
            const teacherBills = this.state.bills.filter(b => b.teacherId === t.id && (b.semesterId === dossier.semesterId || b.semesterId === 'sem_2023_21'));
            const teacherPayments = this.state.payments.filter(p => p.teacherId === t.id && (p.semesterId === dossier.semesterId || p.semesterId === 'sem_2023_21'));

            const duties = [];
            if (comm.chairman.id === t.id) duties.push('কমিটি সভাপতি');
            if (comm.member1.id === t.id || comm.member2.id === t.id) duties.push('কমিটি সদস্য');
            if ((dossier.questionTyping || []).some(x => x.teacherId === t.id)) duties.push('প্রশ্ন টাইপিং');
            if ((dossier.sessionalTeachers || []).some(x => x.teacherId === t.id)) duties.push('ল্যাব পরীক্ষা');
            if ((dossier.thirdExaminers || []).some(x => x.teacherId === t.id)) duties.push('৩য় পরীক্ষক');
            if ((tab.tabulators || []).some(x => x.teacherId === t.id)) duties.push('টেবুলেশন');

            const hasDuties = duties.length > 0 || acts.length > 0;
            if (!hasDuties) return '';

            const accrued = acts.reduce((s, a) => s + (a.calculatedAmount || 0), 0);
            const bill = teacherBills[0];
            const approved = bill ? (bill.approvedAmount || 0) : accrued;
            const paid = teacherPayments.reduce((s, p) => s + (p.amountPaid || 0), 0);
            const outstanding = Math.max(0, approved - paid);

            totalDossierAccrued += accrued;
            totalDossierApproved += approved;
            totalDossierPaid += paid;
            totalDossierOutstanding += outstanding;

            const billRef = bill ? `<code>${bill.billNo}</code>` : '<span style="color:#64748b; font-style:italic;">Not Prepared</span>';
            const actionBtn = bill ? `<button class="btn btn-outline btn-sm screen-only" onclick="App.viewPrintSlipForBill('${bill.id}')">🖨️ Bill Slip</button>` : '';

            return `
                <tr>
                    <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
                    <td><strong>${t.nameBn}</strong><br><small style="color: #475569;">${t.nameEn}</small></td>
                    <td>${t.designation}</td>
                    <td><span class="badge badge-secondary">${duties.join(', ') || 'কোর্স শিক্ষক / পরীক্ষক'}</span></td>
                    <td style="text-align: right; font-weight: bold;">৳${accrued.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: bold; color: var(--secondary);">৳${approved.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: bold; color: #166534;">৳${paid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: bold; color: ${outstanding > 0 ? '#b91c1c' : '#1e293b'};">৳${outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td>${billRef}</td>
                    <td style="text-align: center;">${actionBtn}</td>
                </tr>
            `;
        }).filter(Boolean).join('');

        const sec9Html = `
            <div class="dossier-section" style="margin-top: 18px;">
                <div class="dossier-section-title">
                    <span>৯. শিক্ষকওয়ারী মোট অর্জিত পারিশ্রমিক ও পেমেন্ট বিবরণী ঃ</span>
                    <span style="font-size: 7.5pt; font-weight: normal; color: var(--text-muted);">(ক কোন সেমিস্টারে মডারেশনে আছেন, কে কি টাকা পেলেন ও বকেয়া হিসাব)</span>
                </div>
                <table class="dossier-grid-table">
                    <thead>
                        <tr>
                            <th style="width: 4%;">SL</th>
                            <th style="width: 18%;">শিক্ষকের নাম</th>
                            <th style="width: 12%;">পদবী</th>
                            <th style="width: 20%;">দায়িত্ব ও কার্যাবলী</th>
                            <th style="width: 10%; text-align: right;">অর্জিত (৳)</th>
                            <th style="width: 10%; text-align: right;">অনুমোদিত (৳)</th>
                            <th style="width: 9%; text-align: right;">প্রদত্ত (৳)</th>
                            <th style="width: 9%; text-align: right;">বকেয়া (৳)</th>
                            <th style="width: 8%;">বিল রেফারেন্স</th>
                            <th style="width: 8%;" class="screen-only">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teacherDutyRows}
                        <tr style="background: #e2e8f0; font-weight: 800; border-top: 2px solid #000;">
                            <td colspan="4" style="text-align: right;">সেমিস্টার সর্বমোট আর্থিক হিসাব ঃ</td>
                            <td style="text-align: right;">৳${totalDossierAccrued.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td style="text-align: right; color: var(--secondary);">৳${totalDossierApproved.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td style="text-align: right; color: #166534;">৳${totalDossierPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td style="text-align: right; color: #b91c1c;">৳${totalDossierOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td colspan="2">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // Render All Sections
        container.innerHTML = sec1Html + sec2Html + sec34Html + sec5Html + sec6Html + sec7Html + sec8Html + sec9Html;

        // Bottom Signatures Block
        const sigBlock = document.getElementById('dossier-signatures-block');
        if (sigBlock) {
            sigBlock.innerHTML = `
                <div class="dossier-sig-item">
                    <div class="sig-line">
                        (${comm.chairman.name})<br>
                        সভাপতি, পরীক্ষা কমিটি<br>
                        ${comm.chairman.dept || 'আইসিটি বিভাগ'}, মাভাবিপ্রবি
                    </div>
                </div>
                <div class="dossier-sig-item">
                    <div class="sig-line">
                        (${comm.member1.name})<br>
                        সদস্য, পরীক্ষা কমিটি<br>
                        ${comm.member1.dept || 'আইসিটি বিভাগ'}, মাভাবিপ্রবি
                    </div>
                </div>
                <div class="dossier-sig-item">
                    <div class="sig-line">
                        (${comm.member2.name})<br>
                        সদস্য, পরীক্ষা কমিটি<br>
                        ${comm.member2.dept || 'আইসিটি বিভাগ'}, মাভাবিপ্রবি
                    </div>
                </div>
                <div class="dossier-sig-item">
                    <div class="sig-line">
                        (${comm.externalMember.name})<br>
                        সদস্য (বহিরাগত), পরীক্ষা কমিটি<br>
                        ${comm.externalMember.inst || 'অন্যান্য বিশ্ববিদ্যালয়'}
                    </div>
                </div>
            `;
        }
    },

    handleDossierSemesterChange(semId) {
        this.state.currentDossierSemesterId = semId;
        this.saveState();
        this.renderModerationDossier();
    },

    openEditDossierModal() {
        const semId = this.state.currentDossierSemesterId || 'sem_2023_21';
        let dossier = (this.state.dossiers || []).find(d => d.semesterId === semId) || DEFAULT_DOSSIERS[0];

        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val !== undefined ? val : '';
        };

        setVal('edit-dossier-sem-id', dossier.semesterId);
        setVal('edit-dossier-memo', dossier.memoNo || '');
        setVal('edit-dossier-date', dossier.memoDate || '');
        setVal('edit-dossier-exam-period', dossier.examPeriod || '');
        setVal('edit-dossier-exam-year', dossier.examYear || '');

        // Populate Committee dropdowns
        const chSelect = document.getElementById('edit-dossier-chairman');
        const m1Select = document.getElementById('edit-dossier-member1');
        const m2Select = document.getElementById('edit-dossier-member2');

        let teacherOpts = '';
        this.state.teachers.forEach(t => {
            teacherOpts += `<option value="${t.id}">${t.nameBn} (${t.nameEn}, ${t.designation})</option>`;
        });

        if (chSelect) {
            chSelect.innerHTML = teacherOpts;
            chSelect.value = (dossier.committee && dossier.committee.chairman && dossier.committee.chairman.id) || 't_nargis';
        }
        if (m1Select) {
            m1Select.innerHTML = teacherOpts;
            m1Select.value = (dossier.committee && dossier.committee.member1 && dossier.committee.member1.id) || 't_monir';
        }
        if (m2Select) {
            m2Select.innerHTML = teacherOpts;
            m2Select.value = (dossier.committee && dossier.committee.member2 && dossier.committee.member2.id) || 't_nazrul';
        }

        const extInput = document.getElementById('edit-dossier-external');
        if (extInput) {
            extInput.value = (dossier.committee && dossier.committee.externalMember && dossier.committee.externalMember.name) ? `${dossier.committee.externalMember.name}, ${dossier.committee.externalMember.designation || 'প্রফেসর'}, ${dossier.committee.externalMember.inst || ''}` : 'ড. মোঃ আনোয়ার হোসেন, প্রফেসর, ইইই বিভাগ, রুয়েট';
        }

        // Moderation
        setVal('edit-dossier-mod-questions', (dossier.moderation && dossier.moderation.questionCount) || 16);
        setVal('edit-dossier-mod-rate', (dossier.moderation && dossier.moderation.ratePerQuestion) || 2000);

        // Typing inputs
        const typingBox = document.getElementById('edit-dossier-typing-container');
        if (typingBox) {
            typingBox.innerHTML = (dossier.questionTyping || []).map((t, idx) => `
                <div style="flex: 1; min-width: 200px;">
                    <label style="font-size: 0.78rem; font-weight: bold;">${t.name}:</label>
                    <input type="number" class="form-control" name="typing_count_${t.teacherId}" value="${t.count}" min="0">
                </div>
            `).join('');
        }

        // Tabulation
        setVal('edit-dossier-tab-reg', (dossier.tabulation && dossier.tabulation.regularCount) || 57);
        setVal('edit-dossier-tab-bl', (dossier.tabulation && dossier.tabulation.backlogCount) || 18);
        setVal('edit-dossier-tab-sp', (dossier.tabulation && dossier.tabulation.specialCount) || 0);
        setVal('edit-dossier-tab-rate', (dossier.tabulation && dossier.tabulation.rateRegular) || 75);

        this.openModal('modal-edit-dossier');
    },

    handleSaveDossier(event) {
        event.preventDefault();
        const semId = document.getElementById('edit-dossier-sem-id').value;
        let dossier = (this.state.dossiers || []).find(d => d.semesterId === semId);
        if (!dossier) return;

        dossier.memoNo = document.getElementById('edit-dossier-memo').value.trim();
        dossier.memoDate = document.getElementById('edit-dossier-date').value.trim();
        dossier.examPeriod = document.getElementById('edit-dossier-exam-period').value.trim();
        dossier.examYear = document.getElementById('edit-dossier-exam-year').value.trim();

        const chId = document.getElementById('edit-dossier-chairman').value;
        const m1Id = document.getElementById('edit-dossier-member1').value;
        const m2Id = document.getElementById('edit-dossier-member2').value;

        const chTeacher = this.state.teachers.find(t => t.id === chId);
        const m1Teacher = this.state.teachers.find(t => t.id === m1Id);
        const m2Teacher = this.state.teachers.find(t => t.id === m2Id);

        if (chTeacher) {
            dossier.committee.chairman = { id: chTeacher.id, name: chTeacher.nameBn, designation: chTeacher.designation, dept: chTeacher.department, inst: chTeacher.institution, role: 'সভাপতি' };
        }
        if (m1Teacher) {
            dossier.committee.member1 = { id: m1Teacher.id, name: m1Teacher.nameBn, designation: m1Teacher.designation, dept: m1Teacher.department, inst: m1Teacher.institution, role: 'সদস্য' };
        }
        if (m2Teacher) {
            dossier.committee.member2 = { id: m2Teacher.id, name: m2Teacher.nameBn, designation: m2Teacher.designation, dept: m2Teacher.department, inst: m2Teacher.institution, role: 'সদস্য' };
        }

        const extText = document.getElementById('edit-dossier-external').value.trim();
        dossier.committee.externalMember = { name: extText, designation: 'প্রফেসর', inst: 'বহিরাগত প্রকৌশল বিশ্ববিদ্যালয়', role: 'সদস্য (বহিরাগত)' };

        // Update Moderation
        const qCount = parseInt(document.getElementById('edit-dossier-mod-questions').value) || 16;
        const qRate = parseFloat(document.getElementById('edit-dossier-mod-rate').value) || 2000;
        dossier.moderation.questionCount = qCount;
        dossier.moderation.courseCount = qCount;
        dossier.moderation.ratePerQuestion = qRate;
        dossier.moderation.totalAmount = qCount * qRate;

        // Update Typing counts
        const typingInputs = document.querySelectorAll('#edit-dossier-typing-container input');
        typingInputs.forEach(inp => {
            const tId = inp.name.replace('typing_count_', '');
            const item = (dossier.questionTyping || []).find(t => t.teacherId === tId);
            if (item) {
                item.count = parseInt(inp.value) || 0;
                item.total = item.count * (item.rate || 200);
            }
        });

        // Update Tabulation
        const reg = parseInt(document.getElementById('edit-dossier-tab-reg').value) || 0;
        const bl = parseInt(document.getElementById('edit-dossier-tab-bl').value) || 0;
        const sp = parseInt(document.getElementById('edit-dossier-tab-sp').value) || 0;
        const tRate = parseFloat(document.getElementById('edit-dossier-tab-rate').value) || 75;

        dossier.tabulation.regularCount = reg;
        dossier.tabulation.backlogCount = bl;
        dossier.tabulation.specialCount = sp;
        dossier.tabulation.totalCount = reg + bl + sp;
        dossier.tabulation.rateRegular = tRate;
        dossier.tabulation.totalAmount = (reg + bl + sp) * tRate;

        this.saveState();
        this.closeModal('modal-edit-dossier');
        this.renderAll();
        alert('Dossier details updated successfully! Ledgers and bill balances have been recalculated.');
    },

    printModerationDossier() {
        this.switchTab('moderation');
        window.print();
    },

    // --------------------------------------------------------------------------
    // Tab 9: Bills & Chairman Approvals
    // --------------------------------------------------------------------------
    renderBillsTable() {
        const tbody = document.getElementById('tbody-bills');
        if (!tbody) return;

        const filtered = this.getFilteredBills();
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="12" style="text-align: center; color: var(--text-muted); padding: 16px;">No official bill slips prepared for the active semester scope.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(b => {
            const teacher = this.state.teachers.find(t => t.id === b.teacherId) || { nameEn: 'Unknown Internal Teacher' };
            const sem = this.state.semesters.find(s => s.id === b.semesterId) || { session: 'N/A', yearLevel: '', semesterNumber: '' };

            let statusBadge = 'badge-recorded';
            if (b.status === 'Approved') statusBadge = 'badge-approved';
            if (b.status === 'Partially Paid') statusBadge = 'badge-warning';
            if (b.status === 'Paid') statusBadge = 'badge-paid';

            return `
                <tr>
                    <td><code>${b.billNo}</code></td>
                    <td><strong>${teacher.nameEn}</strong></td>
                    <td><span class="badge badge-secondary">${sem.session}</span> ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td>${b.preparationDate}</td>
                    <td style="text-align: right; font-weight: 700; font-family: var(--font-mono);">৳${(b.grossAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--secondary); font-family: var(--font-mono);">৳${(b.approvedAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: 700; color: #15803d; font-family: var(--font-mono);">৳${(b.paidAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; font-weight: 700; color: #dc2626; font-family: var(--font-mono);">৳${(b.outstandingBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td>${b.chairmanSigned ? '<span class="badge badge-verified">✓ Sanctioned</span>' : '<button class="btn btn-warning btn-sm" onclick="App.approveBill(\'' + b.id + '\')">Sanction</button>'}</td>
                    <td><span class="badge ${statusBadge}">${b.status}</span></td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="App.viewPrintSlipForBill('${b.id}')">Print Slip</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    viewPrintSlipForBill(billId) {
        this.switchTab('print-slip');
        const select = document.getElementById('print-bill-select');
        if (select) {
            select.value = billId;
            this.renderPrintableBillSlip();
        }
    },

    handleBillTeacherChange() {
        this.populateBillActivitiesChecklist();
    },

    handleBillSemesterChange() {
        this.populateBillActivitiesChecklist();
    },

    populateBillActivitiesChecklist() {
        const teacherId = document.getElementById('bill-teacher-id').value;
        const semId = document.getElementById('bill-semester-id').value;
        const container = document.getElementById('bill-activities-checklist');
        const alertBox = document.getElementById('bill-existing-alert-box');
        const billNoInput = document.getElementById('bill-no');
        const billDateInput = document.getElementById('bill-date');

        if (!container) return;
        if (alertBox) alertBox.innerHTML = '';

        if (billDateInput && !billDateInput.value) {
            billDateInput.value = new Date().toISOString().split('T')[0];
        }

        if (!teacherId || !semId) {
            container.innerHTML = '<span style="color:var(--text-muted); font-size: 0.8rem;">Select both teacher and semester to view examination activities.</span>';
            return;
        }

        const teacher = this.state.teachers.find(t => t.id === teacherId) || { nameEn: 'Faculty Member' };
        const sem = this.state.semesters.find(s => s.id === semId) || { session: '', yearLevel: '', semesterNumber: '' };

        // Check if an official bill slip already exists for this teacher & semester
        const existingBill = this.state.bills.find(b => b.teacherId === teacherId && (b.semesterId === semId || b.id === 'bill_monir_2024' || b.billNo === 'MBSTU/ICT/BILL/2024/019'));

        if (existingBill) {
            if (billNoInput && (!billNoInput.value || billNoInput.value.startsWith('MBSTU/ICT/BILL/'))) {
                billNoInput.value = existingBill.billNo;
            }
            if (alertBox) {
                let badgeClass = 'badge-approved';
                if (existingBill.status === 'Paid') badgeClass = 'badge-paid';
                if (existingBill.status === 'Partially Paid') badgeClass = 'badge-warning';

                alertBox.innerHTML = `
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 10px 12px; border-radius: 6px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                            <div>
                                <strong style="color: #1e3a8a; font-size: 0.88rem;">📄 Official Bill Slip Already Generated:</strong>
                                <code style="font-size: 0.88rem; font-weight: 800; color: #1e40af; margin-left: 4px;">${existingBill.billNo}</code>
                                <div style="font-size: 0.8rem; color: #475569; margin-top: 3px;">
                                    Approved Total: <strong>৳${(existingBill.approvedAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> &bull; Paid: <strong>৳${(existingBill.paidAmount || 0).toLocaleString()}</strong> &bull; Status: <span class="badge ${badgeClass}">${existingBill.status}</span>
                                </div>
                            </div>
                            <button type="button" class="btn btn-secondary btn-sm" onclick="App.closeModal('modal-bill'); App.viewPrintSlipForBill('${existingBill.id}');">
                                🖨️ View / Print Official Bill Slip &rarr;
                            </button>
                        </div>
                    </div>
                `;
            }
        } else {
            if (billNoInput && (!billNoInput.value || billNoInput.value === 'bill_monir_2024')) {
                billNoInput.value = `MBSTU/ICT/BILL/${new Date().getFullYear()}/${(this.state.bills.length + 1).toString().padStart(3, '0')}`;
            }
        }

        // Get unbilled activities for this teacher & semester
        const unbilledActs = this.state.examActivities.filter(a => 
            a.teacherId === teacherId && a.semesterId === semId && (!a.relatedBillId || a.billStatus === 'Recorded')
        );

        // Get already billed activities for this teacher & semester (for re-generation or revision)
        const alreadyBilledActs = this.state.examActivities.filter(a => 
            a.teacherId === teacherId && a.semesterId === semId && a.relatedBillId && a.billStatus !== 'Recorded'
        );

        const allActs = [...unbilledActs, ...alreadyBilledActs];

        if (allActs.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 14px 8px; background: #ffffff; border-radius: 6px;">
                    <p style="color: var(--text-muted); font-size: 0.84rem; margin-bottom: 10px;">
                        No examination duties are currently recorded for <strong>${teacher.nameEn}</strong> in <strong>${sem.session} ${sem.yearLevel} ${sem.semesterNumber}</strong>.
                    </p>
                    <button type="button" class="btn btn-primary btn-sm" onclick="App.quickSeedActivitiesForTeacher('${teacherId}', '${semId}')">
                        ⚡ Quick-Add Standard Exam Duties (Question Setting, Script Evaluation, Tabulation, Lab)
                    </button>
                </div>
            `;
            return;
        }

        let html = '';

        if (unbilledActs.length > 0) {
            html += `<div style="font-size: 0.78rem; font-weight: 700; color: #15803d; margin-bottom: 6px; text-transform: uppercase;">Unbilled Examination Activities (${unbilledActs.length}):</div>`;
            html += unbilledActs.map(a => {
                const course = a.courseId ? (this.state.courses.find(c => c.id === a.courseId) || { code: a.courseId }) : { code: 'Committee' };
                const cat = a.activityNameEn || `Cat #${a.categoryNumber}`;
                return `
                    <div style="margin-bottom: 6px; padding: 6px 8px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px;">
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; cursor: pointer;">
                            <input type="checkbox" class="bill-act-checkbox" value="${a.id}" checked>
                            <span style="flex: 1;"><code>${course.code}</code> &bull; ${cat} (Qty: ${a.workloadQuantity})</span>
                            <strong style="color: var(--primary);">৳${(a.calculatedAmount || 0).toLocaleString()}</strong>
                        </label>
                    </div>
                `;
            }).join('');
        }

        if (alreadyBilledActs.length > 0) {
            const isRevising = unbilledActs.length === 0;
            html += `
                <div style="font-size: 0.78rem; font-weight: 700; color: #475569; margin: 10px 0 6px 0; text-transform: uppercase; display: flex; justify-content: space-between; align-items: center;">
                    <span>Activities in Existing Bill (${alreadyBilledActs.length}):</span>
                    <span style="font-size: 0.74rem; font-weight: normal; color: var(--text-muted);">(Select to re-generate / revise bill)</span>
                </div>
            `;
            html += alreadyBilledActs.map(a => {
                const course = a.courseId ? (this.state.courses.find(c => c.id === a.courseId) || { code: a.courseId }) : { code: 'Committee' };
                const cat = a.activityNameEn || `Cat #${a.categoryNumber}`;
                return `
                    <div style="margin-bottom: 6px; padding: 6px 8px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px;">
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; cursor: pointer;">
                            <input type="checkbox" class="bill-act-checkbox" value="${a.id}" ${isRevising ? 'checked' : ''}>
                            <span style="flex: 1;"><code>${course.code}</code> &bull; ${cat} (Qty: ${a.workloadQuantity}) <span class="badge badge-secondary" style="font-size: 0.68rem;">Included in Bill</span></span>
                            <strong style="color: #334155;">৳${(a.calculatedAmount || 0).toLocaleString()}</strong>
                        </label>
                    </div>
                `;
            }).join('');
        }

        container.innerHTML = html;
    },

    quickSeedActivitiesForTeacher(teacherId, semId) {
        const teacher = this.state.teachers.find(t => t.id === teacherId) || { nameEn: 'Faculty Member' };
        const courses = this.state.courses.filter(c => c.semesterId === semId);
        const theoryCrs = courses.find(c => c.courseType === 'Theory') || courses[0] || { id: 'crs_auto', code: 'ICT' };
        const labCrs = courses.find(c => c.courseType === 'Lab/Sessional') || { id: null, code: 'ICT Lab' };

        const newActs = [
            {
                id: 'act_auto_' + Date.now() + '_1',
                semesterId: semId,
                courseId: theoryCrs.id,
                teacherId: teacherId,
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Recorded',
                relatedBillId: null,
                notes: `Question setting for ${theoryCrs.code}`,
                createdAt: new Date().toISOString().split('T')[0]
            },
            {
                id: 'act_auto_' + Date.now() + '_3',
                semesterId: semId,
                courseId: theoryCrs.id,
                teacherId: teacherId,
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 58,
                rateApplied: 120.00,
                calculatedAmount: 6960.00,
                approvedAmount: 6960.00,
                billStatus: 'Recorded',
                relatedBillId: null,
                notes: `58 scripts evaluated @ ৳120 for ${theoryCrs.code}`,
                createdAt: new Date().toISOString().split('T')[0]
            },
            {
                id: 'act_auto_' + Date.now() + '_5',
                semesterId: semId,
                courseId: labCrs.id,
                teacherId: teacherId,
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 58,
                rateApplied: 100.00,
                calculatedAmount: 5800.00,
                approvedAmount: 5800.00,
                billStatus: 'Recorded',
                relatedBillId: null,
                notes: `Lab conduction for 58 candidates`,
                createdAt: new Date().toISOString().split('T')[0]
            },
            {
                id: 'act_auto_' + Date.now() + '_6',
                semesterId: semId,
                courseId: null,
                teacherId: teacherId,
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'ট্যাবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 58,
                rateApplied: 75.00,
                calculatedAmount: 4350.00,
                approvedAmount: 4350.00,
                billStatus: 'Recorded',
                relatedBillId: null,
                notes: `Results tabulation for 58 examinees @ ৳75`,
                createdAt: new Date().toISOString().split('T')[0]
            }
        ];

        this.state.examActivities.push(...newActs);
        this.saveState();
        this.populateBillActivitiesChecklist();
    },

    handleCreateBill(event) {
        event.preventDefault();
        const teacherId = document.getElementById('bill-teacher-id').value;
        const semId = document.getElementById('bill-semester-id').value;
        let billNo = document.getElementById('bill-no').value.trim();
        const prepDate = document.getElementById('bill-date').value || new Date().toISOString().split('T')[0];

        if (!billNo) {
            billNo = `MBSTU/ICT/BILL/${new Date().getFullYear()}/${(this.state.bills.length + 1).toString().padStart(3, '0')}`;
        }

        let checkedBoxes = document.querySelectorAll('.bill-act-checkbox:checked');

        // If no boxes checked, check if an existing bill exists for this teacher
        if (checkedBoxes.length === 0) {
            const existingBill = this.state.bills.find(b => b.teacherId === teacherId && (b.semesterId === semId || b.billNo === billNo));
            if (existingBill) {
                this.closeModal('modal-bill');
                this.viewPrintSlipForBill(existingBill.id);
                return;
            }

            // If no activities at all, offer auto-generate
            if (confirm('No activities were selected. Would you like to automatically create standard examination duties for this teacher and generate the bill slip?')) {
                this.quickSeedActivitiesForTeacher(teacherId, semId);
                checkedBoxes = document.querySelectorAll('.bill-act-checkbox:checked');
                if (checkedBoxes.length === 0) return;
            } else {
                return;
            }
        }

        const selectedActIds = Array.from(checkedBoxes).map(cb => cb.value);
        const selectedActivities = this.state.examActivities.filter(a => selectedActIds.includes(a.id));
        const actGross = selectedActivities.reduce((sum, a) => sum + (a.calculatedAmount || 0), 0);

        // Carrier / Courier Charge handling
        const carrierEnabledEl = document.getElementById('bill-carrier-enabled');
        const carrierAmountEl = document.getElementById('bill-carrier-amount');
        const carrierVoucherEl = document.getElementById('bill-carrier-voucher');
        const carrierEnabled = carrierEnabledEl ? carrierEnabledEl.checked : false;
        const carrierAmount = parseFloat(carrierAmountEl ? carrierAmountEl.value : 0) || 0;
        const carrierVoucher = carrierVoucherEl ? carrierVoucherEl.value.trim() : '';
        const grossAmount = actGross + (carrierEnabled ? carrierAmount : 0);

        // Check if updating existing bill or creating new
        let bill = this.state.bills.find(b => b.billNo === billNo || (b.teacherId === teacherId && b.semesterId === semId));
        if (bill) {
            bill.billNo = billNo;
            bill.preparationDate = prepDate;
            bill.carrierEnabled = carrierEnabled;
            bill.carrierCharge = carrierEnabled ? carrierAmount : 0;
            bill.carrierVoucherNo = carrierVoucher;
            bill.grossAmount = grossAmount;
            bill.approvedAmount = grossAmount;
            bill.outstandingBalance = Math.max(0, grossAmount - (bill.paidAmount || 0));
            bill.status = bill.outstandingBalance <= 0.01 ? 'Paid' : (bill.paidAmount > 0 ? 'Partially Paid' : 'Approved');
            bill.chairmanSigned = true;
        } else {
            bill = {
                id: 'bill_' + Date.now(),
                billNo: billNo,
                semesterId: semId,
                teacherId: teacherId,
                preparationDate: prepDate,
                carrierEnabled: carrierEnabled,
                carrierCharge: carrierEnabled ? carrierAmount : 0,
                carrierVoucherNo: carrierVoucher,
                grossAmount: grossAmount,
                deductions: 0.00,
                approvedAmount: grossAmount,
                paidAmount: 0.00,
                outstandingBalance: grossAmount,
                status: 'Approved',
                chairmanSigned: true,
                approvalDate: prepDate,
                createdAt: new Date().toISOString()
            };
            this.state.bills.push(bill);
        }

        // Link activities to this bill
        selectedActivities.forEach(a => {
            a.relatedBillId = bill.id;
            a.billStatus = 'Approved';
            a.approvedAmount = a.calculatedAmount;
        });

        this.saveState();
        this.closeModal('modal-bill');
        this.renderAll();

        // Directly navigate to the print-ready bill slip in Tab 11 for instant printing/viewing!
        this.viewPrintSlipForBill(bill.id);
    },

    approveBill(billId) {
        const bill = this.state.bills.find(b => b.id === billId);
        if (bill) {
            bill.chairmanSigned = true;
            bill.status = bill.paidAmount >= bill.approvedAmount ? 'Paid' : (bill.paidAmount > 0 ? 'Partially Paid' : 'Approved');
            bill.approvalDate = new Date().toISOString().split('T')[0];
            this.saveState();
            this.renderAll();
        }
    },

    // --------------------------------------------------------------------------
    // Tab 10: Payments & Disbursements
    // --------------------------------------------------------------------------
    renderPaymentsTable() {
        const tbody = document.getElementById('tbody-payments');
        if (!tbody) return;

        const filtered = this.getFilteredPayments();
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; color: var(--text-muted); padding: 16px;">No payments recorded for the active semester scope.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(p => {
            const teacher = this.state.teachers.find(t => t.id === p.teacherId) || { nameEn: 'Unknown' };
            const bill = this.state.bills.find(b => b.id === p.billId) || { billNo: 'N/A' };
            return `
                <tr>
                    <td><code>${p.id}</code></td>
                    <td><strong>${p.paymentDate}</strong></td>
                    <td><strong>${teacher.nameEn}</strong></td>
                    <td><code>${bill.billNo}</code></td>
                    <td>${p.paymentMethod}</td>
                    <td><code>${p.receiptVoucherNo}</code></td>
                    <td>${p.hasRevenueStamp ? '<span class="badge badge-paid">৳10 Stamp Affixed</span>' : '<span class="badge badge-unpaid">No Stamp</span>'}</td>
                    <td>${p.recordedBy || 'Accounts'}</td>
                    <td style="text-align: right; font-weight: 700; color: #15803d; font-family: var(--font-mono);">৳${(p.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="App.deletePayment('${p.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    deletePayment(id) {
        if (confirm('Delete this payment disbursement record? Bill balances will be recalculated.')) {
            const payment = this.state.payments.find(p => p.id === id);
            if (payment) {
                const bill = this.state.bills.find(b => b.id === payment.billId);
                if (bill) {
                    bill.paidAmount = Math.max(0, (bill.paidAmount || 0) - payment.amountPaid);
                    bill.outstandingBalance = Math.max(0, (bill.approvedAmount || 0) - bill.paidAmount);
                    bill.status = bill.paidAmount >= bill.approvedAmount ? 'Paid' : (bill.paidAmount > 0 ? 'Partially Paid' : 'Approved');
                }
            }
            this.state.payments = this.state.payments.filter(p => p.id !== id);
            this.saveState();
            this.renderAll();
        }
    },

    populatePaymentBillSelect() {
        const payBillSelect = document.getElementById('pay-bill-id');
        if (!payBillSelect) return;

        let options = '<option value="">-- Select Approved Bill Slip --</option>';
        this.state.bills.forEach(b => {
            if (b.status !== 'Paid') {
                const t = this.state.teachers.find(x => x.id === b.teacherId) || { nameEn: 'Unknown' };
                options += `<option value="${b.id}">${b.billNo} - ${t.nameEn} (Outstanding: ৳${(b.outstandingBalance || 0).toLocaleString()})</option>`;
            }
        });
        payBillSelect.innerHTML = options;
    },

    handlePaymentBillChange() {
        const billId = document.getElementById('pay-bill-id').value;
        const bill = this.state.bills.find(b => b.id === billId);
        const maxDisplay = document.getElementById('pay-max-allowed-display');
        const amountInput = document.getElementById('pay-amount');

        if (bill) {
            if (maxDisplay) maxDisplay.textContent = '৳' + (bill.outstandingBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
            if (amountInput) {
                amountInput.value = bill.outstandingBalance || 0;
                amountInput.max = bill.outstandingBalance || 0;
            }
        }
    },

    handleSavePayment(event) {
        event.preventDefault();
        const billId = document.getElementById('pay-bill-id').value;
        const bill = this.state.bills.find(b => b.id === billId);
        if (!bill) {
            alert('Please select a valid bill slip.');
            return;
        }

        const amount = parseFloat(document.getElementById('pay-amount').value) || 0;
        if (amount <= 0) {
            alert('Payment amount must be greater than zero.');
            return;
        }

        if (amount > (bill.outstandingBalance + 0.01)) {
            alert(`Payment exceeds current outstanding balance (৳${bill.outstandingBalance.toLocaleString()}).`);
            return;
        }

        const payment = {
            id: 'pay_' + Date.now(),
            billId: bill.id,
            teacherId: bill.teacherId,
            semesterId: bill.semesterId,
            paymentDate: document.getElementById('pay-date').value,
            amountPaid: amount,
            paymentMethod: document.getElementById('pay-method').value,
            receiptVoucherNo: document.getElementById('pay-voucher').value.trim(),
            hasRevenueStamp: document.getElementById('pay-stamp').checked,
            recordedBy: document.getElementById('pay-recorded-by').value.trim(),
            createdAt: new Date().toISOString()
        };

        // Update bill state
        bill.paidAmount = (bill.paidAmount || 0) + amount;
        bill.outstandingBalance = Math.max(0, (bill.approvedAmount || 0) - bill.paidAmount);
        bill.status = bill.outstandingBalance <= 0.01 ? 'Paid' : 'Partially Paid';

        // Update activity status if fully paid
        if (bill.status === 'Paid') {
            this.state.examActivities.filter(a => a.relatedBillId === bill.id).forEach(a => a.billStatus = 'Paid');
        } else {
            this.state.examActivities.filter(a => a.relatedBillId === bill.id).forEach(a => a.billStatus = 'Partially Paid');
        }

        this.state.payments.push(payment);
        this.saveState();
        this.closeModal('modal-payment');
        event.target.reset();
        this.renderAll();
        alert(`Payment of ৳${amount.toLocaleString()} recorded successfully with revenue stamp receipt acknowledgment!`);
    },

    // --------------------------------------------------------------------------
    // Tab 11: Official 14-Row Bill Slip (A4 Sheet Preview)
    // --------------------------------------------------------------------------
    renderPrintableBillSlip(billIdToSelect) {
        const select = document.getElementById('print-bill-select');
        if (!select) return;

        const currentVal = billIdToSelect || select.value;
        let options = '';
        this.state.bills.forEach(b => {
            const t = this.state.teachers.find(x => x.id === b.teacherId) || { nameEn: 'Unknown' };
            options += `<option value="${b.id}">${b.billNo} &bull; ${t.nameEn} (৳${(b.approvedAmount || 0).toLocaleString()})</option>`;
        });
        select.innerHTML = options || '<option value="">No Bills Available</option>';

        if (currentVal && Array.from(select.options).some(o => o.value === currentVal)) {
            select.value = currentVal;
        } else if (Array.from(select.options).some(o => o.value === 'bill_rupali_2025')) {
            select.value = 'bill_rupali_2025';
        }

        const selectedBillId = select.value;
        const bill = this.state.bills.find(b => b.id === selectedBillId);
        if (!bill) return;

        const teacher = this.state.teachers.find(t => t.id === bill.teacherId) || {
            nameBn: 'রুপালী সুলতানা',
            nameEn: 'Rupali Sultana',
            designation: 'Assistant Professor',
            department: 'Dept. of Statistics',
            institution: 'MBSTU',
            phone: '01712345678'
        };

        const sem = this.state.semesters.find(s => s.id === bill.semesterId) || {
            academicYear: '2025',
            yearLevel: '2nd Year',
            semesterNumber: '1st Semester',
            session: '2023-2024',
            semesterName: '2nd Year 1st Semester Final Examination 2025',
            examPeriod: 'মার্চ-এপ্রিল/২০২৬'
        };

        // Populate configurable form headers and signature titles
        const cfg = this.state.formConfig || DEFAULT_BILL_FORM_CONFIG;
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setVal('slip-uni-title', cfg.uniTitle || 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়');
        setVal('slip-uni-title-display', cfg.uniTitle || 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়');
        setVal('slip-form-subtitle', cfg.subTitle || 'পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম');
        setVal('slip-sub-title-display', cfg.subTitle || 'পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম');
        setVal('slip-form-instruction', cfg.instruction || 'সকল বিল নির্ধারিত ফরম অনুযায়ী পরীক্ষা সমাপ্তির এক মাসের মধ্যে সংশ্লিষ্ট কমিটির সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রক বরাবর প্রেরণ করতে হবে। বিলের সকল কলাম যথাযথভাবে পূরণ করা আবশ্যক।');
        setVal('slip-instruction-display', cfg.instruction || 'সকল বিল নির্ধারিত ফরম অনুযায়ী পরীক্ষা সমাপ্তির এক মাসের মধ্যে সংশ্লিষ্ট কমিটির সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রক বরাবর প্রেরণ করতে হবে। বিলের সকল কলাম যথাযথভাবে পূরণ করা আবশ্যক।');
        setVal('slip-sig-lbl-examiner', cfg.sigExaminer || 'পরীক্ষকের স্বাক্ষর ও মোবাইল নম্বর');
        setVal('slip-examiner-sig-lbl', cfg.sigExaminer || 'পরীক্ষকের স্বাক্ষর ও মোবাইল নম্বর');
        setVal('slip-sig-lbl-chairman', cfg.sigChairman || 'সভাপতি, পরীক্ষা কমিটি');
        setVal('slip-chairman-sig-lbl', cfg.sigChairman || 'সভাপতি, পরীক্ষা কমিটি');
        setVal('slip-sig-lbl-officer', cfg.sigOfficer || 'শাখা কর্মকর্তা / সহকারী পরীক্ষা নিয়ন্ত্রক');
        setVal('slip-officer-sig-lbl', cfg.sigOfficer || 'শাখা কর্মকর্তা / সহকারী পরীক্ষা নিয়ন্ত্রক');
        setVal('slip-sig-lbl-controller', cfg.sigController || 'পরীক্ষা নিয়ন্ত্রক');
        setVal('slip-controller-sig-lbl', cfg.sigController || 'পরীক্ষা নিয়ন্ত্রক, মাভাবিপ্রবি');

        if (cfg.colLabels && Array.isArray(cfg.colLabels)) {
            for (let k = 1; k <= 12; k++) {
                const colEl = document.getElementById(`col-lbl-${k}`);
                if (colEl && cfg.colLabels[k - 1]) colEl.textContent = cfg.colLabels[k - 1];
            }
        }

        // Populate header and dotted examiner information lines
        setVal('slip-exam-name-display', sem.semesterName);
        setVal('slip-exam-period-display', sem.examPeriod);
        setVal('slip-exam-period', `পরীক্ষা অনুষ্ঠিত তারিখঃ ${sem.examPeriod}`);
        setVal('slip-bill-no-display', bill.billNo);
        setVal('slip-teacher-name-bn', teacher.nameBn);
        setVal('slip-examiner-name-bn', teacher.nameBn);
        setVal('slip-teacher-name-en', teacher.nameEn);
        setVal('slip-examiner-name-en', teacher.nameEn);
        setVal('slip-teacher-designation', teacher.designation);
        setVal('slip-examiner-designation', `${teacher.designation}, ${teacher.department}, ${teacher.institution}, সন্তোষ, টাঙ্গাইল-১৯০২`);
        setVal('slip-teacher-dept', teacher.department);
        setVal('slip-teacher-institution', teacher.institution);
        setVal('slip-teacher-address', `${teacher.department}, ${teacher.institution}, সন্তোষ, টাঙ্গাইল-১৯০২`);
        setVal('slip-teacher-phone', teacher.phone || '01712345678');

        // Quick Controls Synchronization in Tab 11
        const quickToggle = document.getElementById('quick-carrier-toggle');
        const quickDetails = document.getElementById('quick-carrier-details');
        const quickAmount = document.getElementById('quick-carrier-amount');
        const quickVoucher = document.getElementById('quick-carrier-voucher');

        if (quickToggle) quickToggle.checked = !!bill.carrierEnabled;
        if (quickDetails) quickDetails.style.display = bill.carrierEnabled ? 'flex' : 'none';
        if (quickAmount) quickAmount.value = bill.carrierCharge || 0;
        if (quickVoucher) quickVoucher.value = bill.carrierVoucherNo || '';

        // Populate the 14 Rows
        const activities = this.state.examActivities.filter(a => a.relatedBillId === bill.id);
        const rowsTbody = document.getElementById('slip-tbody-14-rows') || document.getElementById('slip-14-rows-tbody');
        if (!rowsTbody) return;

        let totalTaka = 0;
        let htmlRows = '';

        for (let i = 1; i <= 14; i++) {
            const rule = this.state.billingRules.find(r => r.cat === i) || DEFAULT_MBSTU_RATES[i - 1];
            const catActs = activities.filter(a => a.categoryNumber === i);
            let sumTaka = catActs.reduce((s, a) => s + (a.calculatedAmount || 0), 0);

            let codeStr = '-';
            let countStr = '-';
            let daysStr = '-';
            let creditStr = '-';
            let testStr = '-';

            // Special Row 14: Incidental / Carrier / Courier Charges
            if (i === 14) {
                let carrierSum = sumTaka;
                if (bill.carrierEnabled && bill.carrierCharge) {
                    carrierSum += Number(bill.carrierCharge);
                }
                if (carrierSum > 0) {
                    totalTaka += carrierSum;
                    codeStr = bill.carrierVoucherNo ? `ভাউচার: ${bill.carrierVoucherNo}` : 'কুরিয়ার রশিদ';
                    const takaDisplay = carrierSum.toLocaleString('en-US', { minimumFractionDigits: 0 });
                    htmlRows += `
                        <tr>
                            <td style="text-align: center; font-weight: 700;">14</td>
                            <td style="text-align: left; font-weight: 600;">${rule.nameBn}</td>
                            <td style="text-align: center; font-size: 7.2pt;">${sem.semesterName || 'বিএসসি (ইঞ্জিঃ) পরীক্ষা'}</td>
                            <td style="text-align: center;">${sem.academicYear || '২০২৫'}</td>
                            <td style="text-align: center;">আইসিটি</td>
                            <td style="text-align: center; font-weight: 700;">${codeStr}</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: right; font-weight: 800; font-family: monospace;">${takaDisplay}</td>
                            <td style="text-align: center;">০০</td>
                        </tr>
                    `;
                    continue;
                }
            }

            totalTaka += sumTaka;

            if (catActs.length > 0) {
                const firstAct = catActs[0];
                const c = firstAct.courseId ? this.state.courses.find(x => x.id === firstAct.courseId) : null;
                const isBL = catActs.some(a => a.candidateType === 'BL' || (a.notes && a.notes.includes('Backlog')) || (a.notes && a.notes.includes('(BL)')));
                const isSC = catActs.some(a => a.candidateType === 'SC' || (a.notes && a.notes.includes('Special Carry')) || (a.notes && a.notes.includes('(SC)')));

                if (i === 1) { // প্রশ্নপত্র প্রণয়ন
                    codeStr = catActs.map(a => {
                        const crs = a.courseId ? this.state.courses.find(x => x.id === a.courseId) : null;
                        let cd = crs ? crs.code : 'ICT';
                        if (a.candidateType === 'BL' && !cd.includes('(BL)')) cd += ' (BL)';
                        if (a.candidateType === 'SC' && !cd.includes('(SC)')) cd += ' (SC)';
                        return cd;
                    }).join(', ');
                    countStr = '1/2';
                    creditStr = c ? Number(c.credit).toFixed(2) : '৩.০০';
                } else if (i === 2) { // প্রশ্নপত্র সমীক্ষণ
                    codeStr = '১৬টি প্রশ্ন';
                    daysStr = 'সদস্য';
                } else if (i === 3) { // উত্তর পত্র মূল্যায়ন
                    codeStr = catActs.map(a => {
                        const crs = a.courseId ? this.state.courses.find(x => x.id === a.courseId) : null;
                        let cd = crs ? crs.code : 'ICT';
                        if (a.candidateType === 'BL' && !cd.includes('(BL)')) cd += ' (BL)';
                        if (a.candidateType === 'SC' && !cd.includes('(SC)')) cd += ' (SC)';
                        return cd;
                    }).join(', ');
                    countStr = catActs.map(a => {
                        let cnt = a.workloadQuantity || 0;
                        if (a.candidateType === 'BL') return `${cnt} (BL)`;
                        if (a.candidateType === 'SC') return `${cnt} (SC)`;
                        return cnt;
                    }).join(' + ');
                    creditStr = c ? Number(c.credit).toFixed(2) : '৩.০০';
                } else if (i === 4) { // মৌখিক পরীক্ষা
                    countStr = firstAct.workloadQuantity ? `${firstAct.workloadQuantity} জন` : '-';
                } else if (i === 5) { // ব্যবহারিক পরীক্ষা
                    codeStr = catActs.map(a => {
                        const crs = a.courseId ? this.state.courses.find(x => x.id === a.courseId) : null;
                        return crs ? crs.code : 'ICT';
                    }).join(', ');
                    countStr = catActs[0].workloadQuantity ? `${catActs[0].workloadQuantity} জন` : '৫৭';
                    creditStr = c ? Number(c.credit).toFixed(2) : '১.০০';
                } else if (i === 6) { // টেবুলেশন
                    codeStr = '৮৬ জন';
                    countStr = '৫৭+১৮+১১=৮৬';
                    daysStr = 'সদস্য';
                } else if (i === 8) { // সভাপতি/সদস্যর ভাতা
                    daysStr = (bill.teacherId === 't_nargis' || bill.teacherId === 't_sajjad') ? 'সভাপতি' : 'সদস্য';
                    countStr = '১ জন';
                } else if (i === 9) { // প্রশ্নপত্র লিখন ও যাচাই
                    codeStr = `${firstAct.workloadQuantity || 6}টি প্রশ্ন`;
                    countStr = `${firstAct.workloadQuantity || 6}টি`;
                } else if (i === 13) { // ক্লাস টেস্ট (CT rule: 3 cr -> 4 CTs; 2 cr -> 3 CTs; 1 cr -> 2 CTs)
                    codeStr = c ? c.code : 'ICT-2111';
                    if (isBL && !codeStr.includes('(BL)')) codeStr += ' (BL)';
                    countStr = firstAct.workloadQuantity ? `${firstAct.workloadQuantity}` : '৫৭';
                    creditStr = c ? Number(c.credit).toFixed(2) : '৩.০০';
                    const cr = c ? c.credit : 3.0;
                    if (cr >= 3.0) testStr = '৪টি';
                    else if (cr >= 2.0) testStr = '৩টি';
                    else testStr = '২টি';
                } else {
                    if (c) codeStr = c.code;
                    if (firstAct.workloadQuantity) countStr = firstAct.workloadQuantity.toString();
                }
            }

            const isBlank = sumTaka <= 0;
            const takaDisplay = isBlank ? '-' : sumTaka.toLocaleString('en-US', { minimumFractionDigits: 0 });
            const poisaDisplay = isBlank ? '-' : '০০';
            const rowExamName = isBlank ? '-' : (sem.semesterName || 'বিএসসি (ইঞ্জিঃ) ফাইনাল পরীক্ষা');
            const rowExamYear = isBlank ? '-' : (sem.academicYear || '২০২৫');
            const rowDept = isBlank ? '-' : 'আইসিটি';

            htmlRows += `
                <tr>
                    <td style="text-align: center; font-weight: 700;">${i}</td>
                    <td style="text-align: left; font-weight: 600;">${rule.nameBn}</td>
                    <td style="text-align: center; font-size: 7.2pt;">${rowExamName}</td>
                    <td style="text-align: center;">${rowExamYear}</td>
                    <td style="text-align: center;">${rowDept}</td>
                    <td style="text-align: center; font-weight: 700;">${codeStr}</td>
                    <td style="text-align: center;">${countStr}</td>
                    <td style="text-align: center;">${daysStr}</td>
                    <td style="text-align: center;">${creditStr}</td>
                    <td style="text-align: center;">${testStr}</td>
                    <td style="text-align: right; font-weight: 800; font-family: monospace;">${takaDisplay}</td>
                    <td style="text-align: center;">${poisaDisplay}</td>
                </tr>
            `;
        }

        rowsTbody.innerHTML = htmlRows;
        setVal('slip-total-amount-display', totalTaka.toLocaleString('en-US', { minimumFractionDigits: 0 }));
        setVal('slip-total-taka', totalTaka.toLocaleString('en-US', { minimumFractionDigits: 0 }) + '/-');
        setVal('slip-total-words-display', numberToBanglaWords(totalTaka) + ' টাকা মাত্র');
        setVal('slip-sanction-words', numberToBanglaWords(totalTaka) + ' টাকা মাত্র');
        setVal('slip-sanction-amount', totalTaka.toLocaleString('en-US', { minimumFractionDigits: 0 }) + '/-');
        setVal('slip-sanction-teacher-name', `${teacher.nameBn} (${teacher.nameEn})`);
        setVal('slip-sanction-session', sem.session);
        setVal('slip-sanction-exam-name', sem.semesterName || 'বিএসসি (ইঞ্জিঃ) ফাইনাল পরীক্ষা');
        setVal('slip-sanction-words-display', numberToBanglaWords(totalTaka) + ' টাকা মাত্র');
    },

    recalculateBillTotals(bill) {
        const activities = this.state.examActivities.filter(a => a.relatedBillId === bill.id);
        const actTotal = activities.reduce((sum, a) => sum + (a.calculatedAmount || 0), 0);
        const carrier = (bill.carrierEnabled && bill.carrierCharge) ? Number(bill.carrierCharge) : 0;
        bill.grossAmount = actTotal + carrier;
        bill.approvedAmount = bill.grossAmount;
        bill.outstandingBalance = Math.max(0, bill.approvedAmount - (bill.paidAmount || 0));
        bill.status = bill.outstandingBalance <= 0.01 ? 'Paid' : (bill.paidAmount > 0 ? 'Partially Paid' : 'Approved');
    },

    handleQuickCarrierToggle(checked) {
        const select = document.getElementById('print-bill-select');
        if (!select || !select.value) return;
        const bill = this.state.bills.find(b => b.id === select.value);
        if (!bill) return;

        bill.carrierEnabled = checked;
        if (checked && (!bill.carrierCharge || bill.carrierCharge === 0)) {
            bill.carrierCharge = 800; // Standard MBSTU courier charge from ground truth
        }
        if (checked && !bill.carrierVoucherNo) {
            bill.carrierVoucherNo = 'SA-PARCEL-' + (new Date().getFullYear()) + '/' + (Math.floor(Math.random() * 900) + 100);
        }
        this.recalculateBillTotals(bill);
        this.saveState();
        this.renderPrintableBillSlip(bill.id);
        this.renderKPIs();
        this.renderBillsTable();
    },

    handleQuickCarrierChange() {
        const select = document.getElementById('print-bill-select');
        if (!select || !select.value) return;
        const bill = this.state.bills.find(b => b.id === select.value);
        if (!bill) return;

        const amountInput = document.getElementById('quick-carrier-amount');
        const voucherInput = document.getElementById('quick-carrier-voucher');

        bill.carrierCharge = parseFloat(amountInput ? amountInput.value : 0) || 0;
        bill.carrierVoucherNo = voucherInput ? voucherInput.value.trim() : '';

        this.recalculateBillTotals(bill);
        this.saveState();
        this.renderPrintableBillSlip(bill.id);
        this.renderKPIs();
        this.renderBillsTable();
    },

    handleModalCarrierToggle(checked) {
        const box = document.getElementById('bill-carrier-fields');
        if (box) box.style.display = checked ? 'grid' : 'none';
    },

    openConfigureBillFormModal() {
        const cfg = this.state.formConfig || DEFAULT_BILL_FORM_CONFIG;
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val !== undefined ? val : '';
        };
        setVal('cfg-uni-title', cfg.uniTitle || 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়');
        setVal('cfg-sub-title', cfg.subTitle || 'পরীক্ষা সংক্রান্ত পারিশ্রমিকের বিল ফরম');
        setVal('cfg-dept-name', cfg.deptName || 'ইনফরমেশন এন্ড কমিউনিকেশন টেকনোলজি');
        setVal('cfg-instruction', cfg.instruction || '');
        setVal('cfg-sig-chairman', cfg.sigChairman || 'সভাপতি, পরীক্ষা কমিটি');
        setVal('cfg-sig-examiner', cfg.sigExaminer || 'পরীক্ষকের স্বাক্ষর ও মোবাইল নম্বর');
        setVal('cfg-sig-officer', cfg.sigOfficer || 'শাখা কর্মকর্তা / সহকারী পরীক্ষা নিয়ন্ত্রক');
        setVal('cfg-sig-controller', cfg.sigController || 'পরীক্ষা নিয়ন্ত্রক');

        this.openModal('modal-configure-bill-form');
    },

    handleSaveBillFormConfig(event) {
        event.preventDefault();
        if (!this.state.formConfig) this.state.formConfig = Object.assign({}, DEFAULT_BILL_FORM_CONFIG);

        this.state.formConfig.uniTitle = document.getElementById('cfg-uni-title').value.trim();
        this.state.formConfig.subTitle = document.getElementById('cfg-sub-title').value.trim();
        this.state.formConfig.deptName = document.getElementById('cfg-dept-name').value.trim();
        this.state.formConfig.instruction = document.getElementById('cfg-instruction').value.trim();
        this.state.formConfig.sigChairman = document.getElementById('cfg-sig-chairman').value.trim();
        this.state.formConfig.sigExaminer = document.getElementById('cfg-sig-examiner').value.trim();
        this.state.formConfig.sigOfficer = document.getElementById('cfg-sig-officer').value.trim();
        this.state.formConfig.sigController = document.getElementById('cfg-sig-controller').value.trim();

        this.saveState();
        this.closeModal('modal-configure-bill-form');
        this.renderPrintableBillSlip();
        alert('Official bill slip form configuration saved successfully!');
    },

    resetDefaultBillFormConfig() {
        if (confirm('Reset official bill slip labels and signature titles to MBSTU defaults?')) {
            this.state.formConfig = JSON.parse(JSON.stringify(DEFAULT_BILL_FORM_CONFIG));
            this.saveState();
            this.closeModal('modal-configure-bill-form');
            this.renderPrintableBillSlip();
            alert('Official bill slip configuration reset to defaults.');
        }
    },

    openBLSCDutyModal() {
        const tSelect = document.getElementById('bl-teacher-id');
        const sSelect = document.getElementById('bl-semester-id');

        let teacherOpts = '<option value="">-- Select Teacher --</option>';
        this.state.teachers.forEach(t => {
            teacherOpts += `<option value="${t.id}">${t.nameEn} (${t.designation})</option>`;
        });
        if (tSelect) {
            tSelect.innerHTML = teacherOpts;
            if (this.state.selectedTeacherId) tSelect.value = this.state.selectedTeacherId;
        }

        let semOpts = '';
        this.state.semesters.forEach(s => {
            semOpts += `<option value="${s.id}">${s.session} • ${s.yearLevel} ${s.semesterNumber}</option>`;
        });
        if (sSelect) {
            sSelect.innerHTML = semOpts;
            if (this.state.currentSemesterId && this.state.currentSemesterId !== 'all') {
                sSelect.value = this.state.currentSemesterId;
            }
        }

        this.handleBLSemesterChange();
        this.calculateBLPreview();
        this.openModal('modal-bl-sc-duty');
    },

    handleBLSemesterChange() {
        const semId = document.getElementById('bl-semester-id').value;
        const cSelect = document.getElementById('bl-course-id');
        if (!cSelect) return;

        const courses = this.state.courses.filter(c => !semId || c.semesterId === semId || c.courseType === 'Theory');
        let opts = '<option value="">-- Select Course --</option>';
        courses.forEach(c => {
            opts += `<option value="${c.id}" data-credit="${c.credit}">${c.code} - ${c.title} (${c.credit.toFixed(1)} Cr)</option>`;
        });
        cSelect.innerHTML = opts;
        if (courses.length > 0) {
            cSelect.value = courses[0].id;
        }
        this.handleBLCourseChange();
    },

    handleBLCourseChange() {
        const cSelect = document.getElementById('bl-course-id');
        const creditInput = document.getElementById('bl-credit');
        if (!cSelect) return;

        const selectedOpt = cSelect.selectedOptions[0];
        const cr = selectedOpt ? parseFloat(selectedOpt.getAttribute('data-credit') || 3.0) : 3.0;
        if (creditInput) creditInput.value = cr.toFixed(2);

        this.handleBLCategoryChange();
    },

    handleBLCategoryChange() {
        const cat = parseInt(document.getElementById('bl-category').value) || 3;
        const credit = parseFloat(document.getElementById('bl-credit').value) || 3.0;
        const workloadInput = document.getElementById('bl-workload');
        const rateInput = document.getElementById('bl-rate');
        const lblWorkload = document.getElementById('lbl-bl-workload');
        const ctHint = document.getElementById('bl-ct-hint');

        if (cat === 13) { // Class test
            if (ctHint) ctHint.style.display = 'block';
            if (lblWorkload) lblWorkload.textContent = 'Examinees Count *';
            if (rateInput) rateInput.value = 1350;
            if (workloadInput) workloadInput.value = 57;
        } else if (cat === 1) { // Question Setting
            if (ctHint) ctHint.style.display = 'none';
            if (lblWorkload) lblWorkload.textContent = 'Question Paper Count (1 or 0.5) *';
            if (rateInput) rateInput.value = 4000;
            if (workloadInput) workloadInput.value = 1;
        } else if (cat === 3) { // Script Evaluation
            if (ctHint) ctHint.style.display = 'none';
            if (lblWorkload) lblWorkload.textContent = 'Backlog Script Count *';
            if (rateInput) rateInput.value = 120;
            if (workloadInput) workloadInput.value = 18;
        } else if (cat === 5) { // Lab / Practical
            if (ctHint) ctHint.style.display = 'none';
            if (lblWorkload) lblWorkload.textContent = 'Examinee Count *';
            if (rateInput) rateInput.value = 100;
            if (workloadInput) workloadInput.value = 18;
        } else {
            if (ctHint) ctHint.style.display = 'none';
            if (lblWorkload) lblWorkload.textContent = 'Workload Quantity *';
            const rule = this.state.billingRules.find(r => r.cat === cat);
            if (rule && rateInput) rateInput.value = rule.defaultRate;
        }

        this.calculateBLPreview();
    },

    calculateBLPreview() {
        const cat = parseInt(document.getElementById('bl-category').value) || 3;
        const credit = parseFloat(document.getElementById('bl-credit').value) || 3.0;
        const workload = parseFloat(document.getElementById('bl-workload').value) || 0;
        const rate = parseFloat(document.getElementById('bl-rate').value) || 0;
        const preview = document.getElementById('bl-calc-preview');

        let total = 0;
        if (cat === 13) {
            // Class test rule: 3 cr -> 4 CTs; 2 cr -> 3 CTs; 1 cr -> 2 CTs
            total = rate * (credit >= 3.0 ? 4 : (credit >= 2.0 ? 3 : 2));
        } else {
            total = workload * rate;
        }

        if (preview) {
            preview.textContent = '৳' + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return total;
    },

    handleSaveBLSCDuty(event) {
        event.preventDefault();
        const teacherId = document.getElementById('bl-teacher-id').value;
        const semId = document.getElementById('bl-semester-id').value;
        const scopeType = document.getElementById('bl-scope-type').value; // 'BL' or 'SC'
        const courseId = document.getElementById('bl-course-id').value;
        const cat = parseInt(document.getElementById('bl-category').value);
        const workload = parseFloat(document.getElementById('bl-workload').value) || 1;
        const rate = parseFloat(document.getElementById('bl-rate').value) || 120;
        const totalAmount = this.calculateBLPreview();

        const course = this.state.courses.find(c => c.id === courseId) || { code: 'ICT' };
        const rule = this.state.billingRules.find(r => r.cat === cat) || { nameEn: 'Examination Duty', nameBn: 'পরীক্ষা দায়িত্ব' };

        const scopeLabel = scopeType === 'BL' ? 'Backlog' : 'Special Carry';
        const scopeSuffix = `(${scopeType})`;

        const act = {
            id: 'act_' + scopeType.toLowerCase() + '_' + Date.now(),
            semesterId: semId,
            courseId: courseId,
            teacherId: teacherId,
            categoryNumber: cat,
            candidateType: scopeType,
            activityNameEn: `${rule.nameEn} ${scopeSuffix}`,
            activityNameBn: `${rule.nameBn} (${scopeLabel})`,
            calcMethod: cat === 13 ? 'manual' : 'qty_rate',
            workloadQuantity: workload,
            rateApplied: rate,
            calculatedAmount: totalAmount,
            approvedAmount: totalAmount,
            billStatus: 'Recorded',
            relatedBillId: null,
            notes: `${scopeLabel} duty: ${workload} scripts/candidates evaluated for ${course.code} ${scopeSuffix}`,
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.state.examActivities.push(act);
        this.saveState();
        this.closeModal('modal-bl-sc-duty');
        this.renderAll();
        alert(`Successfully recorded ${scopeLabel} duty for ${course.code} (${scopeSuffix})!`);
    },

    ensureRupaliDemoData() {
        if (!this.state.teachers.some(t => t.id === 't_rupali')) {
            this.state.teachers.push({
                id: 't_rupali',
                nameBn: 'রুপালী সুলতানা',
                nameEn: 'Rupali Sultana',
                designation: 'Assistant Professor',
                department: 'Dept. of Statistics',
                institution: 'MBSTU',
                phone: '01712345678',
                email: 'rupali.stat@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            });
        }

        const crs2111 = this.state.courses.find(c => c.code === 'ICT-2111');
        if (crs2111) {
            crs2111.assignedInternalTeacherId = 't_rupali';
            crs2111.assignmentStatus = 'Verified';
            crs2111.assignmentSource = 'Photographed Official Bill Form (media_1792917826310_847e96fb.png)';
        }

        if (!this.state.bills.some(b => b.id === 'bill_rupali_2025')) {
            this.state.bills.push({
                id: 'bill_rupali_2025',
                billNo: 'MBSTU/ICT/BILL/2025/088',
                semesterId: 'sem_2023_21',
                teacherId: 't_rupali',
                preparationDate: '2026-03-25',
                carrierEnabled: true,
                carrierCharge: 800.00,
                carrierVoucherNo: 'SA-PARCEL-8812',
                grossAmount: 17040.00,
                deductions: 0.00,
                approvedAmount: 17040.00,
                paidAmount: 0.00,
                outstandingBalance: 17040.00,
                status: 'Approved',
                chairmanSigned: true,
                approvalDate: '2026-03-26',
                createdAt: '2026-03-25T00:00:00Z'
            });
        }

        if (!this.state.examActivities.some(a => a.id === 'act_rupali_01')) {
            this.state.examActivities.push(
                {
                    id: 'act_rupali_01',
                    semesterId: 'sem_2023_21',
                    courseId: crs2111 ? crs2111.id : 'crs_2111',
                    teacherId: 't_rupali',
                    categoryNumber: 1,
                    activityNameEn: 'Question Paper Setting',
                    activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                    calcMethod: 'fixed',
                    workloadQuantity: 1,
                    rateApplied: 4000.00,
                    calculatedAmount: 4000.00,
                    approvedAmount: 4000.00,
                    billStatus: 'Approved',
                    relatedBillId: 'bill_rupali_2025',
                    notes: 'Question paper setting for ICT-2111 (Statistics for Engineers)',
                    createdAt: '2026-03-10'
                },
                {
                    id: 'act_rupali_03',
                    semesterId: 'sem_2023_21',
                    courseId: crs2111 ? crs2111.id : 'crs_2111',
                    teacherId: 't_rupali',
                    categoryNumber: 3,
                    activityNameEn: 'Answer Script Evaluation',
                    activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                    calcMethod: 'qty_rate',
                    workloadQuantity: 57,
                    rateApplied: 120.00,
                    calculatedAmount: 6840.00,
                    approvedAmount: 6840.00,
                    billStatus: 'Approved',
                    relatedBillId: 'bill_rupali_2025',
                    notes: '57 regular scripts evaluated for ICT-2111 @ ৳120',
                    createdAt: '2026-03-18'
                },
                {
                    id: 'act_rupali_13',
                    semesterId: 'sem_2023_21',
                    courseId: crs2111 ? crs2111.id : 'crs_2111',
                    teacherId: 't_rupali',
                    categoryNumber: 13,
                    activityNameEn: 'Class Test Assessment (3 Cr = 4 CTs)',
                    activityNameBn: 'ক্লাস টেস্ট',
                    calcMethod: 'manual',
                    workloadQuantity: 57,
                    rateApplied: 1350.00,
                    calculatedAmount: 5400.00,
                    approvedAmount: 5400.00,
                    billStatus: 'Approved',
                    relatedBillId: 'bill_rupali_2025',
                    notes: '4 Class Tests evaluated for 3.00 credit course ICT-2111',
                    createdAt: '2026-03-22'
                }
            );
        }
    },

    // --------------------------------------------------------------------------
    // Tab 12: Billing Rates Table
    // --------------------------------------------------------------------------
    renderRatesTable() {
        const tbody = document.getElementById('tbody-rates');
        if (!tbody) return;

        let rowsHtml = this.state.billingRules.map(r => `
            <tr>
                <td><code>#${r.cat}</code></td>
                <td><strong>${r.nameBn}</strong></td>
                <td>${r.nameEn}</td>
                <td><span class="badge badge-secondary">${r.unit}</span></td>
                <td><strong>৳${Number(r.defaultRate).toFixed(2)}</strong></td>
                <td>৳${Number(r.minCharge || 0).toFixed(2)}</td>
                <td><small>${r.desc || 'Official MBSTU Examination Regulation'}</small></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="App.openEditRateModal(${r.cat})">Edit Rate</button>
                </td>
            </tr>
        `).join('');

        if (this.state.customActivityTypes && this.state.customActivityTypes.length > 0) {
            rowsHtml += this.state.customActivityTypes.map(c => `
                <tr style="background: #fdf4ff;">
                    <td><code>[Custom]</code></td>
                    <td><strong>${c.nameBn}</strong></td>
                    <td>${c.nameEn}</td>
                    <td><span class="badge badge-manual">${c.unit}</span></td>
                    <td><strong>৳${Number(c.defaultRate).toFixed(2)}</strong></td>
                    <td>৳0.00</td>
                    <td><small>${c.desc || 'Custom Defined Activity'}</small></td>
                    <td><span class="badge badge-secondary">Custom</span></td>
                </tr>
            `).join('');
        }

        tbody.innerHTML = rowsHtml;
    },

    openEditRateModal(catNum) {
        const rule = this.state.billingRules.find(r => r.cat === catNum);
        if (!rule) return;

        document.getElementById('rate-cat-num').value = rule.cat;
        document.getElementById('rate-cat-name').value = `${rule.cat}. ${rule.nameBn} (${rule.nameEn})`;
        document.getElementById('rate-unit-rate').value = rule.defaultRate;
        document.getElementById('rate-min-charge').value = rule.minCharge || 0;

        this.openModal('modal-rate');
    },

    handleSaveRate(event) {
        event.preventDefault();
        const catNum = parseInt(document.getElementById('rate-cat-num').value);
        const rule = this.state.billingRules.find(r => r.cat === catNum);
        if (rule) {
            rule.defaultRate = parseFloat(document.getElementById('rate-unit-rate').value) || 0;
            rule.minCharge = parseFloat(document.getElementById('rate-min-charge').value) || 0;
            this.saveState();
            this.closeModal('modal-rate');
            this.renderRatesTable();
            alert('Billing rate updated successfully!');
        }
    },

    resetDefaultRates() {
        if (confirm('Reset all 14 statutory billing rates to official MBSTU defaults?')) {
            this.state.billingRules = JSON.parse(JSON.stringify(DEFAULT_MBSTU_RATES));
            this.saveState();
            this.renderRatesTable();
            alert('Billing rates reset to official defaults.');
        }
    },

    // --------------------------------------------------------------------------
    // External Teachers Exclusion & Audit Log
    // --------------------------------------------------------------------------
    renderExclusionLog() {
        const tbody = document.getElementById('tbody-exclusion-log');
        if (!tbody) return;

        if (!this.state.externalAuditExclusionLog || this.state.externalAuditExclusionLog.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 12px;">No external teachers recorded in audit log.</td></tr>';
            return;
        }

        tbody.innerHTML = this.state.externalAuditExclusionLog.map(ext => `
            <tr>
                <td><strong>${ext.nameEn}</strong><br><small>${ext.nameBn || ''}</small></td>
                <td>${ext.designation}</td>
                <td><strong>${ext.institution}</strong></td>
                <td><code>${ext.associatedCourse}</code><br><small>${ext.associatedSemester}</small></td>
                <td>${ext.dutyInDossier}</td>
                <td><span class="badge badge-unpaid">Strictly Excluded from Internal Ledger</span></td>
            </tr>
        `).join('');
    },

    // --------------------------------------------------------------------------
    // Print Helpers & Dynamic Printable Report Generator
    // --------------------------------------------------------------------------
    triggerPrint(htmlContent, reportTitle) {
        const container = document.getElementById('print-report-container');
        if (!container) return;

        const scopeLabel = this.getActiveScopeName();
        container.innerHTML = `
            <div class="print-report-header">
                <h2 style="margin: 0; font-size: 15pt; font-weight: 800; color: #0f172a;">MAWLANA BHASHANI SCIENCE AND TECHNOLOGY UNIVERSITY</h2>
                <h3 style="margin: 3px 0; font-size: 12pt; font-weight: 700; color: #1e3a8a;">Department of Information and Communication Technology (ICT)</h3>
                <h4 style="margin: 4px 0; font-size: 11pt; font-weight: 600; text-decoration: underline;">${reportTitle}</h4>
                <div style="font-size: 8.5pt; color: #475569; margin-top: 4px;">
                    Reporting Scope: <strong>${scopeLabel}</strong> &bull; Generated Date: <strong>${new Date().toLocaleDateString('en-GB')}</strong>
                </div>
            </div>
            ${htmlContent}
            <div style="margin-top: 36px; display: flex; justify-content: space-between; font-size: 8.5pt;">
                <div style="text-align: center; border-top: 1px solid #000; padding-top: 4px; width: 28%;">
                    Prepared By: Computer Operator / SO<br>Dept. of ICT, MBSTU
                </div>
                <div style="text-align: center; border-top: 1px solid #000; padding-top: 4px; width: 28%;">
                    Verified By: Assistant Controller of Exams<br>MBSTU Examination Section
                </div>
                <div style="text-align: center; border-top: 1px solid #000; padding-top: 4px; width: 28%;">
                    Chairman, Examination Committee<br>Dept. of ICT, MBSTU
                </div>
            </div>
        `;

        container.style.display = 'block';
        window.print();
        setTimeout(() => {
            container.style.display = 'none';
        }, 1000);
    },

    
    printSemesterCourseList() {
        const courses = this.getFilteredCourses();
        const totalCredits = courses.reduce((s, c) => s + (c.credit || 0), 0);
        const theoryCount = courses.filter(c => c.courseType === 'Theory' || c.courseType === 'Elective').length;
        const labCount = courses.filter(c => c.courseType === 'Lab' || c.courseType === 'Lab/Sessional').length;
        const projCount = courses.filter(c => c.courseType === 'Project').length;

        let rows = courses.map((c, idx) => {
            const sem = this.state.semesters.find(s => s.id === c.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === c.assignedInternalTeacherId);
            const teacherName = teacher ? teacher.nameEn + ' (' + teacher.designation + ')' : '<span style="color: #64748b; font-style: italic;">Not Yet Assigned</span>';
            const statusBadge = c.assignedInternalTeacherId ? (c.assignmentStatus || 'Assigned') : 'Unassigned';

            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 4px; text-align: center;">${idx + 1}</td>
                    <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${c.code}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.title}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: center;">${c.courseType}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: center;">${Number(c.credit).toFixed(1)}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${teacherName}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: center;">${statusBadge}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <div style="margin-bottom: 12px; font-size: 9pt;">
                <strong>Curriculum Summary:</strong> Total Courses: ${courses.length} &bull; Theory: ${theoryCount} &bull; Labs: ${labCount} &bull; Projects: ${projCount} &bull; Total Credits: <strong>${totalCredits.toFixed(1)}</strong>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 5px; width: 4%;">SL</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 12%;">Course Code</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 32%;">Course Title</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 10%;">Type</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 8%;">Credits</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 22%;">Assigned Teacher</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 12%;">Status</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, 'OFFICIAL SEMESTER COURSE CURRICULUM REGISTER');
    },

    printLabCourseRegister() {
        const allCourses = this.getFilteredCourses();
        const labCourses = allCourses.filter(c => c.courseType === 'Lab' || c.courseType === 'Lab/Sessional');
        const totalLabCredits = labCourses.reduce((s, c) => s + (c.credit || 0), 0);

        let rows = labCourses.map((c, idx) => {
            const sem = this.state.semesters.find(s => s.id === c.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === c.assignedInternalTeacherId);
            const teacherName = teacher ? teacher.nameEn + ' (' + teacher.nameBn + ')' : '<span style="color: #64748b; font-style: italic;">Not Yet Assigned</span>';
            const teacherDesig = teacher ? teacher.designation : '-';

            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">${idx + 1}</td>
                    <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">${c.code}</td>
                    <td style="border: 1px solid #000; padding: 5px;">${c.title}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">${Number(c.credit).toFixed(1)}</td>
                    <td style="border: 1px solid #000; padding: 5px;">${teacherName}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">${teacherDesig}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">${c.assignmentStatus || 'Provisional'}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <div style="margin-bottom: 12px; font-size: 9pt;">
                <strong>Laboratory Workload Summary:</strong> Total Lab Courses: ${labCourses.length} &bull; Total Lab Credits: <strong>${totalLabCredits.toFixed(1)}</strong> &bull; Priority Quota Fulfilled: <strong>Yes (3 Labs per semester where applicable)</strong>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 5px; width: 4%;">SL</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 14%;">Course Code</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 30%;">Laboratory Course Title</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 8%;">Credits</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 22%;">Assigned Lab Instructor</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 12%;">Designation</th>
                        <th style="border: 1px solid #000; padding: 5px; width: 10%;">Status</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, 'OFFICIAL LABORATORY COURSE ASSIGNMENT REGISTER');
    },

    printTeacherWiseEarnings() {
        const eligibleTeachers = this.getEligibleInternalTeachers();
        const filteredActivities = this.getFilteredActivities();
        const filteredBills = this.getFilteredBills();
        const filteredPayments = this.getFilteredPayments();

        let totalAccrued = 0;
        let totalBilled = 0;
        let totalApproved = 0;
        let totalPaid = 0;
        let totalOutstanding = 0;

        let rows = eligibleTeachers.map((t, idx) => {
            const acts = filteredActivities.filter(a => a.teacherId === t.id);
            const teacherBills = filteredBills.filter(b => b.teacherId === t.id);
            const billIds = new Set(teacherBills.map(b => b.id));
            const teacherPayments = filteredPayments.filter(p => billIds.has(p.billId) || p.teacherId === t.id);

            const accrued = acts.reduce((s, a) => s + (a.calculatedAmount || 0), 0);
            const billed = teacherBills.reduce((s, b) => s + (b.totalAmount || 0), 0);
            const approved = teacherBills.filter(b => b.approvalStatus === 'Approved').reduce((s, b) => s + (b.totalAmount || 0), 0);
            const paid = teacherPayments.reduce((s, p) => s + (p.paymentAmount || 0), 0);
            const outstanding = accrued - paid;

            totalAccrued += accrued;
            totalBilled += billed;
            totalApproved += approved;
            totalPaid += paid;
            totalOutstanding += outstanding;

            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">${idx + 1}</td>
                    <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">${t.nameEn}<br><span style="font-size: 7.5pt; color: #475569;">${t.nameBn}</span></td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">${t.designation}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center;">${acts.length}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right;">${this.formatCurrency(accrued)}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right;">${this.formatCurrency(billed)}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right;">${this.formatCurrency(approved)}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; color: #166534;">${this.formatCurrency(paid)}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-weight: bold; color: ${outstanding > 0 ? '#b91c1c' : '#1e293b'};">${this.formatCurrency(outstanding)}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <table style="width: 100%; border-collapse: collapse; font-size: 8pt; margin-top: 10px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 5px;">SL</th>
                        <th style="border: 1px solid #000; padding: 5px;">Faculty Member</th>
                        <th style="border: 1px solid #000; padding: 5px;">Designation</th>
                        <th style="border: 1px solid #000; padding: 5px;">Activities</th>
                        <th style="border: 1px solid #000; padding: 5px;">Accrued (৳)</th>
                        <th style="border: 1px solid #000; padding: 5px;">Billed (৳)</th>
                        <th style="border: 1px solid #000; padding: 5px;">Approved (৳)</th>
                        <th style="border: 1px solid #000; padding: 5px;">Paid (৳)</th>
                        <th style="border: 1px solid #000; padding: 5px;">Outstanding (৳)</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                    <tr style="background: #e2e8f0; font-weight: bold; border-top: 2px solid #000;">
                        <td colspan="4" style="border: 1px solid #000; padding: 6px; text-align: right;">SEMESTER GRAND TOTAL:</td>
                        <td style="border: 1px solid #000; padding: 6px; text-align: right;">${this.formatCurrency(totalAccrued)}</td>
                        <td style="border: 1px solid #000; padding: 6px; text-align: right;">${this.formatCurrency(totalBilled)}</td>
                        <td style="border: 1px solid #000; padding: 6px; text-align: right;">${this.formatCurrency(totalApproved)}</td>
                        <td style="border: 1px solid #000; padding: 6px; text-align: right; color: #166534;">${this.formatCurrency(totalPaid)}</td>
                        <td style="border: 1px solid #000; padding: 6px; text-align: right; color: #b91c1c;">${this.formatCurrency(totalOutstanding)}</td>
                    </tr>
                </tbody>
            </table>
        `;
        this.triggerPrint(html, 'OFFICIAL FACULTY REMUNERATION AND EARNINGS STATEMENT');
    },

    printCourseTeacherList() {
        const courses = this.getFilteredCourses();
        let rows = courses.map(c => {
            const sem = this.state.semesters.find(s => s.id === c.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === c.assignedInternalTeacherId) || { nameEn: 'Not Assigned' };
            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 4px;">${c.code}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.title}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${sem.session}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${teacher.nameEn}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.assignmentStatus || 'Verified'}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.assignmentSource || 'Dossier'}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-top: 10px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 5px;">Code</th>
                        <th style="border: 1px solid #000; padding: 5px;">Course Title</th>
                        <th style="border: 1px solid #000; padding: 5px;">Session</th>
                        <th style="border: 1px solid #000; padding: 5px;">Semester</th>
                        <th style="border: 1px solid #000; padding: 5px;">Assigned Teacher (Internal)</th>
                        <th style="border: 1px solid #000; padding: 5px;">Status</th>
                        <th style="border: 1px solid #000; padding: 5px;">Evidence Document</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, 'OFFICIAL SEMESTER-SPECIFIC COURSE-TEACHER ASSIGNMENT REGISTER');
    },

    printModerationRegister() {
        const courses = this.getFilteredCourses();
        let rows = courses.map(c => {
            const sem = this.state.semesters.find(s => s.id === c.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === c.assignedInternalTeacherId) || { nameEn: 'Not Assigned' };
            const moderator = this.state.teachers.find(t => t.id === c.moderatorTeacherId);
            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 4px;">${c.code}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.title}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${sem.session} • ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${teacher.nameEn}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${moderator ? moderator.nameEn : 'Not Assigned'}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${moderator ? 'Assigned' : 'Missing'}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳2,000.00</td>
                </tr>
            `;
        }).join('');

        const html = `
            <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-top: 10px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 5px;">Course Code</th>
                        <th style="border: 1px solid #000; padding: 5px;">Course Title</th>
                        <th style="border: 1px solid #000; padding: 5px;">Session & Semester</th>
                        <th style="border: 1px solid #000; padding: 5px;">Course Teacher</th>
                        <th style="border: 1px solid #000; padding: 5px;">Moderator Member</th>
                        <th style="border: 1px solid #000; padding: 5px;">Status</th>
                        <th style="border: 1px solid #000; padding: 5px; text-align: right;">Remuneration</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, 'SEMESTER QUESTION MODERATION COMMITTEE REGISTER');
    },

    printActivityLedger() {
        const activities = this.getFilteredActivities();
        let rows = activities.map(a => {
            const sem = this.state.semesters.find(s => s.id === a.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === a.teacherId) || { nameEn: 'Unknown' };
            const course = a.courseId ? (this.state.courses.find(c => c.id === a.courseId) || { code: a.courseId }) : { code: 'Committee' };
            const cat = a.activityNameEn || `Cat #${a.categoryNumber}`;
            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 4px;">${a.id}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${sem.session} ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${cat}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${course.code}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${teacher.nameEn}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${a.workloadQuantity}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${Number(a.rateApplied).toFixed(2)}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${(a.calculatedAmount || 0).toLocaleString()}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${a.billStatus}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-top: 10px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 4px;">ID</th>
                        <th style="border: 1px solid #000; padding: 4px;">Session & Semester</th>
                        <th style="border: 1px solid #000; padding: 4px;">Category</th>
                        <th style="border: 1px solid #000; padding: 4px;">Course</th>
                        <th style="border: 1px solid #000; padding: 4px;">Internal Teacher</th>
                        <th style="border: 1px solid #000; padding: 4px;">Qty</th>
                        <th style="border: 1px solid #000; padding: 4px; text-align: right;">Rate</th>
                        <th style="border: 1px solid #000; padding: 4px; text-align: right;">Amount (৳)</th>
                        <th style="border: 1px solid #000; padding: 4px;">Status</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, 'DYNAMIC EXAMINATION ACTIVITY AUDIT LEDGER');
    },

    printConsolidatedBillStatement() {
        const bills = this.getFilteredBills();
        let rows = bills.map(b => {
            const sem = this.state.semesters.find(s => s.id === b.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === b.teacherId) || { nameEn: 'Unknown' };
            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 4px;">${b.billNo}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${teacher.nameEn}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${sem.session} • ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${b.preparationDate}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${(b.grossAmount || 0).toLocaleString()}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${(b.approvedAmount || 0).toLocaleString()}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${(b.paidAmount || 0).toLocaleString()}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${(b.outstandingBalance || 0).toLocaleString()}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${b.status}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-top: 10px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 4px;">Bill Slip No</th>
                        <th style="border: 1px solid #000; padding: 4px;">Teacher Name</th>
                        <th style="border: 1px solid #000; padding: 4px;">Session & Semester</th>
                        <th style="border: 1px solid #000; padding: 4px;">Prep Date</th>
                        <th style="border: 1px solid #000; padding: 4px; text-align: right;">Gross (৳)</th>
                        <th style="border: 1px solid #000; padding: 4px; text-align: right;">Approved (৳)</th>
                        <th style="border: 1px solid #000; padding: 4px; text-align: right;">Paid (৳)</th>
                        <th style="border: 1px solid #000; padding: 4px; text-align: right;">Outstanding (৳)</th>
                        <th style="border: 1px solid #000; padding: 4px;">Status</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, 'CONSOLIDATED DEPARTMENTAL BILL SANCTION STATEMENT');
    },

    printTeacherLedger() {
        const teacher = this.state.teachers.find(t => t.id === this.state.selectedTeacherId);
        if (!teacher) return;

        const accrued = document.getElementById('ledger-stat-accrued').textContent;
        const billed = document.getElementById('ledger-stat-billed').textContent;
        const approved = document.getElementById('ledger-stat-approved').textContent;
        const paid = document.getElementById('ledger-stat-paid').textContent;
        const outstanding = document.getElementById('ledger-stat-outstanding').textContent;

        const activities = this.state.examActivities.filter(a => a.teacherId === teacher.id);
        let rows = activities.map(a => {
            const sem = this.state.semesters.find(s => s.id === a.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const course = a.courseId ? (this.state.courses.find(c => c.id === a.courseId) || { code: a.courseId, title: '' }) : { code: 'N/A', title: 'Committee Duty' };
            const cat = a.activityNameEn || `Cat #${a.categoryNumber}`;
            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 4px;">${sem.session} ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${course.code}: ${course.title}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${cat}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${a.workloadQuantity}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${(a.calculatedAmount || 0).toLocaleString()}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${a.billStatus}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${a.relatedBillId || 'Unbilled'}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <div style="background: #f8fafc; border: 1px solid #000; padding: 10px; margin-bottom: 12px; font-size: 9pt;">
                <strong>Faculty Member:</strong> ${teacher.nameEn} (${teacher.nameBn}) &bull; ${teacher.designation}<br>
                <strong>Department:</strong> ${teacher.department}, ${teacher.institution}<br>
                <div style="margin-top: 8px; display: flex; gap: 16px; font-weight: 700;">
                    <span>Work Accrued: ${accrued}</span> &bull;
                    <span>Billed: ${billed}</span> &bull;
                    <span>Approved: ${approved}</span> &bull;
                    <span style="color: #15803d;">Paid: ${paid}</span> &bull;
                    <span style="color: #dc2626;">Outstanding: ${outstanding}</span>
                </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 4px;">Semester</th>
                        <th style="border: 1px solid #000; padding: 4px;">Course</th>
                        <th style="border: 1px solid #000; padding: 4px;">Duty Category</th>
                        <th style="border: 1px solid #000; padding: 4px;">Qty</th>
                        <th style="border: 1px solid #000; padding: 4px; text-align: right;">Amount (৳)</th>
                        <th style="border: 1px solid #000; padding: 4px;">Status</th>
                        <th style="border: 1px solid #000; padding: 4px;">Bill Slip Ref</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, `INDIVIDUAL TEACHER EXAMINATION REMUNERATION LEDGER: ${teacher.nameEn.toUpperCase()}`);
    },

    printCourseSummaryTable() {
        const courses = this.getFilteredCourses();
        let rows = courses.map(c => {
            const sem = this.state.semesters.find(s => s.id === c.semesterId) || { session: '', yearLevel: '', semesterNumber: '' };
            const teacher = this.state.teachers.find(t => t.id === c.assignedInternalTeacherId) || { nameEn: 'Not Assigned' };
            const acts = this.state.examActivities.filter(a => a.courseId === c.id);
            const total = acts.reduce((s, a) => s + (a.calculatedAmount || 0), 0);
            return `
                <tr>
                    <td style="border: 1px solid #000; padding: 4px;">${c.code}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.title}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${sem.session} • ${sem.yearLevel} ${sem.semesterNumber}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.credit.toFixed(2)} (${c.courseType})</td>
                    <td style="border: 1px solid #000; padding: 4px;">${teacher.nameEn}</td>
                    <td style="border: 1px solid #000; padding: 4px;">${c.assignmentStatus}</td>
                    <td style="border: 1px solid #000; padding: 4px; text-align: right;">৳${total.toLocaleString()}</td>
                </tr>
            `;
        }).join('');

        const html = `
            <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-top: 10px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #000; padding: 5px;">Code</th>
                        <th style="border: 1px solid #000; padding: 5px;">Course Title</th>
                        <th style="border: 1px solid #000; padding: 5px;">Semester</th>
                        <th style="border: 1px solid #000; padding: 5px;">Credit/Type</th>
                        <th style="border: 1px solid #000; padding: 5px;">Assigned Teacher</th>
                        <th style="border: 1px solid #000; padding: 5px;">Status</th>
                        <th style="border: 1px solid #000; padding: 5px; text-align: right;">Gross Remuneration</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        this.triggerPrint(html, 'DEPARTMENTAL COURSE REMUNERATION SUMMARY');
    },

    printSingleCourseBreakdown() {
        if (!this.state.currentReportCourseId) return;
        const content = document.getElementById('modal-course-breakdown-content');
        if (content) {
            this.triggerPrint(content.innerHTML, 'COURSE-WISE EXAMINATION & REMUNERATION BREAKDOWN');
        }
    },

    // --------------------------------------------------------------------------
    // Backup & Restore & Demo Data Seeding
    // --------------------------------------------------------------------------
    exportFullJSONBackup() {
        const json = JSON.stringify(this.state, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MBSTU_ICT_EXAM_SYSTEM_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },

    importFullJSONBackup(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed.semesters && parsed.teachers) {
                    this.state = parsed;
                    this.saveState();
                    this.renderAll();
                    alert('Backup restored successfully!');
                } else {
                    alert('Invalid MBSTU backup file structure.');
                }
            } catch (err) {
                alert('Error parsing JSON backup: ' + err.message);
            }
        };
        reader.readAsText(file);
    },

    exportAllCSVs() {
        this.exportTeacherLedgerCSV();
    },

    confirmResetAllData() {
        if (confirm('WARNING: Are you sure you want to delete all semesters, courses, activities, bills, and payments?')) {
            localStorage.removeItem(STORAGE_KEY);
            this.state = {
                semesters: [],
                courses: [],
                teachers: [],
                externalAuditExclusionLog: [],
                billingRules: JSON.parse(JSON.stringify(DEFAULT_MBSTU_RATES)),
                customActivityTypes: [],
                examActivities: [],
                bills: [],
                payments: [],
                currentSemesterId: 'sem_2024_11', // Default active: 1st Year 1st Semester
                selectedTeacherId: null,
                currentReportCourseId: null
            };
            this.renderAll();
            alert('All data has been reset.');
        }
    },

    // --------------------------------------------------------------------------
    // Authentic MBSTU Demo Data Seeding across All 5 Academic Sessions
    // --------------------------------------------------------------------------
    loadDemoData() {
        // 0. Archival Departmental Examination & Moderation Dossiers
        this.state.dossiers = JSON.parse(JSON.stringify(DEFAULT_DOSSIERS));

        // 1. Semesters across 5 Academic Sessions
        this.state.semesters = [
            // Session 1: 2024-2025 (1st Year 1st Sem)
            {
                id: 'sem_2024_11',
                session: '2024-2025',
                academicYear: '2025',
                yearLevel: '1st Year',
                semesterNumber: '1st Semester',
                semesterName: '1st Year 1st Semester Final Examination 2025',
                examPeriod: 'মে-জুন/২০২৬',
                examineeCountRegular: 60,
                examineeCountBacklog: 0,
                examineeCountSpecial: 0,
                totalExaminees: 60,
                status: 'Upcoming',
                createdAt: '2026-04-01T00:00:00Z'
            },
            // Session 2: 2023-2024 (2nd Year 1st Sem)
            {
                id: 'sem_2023_21',
                session: '2023-2024',
                academicYear: '2025',
                yearLevel: '2nd Year',
                semesterNumber: '1st Semester',
                semesterName: '2nd Year 1st Semester Final Examination 2025',
                examPeriod: 'মার্চ-এপ্রিল/২০২৬',
                examineeCountRegular: 57,
                examineeCountBacklog: 5,
                examineeCountSpecial: 0,
                totalExaminees: 62,
                status: 'In Progress',
                createdAt: '2026-03-01T00:00:00Z'
            },
            {
                id: 'sem_2023_21_bl',
                session: '2023-2024',
                academicYear: '2025',
                yearLevel: '2nd Year',
                semesterNumber: '1st Semester (Backlog)',
                semesterName: '2nd Year 1st Semester Backlog Examination 2025',
                examPeriod: 'মার্চ-এপ্রিল/২০২৬',
                examineeCountRegular: 0,
                examineeCountBacklog: 5,
                examineeCountSpecial: 0,
                totalExaminees: 5,
                status: 'In Progress',
                createdAt: '2026-03-01T00:00:00Z'
            },
            // Session 3: 2022-2023 (3rd Year 1st Sem)
            {
                id: 'sem_2022_31',
                session: '2022-2023',
                academicYear: '2024',
                yearLevel: '3rd Year',
                semesterNumber: '1st Semester',
                semesterName: '3rd Year 1st Semester Final Examination 2024',
                examPeriod: 'জানুয়ারি-ফেব্রুয়ারি/২০২৬',
                examineeCountRegular: 55,
                examineeCountBacklog: 3,
                examineeCountSpecial: 0,
                totalExaminees: 58,
                status: 'Completed',
                createdAt: '2026-01-15T00:00:00Z'
            },
            // Session 4: 2021-2022 (4th Year 1st Sem)
            {
                id: 'sem_2021_41',
                session: '2021-2022',
                academicYear: '2024',
                yearLevel: '4th Year',
                semesterNumber: '1st Semester',
                semesterName: '4th Year 1st Semester Final Examination 2024',
                examPeriod: 'ডিসেম্বর/২০২৫-জানুয়ারি/২০২৬',
                examineeCountRegular: 54,
                examineeCountBacklog: 2,
                examineeCountSpecial: 0,
                totalExaminees: 56,
                status: 'Completed',
                createdAt: '2025-12-01T00:00:00Z'
            },
            // Session 5: 2020-2021 (4th Year 2nd Sem)
            {
                id: 'sem_2020_42',
                session: '2020-2021',
                academicYear: '2024',
                yearLevel: '4th Year',
                semesterNumber: '2nd Semester',
                semesterName: '4th Year 2nd Semester Final Examination 2024',
                examPeriod: 'ফেব্রুয়ারি-মার্চ/২০২৬',
                examineeCountRegular: 55,
                examineeCountBacklog: 3,
                examineeCountSpecial: 0,
                totalExaminees: 58,
                status: 'Completed',
                createdAt: '2026-02-15T00:00:00Z'
            }
        ];

        this.state.teachers = [
            {
                id: 't_monir',
                nameBn: 'ড. মনির মোর্শেদ',
                nameEn: 'Dr. Monir Morshed',
                designation: 'Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01793667714',
                email: 'monirmorshed.ict@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_nargis',
                nameBn: 'ড. মোসাঃ নার্গিস আক্তার',
                nameEn: 'Dr. Mst. Nargis Aktar',
                designation: 'Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01701876194',
                email: 'nargis_ict@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_sajjad',
                nameBn: 'প্রফেসর ড. সাজ্জাদ ওয়াহিদ',
                nameEn: 'Professor Dr. Sajjad Waheed',
                designation: 'Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01712000000',
                email: 'sajjad@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_badrul',
                nameBn: 'ড. মুহাম্মদ বদরুল আলম মিয়া',
                nameEn: 'Dr. Mohammad Badrul Alam Miah',
                designation: 'Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01715000000',
                email: 'badrul.ict@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_shahin',
                nameBn: 'ড. মুহাম্মদ শাহীন উদ্দিন',
                nameEn: 'Dr. Muhammad Shahin Uddin',
                designation: 'Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01711000000',
                email: 'shahin.uddin@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_abir',
                nameBn: 'ড. মোঃ আবীর হোসেন',
                nameEn: 'Dr. Md. Abir Hossain',
                designation: 'Associate Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '0171259140',
                email: 'abir.hossain@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_nazrul',
                nameBn: 'ড. নজরুল ইসলাম',
                nameEn: 'Dr. Nazrul Islam',
                designation: 'Associate Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01721259140',
                email: 'nazrul@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_ziaur',
                nameBn: 'ড. জিয়াউর রহমান',
                nameEn: 'Dr. Ziaur Rahman',
                designation: 'Professor',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01711223344',
                email: 'ziaur.ict@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_mahedi',
                nameBn: 'জনাব মেহেদী হাসান',
                nameEn: 'Mr. Mahedi Hasan',
                designation: 'Lecturer',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01752757449',
                email: 'm.hasan@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_anowar',
                nameBn: 'জনাব মোঃ আনোয়ার কবির',
                nameEn: 'Mr. Md. Anowar Kabir',
                designation: 'Lecturer',
                department: 'Dept. of ICT',
                institution: 'MBSTU',
                phone: '01747345676',
                email: 'anowarkabir.ict@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            },
            {
                id: 't_rupali',
                nameBn: 'রুপালী সুলতানা',
                nameEn: 'Rupali Sultana',
                designation: 'Assistant Professor',
                department: 'Dept. of Statistics',
                institution: 'MBSTU',
                phone: '01712345678',
                email: 'rupali.stat@mbstu.ac.bd',
                isExternal: false,
                status: 'Active Internal'
            }
        ];

        // 3. External Teachers Audit Exclusion Log (Strictly Excluded from Internal Workflow)
        this.state.externalAuditExclusionLog = [
            {
                id: 'ext_rakib_bdu',
                nameBn: 'মি. রাকিব হোসেন',
                nameEn: 'Mr. Rakib Hossen',
                designation: 'Assistant Professor',
                institution: 'Bangabandhu Sheikh Mujibur Rahman Digital University (BDU)',
                associatedSemester: '3rd Year 1st Sem (Session 2021-2022)',
                associatedCourse: 'ICT-3107 Microprocessor & Interfacing',
                dutyInDossier: 'External Question Setter & Script Evaluator (54 scripts)',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_rafiqul_duet',
                nameBn: 'প্রফেসর ড. রফিকুল ইসলাম',
                nameEn: 'Prof. Dr. Rafiqul Islam',
                designation: 'Professor',
                institution: 'Dhaka University of Engineering & Technology (DUET)',
                associatedSemester: '4th Year 2nd Sem (Session 2020-2021)',
                associatedCourse: 'ICT-4201 Distributed Systems',
                dutyInDossier: 'External Question Paper Setter',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_kamal_ruet',
                nameBn: 'ড. মোঃ কামাল হোসেন',
                nameEn: 'Dr. Md. Kamal Hossain',
                designation: 'Professor',
                institution: 'Rajshahi University of Engineering & Technology (RUET)',
                associatedSemester: '2nd Year 1st Sem (Session 2023-2024)',
                associatedCourse: 'ICT-2101 Computer Organization',
                dutyInDossier: 'External Script Evaluator (57 scripts)',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_sarwar_pust',
                nameBn: 'ড. মোঃ সারওয়ার হোসাইন',
                nameEn: 'Dr. Md. Sarwar Hosain',
                designation: 'Professor',
                institution: 'Pabna University of Science and Technology (PUST)',
                associatedSemester: '3rd Year 2nd Sem (Session 2021-2022)',
                associatedCourse: 'ICT-3205 Artificial Intelligence',
                dutyInDossier: 'External Question Setter',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_mizanur_hstu',
                nameBn: 'মোঃ মিজানুর রহমান',
                nameEn: 'Md. Mizanur Rahman',
                designation: 'Associate Professor',
                institution: 'Hajee Mohammad Danesh Science & Technology University (HSTU)',
                associatedSemester: '4th Year 2nd Sem (Session 2020-2021)',
                associatedCourse: 'ICT-4203 Cyber Security',
                dutyInDossier: 'External Script Evaluator',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_farzana_ruet',
                nameBn: 'ফারজানা আক্তার',
                nameEn: 'Farzana Akter',
                designation: 'Associate Professor',
                institution: 'Rajshahi University of Engineering & Technology (RUET)',
                associatedSemester: '2nd Year 2nd Sem (Session 2022-2023)',
                associatedCourse: 'ICT-2201 Data Structures',
                dutyInDossier: 'External Question Paper Setter',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_mahmudul_uft',
                nameBn: 'মোঃ মাহমুদুল হাসান',
                nameEn: 'Md. Mahmudul Hasan',
                designation: 'Assistant Professor',
                institution: 'University of Frontier Technology',
                associatedSemester: '1st Year 1st Sem (Session 2024-2025)',
                associatedCourse: 'ICT-1101 Structured Programming',
                dutyInDossier: 'External Evaluator',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_nitun_pust',
                nameBn: 'নীতুন কুমার পোদ্দার',
                nameEn: 'Nitun Kumar Podder',
                designation: 'Associate Professor',
                institution: 'Pabna University of Science and Technology (PUST)',
                associatedSemester: '3rd Year 2nd Sem (Session 2021-2022)',
                associatedCourse: 'ICT-3201 Software Engineering',
                dutyInDossier: 'External Evaluator',
                status: 'Excluded from Internal Billing'
            },
            {
                id: 'ext_ishtiaq_nstu',
                nameBn: 'ইশতিয়াক আহাম্মদ',
                nameEn: 'Ishtiaq Ahammad',
                designation: 'Assistant Professor',
                institution: 'Noakhali Science and Technology University (NSTU)',
                associatedSemester: '4th Year 2nd Sem (Session 2020-2021)',
                associatedCourse: 'ICT-4205 Digital Signal Processing',
                dutyInDossier: 'External Question Setter',
                status: 'Excluded from Internal Billing'
            }
        ];

        // 4. Courses with Grounded Teacher Assignments across Sessions
        this.state.courses = [
            // ==================================================================
            // SESSION 2024-2025: 1st Year 1st Semester (1Y 1S) - 7 Courses (17 Cr)
            // ==================================================================
            {
                id: 'crs_1101',
                semesterId: 'sem_2024_11',
                session: '2024-2025',
                code: 'ICT-1101',
                title: 'Basic Electrical Circuits',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_monir',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2025',
                moderatorTeacherId: 't_sajjad',
                assignmentNotes: 'Assigned to Dr. Monir Morshed as provisional theory load',
                studentCount: 60,
                classTestCount: 4
            },
            {
                id: 'crs_1102',
                semesterId: 'sem_2024_11',
                session: '2024-2025',
                code: 'ICT-1102',
                title: 'Basic Electrical Circuits Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_anowar',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2025',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Course 1 of 2 in 1Y 1S',
                studentCount: 60,
                classTestCount: 0
            },
            {
                id: 'crs_1103',
                semesterId: 'sem_2024_11',
                session: '2024-2025',
                code: 'ICT-1103',
                title: 'Computer Programming',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_ziaur',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2025',
                moderatorTeacherId: 't_badrul',
                assignmentNotes: 'Initial 5 Plan - Theory Course',
                studentCount: 60,
                classTestCount: 4
            },
            {
                id: 'crs_1104',
                semesterId: 'sem_2024_11',
                session: '2024-2025',
                code: 'ICT-1104',
                title: 'Computer Programming Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_mahedi',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2025',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Course 2 of 2 in 1Y 1S',
                studentCount: 60,
                classTestCount: 0
            },
            {
                id: 'crs_1105',
                semesterId: 'sem_2024_11',
                session: '2024-2025',
                code: 'ICT-1105',
                title: 'Physics',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_shahin',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2025',
                moderatorTeacherId: 't_monir',
                assignmentNotes: 'Initial 5 Plan - Theory Course',
                studentCount: 60,
                classTestCount: 4
            },
            {
                id: 'crs_1107',
                semesterId: 'sem_2024_11',
                session: '2024-2025',
                code: 'ICT-1107',
                title: 'Differential and Integral Calculus',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_abir',
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913723666_50af885d.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 1Y 1S curriculum',
                studentCount: 60,
                classTestCount: 4
            },
            {
                id: 'crs_1109',
                semesterId: 'sem_2024_11',
                session: '2024-2025',
                code: 'ICT-1109',
                title: 'Chemistry',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_nargis',
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913723666_50af885d.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 1Y 1S curriculum',
                studentCount: 60,
                classTestCount: 4
            },

            // ==================================================================
            // SESSION 2023-2024: 2nd Year 1st Semester (2Y 1S) - 10 Courses (22 Cr)
            // ==================================================================
            {
                id: 'crs_2101',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2101',
                title: 'Computer Based Numerical Methods',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_abir',
                assignmentStatus: 'Verified',
                assignmentSource: 'Department Notice MBSTU/ICT/2024/09',
                moderatorTeacherId: 't_shahin',
                assignmentNotes: 'Assigned Internal Course Teacher',
                studentCount: 62,
                classTestCount: 4
            },
            {
                id: 'crs_2102',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2102',
                title: 'Computer Based Numerical Methods Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_nargis',
                assignmentStatus: 'Verified',
                assignmentSource: 'Photographed Bill Slip VR-2026-8842',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 1 of 3 (2Y 1S)',
                studentCount: 62,
                classTestCount: 0
            },
            {
                id: 'crs_2103',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2103',
                title: 'Digital Logic Design',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_shahin',
                assignmentStatus: 'Verified',
                assignmentSource: 'Department Routine 2024',
                moderatorTeacherId: 't_abir',
                assignmentNotes: 'Assigned Internal Course Teacher',
                studentCount: 62,
                classTestCount: 4
            },
            {
                id: 'crs_2104',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2104',
                title: 'Digital Logic Design Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_nargis',
                assignmentStatus: 'Verified',
                assignmentSource: 'Photographed Bill Slip VR-2026-8842',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 2 of 3 (2Y 1S)',
                studentCount: 62,
                classTestCount: 0
            },
            {
                id: 'crs_2105',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2105',
                title: 'Object Oriented Programming',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913730682_20c2e9ba.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 2Y 1S curriculum',
                studentCount: 62,
                classTestCount: 4
            },
            {
                id: 'crs_2106',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2106',
                title: 'Object Oriented Programming Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_nazrul',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2024',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 3 of 3 (2Y 1S)',
                studentCount: 62,
                classTestCount: 0
            },
            {
                id: 'crs_2107',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2107',
                title: 'Database Management System',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913730682_20c2e9ba.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 2Y 1S curriculum',
                studentCount: 62,
                classTestCount: 4
            },
            {
                id: 'crs_2108',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2108',
                title: 'Database Management System Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913730682_20c2e9ba.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned lab in 2Y 1S curriculum',
                studentCount: 62,
                classTestCount: 0
            },
            {
                id: 'crs_2109',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2109',
                title: 'Differential Equations and Vector Calculus',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913730682_20c2e9ba.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 2Y 1S curriculum',
                studentCount: 62,
                classTestCount: 4
            },
            {
                id: 'crs_2111',
                semesterId: 'sem_2023_21',
                session: '2023-2024',
                code: 'ICT-2111',
                title: 'Statistics for Engineers',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_rupali',
                assignmentStatus: 'Verified',
                assignmentSource: 'Photographed Official Bill Form (media_1792917826310_847e96fb.png)',
                moderatorTeacherId: 't_nargis',
                assignmentNotes: 'Assigned Course Teacher Rupali Sultana (3.00 Cr, 4 Class Tests)',
                studentCount: 57,
                classTestCount: 4
            },

            // 2Y 1S Backlog Offering
            {
                id: 'crs_2101_bl',
                semesterId: 'sem_2023_21_bl',
                session: '2023-2024',
                code: 'ICT-2101 (BL)',
                title: 'Operational Amplifier & Circuits (Backlog)',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_monir',
                assignmentStatus: 'Verified',
                assignmentSource: 'Exam Controller Backlog Examiner List 2025',
                moderatorTeacherId: 't_sajjad',
                assignmentNotes: 'Assigned to Dr. Monir Morshed for backlog examinees',
                studentCount: 5,
                classTestCount: 0
            },

            // ==================================================================
            // SESSION 2022-2023: 3rd Year 1st Semester (3Y 1S) - 11 Courses (21 Cr)
            // ==================================================================
            {
                id: 'crs_3102',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3102',
                title: 'Data Communication Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_sajjad',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2023',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 1 of 3 (3Y 1S)',
                studentCount: 58,
                classTestCount: 0
            },
            {
                id: 'crs_3106',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3106',
                title: 'Mobile Application Development Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_badrul',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2023',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 2 of 3 (3Y 1S)',
                studentCount: 58,
                classTestCount: 0
            },
            {
                id: 'crs_3108',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3108',
                title: 'Microprocessor and Embedded System Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_abir',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2023',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 3 of 3 (3Y 1S)',
                studentCount: 58,
                classTestCount: 0
            },
            {
                id: 'crs_3101',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3101',
                title: 'Data Communication',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_sajjad',
                assignmentStatus: 'Verified',
                assignmentSource: 'MBSTU 3-1 Course Notice',
                moderatorTeacherId: 't_badrul',
                assignmentNotes: 'Initial 5 Plan - Theory Course',
                studentCount: 58,
                classTestCount: 4
            },
            {
                id: 'crs_3107',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3107',
                title: 'Microprocessor and Embedded System',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_badrul',
                assignmentStatus: 'Verified',
                assignmentSource: 'MBSTU 3-1 Course Notice',
                moderatorTeacherId: 't_sajjad',
                assignmentNotes: 'Initial 5 Plan - Theory Course',
                studentCount: 58,
                classTestCount: 4
            },
            {
                id: 'crs_3100',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3100',
                title: 'Project - III',
                credit: 1.00,
                courseType: 'Project',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913738981_049b06bf.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned project course in 3Y 1S',
                studentCount: 58,
                classTestCount: 0
            },
            {
                id: 'crs_3103',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3103',
                title: 'Microwave Engineering',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913738981_049b06bf.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 3Y 1S curriculum',
                studentCount: 58,
                classTestCount: 4
            },
            {
                id: 'crs_3104',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3104',
                title: 'Microwave Engineering Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913738981_049b06bf.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned lab course in 3Y 1S',
                studentCount: 58,
                classTestCount: 0
            },
            {
                id: 'crs_3105',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3105',
                title: 'Mobile Application Development',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913738981_049b06bf.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 3Y 1S curriculum',
                studentCount: 58,
                classTestCount: 4
            },
            {
                id: 'crs_3109',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3109',
                title: 'Software Requirement Specification and Analysis',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913738981_049b06bf.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned course in 3Y 1S curriculum',
                studentCount: 58,
                classTestCount: 4
            },
            {
                id: 'crs_3110',
                semesterId: 'sem_2022_31',
                session: '2022-2023',
                code: 'ICT-3110',
                title: 'Software Requirement Specification and Analysis Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913738981_049b06bf.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned lab course in 3Y 1S',
                studentCount: 58,
                classTestCount: 0
            },

            // ==================================================================
            // SESSION 2021-2022: 4th Year 1st Semester (4Y 1S) - 12 Courses (22 Cr)
            // ==================================================================
            {
                id: 'crs_4102',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4102',
                title: 'Web Application Development Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_mahedi',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2022',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 1 of 3 (4Y 1S)',
                studentCount: 56,
                classTestCount: 0
            },
            {
                id: 'crs_4104',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4104',
                title: 'Digital Image Processing Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_monir',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2022',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 2 of 3 (4Y 1S) assigned to Dr. Monir Morshed',
                studentCount: 56,
                classTestCount: 0
            },
            {
                id: 'crs_4106',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4106',
                title: 'Optical Communication Lab',
                credit: 1.00,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_anowar',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2022',
                moderatorTeacherId: null,
                assignmentNotes: 'Initial 5 Plan - Lab Priority 3 of 3 (4Y 1S)',
                studentCount: 56,
                classTestCount: 0
            },
            {
                id: 'crs_4101',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4101',
                title: 'Web Application Development',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_nazrul',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2022',
                moderatorTeacherId: 't_monir',
                assignmentNotes: 'Initial 5 Plan - Theory Course',
                studentCount: 56,
                classTestCount: 4
            },
            {
                id: 'crs_4103',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4103',
                title: 'Digital Image Processing',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_monir',
                assignmentStatus: 'User-Requested Provisional Assignment',
                assignmentSource: 'Curriculum Allocation Plan 2022',
                moderatorTeacherId: 't_nazrul',
                assignmentNotes: 'Initial 5 Plan - Theory Course assigned to Dr. Monir Morshed',
                studentCount: 56,
                classTestCount: 4
            },
            {
                id: 'crs_4000',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4000',
                title: 'Project / Thesis',
                credit: 3.00,
                courseType: 'Project',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913751291_8d898455.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned thesis project in 4Y 1S',
                studentCount: 56,
                classTestCount: 0
            },
            {
                id: 'crs_4105',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4105',
                title: 'Optical Communication',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913751291_8d898455.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned theory course in 4Y 1S',
                studentCount: 56,
                classTestCount: 4
            },
            {
                id: 'crs_4107',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4107',
                title: 'Research Methodology',
                credit: 1.00,
                courseType: 'Theory',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913751291_8d898455.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Unassigned research methodology course in 4Y 1S',
                studentCount: 56,
                classTestCount: 2
            },
            {
                id: 'crs_4109',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4109',
                title: 'Human Computer Interaction',
                credit: 3.00,
                courseType: 'Elective',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913751291_8d898455.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Elective I option',
                studentCount: 56,
                classTestCount: 4
            },
            {
                id: 'crs_4111',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4111',
                title: 'Parallel and Distributed Processing',
                credit: 3.00,
                courseType: 'Elective',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913751291_8d898455.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Elective I option',
                studentCount: 56,
                classTestCount: 4
            },
            {
                id: 'crs_4113',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4113',
                title: 'Bio-Informatics',
                credit: 3.00,
                courseType: 'Elective',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913751291_8d898455.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Elective I option',
                studentCount: 56,
                classTestCount: 4
            },
            {
                id: 'crs_4115',
                semesterId: 'sem_2021_41',
                session: '2021-2022',
                code: 'ICT-4115',
                title: 'Cryptography and Cyber Law',
                credit: 3.00,
                courseType: 'Elective',
                assignedInternalTeacherId: null,
                assignmentStatus: 'Not Yet Assigned',
                assignmentSource: 'Syllabus Master (media_1791913751291_8d898455.png)',
                moderatorTeacherId: null,
                assignmentNotes: 'Elective I option',
                studentCount: 56,
                classTestCount: 4
            },

            // ==================================================================
            // SESSION 2020-2021: 4th Year 2nd Semester (4Y 2S) - Historical Offers (12 Cr)
            // ==================================================================
            {
                id: 'crs_4205',
                semesterId: 'sem_2020_42',
                session: '2020-2021',
                code: 'ICT-4205',
                title: 'Digital Signal Processing',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_monir',
                assignmentStatus: 'Verified',
                assignmentSource: 'MBSTU ICT 4-2 Final Exam Dossier 2024, Page 3',
                moderatorTeacherId: 't_sajjad',
                assignmentNotes: 'Assigned Internal Course Teacher for DSP',
                studentCount: 58,
                classTestCount: 4
            },
            {
                id: 'crs_4206',
                semesterId: 'sem_2020_42',
                session: '2020-2021',
                code: 'ICT-4206',
                title: 'Digital Signal Processing Lab',
                credit: 1.50,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_monir',
                assignmentStatus: 'Verified',
                assignmentSource: 'MBSTU ICT 4-2 Lab Routine 2024',
                moderatorTeacherId: null,
                assignmentNotes: 'Conducted 58 examinees practical batch',
                studentCount: 58,
                classTestCount: 0
            },
            {
                id: 'crs_4201',
                semesterId: 'sem_2020_42',
                session: '2020-2021',
                code: 'ICT-4201',
                title: 'Distributed Systems & Cloud Computing',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_shahin',
                assignmentStatus: 'Verified',
                assignmentSource: 'MBSTU ICT 4-2 Final Exam Dossier',
                moderatorTeacherId: 't_monir',
                assignmentNotes: 'Moderated by Dr. Monir Morshed',
                studentCount: 58,
                classTestCount: 4
            },
            {
                id: 'crs_4202',
                semesterId: 'sem_2020_42',
                session: '2020-2021',
                code: 'ICT-4202',
                title: 'Distributed Systems Lab',
                credit: 1.50,
                courseType: 'Lab/Sessional',
                assignedInternalTeacherId: 't_shahin',
                assignmentStatus: 'Verified',
                assignmentSource: 'MBSTU ICT 4-2 Final Exam Dossier',
                moderatorTeacherId: null,
                assignmentNotes: 'Lab conduct and sessional evaluation',
                studentCount: 58,
                classTestCount: 0
            },
            {
                id: 'crs_4203',
                semesterId: 'sem_2020_42',
                session: '2020-2021',
                code: 'ICT-4203',
                title: 'Cyber Security and Cryptography',
                credit: 3.00,
                courseType: 'Theory',
                assignedInternalTeacherId: 't_badrul',
                assignmentStatus: 'Verified',
                assignmentSource: 'MBSTU ICT 4-2 Final Exam Dossier',
                moderatorTeacherId: 't_sajjad',
                assignmentNotes: 'Assigned Internal Course Teacher',
                studentCount: 58,
                classTestCount: 4
            }
        ];

        this.state.examActivities = [
            // =========================================================================
            // SESSION 2024-2025 • 1ST YEAR 1ST SEMESTER (sem_2024_11) — ACTIVE DEFAULT
            // =========================================================================
            // 1. Dr. Ziaur Rahman (Chairman, Exam Committee 1Y 1S)
            {
                id: 'act_24_ziaur_01',
                activityDate: '2026-03-02',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1103',
                teacherId: 't_ziaur',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: 'Full question paper setting for ICT-1103 Computer Programming',
                createdAt: '2026-03-02T00:00:00Z'
            },
            {
                id: 'act_24_ziaur_02',
                activityDate: '2026-03-10',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_ziaur',
                categoryNumber: 2,
                activityNameEn: 'Question Paper Moderation (Chairman Share)',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4500.00,
                calculatedAmount: 4500.00,
                approvedAmount: 4500.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: 'Chairman share of 9 moderated courses honorarium (৳18,000 / 4)',
                createdAt: '2026-03-10T00:00:00Z'
            },
            {
                id: 'act_24_ziaur_03',
                activityDate: '2026-03-19',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1103',
                teacherId: 't_ziaur',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 60,
                rateApplied: 120.00,
                calculatedAmount: 7200.00,
                approvedAmount: 7200.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: '60 regular answer scripts evaluated @ ৳120 for ICT-1103',
                createdAt: '2026-03-19T00:00:00Z'
            },
            {
                id: 'act_24_ziaur_13',
                activityDate: '2026-03-12',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1103',
                teacherId: 't_ziaur',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'qty_rate',
                workloadQuantity: 4,
                rateApplied: 1350.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: '4 Class Tests conduction & script evaluation (3.00 Credits)',
                createdAt: '2026-03-12T00:00:00Z'
            },
            {
                id: 'act_24_ziaur_06',
                activityDate: '2026-03-28',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_ziaur',
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'ট্যাবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 75,
                rateApplied: 75.00,
                calculatedAmount: 5625.00,
                approvedAmount: 5625.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: 'Tabulation for 57 Regular + 18 Backlog examinees @ ৳75',
                createdAt: '2026-03-28T00:00:00Z'
            },
            {
                id: 'act_24_ziaur_09',
                activityDate: '2026-03-08',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_ziaur',
                categoryNumber: 9,
                activityNameEn: 'Question Typing and Proof Verification',
                activityNameBn: 'প্রশ্নপত্র লিখন ও যাচাই',
                calcMethod: 'qty_rate',
                workloadQuantity: 3,
                rateApplied: 200.00,
                calculatedAmount: 600.00,
                approvedAmount: 600.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: '3 Question papers typing & verification proofing @ ৳200',
                createdAt: '2026-03-08T00:00:00Z'
            },
            {
                id: 'act_24_ziaur_08',
                activityDate: '2026-03-29',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_ziaur',
                categoryNumber: 8,
                activityNameEn: 'Exam Committee Chairman Allowance',
                activityNameBn: 'সভাপতি / সদস্যর ভাতা',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 2250.00,
                calculatedAmount: 2250.00,
                approvedAmount: 2250.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: 'Statutory examination committee chairman honorarium allowance',
                createdAt: '2026-03-29T00:00:00Z'
            },
            {
                id: 'act_24_ziaur_14',
                activityDate: '2026-03-25',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_ziaur',
                categoryNumber: 14,
                activityNameEn: 'Incidental Charges / Courier Voucher',
                activityNameBn: 'ইনসিডেন্টাল চার্জ / কুরিয়ার চার্জ',
                calcMethod: 'manual',
                workloadQuantity: 1,
                rateApplied: 700.00,
                calculatedAmount: 700.00,
                approvedAmount: 700.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_ziaur_2025',
                notes: 'Confidential scripts transit courier expense (Voucher: VR-1Y1S-ZIA-991)',
                createdAt: '2026-03-25T00:00:00Z'
            },

            // 2. Dr. Monir Morshed (Theory Course ICT-1101)
            {
                id: 'act_24_monir_01',
                activityDate: '2026-03-02',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1101',
                teacherId: 't_monir',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2025',
                notes: 'Full paper question setting for ICT-1101 Basic Electrical Circuits',
                createdAt: '2026-03-02T00:00:00Z'
            },
            {
                id: 'act_24_monir_03',
                activityDate: '2026-03-18',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1101',
                teacherId: 't_monir',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 60,
                rateApplied: 120.00,
                calculatedAmount: 7200.00,
                approvedAmount: 7200.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2025',
                notes: '60 regular answer scripts evaluated @ ৳120 for ICT-1101',
                createdAt: '2026-03-18T00:00:00Z'
            },
            {
                id: 'act_24_monir_13',
                activityDate: '2026-03-12',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1101',
                teacherId: 't_monir',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'qty_rate',
                workloadQuantity: 4,
                rateApplied: 1350.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2025',
                notes: '4 Class Tests evaluated (3.00 Cr - ICT-1101)',
                createdAt: '2026-03-12T00:00:00Z'
            },
            {
                id: 'act_24_monir_14',
                activityDate: '2026-03-24',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_monir',
                categoryNumber: 14,
                activityNameEn: 'Incidental Charges / Courier Voucher',
                activityNameBn: 'ইনসিডেন্টাল চার্জ / কুরিয়ার চার্জ',
                calcMethod: 'manual',
                workloadQuantity: 1,
                rateApplied: 600.00,
                calculatedAmount: 600.00,
                approvedAmount: 600.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2025',
                notes: 'Courier transit parcel receipt (Voucher: SA-PARCEL-1101)',
                createdAt: '2026-03-24T00:00:00Z'
            },

            // 3. Dr. Muhammad Shahin Uddin (Theory ICT-1105 & Lab ICT-1102)
            {
                id: 'act_24_shahin_01',
                activityDate: '2026-03-04',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1105',
                teacherId: 't_shahin',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_shahin_2025',
                notes: 'Question paper setting for ICT-1105 Physics',
                createdAt: '2026-03-04T00:00:00Z'
            },
            {
                id: 'act_24_shahin_03',
                activityDate: '2026-03-20',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1105',
                teacherId: 't_shahin',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 60,
                rateApplied: 120.00,
                calculatedAmount: 7200.00,
                approvedAmount: 7200.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_shahin_2025',
                notes: '60 answer scripts checked for ICT-1105 Physics',
                createdAt: '2026-03-20T00:00:00Z'
            },
            {
                id: 'act_24_shahin_05',
                activityDate: '2026-03-15',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1102',
                teacherId: 't_shahin',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab / Sessional Exam',
                activityNameBn: 'ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 60,
                rateApplied: 100.00,
                calculatedAmount: 6000.00,
                approvedAmount: 6000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_shahin_2025',
                notes: 'Conduction & examination for 60 candidates (ICT-1102 Lab)',
                createdAt: '2026-03-15T00:00:00Z'
            },
            {
                id: 'act_24_shahin_13',
                activityDate: '2026-03-14',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1105',
                teacherId: 't_shahin',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'qty_rate',
                workloadQuantity: 4,
                rateApplied: 1350.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_shahin_2025',
                notes: '4 Class Tests for 3 Cr course ICT-1105 Physics',
                createdAt: '2026-03-14T00:00:00Z'
            },

            // 4. Dr. Mosammat Nargis Akter (Committee Member, ICT-1109)
            {
                id: 'act_24_nargis_01',
                activityDate: '2026-03-06',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1109',
                teacherId: 't_nargis',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2025',
                notes: 'Full question paper setting for ICT-1109 Chemistry',
                createdAt: '2026-03-06T00:00:00Z'
            },
            {
                id: 'act_24_nargis_02',
                activityDate: '2026-03-10',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_nargis',
                categoryNumber: 2,
                activityNameEn: 'Question Paper Moderation',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4500.00,
                calculatedAmount: 4500.00,
                approvedAmount: 4500.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2025',
                notes: 'Committee member moderation share (৳18,000 / 4)',
                createdAt: '2026-03-10T00:00:00Z'
            },
            {
                id: 'act_24_nargis_03',
                activityDate: '2026-03-22',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1109',
                teacherId: 't_nargis',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 60,
                rateApplied: 120.00,
                calculatedAmount: 7200.00,
                approvedAmount: 7200.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2025',
                notes: '60 regular answer scripts evaluated for ICT-1109 Chemistry',
                createdAt: '2026-03-22T00:00:00Z'
            },
            {
                id: 'act_24_nargis_13',
                activityDate: '2026-03-15',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1109',
                teacherId: 't_nargis',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'qty_rate',
                workloadQuantity: 4,
                rateApplied: 1350.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2025',
                notes: '4 Class Tests for 3 Cr course ICT-1109 Chemistry',
                createdAt: '2026-03-15T00:00:00Z'
            },
            {
                id: 'act_24_nargis_06',
                activityDate: '2026-03-28',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_nargis',
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'ট্যাবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 75,
                rateApplied: 75.00,
                calculatedAmount: 5625.00,
                approvedAmount: 5625.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2025',
                notes: 'Tabulator 3 share for 75 candidates @ ৳75',
                createdAt: '2026-03-28T00:00:00Z'
            },
            {
                id: 'act_24_nargis_09',
                activityDate: '2026-03-08',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_nargis',
                categoryNumber: 9,
                activityNameEn: 'Question Typing and Proof Verification',
                activityNameBn: 'প্রশ্নপত্র লিখন ও যাচাই',
                calcMethod: 'qty_rate',
                workloadQuantity: 3,
                rateApplied: 200.00,
                calculatedAmount: 600.00,
                approvedAmount: 600.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2025',
                notes: '3 questions typed & verified @ ৳200',
                createdAt: '2026-03-08T00:00:00Z'
            },

            // 5. Prof. Dr. Sajjad Waheed (Committee Member)
            {
                id: 'act_24_sajjad_02',
                activityDate: '2026-03-10',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_sajjad',
                categoryNumber: 2,
                activityNameEn: 'Question Paper Moderation',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4500.00,
                calculatedAmount: 4500.00,
                approvedAmount: 4500.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_sajjad_2025',
                notes: 'Committee member moderation share (৳18,000 / 4)',
                createdAt: '2026-03-10T00:00:00Z'
            },
            {
                id: 'act_24_sajjad_06',
                activityDate: '2026-03-28',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_sajjad',
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'ট্যাবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 75,
                rateApplied: 75.00,
                calculatedAmount: 5625.00,
                approvedAmount: 5625.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_sajjad_2025',
                notes: 'Tabulator 2 share for 75 candidates @ ৳75',
                createdAt: '2026-03-28T00:00:00Z'
            },
            {
                id: 'act_24_sajjad_09',
                activityDate: '2026-03-08',
                semesterId: 'sem_2024_11',
                courseId: null,
                teacherId: 't_sajjad',
                categoryNumber: 9,
                activityNameEn: 'Question Typing and Proof Verification',
                activityNameBn: 'প্রশ্নপত্র লিখন ও যাচাই',
                calcMethod: 'qty_rate',
                workloadQuantity: 3,
                rateApplied: 200.00,
                calculatedAmount: 600.00,
                approvedAmount: 600.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_sajjad_2025',
                notes: '3 questions typed & verified @ ৳200',
                createdAt: '2026-03-08T00:00:00Z'
            },

            // 6. Dr. Muhammad Badrul Alam Miah (Programming Lab ICT-1104)
            {
                id: 'act_24_badrul_05',
                activityDate: '2026-03-16',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1104',
                teacherId: 't_badrul',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab / Sessional Exam',
                activityNameBn: 'ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 60,
                rateApplied: 100.00,
                calculatedAmount: 6000.00,
                approvedAmount: 6000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_badrul_2025',
                notes: 'Lab exam conduction for 60 candidates (ICT-1104 Programming Lab)',
                createdAt: '2026-03-16T00:00:00Z'
            },
            {
                id: 'act_24_badrul_03_3rd',
                activityDate: '2026-03-24',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1105',
                teacherId: 't_badrul',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation (3rd Examiner)',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন (৩য় পরীক্ষক)',
                calcMethod: 'qty_rate',
                workloadQuantity: 2,
                rateApplied: 120.00,
                calculatedAmount: 240.00,
                approvedAmount: 240.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_badrul_2025',
                notes: '3rd Examiner for IT24022 & IT24047',
                createdAt: '2026-03-24T00:00:00Z'
            },

            // 7. Dr. Md. Abir Hossain (Calculus ICT-1107)
            {
                id: 'act_24_abir_01',
                activityDate: '2026-03-05',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1107',
                teacherId: 't_abir',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: 'Question paper setting for ICT-1107 Calculus',
                createdAt: '2026-03-05T00:00:00Z'
            },
            {
                id: 'act_24_abir_03',
                activityDate: '2026-03-21',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1107',
                teacherId: 't_abir',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 60,
                rateApplied: 120.00,
                calculatedAmount: 7200.00,
                approvedAmount: 7200.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: '60 answer scripts checked for ICT-1107 Calculus',
                createdAt: '2026-03-21T00:00:00Z'
            },
            {
                id: 'act_24_abir_13',
                activityDate: '2026-03-14',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1107',
                teacherId: 't_abir',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'qty_rate',
                workloadQuantity: 4,
                rateApplied: 1350.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: '4 Class Tests for 3 Cr course ICT-1107 Calculus',
                createdAt: '2026-03-14T00:00:00Z'
            },
            {
                id: 'act_24_abir_03_3rd',
                activityDate: '2026-03-24',
                semesterId: 'sem_2024_11',
                courseId: 'crs_1107',
                teacherId: 't_abir',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation (3rd Examiner)',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন (৩য় পরীক্ষক)',
                calcMethod: 'qty_rate',
                workloadQuantity: 2,
                rateApplied: 120.00,
                calculatedAmount: 240.00,
                approvedAmount: 240.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: '3rd Examiner for IT24014 & IT24033',
                createdAt: '2026-03-24T00:00:00Z'
            },

            // =========================================================================
            // SESSION 2021-2022 • 4TH YEAR 1ST SEMESTER (sem_2021_41)
            // =========================================================================
            {
                id: 'act_41_monir_01',
                activityDate: '2025-12-10',
                semesterId: 'sem_2021_41',
                courseId: 'crs_4103',
                teacherId: 't_monir',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_41_2025',
                notes: 'Question setting for ICT-4103 Digital Image Processing',
                createdAt: '2025-12-10T00:00:00Z'
            },
            {
                id: 'act_41_monir_03',
                activityDate: '2025-12-22',
                semesterId: 'sem_2021_41',
                courseId: 'crs_4103',
                teacherId: 't_monir',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 56,
                rateApplied: 120.00,
                calculatedAmount: 6720.00,
                approvedAmount: 6720.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_41_2025',
                notes: '56 scripts evaluated for ICT-4103 DIP',
                createdAt: '2025-12-22T00:00:00Z'
            },
            {
                id: 'act_41_monir_05',
                activityDate: '2025-12-18',
                semesterId: 'sem_2021_41',
                courseId: 'crs_4104',
                teacherId: 't_monir',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab / Sessional Exam',
                activityNameBn: 'ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 56,
                rateApplied: 100.00,
                calculatedAmount: 5600.00,
                approvedAmount: 5600.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_41_2025',
                notes: '56 candidates in ICT-4104 DIP Lab',
                createdAt: '2025-12-18T00:00:00Z'
            },
            {
                id: 'act_41_monir_13',
                activityDate: '2025-12-15',
                semesterId: 'sem_2021_41',
                courseId: 'crs_4103',
                teacherId: 't_monir',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'qty_rate',
                workloadQuantity: 4,
                rateApplied: 1350.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_41_2025',
                notes: '4 Class Tests for 3 Cr course ICT-4103 DIP',
                createdAt: '2025-12-15T00:00:00Z'
            },

            // =========================================================================
            // SESSION 2023-2024 • 2ND YEAR 1ST SEMESTER BACKLOG (sem_2023_21_bl)
            // =========================================================================
            {
                id: 'act_bl_rupali_eval',
                activityDate: '2026-03-24',
                semesterId: 'sem_2023_21_bl',
                courseId: 'crs_2111',
                teacherId: 't_rupali',
                categoryNumber: 3,
                candidateType: 'BL',
                activityNameEn: 'Answer Script Evaluation (BL)',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন (ব্যাকলগ)',
                calcMethod: 'qty_rate',
                workloadQuantity: 18,
                rateApplied: 120.00,
                calculatedAmount: 2160.00,
                approvedAmount: 2160.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_bl_rupali_2025',
                notes: '18 Backlog scripts evaluated for ICT-2111 Statistics (BL)',
                createdAt: '2026-03-24T00:00:00Z'
            },
            {
                id: 'act_bl_shahin_eval',
                activityDate: '2026-03-24',
                semesterId: 'sem_2023_21_bl',
                courseId: 'crs_2101',
                teacherId: 't_shahin',
                categoryNumber: 3,
                candidateType: 'BL',
                activityNameEn: 'Answer Script Evaluation (BL)',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন (ব্যাকলগ)',
                calcMethod: 'qty_rate',
                workloadQuantity: 5,
                rateApplied: 120.00,
                calculatedAmount: 600.00,
                approvedAmount: 600.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_bl_rupali_2025',
                notes: '5 Backlog scripts evaluated for ICT-2101 Computer Org (BL)',
                createdAt: '2026-03-24T00:00:00Z'
            },

            // --- Dr. Monir Morshed Activities (Accrued: ৳26,150) ---
            {
                id: 'act_monir_01',
                semesterId: 'sem_2020_42',
                courseId: 'crs_4205',
                teacherId: 't_monir',
                categoryNumber: 1, // Question Setting
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2024',
                notes: 'Full paper question setting for ICT-4205 DSP',
                createdAt: '2026-02-16'
            },
            {
                id: 'act_monir_03',
                semesterId: 'sem_2020_42',
                courseId: 'crs_4205',
                teacherId: 't_monir',
                categoryNumber: 3, // Script Evaluation
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 58,
                rateApplied: 120.00,
                calculatedAmount: 6960.00,
                approvedAmount: 6960.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2024',
                notes: '58 examinee scripts evaluated for ICT-4205',
                createdAt: '2026-02-20'
            },
            {
                id: 'act_monir_05',
                semesterId: 'sem_2020_42',
                courseId: 'crs_4206',
                teacherId: 't_monir',
                categoryNumber: 5, // Practical/Lab
                activityNameEn: 'Practical / Lab / Sessional Exam',
                activityNameBn: 'ব্যবহারিক / ল্যাব / সেশনাল পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 58,
                rateApplied: 100.00,
                calculatedAmount: 5800.00,
                approvedAmount: 5800.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2024',
                notes: 'Conducted DSP Lab exam for 58 students',
                createdAt: '2026-02-22'
            },
            {
                id: 'act_monir_02',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101',
                teacherId: 't_monir',
                categoryNumber: 2, // Question Moderation
                activityNameEn: 'Question Moderation',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 2000.00,
                calculatedAmount: 2000.00,
                approvedAmount: 2000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2024',
                notes: 'Question moderation committee duty for 2nd Year 1st Sem',
                createdAt: '2026-03-02'
            },
            {
                id: 'act_monir_06',
                semesterId: 'sem_2023_21',
                courseId: null,
                teacherId: 't_monir',
                categoryNumber: 6, // Tabulation
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'ট্যাবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 62,
                rateApplied: 75.00,
                calculatedAmount: 4650.00,
                approvedAmount: 4650.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2024',
                notes: 'Tabulator role for 62 students (Regular + BL)',
                createdAt: '2026-03-04'
            },
            {
                id: 'act_monir_13',
                semesterId: 'sem_2020_42',
                courseId: 'crs_4205',
                teacherId: 't_monir',
                categoryNumber: 13, // Class Test
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'manual',
                workloadQuantity: 58,
                rateApplied: 47.24,
                calculatedAmount: 2740.00,
                approvedAmount: 2740.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_monir_2024',
                notes: 'Internal continuous assessment for ICT-4205',
                createdAt: '2026-02-25'
            },

            // --- Dr. Mst. Nargis Aktar Activities (Accrued: ৳55,600 matching Official Bill Form) ---
            {
                id: 'act_nargis_02',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101',
                teacherId: 't_nargis',
                categoryNumber: 2,
                activityNameEn: 'Question Moderation',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 2000.00,
                calculatedAmount: 2000.00,
                approvedAmount: 2000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: 'Question moderation honorarium',
                createdAt: '2026-03-01'
            },
            {
                id: 'act_nargis_03',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101',
                teacherId: 't_nargis',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 75,
                rateApplied: 120.00,
                calculatedAmount: 9000.00,
                approvedAmount: 9000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: '75 scripts @ ৳120',
                createdAt: '2026-03-02'
            },
            {
                id: 'act_nargis_04',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101',
                teacherId: 't_nargis',
                categoryNumber: 4,
                activityNameEn: 'Viva-Voce / Oral Exam',
                activityNameBn: 'মৌখিক পরীক্ষা',
                calcMethod: 'manual',
                workloadQuantity: 4,
                rateApplied: 125.00,
                calculatedAmount: 500.00,
                approvedAmount: 500.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: 'Oral examination minimum allowance',
                createdAt: '2026-03-03'
            },
            {
                id: 'act_nargis_05a',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2102',
                teacherId: 't_nargis',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 57,
                rateApplied: 300.00,
                calculatedAmount: 17100.00,
                approvedAmount: 17100.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: 'ICT-2102 Lab (57 students @ ৳300 matching physical bill form)',
                createdAt: '2026-03-04'
            },
            {
                id: 'act_nargis_05b',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2104',
                teacherId: 't_nargis',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 57,
                rateApplied: 100.00,
                calculatedAmount: 5700.00,
                approvedAmount: 5700.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: 'ICT-2104 Lab (57 students @ ৳100)',
                createdAt: '2026-03-05'
            },
            {
                id: 'act_nargis_05c',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2106',
                teacherId: 't_nargis',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 57,
                rateApplied: 100.00,
                calculatedAmount: 5700.00,
                approvedAmount: 5700.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: 'ICT-2106 Lab (57 students @ ৳100)',
                createdAt: '2026-03-06'
            },
            {
                id: 'act_nargis_05d',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2108',
                teacherId: 't_nargis',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 57,
                rateApplied: 100.00,
                calculatedAmount: 5700.00,
                approvedAmount: 5700.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: 'ICT-2108 Lab (57 students @ ৳100)',
                createdAt: '2026-03-07'
            },
            {
                id: 'act_nargis_06',
                semesterId: 'sem_2023_21',
                courseId: null,
                teacherId: 't_nargis',
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'ট্যাবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 86,
                rateApplied: 75.00,
                calculatedAmount: 6450.00,
                approvedAmount: 6450.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: '86 examinees tabulated @ ৳75',
                createdAt: '2026-03-08'
            },
            {
                id: 'act_nargis_08',
                semesterId: 'sem_2023_21',
                courseId: null,
                teacherId: 't_nargis',
                categoryNumber: 8,
                activityNameEn: 'Chairman Allowance',
                activityNameBn: 'সভাপতি / সদস্যর ভাতা',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 2250.00,
                calculatedAmount: 2250.00,
                approvedAmount: 2250.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: 'Fixed Committee Chairman honorarium',
                createdAt: '2026-03-09'
            },
            {
                id: 'act_nargis_09',
                semesterId: 'sem_2023_21',
                courseId: null,
                teacherId: 't_nargis',
                categoryNumber: 9,
                activityNameEn: 'Question Typing and Verification',
                activityNameBn: 'প্রশ্নপত্র লিখন ও যাচাই',
                calcMethod: 'qty_rate',
                workloadQuantity: 6,
                rateApplied: 200.00,
                calculatedAmount: 1200.00,
                approvedAmount: 1200.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_nargis_2026',
                notes: '6 question sheets typed & verified @ ৳200',
                createdAt: '2026-03-10'
            },
            {
                id: 'act_nargis_13',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101',
                teacherId: 't_nargis',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'manual',
                workloadQuantity: 57,
                rateApplied: 48.07,
                calculatedAmount: 2740.00,
                approvedAmount: 2740.00,
                billStatus: 'Recorded',
                relatedBillId: null,
                notes: 'Continuous internal assessment (to be billed separately)',
                createdAt: '2026-03-11'
            },

            // --- Dr. Md. Abir Hossain Activities (Accrued: ৳18,200) ---
            {
                id: 'act_abir_01',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101',
                teacherId: 't_abir',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: 'Full paper question setting for ICT-2101',
                createdAt: '2026-03-01'
            },
            {
                id: 'act_abir_03',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101',
                teacherId: 't_abir',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 62,
                rateApplied: 120.00,
                calculatedAmount: 7440.00,
                approvedAmount: 7440.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: '62 scripts @ ৳120',
                createdAt: '2026-03-05'
            },
            {
                id: 'act_abir_06',
                semesterId: 'sem_2023_21',
                courseId: null,
                teacherId: 't_abir',
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'ট্যাবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 62,
                rateApplied: 75.00,
                calculatedAmount: 4650.00,
                approvedAmount: 4650.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: 'Tabulator honorarium',
                createdAt: '2026-03-08'
            },
            {
                id: 'act_abir_02',
                semesterId: 'sem_2022_22',
                courseId: 'crs_2201',
                teacherId: 't_abir',
                categoryNumber: 2,
                activityNameEn: 'Question Moderation',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 2110.00,
                calculatedAmount: 2110.00,
                approvedAmount: 2110.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_abir_2025',
                notes: 'Question moderation honorarium',
                createdAt: '2026-03-09'
            },

            // --- Prof. Dr. Sajjad Waheed Activities (Accrued: ৳66,160 matching Official Bill Slip REF-BILL-02) ---
            {
                id: 'act_sajjad_01',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3105',
                teacherId: 't_sajjad',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Moderation Honorarium',
                activityNameBn: 'প্রশ্নপত্র মডারেশন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: 'Question Moderation Honorarium',
                createdAt: '2024-08-10'
            },
            {
                id: 'act_sajjad_02',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3101',
                teacherId: 't_sajjad',
                categoryNumber: 2,
                activityNameEn: 'Question Review',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4700.00,
                calculatedAmount: 4700.00,
                approvedAmount: 4700.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: 'Question Review Honorarium',
                createdAt: '2024-08-12'
            },
            {
                id: 'act_sajjad_03a',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3105',
                teacherId: 't_sajjad',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation ICT-3105',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 53,
                rateApplied: 120.00,
                calculatedAmount: 6360.00,
                approvedAmount: 6360.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '53 scripts @ ৳120',
                createdAt: '2024-08-20'
            },
            {
                id: 'act_sajjad_03b',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3101',
                teacherId: 't_sajjad',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation ICT-3101',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 3,
                rateApplied: 120.00,
                calculatedAmount: 360.00,
                approvedAmount: 360.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '03 scripts @ ৳120',
                createdAt: '2024-08-21'
            },
            {
                id: 'act_sajjad_05a',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3102',
                teacherId: 't_sajjad',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3102',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-24'
            },
            {
                id: 'act_sajjad_05b',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3104',
                teacherId: 't_sajjad',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3104',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-25'
            },
            {
                id: 'act_sajjad_05c',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3106',
                teacherId: 't_sajjad',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3106',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 300.00,
                calculatedAmount: 16200.00,
                approvedAmount: 16200.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '54 candidates @ ৳300',
                createdAt: '2024-08-26'
            },
            {
                id: 'act_sajjad_05d',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3108',
                teacherId: 't_sajjad',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3108',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-27'
            },
            {
                id: 'act_sajjad_05e',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3100',
                teacherId: 't_sajjad',
                categoryNumber: 5,
                activityNameEn: 'Practical / Project ICT-3100',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-28'
            },
            {
                id: 'act_sajjad_06',
                semesterId: 'sem_2022_31',
                courseId: null,
                teacherId: 't_sajjad',
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'টেবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 58,
                rateApplied: 75.00,
                calculatedAmount: 4350.00,
                approvedAmount: 4350.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '58 candidates @ ৳75',
                createdAt: '2024-08-30'
            },
            {
                id: 'act_sajjad_08',
                semesterId: 'sem_2022_31',
                courseId: null,
                teacherId: 't_sajjad',
                categoryNumber: 8,
                activityNameEn: 'Chairman Allowance',
                activityNameBn: 'সভাপতি/সদস্যর ভাতা',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 2250.00,
                calculatedAmount: 2250.00,
                approvedAmount: 2250.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: 'Committee Chairman honorarium',
                createdAt: '2024-09-01'
            },
            {
                id: 'act_sajjad_09',
                semesterId: 'sem_2022_31',
                courseId: null,
                teacherId: 't_sajjad',
                categoryNumber: 9,
                activityNameEn: 'Question Typing and Verification',
                activityNameBn: 'প্রশ্নপত্র লিখন ও যাচাই',
                calcMethod: 'qty_rate',
                workloadQuantity: 5,
                rateApplied: 200.00,
                calculatedAmount: 1000.00,
                approvedAmount: 1000.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: '5 questions typed @ ৳200',
                createdAt: '2024-09-02'
            },
            {
                id: 'act_sajjad_13',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3105',
                teacherId: 't_sajjad',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'manual',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5340.00,
                approvedAmount: 5340.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_sajjad_2024',
                notes: 'ICT-3105 Class Test (4 tests, 54 students)',
                createdAt: '2024-09-05'
            },

            // --- Dr. Mohammad Badrul Alam Miah Activities (Accrued: ৳38,350 matching Official Bill Slip REF-BILL-03) ---
            {
                id: 'act_badrul_02',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3107',
                teacherId: 't_badrul',
                categoryNumber: 2,
                activityNameEn: 'Question Review',
                activityNameBn: 'প্রশ্নপত্র সমীক্ষণ',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4700.00,
                calculatedAmount: 4700.00,
                approvedAmount: 4700.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: 'Question Review Honorarium',
                createdAt: '2024-08-12'
            },
            {
                id: 'act_badrul_03',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3109',
                teacherId: 't_badrul',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation ICT-3109',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 4,
                rateApplied: 125.00,
                calculatedAmount: 500.00,
                approvedAmount: 500.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '04 scripts (minimum rule applied)',
                createdAt: '2024-08-20'
            },
            {
                id: 'act_badrul_05a',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3102',
                teacherId: 't_badrul',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3102',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-24'
            },
            {
                id: 'act_badrul_05b',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3104',
                teacherId: 't_badrul',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3104',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-25'
            },
            {
                id: 'act_badrul_05c',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3106',
                teacherId: 't_badrul',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3106',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-26'
            },
            {
                id: 'act_badrul_05d',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3108',
                teacherId: 't_badrul',
                categoryNumber: 5,
                activityNameEn: 'Practical / Lab Exam ICT-3108',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-27'
            },
            {
                id: 'act_badrul_05e',
                semesterId: 'sem_2022_31',
                courseId: 'crs_3100',
                teacherId: 't_badrul',
                categoryNumber: 5,
                activityNameEn: 'Practical / Project ICT-3100',
                activityNameBn: 'ব্যবহারিক পরীক্ষা',
                calcMethod: 'qty_rate',
                workloadQuantity: 54,
                rateApplied: 100.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '54 candidates @ ৳100',
                createdAt: '2024-08-28'
            },
            {
                id: 'act_badrul_06',
                semesterId: 'sem_2022_31',
                courseId: null,
                teacherId: 't_badrul',
                categoryNumber: 6,
                activityNameEn: 'Results Tabulation',
                activityNameBn: 'টেবুলেশন',
                calcMethod: 'qty_rate',
                workloadQuantity: 58,
                rateApplied: 75.00,
                calculatedAmount: 4350.00,
                approvedAmount: 4350.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '58 examinees @ ৳75',
                createdAt: '2024-08-30'
            },
            {
                id: 'act_badrul_08',
                semesterId: 'sem_2022_31',
                courseId: null,
                teacherId: 't_badrul',
                categoryNumber: 8,
                activityNameEn: 'Committee Member Allowance',
                activityNameBn: 'সভাপতি/সদস্যর ভাতা',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 800.00,
                calculatedAmount: 800.00,
                approvedAmount: 800.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: 'Committee Member honorarium',
                createdAt: '2024-09-01'
            },
            {
                id: 'act_badrul_09',
                semesterId: 'sem_2022_31',
                courseId: null,
                teacherId: 't_badrul',
                categoryNumber: 9,
                activityNameEn: 'Question Typing and Verification',
                activityNameBn: 'প্রশ্নপত্র লিখন ও যাচাই',
                calcMethod: 'qty_rate',
                workloadQuantity: 5,
                rateApplied: 200.00,
                calculatedAmount: 1000.00,
                approvedAmount: 1000.00,
                billStatus: 'Paid',
                relatedBillId: 'bill_badrul_2024',
                notes: '5 questions typed @ ৳200',
                createdAt: '2024-09-02'
            },
            // --- Rupali Sultana Ground Truth Activities (media_1792917826310_847e96fb.png) ---
            {
                id: 'act_rupali_01',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2111',
                teacherId: 't_rupali',
                categoryNumber: 1,
                activityNameEn: 'Question Paper Setting',
                activityNameBn: 'প্রশ্নপত্র প্রণয়ন',
                calcMethod: 'fixed',
                workloadQuantity: 1,
                rateApplied: 4000.00,
                calculatedAmount: 4000.00,
                approvedAmount: 4000.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_rupali_2025',
                notes: 'Question paper setting for ICT-2111 (Statistics for Engineers)',
                createdAt: '2026-03-10'
            },
            {
                id: 'act_rupali_03',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2111',
                teacherId: 't_rupali',
                categoryNumber: 3,
                activityNameEn: 'Answer Script Evaluation',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন',
                calcMethod: 'qty_rate',
                workloadQuantity: 57,
                rateApplied: 120.00,
                calculatedAmount: 6840.00,
                approvedAmount: 6840.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_rupali_2025',
                notes: '57 regular scripts evaluated for ICT-2111 @ ৳120',
                createdAt: '2026-03-18'
            },
            {
                id: 'act_rupali_13',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2111',
                teacherId: 't_rupali',
                categoryNumber: 13,
                activityNameEn: 'Class Test Assessment (3 Cr = 4 CTs)',
                activityNameBn: 'ক্লাস টেস্ট',
                calcMethod: 'manual',
                workloadQuantity: 57,
                rateApplied: 1350.00,
                calculatedAmount: 5400.00,
                approvedAmount: 5400.00,
                billStatus: 'Approved',
                relatedBillId: 'bill_rupali_2025',
                notes: '4 Class Tests evaluated for 3.00 credit course ICT-2111',
                createdAt: '2026-03-22'
            },
            // Backlog Duty Demo
            {
                id: 'act_monir_bl_03',
                semesterId: 'sem_2023_21',
                courseId: 'crs_2101_bl',
                teacherId: 't_monir',
                categoryNumber: 3,
                candidateType: 'BL',
                activityNameEn: 'Answer Script Evaluation (BL)',
                activityNameBn: 'উত্তর পত্র মূল্যায়ন (ব্যাকলগ)',
                calcMethod: 'qty_rate',
                workloadQuantity: 18,
                rateApplied: 120.00,
                calculatedAmount: 2160.00,
                approvedAmount: 2160.00,
                billStatus: 'Recorded',
                relatedBillId: null,
                notes: '18 Backlog scripts evaluated for ICT-2101 (BL)',
                createdAt: '2026-03-10'
            }
        ];

        // 6. Official Bills (Internal Teachers Only)
        this.state.bills = [
            // --- 1Y 1S BILLS (sem_2024_11) ---
            {
                id: 'bill_ziaur_2025',
                billNo: 'MBSTU/ICT/BILL/2025/11/001',
                semesterId: 'sem_2024_11',
                teacherId: 't_ziaur',
                preparationDate: '2026-03-30',
                carrierEnabled: true,
                carrierCharge: 700.00,
                carrierVoucherNo: 'VR-1Y1S-ZIA-991',
                grossAmount: 30275.00,
                deductions: 0.00,
                approvedAmount: 30275.00,
                paidAmount: 30275.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-04-02',
                createdAt: '2026-03-30T00:00:00Z'
            },
            {
                id: 'bill_monir_2025',
                billNo: 'MBSTU/ICT/BILL/2025/11/002',
                semesterId: 'sem_2024_11',
                teacherId: 't_monir',
                preparationDate: '2026-03-28',
                carrierEnabled: true,
                carrierCharge: 600.00,
                carrierVoucherNo: 'SA-PARCEL-1101',
                grossAmount: 17200.00,
                deductions: 0.00,
                approvedAmount: 17200.00,
                paidAmount: 17200.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-04-01',
                createdAt: '2026-03-28T00:00:00Z'
            },
            {
                id: 'bill_shahin_2025',
                billNo: 'MBSTU/ICT/BILL/2025/11/003',
                semesterId: 'sem_2024_11',
                teacherId: 't_shahin',
                preparationDate: '2026-03-28',
                carrierEnabled: false,
                carrierCharge: 0.00,
                carrierVoucherNo: '',
                grossAmount: 22600.00,
                deductions: 0.00,
                approvedAmount: 22600.00,
                paidAmount: 22600.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-04-01',
                createdAt: '2026-03-28T00:00:00Z'
            },
            {
                id: 'bill_nargis_2025',
                billNo: 'MBSTU/ICT/BILL/2025/11/004',
                semesterId: 'sem_2024_11',
                teacherId: 't_nargis',
                preparationDate: '2026-03-29',
                carrierEnabled: false,
                carrierCharge: 0.00,
                carrierVoucherNo: '',
                grossAmount: 27325.00,
                deductions: 0.00,
                approvedAmount: 27325.00,
                paidAmount: 0.00,
                outstandingBalance: 27325.00,
                status: 'Approved',
                chairmanSigned: true,
                approvalDate: '2026-04-02',
                createdAt: '2026-03-29T00:00:00Z'
            },
            {
                id: 'bill_sajjad_2025',
                billNo: 'MBSTU/ICT/BILL/2025/11/005',
                semesterId: 'sem_2024_11',
                teacherId: 't_sajjad',
                preparationDate: '2026-03-29',
                carrierEnabled: false,
                carrierCharge: 0.00,
                carrierVoucherNo: '',
                grossAmount: 10725.00,
                deductions: 0.00,
                approvedAmount: 10725.00,
                paidAmount: 10725.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-04-02',
                createdAt: '2026-03-29T00:00:00Z'
            },
            {
                id: 'bill_badrul_2025',
                billNo: 'MBSTU/ICT/BILL/2025/11/006',
                semesterId: 'sem_2024_11',
                teacherId: 't_badrul',
                preparationDate: '2026-03-29',
                carrierEnabled: false,
                carrierCharge: 0.00,
                carrierVoucherNo: '',
                grossAmount: 6240.00,
                deductions: 0.00,
                approvedAmount: 6240.00,
                paidAmount: 6240.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-04-02',
                createdAt: '2026-03-29T00:00:00Z'
            },
            {
                id: 'bill_abir_2025',
                billNo: 'MBSTU/ICT/BILL/2025/11/007',
                semesterId: 'sem_2024_11',
                teacherId: 't_abir',
                preparationDate: '2026-03-29',
                carrierEnabled: false,
                carrierCharge: 0.00,
                carrierVoucherNo: '',
                grossAmount: 16840.00,
                deductions: 0.00,
                approvedAmount: 16840.00,
                paidAmount: 16840.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-04-02',
                createdAt: '2026-03-29T00:00:00Z'
            },
            // --- 4Y 1S BILL (sem_2021_41) ---
            {
                id: 'bill_monir_41_2025',
                billNo: 'MBSTU/ICT/BILL/2024/41/001',
                semesterId: 'sem_2021_41',
                teacherId: 't_monir',
                preparationDate: '2025-12-28',
                carrierEnabled: false,
                carrierCharge: 0.00,
                carrierVoucherNo: '',
                grossAmount: 21720.00,
                deductions: 0.00,
                approvedAmount: 21720.00,
                paidAmount: 21720.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-01-05',
                createdAt: '2025-12-28T00:00:00Z'
            },
            // --- Backlog Bill (sem_2023_21_bl) ---
            {
                id: 'bill_bl_rupali_2025',
                billNo: 'MBSTU/ICT/BILL/2025/BL/RUPALI',
                semesterId: 'sem_2023_21_bl',
                teacherId: 't_rupali',
                preparationDate: '2026-03-26',
                carrierEnabled: false,
                carrierCharge: 0.00,
                carrierVoucherNo: '',
                grossAmount: 2160.00,
                deductions: 0.00,
                approvedAmount: 2160.00,
                paidAmount: 2160.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-03-28',
                createdAt: '2026-03-26T00:00:00Z'
            },

            {
                id: 'bill_nargis_2026',
                billNo: 'MBSTU/ICT/BILL/2026/042',
                semesterId: 'sem_2023_21',
                teacherId: 't_nargis',
                preparationDate: '2026-03-12',
                grossAmount: 55600.00,
                deductions: 0.00,
                approvedAmount: 55600.00,
                paidAmount: 30000.00,
                outstandingBalance: 25600.00,
                status: 'Partially Paid',
                chairmanSigned: true,
                approvalDate: '2026-03-14',
                createdAt: '2026-03-12T00:00:00Z'
            },
            {
                id: 'bill_sajjad_2024',
                billNo: 'MBSTU/ICT/BILL/2024/008',
                semesterId: 'sem_2022_31',
                teacherId: 't_sajjad',
                preparationDate: '2024-09-15',
                grossAmount: 66160.00,
                deductions: 0.00,
                approvedAmount: 66160.00,
                paidAmount: 66160.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2024-09-18',
                createdAt: '2024-09-15T00:00:00Z'
            },
            {
                id: 'bill_badrul_2024',
                billNo: 'MBSTU/ICT/BILL/2024/015',
                semesterId: 'sem_2022_31',
                teacherId: 't_badrul',
                preparationDate: '2024-09-16',
                grossAmount: 38350.00,
                deductions: 0.00,
                approvedAmount: 38350.00,
                paidAmount: 38350.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2024-09-18',
                createdAt: '2024-09-16T00:00:00Z'
            },
            {
                id: 'bill_monir_2024',
                billNo: 'MBSTU/ICT/BILL/2024/019',
                semesterId: 'sem_2020_42',
                teacherId: 't_monir', // Dr. Monir Morshed Official Bill
                preparationDate: '2026-02-28',
                grossAmount: 26150.00,
                deductions: 0.00,
                approvedAmount: 26150.00,
                paidAmount: 15000.00,
                outstandingBalance: 11150.00,
                status: 'Partially Paid',
                chairmanSigned: true,
                approvalDate: '2026-03-02',
                createdAt: '2026-02-28T00:00:00Z'
            },
            {
                id: 'bill_abir_2025',
                billNo: 'MBSTU/ICT/BILL/2025/073',
                semesterId: 'sem_2023_21',
                teacherId: 't_abir',
                preparationDate: '2026-03-10',
                grossAmount: 18200.00,
                deductions: 0.00,
                approvedAmount: 18200.00,
                paidAmount: 18200.00,
                outstandingBalance: 0.00,
                status: 'Paid',
                chairmanSigned: true,
                approvalDate: '2026-03-11',
                createdAt: '2026-03-10T00:00:00Z'
            },
            {
                id: 'bill_rupali_2025',
                billNo: 'MBSTU/ICT/BILL/2025/088',
                semesterId: 'sem_2023_21',
                teacherId: 't_rupali',
                preparationDate: '2026-03-25',
                carrierEnabled: true,
                carrierCharge: 800.00,
                carrierVoucherNo: 'SA-PARCEL-8812',
                grossAmount: 17040.00,
                deductions: 0.00,
                approvedAmount: 17040.00,
                paidAmount: 0.00,
                outstandingBalance: 17040.00,
                status: 'Approved',
                chairmanSigned: true,
                approvalDate: '2026-03-26',
                createdAt: '2026-03-25T00:00:00Z'
            }
        ];

        // 7. Payments (Accounts Disbursements)
        this.state.payments = [
            // 1Y 1S Payments (sem_2024_11)
            {
                id: 'pay_ziaur_2025',
                billId: 'bill_ziaur_2025',
                teacherId: 't_ziaur',
                semesterId: 'sem_2024_11',
                paymentDate: '2026-04-05',
                amountPaid: 30275.00,
                paymentMethod: 'Bank Transfer',
                receiptVoucherNo: 'VR-2026-4411',
                hasRevenueStamp: true,
                recordedBy: 'Section Officer (Accounts)',
                createdAt: '2026-04-05T00:00:00Z'
            },
            {
                id: 'pay_monir_2025',
                billId: 'bill_monir_2025',
                teacherId: 't_monir',
                semesterId: 'sem_2024_11',
                paymentDate: '2026-04-04',
                amountPaid: 17200.00,
                paymentMethod: 'Bank Transfer',
                receiptVoucherNo: 'VR-2026-4412',
                hasRevenueStamp: true,
                recordedBy: 'Assistant Controller (Accounts)',
                createdAt: '2026-04-04T00:00:00Z'
            },
            {
                id: 'pay_shahin_2025',
                billId: 'bill_shahin_2025',
                teacherId: 't_shahin',
                semesterId: 'sem_2024_11',
                paymentDate: '2026-04-04',
                amountPaid: 22600.00,
                paymentMethod: 'Bank Transfer',
                receiptVoucherNo: 'VR-2026-4413',
                hasRevenueStamp: true,
                recordedBy: 'Assistant Controller (Accounts)',
                createdAt: '2026-04-04T00:00:00Z'
            },

            {
                id: 'pay_nargis_01',
                billId: 'bill_nargis_2026',
                teacherId: 't_nargis',
                semesterId: 'sem_2023_21',
                paymentDate: '2026-03-20',
                amountPaid: 30000.00,
                paymentMethod: 'Bank Transfer',
                receiptVoucherNo: 'VR-2026-8842',
                hasRevenueStamp: true,
                recordedBy: 'Section Officer (Accounts)',
                createdAt: '2026-03-20T00:00:00Z'
            },
            {
                id: 'pay_monir_01',
                billId: 'bill_monir_2024',
                teacherId: 't_monir', // Payment disbursed to Dr. Monir Morshed
                semesterId: 'sem_2020_42',
                paymentDate: '2026-03-18',
                amountPaid: 15000.00,
                paymentMethod: 'Bank Transfer',
                receiptVoucherNo: 'VR-2026-9011',
                hasRevenueStamp: true,
                recordedBy: 'Assistant Controller (Accounts)',
                createdAt: '2026-03-18T00:00:00Z'
            },
            {
                id: 'pay_abir_01',
                billId: 'bill_abir_2025',
                teacherId: 't_abir',
                semesterId: 'sem_2023_21',
                paymentDate: '2026-03-15',
                amountPaid: 18200.00,
                paymentMethod: 'Cheque',
                receiptVoucherNo: 'CHQ-2026-3391',
                hasRevenueStamp: true,
                recordedBy: 'Section Officer (Accounts)',
                createdAt: '2026-03-15T00:00:00Z'
            }
        ];

        // Default selector
        this.state.currentSemesterId = 'sem_2024_11'; // Default active semester is 1st Year 1st Semester
        this.state.selectedTeacherId = 't_ziaur';
        this.state.selectedTeacherId = 't_monir';

        this.saveState();
    }
};

// Global window attachment for HTML onclick event handlers and debugging
window.App = App;

// Auto-boot application reliably whether script runs before or after DOMContentLoaded
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    App.init();
}

