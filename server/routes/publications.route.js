import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import pubCtrl from '../controllers/publications.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/publications - Get list of publications */
  .get(pubCtrl.getAll)

  /** POST /api/publications - Create new user */
  .post(pubCtrl.create);



router.route('/comments')
  /** GET /api/publications/coments - Get list of publications sorting by comments */
  .get(pubCtrl.getByComment);


router.route('/likes')
  /** GET /api/publications - Get list of publications soring by likes */
  .get(pubCtrl.getByLikes);



router.route('/:pubId')
  /** GET /api/users/:userId - Get user */
  .get(pubCtrl.getPublication)



  /** DELETE /api/users/:userId - Delete user */
  .delete(pubCtrl.removePublication);



router.route('/likes/:pubId')
  /** GET /api/users/:userId - Get user */
  .put(pubCtrl.AddLike);

router.route('/comments/:pubId')
  /** GET /api/users/:userId - Get user */
  .put(pubCtrl.AddComment);

/** Load publication when API with pubId route parameter is hit */
router.param('pubId', pubCtrl.load);

export default router;
