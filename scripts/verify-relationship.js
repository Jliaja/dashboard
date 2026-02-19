const db = require('../src/config/db');

async function testRelationship() {
    try {
        console.log('Starting verification...');

        // 1. Create a Department
        const deptRes = await db.query(
            'INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING *',
            ['Test Dept', 'Testing Relationship']
        );
        const dept = deptRes.rows[0];
        console.log('Created Department:', dept);

        // 2. Create an Employee
        const empRes = await db.query(
            'INSERT INTO employees (name, email, position, department_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            ['Test Employee', 'test@example.com', 'Tester', dept.id, 'aktif']
        );
        const emp = empRes.rows[0];
        console.log('Created Employee:', emp);

        // 3. Fetch Employee with Department Name
        const fetchRes = await db.query(`
      SELECT e.*, d.name AS department_name
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE e.id = $1
    `, [emp.id]);

        const fetchedEmp = fetchRes.rows[0];
        console.log('Fetched Employee with Dept:', fetchedEmp);

        if (fetchedEmp.department_name === 'Test Dept') {
            console.log('SUCCESS: Department name correctly joined!');
        } else {
            console.error('FAILURE: Department name mismatch or missing.');
        }

        // Cleanup
        await db.query('DELETE FROM employees WHERE id = $1', [emp.id]);
        await db.query('DELETE FROM departments WHERE id = $1', [dept.id]);
        console.log('Cleanup complete.');

    } catch (err) {
        console.error('Error during verification:', err);
    } finally {
        db.end();
    }
}

testRelationship();
