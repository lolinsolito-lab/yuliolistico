const fetch = require('node-fetch'); // or native fetch if Node 18+

async function run() {
    try {
        console.log("Calling Vercel Endpoint...");
        const res = await fetch('https://www.yuliolistico.com/api/submit-and-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lead: {
                    email: 'test' + Date.now() + '@example.com',
                },
                source: 'newsletter',
                honeypot: ''
            })
        });

        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Response:", text);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

run();
