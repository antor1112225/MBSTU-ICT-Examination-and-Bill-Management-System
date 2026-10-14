const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PDF_DIR = 'C:\\Users\\Antor\\.gemini\\antigravity\\scratch\\MBSTU_ICT_EXAM_BILL_SYSTEM\\pdf_exports';
const HTML_URL = 'file:///C:/Users/Antor/.gemini/antigravity/scratch/MBSTU_ICT_EXAM_BILL_SYSTEM/index.html';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const DOCUMENTS_TO_GENERATE = [
    // 1. Official 14-Row Statutory Teacher Bill Slips (Matching Physical Scanned Photos)
    {
        type: 'bill',
        id: 'bill_nargis_2026',
        filename: 'MBSTU_ICT_Bill_Slip_Dr_Nargis_Aktar_55600.pdf',
        description: 'Dr. Mst. Nargis Aktar - 2Y 1S Final Exam 2025 (৳55,600/-)'
    },
    {
        type: 'bill',
        id: 'bill_sajjad_2024',
        filename: 'MBSTU_ICT_Bill_Slip_Prof_Sajjad_Waheed_66160.pdf',
        description: 'Prof. Dr. Sajjad Waheed - 3Y 1S Final Exam 2024 (৳66,160/-)'
    },
    {
        type: 'bill',
        id: 'bill_badrul_2024',
        filename: 'MBSTU_ICT_Bill_Slip_Dr_Badrul_Alam_Miah_38350.pdf',
        description: 'Dr. Mohammad Badrul Alam Miah - 3Y 1S Final Exam 2024 (৳38,350/-)'
    },
    {
        type: 'bill',
        id: 'bill_monir_2024',
        filename: 'MBSTU_ICT_Bill_Slip_Dr_Monir_Morshed_26150.pdf',
        description: 'Dr. Monir Morshed - 4Y 2S Final Exam 2024 (৳26,150/-)'
    },

    // 2. Official Departmental Moderation & Examination Dossiers (Matching 11-page CamScanner PDF)
    {
        type: 'dossier',
        semesterId: 'sem_2023_21',
        filename: 'MBSTU_ICT_Dossier_2Y1S_Session_2023_2024.pdf',
        description: '2Y 1S Final Exam 2025 Dossier (Session 2023-2024 - Chairman: Dr. Mst. Nargis Aktar)'
    },
    {
        type: 'dossier',
        semesterId: 'sem_2021_32',
        filename: 'MBSTU_ICT_Dossier_3Y2S_Session_2021_2022.pdf',
        description: '3Y 2S Final Exam 2022 Dossier (Session 2021-2022 - Chairman: Dr. Mohammad Badrul Alam Miah)'
    },
    {
        type: 'dossier',
        semesterId: 'sem_2024_11',
        filename: 'MBSTU_ICT_Dossier_1Y1S_Session_2024_2025.pdf',
        description: '1Y 1S Final Exam 2025 Dossier (Session 2024-2025 - Chairman: Dr. Md. Abir Hossain)'
    },
    {
        type: 'dossier',
        semesterId: 'sem_2020_42',
        filename: 'MBSTU_ICT_Dossier_4Y2S_Session_2020_2021.pdf',
        description: '4Y 2S Final Exam 2021 Dossier (Session 2020-2021 - Chairman: Dr. Monir Morshed)'
    }
];

