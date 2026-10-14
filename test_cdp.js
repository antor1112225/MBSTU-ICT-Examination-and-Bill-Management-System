const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function test() {
    const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_test_' + Date.now());
    fs.mkdirSync(tmpDir, { recursive: true });

    console.log('Launching headless Chrome...');
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
        '--headless=new',
        '--remote-debugging-port=9222',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--user-data-dir=' + tmpDir
    ]);

    chrome.on('error', err => console.error('Chrome spawn error:', err));

    // Wait for Chrome to listen
    let version = null;
    for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 300));
        try {
            const res = await fetch('http://127.0.0.1:9222/json/version');
            if (res.ok) {
                version = await res.json();
                break;
            }
        } catch (e) {}
    }

    if (!version) {
        console.error('Failed to connect to Chrome remote debugging port.');
        chrome.kill();
        process.exit(1);
    }

    console.log('Connected to Chrome:', version.Browser);

    // Create a new target page with index.html
    const targetUrl = 'file:///C:/Users/Antor/.gemini/antigravity/scratch/MBSTU_ICT_EXAM_BILL_SYSTEM/index.html';
    const newPageRes = await fetch('http://127.0.0.1:9222/json/new?' + encodeURIComponent(targetUrl), { method: 'PUT' });
    const target = await newPageRes.json();
    console.log('Page created, ws:', target.webSocketDebuggerUrl);

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

    // Wait 1.5 seconds for scripts to initialize
    await new Promise(r => setTimeout(r, 1500));

    // Evaluate
    const evalRes = await sendCommand('Runtime.evaluate', {
        expression: 'document.title',
        returnByValue: true
    });
    console.log('Page title:', evalRes.result.value);

    // Render print slip
    await sendCommand('Runtime.evaluate', {
        expression: `
            App.switchTab('print-slip');
            App.renderPrintableBillSlip('bill_nargis_2026');
        `
    });
    await new Promise(r => setTimeout(r, 500));

    console.log('Printing to PDF...');
    const pdfRes = await sendCommand('Page.printToPDF', {
        printBackground: true,
        paperWidth: 8.27,
        paperHeight: 11.69,
        marginTop: 0.3,
        marginBottom: 0.3,
        marginLeft: 0.3,
        marginRight: 0.3
    });

    const outPath = 'C:\\Users\\Antor\\.gemini\\antigravity\\scratch\\MBSTU_ICT_EXAM_BILL_SYSTEM\\pdf_exports\\test_output.pdf';
    fs.writeFileSync(outPath, Buffer.from(pdfRes.data, 'base64'));
    console.log('PDF written successfully to:', outPath);
    console.log('File size:', fs.statSync(outPath).size, 'bytes');

    ws.close();
    chrome.kill();
    fs.rmSync(tmpDir, { recursive: true, force: true });
    console.log('Done!');
}

test().catch(err => {
    console.error('Test error:', err);
    process.exit(1);
});
