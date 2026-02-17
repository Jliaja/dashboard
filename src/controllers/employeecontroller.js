const db = require('../config/db');

/* ================= GET ALL ================= */
exports.getAll = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

/* ================= CREATE ================= */
exports.create = (req, res) => {
  const { name, email, position, division, status } = req.body;

  const sql = `
    INSERT INTO employees (name, email, position, division, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, position, division, status], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee ditambahkan' });
  });
};

/* ================= UPDATE ================= */
exports.update = (req, res) => {
  const { id } = req.params;
  const { name, email, position, division, status } = req.body;

  const sql = `
    UPDATE employees
    SET name=?, email=?, position=?, division=?, status=?
    WHERE id=?
  `;

  db.query(sql, [name, email, position, division, status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee diupdate' });
  });
};

/* ================= DELETE ================= */
exports.remove = (req, res) => {
  db.query('DELETE FROM employees WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee dihapus' });
  });
};
