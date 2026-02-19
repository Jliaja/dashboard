const db = require('../config/db');

/* ================= GET ALL ================= */
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM departments ORDER BY id ASC';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result.rows);
  });
};


/* ================= CREATE ================= */
exports.create = (req, res) => {
  const { name, description } = req.body;

  const sql = `
    INSERT INTO departments (name, description)
    VALUES ($1, $2)
    RETURNING *
  `;

  db.query(sql, [name, description], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({
      message: 'Department ditambahkan',
      department: result.rows[0]
    });
  });
};


/* ================= UPDATE ================= */
exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description } = req.body;

  const sql = `
    UPDATE departments
    SET name=$1, description=$2
    WHERE id=$3
    RETURNING *
  `;

  db.query(sql, [name, description, id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Department tidak ditemukan' });
    }

    res.json({
      message: 'Department diupdate',
      department: result.rows[0]
    });
  });
};


/* ================= DELETE ================= */
exports.remove = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const sql = 'DELETE FROM departments WHERE id=$1';

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Department dihapus' });
  });
};


/* ================= GET BY ID ================= */
exports.getById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const sql = 'SELECT * FROM departments WHERE id=$1';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Department tidak ditemukan' });
    }

    res.json(result.rows[0]);
  });
};
