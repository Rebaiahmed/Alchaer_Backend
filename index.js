import mongoose from 'mongoose';
import util from 'util';
import SocketIO from 'socket.io';
import http from 'http';
// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';
import assert  from 'assert' ;
import timeout from 'connect-timeout' ;



const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise =  global.Promise

// connect to mongo db
const mongoUri = config.mongo.host;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };  
//console.log("uri" + mongoUri);
//mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });

mongoose.connect(mongoUri, options);
var conn = mongoose.connection; 

conn.on('error', (err) => {
    console.log("err in connection"+ err);
  throw new Error(`unable to connect to database: ${mongoUri}`);
});


conn.once('open', function() {
  // Wait for the database connection to establish, then start the app. 
  console.log("we are here !");                        
});

//*******disconnect**** */
/*mongoose.connection.on('disconnected', () => {
    mongoose.connect(mongoUri);
   mongoose.connection= mongoose.connection;
});*/

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {

  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912




let server = http.Server(app);
let io = new SocketIO(server);



import  Twit  from 'twit' ;

var T = new Twit({
  consumer_key:         'iL7cwF2NOCRtDmn7SsUdv1DL8',
  consumer_secret:      '7zYSGlNGvwjhAyJGuIP7NAzMUKAbMFxBX1ORcEbszndQ73EPty',
  access_token:         '2787208365-0Vp6om1AVeCY8CTE7MA9uPrBXKEjP9UHl5LBxd8',
  access_token_secret:  'Q65p37EBQp3oIVvUNl7yOpZuvGzBhJzy62jp4FkwhH90f',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


console.log("T")

/*T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})*/

/*T.get('search/tweets', { q: 'أمير ألشعراء' ,count :1}, function(err, data, response) {
  console.log(JSON.stringify(data));
})*/



//*********test Stream */
//var stream = T.stream('statuses/filter', { track: 'أمير ألشعراء', language: 'ar' })

/*stream.on('tweet', function (tweet) {
  console.log(tweet)
})*/


/*T.get('users/suggestions/:slug', { slug: 'الشعر العربي' }, function (err, data, response) {
  if(err){
    console.log("error !"+ err);
  }
  console.log(JSON.stringify(data));
})*/


/*T.get('search/tweets', { q: 'الشعر العربي  since:2011-07-11', count: 5 }, function(err, data, response) {
  if(err)
  {
    console.log("err"+ err);
  }
  console.log(JSON.stringify(data));
})*/

/*var stream = T.stream('statuses/filter', { track: 'لشعر العربي' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})*/


if (!module.parent) {

/*******  the socket.io code */

console.log("io is" + io);

io.on('connection', (socket) => {



  console.log("socket run here !")
    let nick = socket.handshake.query.nick;
    let currentUser = {
        id: socket.id,
        nick: nick
    };

    if (findIndex(users, currentUser.id) > -1) {
        console.log('[INFO] User ID is already connected, kicking.');
        socket.disconnect();
    } else if (!validNick(currentUser.nick)) {
        socket.disconnect();
    } else {
        console.log('[INFO] User ' + currentUser.nick + ' connected!');
        sockets[currentUser.id] = socket;
        users.push(currentUser);
        io.emit('userJoin', {nick: currentUser.nick});
        console.log('[INFO] Total users: ' + users.length);
    }

    socket.on('ding', () => {
        socket.emit('dong');
    });

    socket.on('disconnect', () => {
        if (findIndex(users, currentUser.id) > -1) users.splice(findIndex(users, currentUser.id), 1);
        console.log('[INFO] User ' + currentUser.nick + ' disconnected!');
        socket.broadcast.emit('userDisconnect', {nick: currentUser.nick});
    });

    socket.on('userChat', (data) => {
        let _nick = sanitizeString(data.nick);
        let _message = sanitizeString(data.message);
        let date = new Date();
        let time = ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2);

        console.log('[CHAT] [' + time + '] ' + _nick + ': ' + _message);
        socket.broadcast.emit('serverSendUserChat', {nick: _nick, message: _message});
    });
});

app.use(timeout('5s'));


  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

export default app;
