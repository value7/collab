var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//postgres and authentication stuff
const jwt = require('jsonwebtoken');
const config = require('./config/constants').config;
const Pool = require('pg').Pool;

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

app.listen(3001, function() {
  console.log("Listening on Port 3001");
});
