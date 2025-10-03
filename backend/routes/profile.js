const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  res.json({
    email: req.user.email,
    role: req.user.role
  });
});

module.exports = router;