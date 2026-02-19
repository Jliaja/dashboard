const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (results.rows.length === 0) {
      return res.status(400).json({ message: 'User tidak ditemukan' });
    }

    const user = results.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};
