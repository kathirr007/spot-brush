const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    const body = req.body
    res.json({
      'message': 'ok',
      body
    })
  })

module.exports = router;
