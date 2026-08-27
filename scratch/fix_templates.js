const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8');
const urlMatch = env.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/);

if (!urlMatch || !keyMatch) {
    console.error("Missing DB credentials");
    process.exit(1);
}

const supabase = createClient(urlMatch[1], keyMatch[1]);

async function run() {
    // 1. Fetch all templates
    const { data, error } = await supabase.from('email_templates').select('*');
    if (error) { console.error(error); return; }

    for (const t of data) {
        if (t.body_content.toLowerCase().includes('diagnostico') || t.subject.toLowerCase().includes('diagnostico')) {
            console.log(`Found 'diagnostico' in template ${t.source}. Replacing...`);
            const newBody = t.body_content.replace(/diagnostico/gi, 'olistico');
            const newSubj = t.subject.replace(/diagnostico/gi, 'olistico');
            const { error: updErr } = await supabase.from('email_templates').update({ body_content: newBody, subject: newSubj }).eq('id', t.id);
            if (updErr) console.error("Failed to update:", updErr);
            else console.log(`Updated template ${t.source}!`);
        }
    }
    console.log("Done checking templates.");
}
run();
