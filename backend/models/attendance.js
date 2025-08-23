import pool from '../db.js'; // Adjust path if needed

const Attendance = {
  async getLogs() {
    try {
      const result = await pool.query('SELECT * FROM attendance_logs ORDER BY created_at DESC');
      return result.rows;
    } catch (err) {
      console.error('Error fetching logs:', err);
      throw err;
    }
  },

  async addLog({ employee_id, date, clock_in, clock_out }) {
    try {
      const result = await pool.query(
        `INSERT INTO attendance_logs (employee_id, date, clock_in, clock_out)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [employee_id, date, clock_in, clock_out]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error adding log:', err);
      throw err;
    }
  },
};

export default Attendance;
