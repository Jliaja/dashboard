const db = require('../config/db');

exports.getStats = (req, res) => {
  const sql = `
    SELECT 
    (SELECT COUNT(*) FROM employees) AS totalEmployees,
    (SELECT COUNT(*) FROM departments) AS totalDepartments,
    (SELECT COUNT(*) FROM projects WHERE status='ongoing') AS activeProjects
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};
