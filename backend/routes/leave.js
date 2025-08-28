import express from 'express';
import { body, validationResult, query } from 'express-validator';
import leaveController from '../controllers/leaveController.js';

const router = express.Router();

// 🧹 Validation middleware for leave submission
const validateLeaveRequest = [
  body('employee_id').notEmpty().withMessage('Employee ID is required'),
  body('type').notEmpty().withMessage('Leave type is required'),
  body('start_date').isISO8601().withMessage('Start date must be a valid date'),
  body('end_date').isISO8601().withMessage('End date must be a valid date'),
  body('reason').optional().isString().withMessage('Reason must be a string'),
];

// 📥 POST: Submit a leave request
router.post('/', validateLeaveRequest, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newLeave = await leaveController.submitLeave(req.body);
    res.status(201).json({
      message: '✅ Leave request submitted successfully',
      data: newLeave,
    });
  } catch (err) {
    console.error('❌ Error submitting leave:', err.message);
    res.status(500).json({ error: 'Server error while submitting leave request' });
  }
});

// 📤 GET: Retrieve leave requests (optionally filter by employee or status)
router.get(
  '/',
  [
    query('employee_id').optional().isInt().withMessage('Employee ID must be an integer'),
    query('status').optional().isIn(['Pending', 'Approved', 'Rejected']).withMessage('Invalid status'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { employee_id, status } = req.query;

    try {
      const leaves = await leaveController.getLeaves({ employee_id, status });
      res.json(leaves);
    } catch (err) {
      console.error('❌ Error fetching leaves:', err.message);
      res.status(500).json({ error: 'Failed to retrieve leave requests' });
    }
  }
);

// ✅ PUT: Update leave request status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updated = await leaveController.updateLeaveStatus(id, status);
    res.json(updated);
  } catch (err) {
    console.error('❌ Error updating leave status:', err.message);
    res.status(500).json({ error: 'Failed to update leave status' });
  }
});

export default router;
