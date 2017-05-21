import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/config';
import passport from 'passport';
import passportService  from '../helpers/passport' ;


const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(authCtrl.login);

router.route('/register')
  .post(authCtrl.register);
 router.route('/save')
   .post(authCtrl.SaveUser) 


export default router;
