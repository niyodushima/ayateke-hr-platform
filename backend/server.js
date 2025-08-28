import express from 'express';
import cors from 'cors';
import pool from './db.js';

import attendanceRoutes from './routes/attendance.js';
import leaveRoutes from './routes/leave.js';
import authRoutes from './routes/auth.js'; // ✅ Add this
import staffRoutes from './routes/staff.js';
import salaryRoutes from './routes/salaries.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api', authRoutes); // ✅ Mount login route
app.use('/api/staff', staffRoutes);
app.use('/uploads', express.static('uploads'));
app.use('api/salaries', salaryRoutes);
app.get('/', (req, res) => {
  res.send('✅ Ayateke HR backend is running');
});
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
