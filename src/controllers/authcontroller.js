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

    // Default name if null (for existing users)
    if (!user.name) {
      const emailName = user.email.split('@')[0];
      const defaultName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      // Optional: update DB with default name
      await db.query('UPDATE users SET name = $1 WHERE id = $2', [defaultName, user.id]);
      user.name = defaultName;
    }

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

exports.getMe = async (req, res) => {
  try {
    const results = await db.query('SELECT id, name, email, role FROM users WHERE id = $1', [req.user.id]);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = results.rows[0];

    // Fallback if name is null
    if (!user.name) {
      const emailName = user.email.split('@')[0];
      user.name = emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
