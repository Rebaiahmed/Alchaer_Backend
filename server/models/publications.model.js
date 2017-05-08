import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';


import Comment from './comment.model'
import User from './user.model'

/**
 * User Schema
 */
const PublicationSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
    Content: {
    type: String,
    required: true
  },
    Country: {
    type: String,
   
  },
    ImageUrl: {
    type: String,
   
  },
    User: {
    type:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
  },
    nb_likes: {
    type: Number,
    default:0
  },
    nb_comments: {
    type: Number,
    default:0
    
  },

   likedBy: {
    type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  },

   commentedBy: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  },

   comments: {
    type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

  },

    tags: {
    type: [{}]

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
PublicationSchema.method({
});

/**
 * Statics
 */
PublicationSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((pub) => {
        if (pub) {
          return pub;
        }
        const err = new APIError('No such publication exists!', httpStatus.NOT_FOUND);
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
  },

/**
 * 
 * @param {*} name 
 */

 search(name) {
    return this.where('name', new RegExp(name, 'i'))
      .exec()
      .then((data) => {
        if (data) {
          return data;
        }
        const err = new APIError('No such publications exist !', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * 
   * 
   */

  getAll() {
    return this.find()
      .exec()
      .then((publications) => {
        if (publications) {
          return publications;
        }
        const err = new APIError('No such publication exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

/**
 * 
 * 
 */

  getAllByComments() {
    return this.find()
       .sort({ "nb_comments": 1})
      .exec()
      .then((publications) => {
        if (publications) {
          return publications;
        }
        const err = new APIError('No such publication exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
/**
 * 
 * 
 * 
 */

  getAllBylikes() {
    return this.find()
       .sort( {"nb_likes":1})
      .exec()
      .then((publications) => {
        if (publications) {
          return publications;
        }
        const err = new APIError('No such publication exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

/**
 * 
 * 
 */

  AddLike(data) {
  //******initialize conditions of document to be updated */
var conditions = { _id: data.id }
  , update = ({ $inc: { nb_likes: 1 },},{'$set':  {'likedBy.$' : data.user}})
 this.update(conditions,update,function(error, results){

   if(results){
     return results
   }
const err = new APIError('update publication like failed', httpStatus.NOT_FOUND);
        return Promise.reject(err);

 })
  },

/**
 * 
 */

  AddComment(data) {
  
//******initialize conditions of document to be updated */
var conditions = { _id: data.id }
  , update = ({ $inc: { nb_comments: 1 },},{'$set':  {'comments.$.body': data.comment.body , 'comments.$.commentedBy': data.comment.user}})
 this.update(conditions,update,function(error, results){

   if(results){
     return results
   }
const err = new APIError('update publication comment failed', httpStatus.NOT_FOUND);
        return Promise.reject(err);

 })



  },

/**
 * 
 */

 AddPost(data) {

//*****initialize our data */


//****check about ImageUrl */
if( !data.ImageUrl)
{
  data.ImageUrl =''
}


var pub = new Publication({Title :data.Title,Content :data.Content
, nb_comments:0,nb_likes:0,Country:data.Country,ImageUrl:data.ImageUrl,
commentedBy :[],likedBy:[],User:data.User,tags :data.tags})


    return pub.save( function(error, data){
    if(error){
        res.json(error);
    }
    else{
        res.json(data);
    }
});
  },




};

















/**
 * @typedef Publication
 */
export default mongoose.model('Publication', PublicationSchema);
