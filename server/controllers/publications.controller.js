

import Publication from '../models/publications.model';
import User from '../models/user.model';

//**************import the twitter api module */
import  Twit  from 'twit' ;

var T = new Twit({
  consumer_key:         'iL7cwF2NOCRtDmn7SsUdv1DL8',
  consumer_secret:      '7zYSGlNGvwjhAyJGuIP7NAzMUKAbMFxBX1ORcEbszndQ73EPty',
  access_token:         '2787208365-0Vp6om1AVeCY8CTE7MA9uPrBXKEjP9UHl5LBxd8',
  access_token_secret:  'Q65p37EBQp3oIVvUNl7yOpZuvGzBhJzy62jp4FkwhH90f',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})






/*
function to get data from tiwtter and save it to databse***************
*/





function addData()
{
var pub = new Publication({Title :'#أحمد_شوقي',Content :'الصوم حِرمان مشْروع، وتأديب بالجُوع، وخُشوعٌ لله وخُضُوع.'
, nb_comments:0,nb_likes:0,Country:'',ImageUrl:'',
commentedBy :[],likedBy:[],User:{_id:'592814923240d64120775b73'},tags :[]})


  pub.save()
    .then(savedPub => console.log("publication saved"+ JSON.stringify(savedPub)))
    .catch(e => console.log("e"+ e));

}

//addData();




/**
 * Load publication and append to req.
 */
function load(req, res, next, id) {
  Publication.get(id)
  
    .then((pub) => {
      console.log("pub"+ JSON.stringify(pub));
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
  return res.json(req.pub);
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
  console.log("hi")
  const title = req.body.title ;
  const userId = req.body.userId ;
  const content = req.body.content ;

  res.json("ok");

/*console.log("body"+ JSON.stringify(req.body))

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

 const userId = '592814923240d64120775b73' ;


User.findById(userId).then(user=>{


data.id = '' ;
data.user = user.username ;

Publication.AddLike(data)
  .then(savedPub => res.json(savedPub))
    .catch(e => next(e));



}).catch(e=>{
  console.log("err fetching user data");
})

}



/**
 * 
 * Add Comment to one publication**********
 * @returns {Publication}
 */
function AddComment(req,re,next)
{


 const userId = '592814923240d64120775b73' ;


User.findById(userId).then(user=>{


data.id = '' ;
data.user = user.username ;
Publication.AddComment(data)




  .then(savedPub => res.json(savedPub))
    .catch(e => next(e));


    }).catch(e=>{
  console.log("err fetching user data");
})
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
