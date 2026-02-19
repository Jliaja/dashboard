const db = require('../config/db');

/* ================= GET ALL ================= */
/* ================= GET ALL ================= */
exports.getAll = (req, res) => {
  const sql = `
    SELECT p.*, e.name as pic
    FROM projects p
    LEFT JOIN employees e ON p.employee_id = e.id
    ORDER BY p.id ASC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result.rows);
  });
};


/* ================= CREATE ================= */
/* ================= CREATE ================= */
exports.create = (req, res) => {
  const { name, client, status, start_date, end_date, employee_id } = req.body;

  const sql = `
    INSERT INTO projects (name, client, status, start_date, end_date, employee_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  db.query(
    sql,
    [name, client, status, start_date, end_date, employee_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: 'Project ditambahkan',
        project: result.rows[0]
      });
    }
  );
};


/* ================= UPDATE ================= */
/* ================= UPDATE ================= */
exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, client, status, start_date, end_date, employee_id } = req.body;

  const sql = `
    UPDATE projects
    SET name=$1,
        client=$2,
        status=$3,
        start_date=$4,
        end_date=$5,
        employee_id=$6
    WHERE id=$7
    RETURNING *
  `;

  db.query(
    sql,
    [name, client, status, start_date, end_date, employee_id, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Project tidak ditemukan' });
      }

      res.json({
        message: 'Project diupdate',
        project: result.rows[0]
      });
    }
  );
};


/* ================= DELETE ================= */
exports.remove = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const sql = 'DELETE FROM projects WHERE id=$1';

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Project dihapus' });
  });
};


/* ================= GET BY ID ================= */
exports.getById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const sql = `
    SELECT p.*, e.name as pic_name
    FROM projects p
    LEFT JOIN employees e ON p.employee_id = e.id
    WHERE p.id=$1
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    res.json(result.rows[0]);
  });
};
