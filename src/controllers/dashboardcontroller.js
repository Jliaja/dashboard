const db = require('../config/db');

exports.getStats = async (req, res) => {
  try {
    const emp = await db.query("SELECT COUNT(*) FROM employees");
    const div = await db.query("SELECT COUNT(*) FROM departments");
    const proActive = await db.query("SELECT COUNT(*) FROM projects WHERE status='On Progress'");
    const proTotal = await db.query("SELECT COUNT(*) FROM projects");
    const recent = await db.query("SELECT * FROM projects WHERE status='On Progress' ORDER BY \"updatedAt\" DESC LIMIT 5");

    res.json({
      totalEmployees: parseInt(emp.rows[0].count),
      totalDivisions: parseInt(div.rows[0].count),
      activeProjects: parseInt(proActive.rows[0].count),
      totalProjects: parseInt(proTotal.rows[0].count), // Now returns ALL projects
      recentProjects: recent.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil statistik" });
  }
};
