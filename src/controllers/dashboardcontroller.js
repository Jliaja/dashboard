const db = require('../config/db');

exports.getStats = async (req, res) => {
  try {
    const emp = await db.query("SELECT COUNT(*) FROM employees");
    const div = await db.query("SELECT COUNT(*) FROM departments");
    const pro = await db.query("SELECT COUNT(*) FROM projects");

    res.json({
      totalEmployees: parseInt(emp.rows[0].count),
      totalDivisions: parseInt(div.rows[0].count),
      totalProjects: parseInt(pro.rows[0].count)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil statistik" });
  }
};
