
 import passport from 'passport';    

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


 import User from '../models/user.model';

 const localOptions = { usernameField: 'email' }; 


 //************define our LocalStrategy */
 const localLogin = new LocalStrategy(localOptions, (email, password, done) => {  
  User.findOne({ email }, (err, user) => {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

      return done(null, user);
    });
  });
});



/**
 * jwt strategy
 */
const jwtOptions = {  
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: 'ahmedrebai'
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {  
  User.findById(payload._id, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


//****************initialize passport with our strategy LocalStrategy and JwtStrategy */
passport.use(jwtLogin);  
passport.use(localLogin);  



export default passport ;