async function generateAllPdfs() {
    fs.mkdirSync(PDF_DIR, { recursive: true });
    const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_export_' + Date.now());
    fs.mkdirSync(tmpDir, { recursive: true });

    console.log('================================================================');
    console.log('MBSTU ICT Department Examination & Bill Management System');
    console.log('Official PDF Generation Engine (Headless Chrome + CDP Protocol)');
    console.log('================================================================');

    console.log('\n[1/4] Spawning headless Chrome browser instance...');
    const chrome = spawn(CHROME_PATH, [
        '--headless=new',
        '--remote-debugging-port=9222',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--user-data-dir=' + tmpDir
    ]);

    chrome.on('error', err => {
        console.error('CRITICAL: Chrome failed to spawn:', err);
        process.exit(1);
    });

    // Wait for Chrome port 9222
    let versionInfo = null;
    for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 250));
        try {
            const res = await fetch('http://127.0.0.1:9222/json/version');
            if (res.ok) {
                versionInfo = await res.json();
                break;
            }
        } catch (e) {}
    }

    if (!versionInfo) {
        console.error('CRITICAL: Timed out connecting to Chrome remote debugging port 9222.');
        chrome.kill();
        process.exit(1);
    }
    console.log(`[2/4] Successfully connected to ${versionInfo.Browser}`);

    // Create target page
    console.log(`[3/4] Navigating to application: ${HTML_URL}`);
    const newPageRes = await fetch('http://127.0.0.1:9222/json/new?' + encodeURIComponent(HTML_URL), { method: 'PUT' });
    const target = await newPageRes.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && callbacks.has(msg.id)) {
            const { resolve, reject } = callbacks.get(msg.id);
            callbacks.delete(msg.id);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
        }
    };

    await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
    });

    function sendCommand(method, params = {}) {
        return new Promise((resolve, reject) => {
            const id = msgId++;
            callbacks.set(id, { resolve, reject });
            ws.send(JSON.stringify({ id, method, params }));
        });
    }

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');

    // Wait 2 seconds for app state initialization and DOM render
    await new Promise(r => setTimeout(r, 2000));

    // Force load demo data to make sure all bills and dossiers exist
    await sendCommand('Runtime.evaluate', {
        expression: `
            if (typeof App !== 'undefined') {
                App.loadDemoData();
                App.renderAll();
            }
        `
    });
    await new Promise(r => setTimeout(r, 1000));

    console.log('\n[4/4] Generating official PDF documents...\n');

    const generatedFiles = [];

    for (let i = 0; i < DOCUMENTS_TO_GENERATE.length; i++) {
        const doc = DOCUMENTS_TO_GENERATE[i];
        const outFilePath = path.join(PDF_DIR, doc.filename);
        console.log(`--> [${i + 1}/${DOCUMENTS_TO_GENERATE.length}] Rendering: ${doc.filename}`);
        console.log(`    Detail: ${doc.description}`);

        if (doc.type === 'bill') {
            // Switch to bill slip tab and select the specific bill
            await sendCommand('Runtime.evaluate', {
                expression: `
                    App.switchTab('print-slip');
                    App.renderPrintableBillSlip('${doc.id}');
                `
            });
        } else if (doc.type === 'dossier') {
            // Switch to moderation dossier tab and select the specific semester
            await sendCommand('Runtime.evaluate', {
                expression: `
                    App.switchTab('moderation');
                    App.handleDossierSemesterChange('${doc.semesterId}');
                `
            });
        }

        // Wait 400ms for DOM redraw
        await new Promise(r => setTimeout(r, 400));

        // Call CDP Page.printToPDF
        const pdfResult = await sendCommand('Page.printToPDF', {
            printBackground: true,
            displayHeaderFooter: false,
            paperWidth: 8.27,  // A4 portrait width in inches
            paperHeight: 11.69, // A4 portrait height in inches
            marginTop: 0.35,
            marginBottom: 0.35,
            marginLeft: 0.35,
            marginRight: 0.35
        });

        const buffer = Buffer.from(pdfResult.data, 'base64');
        fs.writeFileSync(outFilePath, buffer);
        const stats = fs.statSync(outFilePath);
        console.log(`    [PASS] Saved: ${stats.size} bytes (${(stats.size / 1024).toFixed(1)} KB)\n`);
        generatedFiles.push({ filename: doc.filename, size: stats.size, path: outFilePath, desc: doc.description });
    }

    ws.close();
    chrome.kill();

    // Clean up temp dir non-blocking
    setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    }, 2000);

    console.log('================================================================');
    console.log('SUMMARY OF GENERATED OFFICIAL PDF ARTIFACTS:');
    console.log('================================================================');
    generatedFiles.forEach((f, idx) => {
        console.log(`${idx + 1}. ${f.filename} (${(f.size / 1024).toFixed(1)} KB)`);
        console.log(`   ${f.desc}`);
        console.log(`   Path: ${f.path}\n`);
    });
    console.log(`All ${generatedFiles.length} PDF files generated successfully into:`);
    console.log(PDF_DIR);
}

generateAllPdfs().catch(err => {
    console.error('Fatal execution error:', err);
    process.exit(1);
});
