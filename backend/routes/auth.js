const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Hardcoded credentials as per given in the task
  if (email === 'test@scaleboard.com' && password === '1234') {
    const token = jwt.sign(
      { email, role: 'employee' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );
    
    return res.json({ token });
  }
  
  return res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;