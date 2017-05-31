import User from '../models/user.model';
import Publication from '../models/publications.model';






import  Twit  from 'twit' ;

var T = new Twit({
  consumer_key:         'iL7cwF2NOCRtDmn7SsUdv1DL8',
  consumer_secret:      '7zYSGlNGvwjhAyJGuIP7NAzMUKAbMFxBX1ORcEbszndQ73EPty',
  access_token:         '2787208365-0Vp6om1AVeCY8CTE7MA9uPrBXKEjP9UHl5LBxd8',
  access_token_secret:  'Q65p37EBQp3oIVvUNl7yOpZuvGzBhJzy62jp4FkwhH90f',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


//**************prepare les publications */

/*T.get('search/tweets', { q: 'أمير ألشعراء' ,count :1}, function(err, data, response) {
  console.log(JSON.stringify(data));



})*/


/*User.find({'username' : 'أحمد شوقي'}).then(function(result,err){

  console.log("user is" + JSON.strinigfy(user));
}).catch(function(err){
  console.log("err",err);
})*/


/*let pub = new Publication({
    Title :'',
         Content :'لا تُخبرينيِ بإنكَكِ تُحبيننيّ أفعَلِ مّ يجٌعلنيْ اعرڤ هَذا جيَدآ ،،،',
         ImageUrl :'',
         Country :'',
          tags :[],
           comments :[],
           likedBy :[],
           commentedBy :[],
           nb_comments :0,
            nb_likes :0,
            User : user

})*/

      




function addUser()
{
 let photoUrl =  'https://pbs.twimg.com/profile_images/789248876859580416/asG3QKdS_400x400.jpg';
       let  publications =[];
        let  comments =[] ;
         let  liked =[];
         let  favoris =[];
         let  Followers =[];
         let  Following =[];
         let first_name ='فاروق جويدة';
         let last_name = 'فاروق جويدة';
        let  username = 'فاروق جويدة';
        let gender = 'male' ;
          let facebook_id = '' ;
        let accessToken = '';
        let email  = '';
        let description = '';
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


   //**********************//    
    user.save((error, user) => {
        console.log("user after saving it " + user);
        if (error) { 
          console.log("err" + error);
          const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
                       return next(err);}

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created
           
       

    })

}


//addUser();


/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}





/**
 * function to get list of All users
 */

function getAll(req,res,next)
{

  User.find()
   .then(data =>res.json(data))
   .catch(e=>next(e));
}



/**
 * add Follow
 */

function Follow(req,res,next)
{

const idUser='592814923240d64120775b73' ;
const idFollower='592aca545c3be72741d57e01' ;

//find the person to add
User.findById(idFollower).then(data=>{

//console.log("follower founed"+ JSON.stringify(data));
let newuser ={ username : data.username, _id : data._id};

//console.log("newUser" + JSON.stringify(newuser));

//********************************** */
User.findByIdAndUpdate(idUser,{
  $push: { Followers: newuser }}).then(function(data){

console.log("data"+ JSON.stringify(data));


//*******Following */


    let following = { _id : idUser, username: data.username}

User.findByIdAndUpdate(idFollower,{
  $push: { Following: following }}).then(function(data2){

  }).catch(function(err){
  console.log("err"+ JSON.stringify(err));
  })
  

  

  }).catch(function(err){
     console.log("err"+ err);
  })

//*************************************//  

}).catch(e=>{
  console.log("error"+ e);
})



}




//Follow() ;







export default { load, get, create, update, list, remove,getAll };
