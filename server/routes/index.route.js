import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/health-check/:message', (req, res) => {
  res.send(req.params);
});

router.post('/health-check', (req, res) => {
  res.send(req.body);
});

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);
export default router;
