import Publication from '../models/publications.model';

/**
 * Load publication and append to req.
 */
function load(req, res, next, id) {
  Publication.get(id)
    .then((pub) => {
      req.pub = pub; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Publication
 * @returns {Publication}
 */
function getPublication(req, res) {
  return res.json(req.user);
}

/**
 * Create new Publication

 * @returns {Publication}
 */
function create(req, res, next) {
  /*const pub = new Publication({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber
  });*/

console.log("body"+ JSON.stringify(req.body))

var pub = new Publication({Title :req.body.Title,Content :req.body.Content
, nb_comments:0,nb_likes:0,Country:req.body.Country,ImageUrl:req.body.ImageUrl,
commentedBy :[],likedBy:[],User:req.body.User,tags :req.body.tags})


  pub.save()
    .then(savedPub => res.json(savedPub))
    .catch(e => next(e));

  /*user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));*/
}




/**
 * 
 * Add likes to one publication**********
 * @returns {User}
 */
function AddLike(req,re,next)
{
Publication.AddLike(req.body)
  .then(savedPub => res.json(savedPub))
    .catch(e => next(e));
}



/**
 * 
 * Add Comment to one publication**********
 * @returns {User}
 */
function AddComment(req,re,next)
{
Publication.AddComment(req.body)
  .then(savedPub => res.json(savedPub))
    .catch(e => next(e));
}






/**
 * Get user list.

 * @returns {Publication[]}
 */
function getAll(req, res, next) {
  //const { limit = 50, skip = 0 } = req.query;

 
  Publication.getAll()
    .then(pubs => res.json(pubs))
    .catch(e => next(e));
}





/**
 * get List sorting by comments
 *  * @returns {Publication[]}
 */
function getByComment(req,res,next)
{
 Publication.getAllByComments()
        .then(pubs => res.json(pubs))
    .catch(e => next(e));

}




/**
 * get List sorting by likes
 *  * @returns {Publication[]}
 */
function getByLikes(req,res,next)
{
Publication.getAllBylikes()
        .then(pubs => res.json(pubs))
    .catch(e => next(e));

}






/**
 * Delete Publication.
 * @returns {Publication}
 */
function removePublication(req, res, next) {
  const pub = req.pub;
  pub.remove()
    .then(deletedPub => res.json(deletedPub))
    .catch(e => next(e));
}

export default { load, getPublication,create,AddLike,AddComment,getAll,getByComment,getByLikes, removePublication };
