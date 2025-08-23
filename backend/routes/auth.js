// routes/auth.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const user = result.rows[0];

    // If you're using hashed passwords, replace this with bcrypt.compare
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({
      token: 'mock-token-123', // Replace with JWT later
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Database error' });
  }
});

export default router;
