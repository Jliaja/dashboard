const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { name, email, position, department_id, status } = req.body;

  const sql = `
    INSERT INTO employees (name, email, position, department_id, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, position, department_id, status], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee ditambahkan' });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, email, position, department_id, status } = req.body;

  const sql = `
    UPDATE employees
    SET name=?, email=?, position=?, department_id=?, status=?
    WHERE id=?
  `;

  db.query(sql, [name, email, position, department_id, status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee diupdate' });
  });
};

exports.remove = (req, res) => {
  db.query('DELETE FROM employees WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee dihapus' });
  });
};
