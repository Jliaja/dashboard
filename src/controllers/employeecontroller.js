const db = require('../config/db');

/* ================= GET ALL ================= */
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, result) => {  // db = node-postgres client
    if (err) return res.status(500).json(err);
    res.json(result.rows); // kirim array langsung
  });
};


/* ================= CREATE ================= */
exports.create = (req, res) => {
  const { name, email, position, division, status } = req.body;

  const sql = `
  INSERT INTO employees (name, email, position, division, status)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
`;

db.query(sql, [name, email, position, division, status], (err, result) => {
  if (err) return res.status(500).json(err);
  res.json({ message: 'Employee ditambahkan', employee: result.rows[0] });
});

};

/* ================= UPDATE ================= */
exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const { name, email, position, division, status } = req.body;

  const sql = `
  UPDATE employees
  SET name=$1, email=$2, position=$3, division=$4, status=$5
  WHERE id=$6
  RETURNING *
`;

db.query(sql, [name, email, position, division, status, id], (err, result) => {
  if (err) return res.status(500).json(err);
  res.json({ message: 'Employee diupdate', employee: result.rows[0] });
});

};

/* ================= DELETE ================= */
exports.remove = (req, res) => {
  const sql = 'DELETE FROM employees WHERE id=$1';
db.query(sql, [parseInt(req.params.id, 10)], (err) => {
  if (err) return res.status(500).json(err);
  res.json({ message: 'Employee dihapus' });
});

};

/* ================= GET BY ID ================= */
exports.getById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const sql = 'SELECT * FROM employees WHERE id=$1';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee tidak ditemukan' });
    }

    res.json(result.rows[0]); // kirim 1 object
  });
};

