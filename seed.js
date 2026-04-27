// Run once: SUPABASE_URL=... SUPABASE_SECRET_KEY=... node seed.js
// Populates Supabase with data from local JSON files.
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL    = process.env.SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET) {
  console.error('Set SUPABASE_URL and SUPABASE_SECRET_KEY env vars before running.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET);
const DATA = path.join(__dirname, 'server/data');

const keys = ['home','about','seo','contact-info','services-page','skills','experience','projects','services','blog'];

async function seed() {
  console.log('Seeding portfolio_data...');
  for (const key of keys) {
    const raw = fs.readFileSync(path.join(DATA, `${key}.json`), 'utf8');
    const json = JSON.parse(raw);
    const { error } = await supabase
      .from('portfolio_data')
      .upsert({ key, data: json, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (error) { console.error(`  ✗ ${key}:`, error.message); }
    else        { console.log(`  ✓ ${key}`); }
  }

  console.log('\nSeeding contacts...');
  const contacts = JSON.parse(fs.readFileSync(path.join(DATA, 'contacts.json'), 'utf8'));
  for (const c of contacts) {
    const { error } = await supabase.from('contacts').insert({
      name: c.name, email: c.email, message: c.message,
      read: c.read ?? false,
      created_at: c.date || new Date().toISOString(),
    });
    if (error) console.error(`  ✗ contact ${c.name}:`, error.message);
    else       console.log(`  ✓ contact from ${c.name}`);
  }

  console.log('\nDone!');
}

seed().catch(console.error);
