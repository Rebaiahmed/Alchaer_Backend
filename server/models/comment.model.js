import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';






import User from './user.model'
/**
 * Comment Schema
 */
const CommentSchema = new mongoose.Schema({
  title     : String
  , body      : String
  , date      : Date,
  commentedBy : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Comment', CommentSchema);
