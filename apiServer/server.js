var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//postgres and authentication stuff
const jwt = require('jsonwebtoken');
const config = require('./config/constants').config;
const Pool = require('pg').Pool;
var cookieParser = require('cookie-parser');

const pool = new Pool({
  user: 'postgres',
  password: config.password,
  host: 'localhost',
  database: 'collab',
  max: 10,
  idleTimeoutMillis: 1000
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('superSecret', config.secret);

// app.all('*', function(req, res, next) {
//   console.log('all *');
//     setTimeout(function() {
//         next();
//     }, 3000); // 120 seconds
// });

app.get("/api/hello", function(req, res) {
  console.log('/api/hello');
  res.json({message: "hello"});
});

//authenication
app.post('/authenticate', function(req, res) {
  console.log('in authenticate api thingy');
  console.log(req.body);
  //TODO check that username and password are correctly set
  //find the user
  pool.query(
    'select * from users where username=$1', [req.body.username], function(err, result) {
      if (err) throw err;
      console.log(result);
      //check if user is found
      if(result.rowCount === 0) {
        console.log('user not found');
        //TODO send error to raise if error
        res.status(303).send({statusText: 'User not found'});
      } else {
        console.log('user found');
        //check if password is correct
        if(result.rows[0].password !== req.body.password) {
          console.log('WRONG PASSWORD');
          //TODO send error to raise if error
          res.status(303).send({statusText: 'wrong password'});
        } else {
          console.log('password correct');
          //TODO generate jwt
          var jwtUser = {
            "name": result.rows[0].username,
            "scope": "rando"
          }
          var token = jwt.sign(jwtUser, app.get('superSecret'), {
            expiresIn: 1440 //24h
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            username: result.rows[0].username,
            scope: "rando"
          });
        }
      }
    }
  )
});

//authentication middleware
//routes which are declared after this can only be accessed with a valid jwt
app.use(function(request, response, next) {
  //check header or url paramaters or post paramaters for token
  console.log('in authentication middleware');
  //console.log(request);
  // console.log(request.cookies);
  console.log(request.cookies);
  var token = request.body.token || request.query.token || request.headers['x-access-token'];
  //console.log(token);
  if(!token && request.cookies && request.cookies.token) {
    //console.log('Getting token from cookie');
    //TODO will probably fail with a cookie without token
    token = request.cookies.token;
  }
  console.log(token);
  //decode token
  if(token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if(err) {
        return response.json({ error: true, message: 'Failed to authenticate token.' });
      } else {
        request.decoded = decoded;
        console.log('authenticated');
        next()
      }
    });
  } else {
    return response.status(403).send({
      error: true,
      message: 'No token provided'
    });
  }
});

app.get("/api/secured", function(req, res) {
  console.log('/api/secured');
  res.json({message: "special secret message"});
});

app.listen(3001, function() {
  console.log("Listening on Port 3001");
});
