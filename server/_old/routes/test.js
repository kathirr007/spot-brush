import express from 'express'
const router = express.Router();

router.get('', (req, res, next) => {
    const body = req.body
    res.json({
      'message': 'ok',
      body
    })
  })

export {router as testRoutes};
