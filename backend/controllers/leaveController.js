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

  async getLeaves({ employee_id, status }) {
    let query = 'SELECT * FROM leave_requests';
    const conditions = [];
    const values = [];

    if (employee_id) {
      conditions.push(`employee_id = $${values.length + 1}`);
      values.push(employee_id);
    }

    if (status) {
      conditions.push(`status = $${values.length + 1}`);
      values.push(status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, values);
    return result.rows;
  },

  async updateLeaveStatus(id, status) {
    const result = await pool.query(
      `UPDATE leave_requests SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  },
};

export default leaveController;
