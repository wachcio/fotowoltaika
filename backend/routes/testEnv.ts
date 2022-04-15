import express from 'express';
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.status(200).json({ host: 'test' }); // send a json response
});

export { router as testEnv };
