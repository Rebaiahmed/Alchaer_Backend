import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

import config from '../../config/config';  
import  crypto from 'crypto' 
 import User from '../models/user.model';
// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};






/**
 * define function to generate token
 */

function generateToken(user) {  
  return jwt.sign(user, 'tokensecret', {
    expiresIn: 10080 // in seconds
  });
}


/**
 * define function to send reqyets profile
 */
function setUserInfo(request) {  

  if( request)
  {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
 
  };
  }
}







/**
 * 
 */
function login(req, res, next) {

  console.log("userinfo"+ req)

if(req.user)
{
 let userInfo = setUserInfo(req.user);
}

 

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
}


/**
 * 
 */

function register(req, res, next) {  
  // Check for registration errors
  const email = req.body.email;
   const username = req.body.username ;
  const password = req.body.password;

  // Return error if no email provided
 /* if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }*/

  User.findOne({ email }, (err, existingUser) => {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      let photoUrl = '';
       let  publications =[];
        let  comments =[] ;
         let  liked =[];
         let  favoris =[];
         let  Followers =[];
         let  Following =[];
      // If email is unique and password was provided, create account
      let user = new User({
       username,
       email ,
       photoUrl,
       publications,
       comments,
       liked,
       favoris,
       Followers,
       Following
      
       
          
      });

      user.save((err, user) => {
        if (err) { const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
                       return next(err);}

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);

        return res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user: userInfo
        });
      });
  });
}


/**
 * 
 * 
 */
function roleAuthorization(role) {  
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      /*if (foundUser.role == role) {
        return next();
      }*/
      if(foundUser)
      return next();

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}





export default { register,login,roleAuthorization  };