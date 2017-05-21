import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

 import bcrypt  from 'bcrypt-nodejs' ;
import APIError from '../helpers/APIError';



import Publication from './publications.model'
import Comment from './comment.model'

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
     unique : true,
  },
  email: {
    type: String,

   
  },
  gender :{
    type : String,
  },
  facebook_id :{
    type : String
  },
    resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
    first_name: {
    type: String,

   
  },
  accessToken :{
type: String,
  },
   last_name: {
    type: String,
  },
   photoUrl: {
    type: String,
  },
   publications: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }],
  },
   comments: {
    type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },

  liked: {
    type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }],
  },

   favoris: {
    type: [Object],
  },

  Followers :{
    type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  Following :{
    type :[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },


  mobileNumber: {
    type: String,
  
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});





/**
 * Statics
 */
UserSchema.statics = {




comparePassword(candidatePassword, cb) {
     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
  },


  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};







/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
