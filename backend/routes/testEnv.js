const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.status(200).json({ host: 'test' }); // send a json response
});

module.exports = router;
