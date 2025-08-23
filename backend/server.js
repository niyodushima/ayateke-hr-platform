import express from 'express';
import cors from 'cors';
import pool from './db.js';

import attendanceRoutes from './routes/attendance.js';
import leaveRoutes from './routes/leave.js';
import authRoutes from './routes/auth.js'; // ✅ Add this

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api', authRoutes); // ✅ Mount login route

app.get('/', (req, res) => {
  res.send('✅ Ayateke HR backend is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
