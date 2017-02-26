var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//postgres and authentication stuff
const jwt = require('jsonwebtoken');
const config = require('./config/constants').config;
const Pool = require('pg').Pool;
var cookieParser = require('cookie-parser');

//encription
var bcrypt = require('bcryptjs');
const saltRounds = 10;

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

app.post('/users/validateFields', function(req, res) {
  pool.query(
    'select * from users where username=$1', [req.body.username], function(err, result) {
    if(result.rows.length > 0) {
      return res.status(403).json({err: "err"});
    } else {
      return res.json({});
    }
  });
});

app.post('/users/signup', function(req, res) {
  //save the username and password
  //encrypt the password
  var encryptedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  console.log(encryptedPassword);
  //check if username is taken
  //database throws an error because of the username unique constraint
  pool.query(
    'insert into users (username, password, isAdmin) VALUES ($1, $2, false)', [req.body.username, encryptedPassword], function(err, result) {
    console.log(err);
    console.log(result);
    if(!err && result.rowCount === 1) {
      //succesfull insert log the user in
      var jwtUser = {
        "name": req.body.username,
        "scope": "rando"
      }
      var token = jwt.sign(jwtUser, app.get('superSecret'), {
        expiresIn: 1440 //24h
      });
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token,
        user: req.body.username,
        scope: "rando",
        isAdmin: false
      });
    } else {
      res.status(303).send({username: 'the username is already taken'});
    }
  });
})

//authenication
app.post('/authenticate', function(req, res) {
  console.log('in authenticate api thingy');
  // console.log(req.body);
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
        res.status(303).send({username: 'User not found'});
      } else {
        console.log('user found');
        //check if password is correct
        if(!bcrypt.compareSync(req.body.password, result.rows[0].password)) {
          console.log('WRONG PASSWORD');
          //TODO send error to raise if error
          res.status(303).send({password: 'wrong password'});
        } else {
          console.log('password correct');
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
            user: result.rows[0].username,
            scope: "rando",
            isAdmin: result.rows[0].isadmin
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
        return response.status(403).json({ error: true, message: 'Failed to authenticate token.' });
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
