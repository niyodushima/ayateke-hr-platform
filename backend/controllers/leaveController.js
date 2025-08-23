// controllers/leaveController.js
import pool from '../db.js';

const leaveController = {
  async submitLeave({ employee_id, type, start_date, end_date, reason }) {
    const result = await pool.query(
      `INSERT INTO leave_requests (employee_id, type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [employee_id, type, start_date, end_date, reason, 'Pending']
    );
    return result.rows[0];
  },
};

export default leaveController;
