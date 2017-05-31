import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import publicationRoutes from './publications.route' ;

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('', (req, res) =>
  res.json('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount publications routes as /publication

router.use('/publications', publicationRoutes);

export default router;
