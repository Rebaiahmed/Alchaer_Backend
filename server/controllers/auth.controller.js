import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

import config from '../../config/config';  
import  crypto from 'crypto' 
 import User from '../models/user.model';
// sample user, used for authentication



/*User.remove().then(function(data){
console.log("data" + data);
}).catch(function(err){
  console.log("err"+ err)
})*/
     



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
/*function setUserInfo(request) {  

  if( request)
  {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
 
  };
  }
}*/







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

  console.log("hello"+ email + "username"+ username
  + "pasword" + password);

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

    console.log("data"+ email + "user" + existingUser + "err" + err);
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

      user.save((error, user) => {
        console.log("user" + user);
        if (err) { 
          console.log("err" + error);
          const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
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








/**
 * 
 */
function SaveUser(req,res,next)
{


const email = req.body.email;
  
  console.log("data arae" + JSON.stringify(req.body));

   User.findOne({  username : req.body.username }, (err, existingUser) => {

    console.log("data"+ email + "user" + existingUser + "err" + User.find());
      if (err) { return next(err); }

      // If user is not unique, return error
      if (!existingUser) {
         let photoUrl =  req.body.photoUrl;
       let  publications =[];
        let  comments =[] ;
         let  liked =[];
         let  favoris =[];
         let  Followers =[];
         let  Following =[];
         let first_name =req.body.first_name;
         let last_name = req.body.last_name;
        let  username = req.body.username;
        let gender = req.body.gender ;
          let facebook_id = req.body.id ;
        let accessToken = req.body.accessToken;
      // If email is unique and password was provided, create account

      console.log("User" +  JSON.stringify(User) );
      let user = new User({
       username,
       first_name,
        last_name,
        gender,
        facebook_id ,
        accessToken,
       email ,
       photoUrl,
       publications,
       comments,
       liked,
       favoris,
       Followers,
       Following});

       console.log("user beforre saving is" + JSON.stringify(user));

      user.save((error, user) => {
        console.log("user after saving it " + user);
        /*if (error) { 
          console.log("err" + error);
          const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
                       return next(err);}*/

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created
           
       console.log("user"+ user.accessToken);

        return res.status(201).json({
       
          token: user.accessToken
        });


      });



      }else{
      console.log("existing user "+ existingUser.accessToken);
       return res.status(201).json({
       
          token: existingUser.accessToken
        });
      }

     
})


}


//********************** */

function getUser(req,res,next)
{
//***get the accessToken */
const accessToken = req.body.accessToken ;

//***serch the use */

User.find({accessToken : accessToken},(err, existingUser) => {
  
 if(err)
 {
   res.status(401).json({"error":err});
 } 
  
  console.log("our user is" + JSON.stringify(existingUser));
  res.status(201).json(existingUser);
})

}








export default { register,login,roleAuthorization,SaveUser,getUser  };