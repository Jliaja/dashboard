const db = require('./src/config/db');

async function debugProjects() {
    try {
        const res = await db.query('SELECT name, status FROM projects');
        console.log('--- All Projects ---');
        console.table(res.rows);

        const countRes = await db.query(`
      SELECT 
      (SELECT COUNT(*) FROM projects) as total_all,
      (SELECT COUNT(*) FROM projects WHERE status='On Progress') as on_progress_count,
      (SELECT COUNT(*) FROM projects WHERE status='Planning') as planning_count
    `);
        console.log('--- Counts ---');
        console.table(countRes.rows);

    } catch (err) {
        console.error(err);
    }
}

debugProjects();
