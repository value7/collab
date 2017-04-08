var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = require('./chat');
// chat.init(io);

// io.on('connection', function(socket) {
//   console.log('a user connected');
// });


// (function() {
//   var timeout = setInterval(function() {
//     io.send('hello world');
//     console.log('sent hello word');
//   }, 5000);
// })();

//postgres and authentication stuff
const jwt = require('jsonwebtoken');
//const config = require('./config/constants').config;
const Pool = require('pg').Pool;
var cookieParser = require('cookie-parser');
const path = require('path');
const url = require('url');

//encription
var bcrypt = require('bcryptjs');
const saltRounds = 10;

var pgUtils = require('./utils/postgres');
var helpers = require('./utils/helpers');

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const pool = new Pool(config);

function checkIfOwner(projectId, userId, callback) {
  pool.query(
    'select creator from projects where id=$1', [projectId], function(err, result) {
    if(result.rows.length === 0) {
      callback(false);
    } else {
      if(result.rows[0].creator === userId) {
        console.log('owner');
        callback(true);
      } else {
        console.log('imposter');
        callback(false);
      }
    }
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.set('superSecret', "config.secret");

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

app.get("/api/getAllProjects", function(req, res) {
  pool.query(`
    select p.id, p.title, p.imgurlink, u.username as creator, p.description, d.phasename as phase, count(v.*) as votes, array_remove(array_agg(mu.username), NULL) as members from projects as p
  	left join votes as v
  		on p.id = v.projectID
    left join dim_phases as d
      on p.phase = d.id
    join users as u
      on u.id = p.creator
    left join projectmembers as pm
      on p.id = pm.projectid
    left join users as mu
      on pm.userid = mu.id
    group by p.id, p.title, p.imgurLink, u.username, p.description, d.phasename
    order by votes desc;
  `, function(err, result) {
    console.log(result);
    //TODO check for err
    res.json(pgUtils.arrToObj(result.rows));
  })
});

app.post('/api/getTasks', function(req, res) {
  console.log('getting details from : ' + req.body.projectId);
  pool.query(`
    select t.id, t.projectid, t.title, t.description, t.imgurlink, c.username as creator, states.statename, array_remove(array_agg(member.username), NULL) as taskOwners
    from tasks as t
    join users as c
    	on c.id = t.creator
    left join taskowners as m
    	on m.taskid = t.id
    left join users as member
    	on member.id = m.userid
    left join dim_states as states
    	on states.id = t.state
    where t.projectid = $1
    group by t.id, t.projectid, t.title, t.description, t.imgurlink, c.username, states.statename
  `, [req.body.projectId], function(err, result) {
    console.log(result.rows);
    res.json({tasks : helpers.arrToObj(result.rows)});
  })
});

app.post('/api/getChat', function(req, res) {
  pool.query(`
    select c.*, u.username from chats as c
    join users as u
    		on c.userid = u.id
    where c.projectId = $1 and c.taskId = $2
    `, [req.body.projectId, req.body.taskId], function(err, result) {
      if(err) {
        console.log(err);
        return res.status(403).json({ error: true, message: 'Failed to get Chat' });
      } else {
        return res.json(result.rows);
      }
    });
});

app.post('/api/getProject', function(req, res) {
  console.log('getting project with id: ' + req.body.projectId);
  pool.query(`
    select count(v.*) as votes, p.id, p.title, p.imgurLink, p.description, d.phasename as phase, u.username as creator, array_remove(array_agg(mu.username), NULL) as members from projects as p
	left join votes as v
		on v.projectid = p.id
	join users as u
		on u.id = p.creator
	left join users as member
		on member.id = v.userid
  left join dim_phases as d
    on p.phase = d.id
       left join projectmembers as pm
      on p.id = pm.projectid
    left join users as mu
      on pm.userid = mu.id
	where p.id = $1
	group by p.id, p.title, p.imgurLink, p.description, d.phasename, u.username
  `, [req.body.projectId], function(err, result) {
    pool.query(`
      select t.id, t.projectid, t.title, t.description, t.imgurlink, c.username as creator, states.statename, array_remove(array_agg(member.username), NULL) as taskOwners
      from tasks as t
      join users as c
        on c.id = t.creator
      left join taskowners as m
        on m.taskid = t.id
      left join users as member
        on member.id = m.userid
      left join dim_states as states
        on states.id = t.state
      where t.projectid = $1
      group by t.id, t.projectid, t.title, t.description, t.imgurlink, c.username, states.statename
`, [req.body.projectId], function(err, tasks) {
      //result.rows[0].tasks = tasks.rows;
      console.log(result.rows);
      //TODO convert task array to object

      res.json({project:result.rows[0], tasks: helpers.arrToObj(tasks.rows)});
    })
  })
});

app.post('/users/signup', function(req, res) {
  //save the username and password
  //encrypt the password
  var encryptedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  console.log(encryptedPassword);
  //check if username is taken
  //database throws an error because of the username unique constraint
  pool.query(
    'insert into users (username, password) VALUES ($1, $2) returning id', [req.body.username, encryptedPassword], function(err, result) {
    console.log(err);
    console.log(result);
    if(!err && result.rowCount === 1) {
      //succesfull insert log the user in
      var jwtUser = {
        "name": req.body.username,
        "scope": "rando",
        "id": result.rows[0].id
      }
      var token = jwt.sign(jwtUser, app.get('superSecret'), {
        expiresIn: 1440 //24h
      });
      //signup so empty votes
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token,
        user: req.body.username,
        scope: "rando",
        votes: [],
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
    `
    select u.*, v.projectid from users as u
    	left join votes as v
    		on v.userid = u.id
    	where u.username = $1
    `, [req.body.username], function(err, result) {
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
            "scope": "rando",
            "id": result.rows[0].id
          }
          var token = jwt.sign(jwtUser, app.get('superSecret'), {
            expiresIn: 1440 //24h
          });


          var votes = [];
          for(var i = 0; i < result.rows.length; i++) {
            votes.push(result.rows[i].projectid)
          }

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: result.rows[0].username,
            scope: "rando",
            votes: votes,
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
  //console.log(request.cookies);
  var token = request.body.token || request.query.token || request.headers['x-access-token'];
  //console.log(token);
  if(!token && request.cookies && request.cookies.token) {
    //console.log('Getting token from cookie');
    //TODO will probably fail with a cookie without token
    token = request.cookies.token;
  }
  //console.log(token);
  //decode token
  if(token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if(err) {
        console.log('failed to authenticate token');
        return response.status(403).json({ error: true, message: 'Failed to authenticate token.' });
      } else {
        request.decoded = decoded;
        console.log(decoded);
        console.log('authenticated');
        next()
      }
    });
  } else {
    console.log('access denied');
    return response.status(403).send({
      error: true,
      message: 'No token provided'
    });
  }
});

app.post('/api/addMessage', function(req, res) {
  if (req.body.message === "") {
    return res.status(403).json({ error: true, message: 'no empty messages allowed' });
  }
  pool.query(`
    insert into chats(projectid, taskid, message, userid, date)
    values($1, $2, $3, $4, $5) returning *
    `, [req.body.projectId, req.body.taskId, req.body.message, req.decoded.id, new Date()], function(err, result) {
      if(err) {
        return res.status(403).json({ error: true, message: 'Failed to save Upvote' });
      } else {
        pool.query(`select c.*, u.username from chats as c
        join users as u
        		on c.userid = u.id
        where c.id = $1`, [result.rows[0].id], function(err, message) {
          return res.json(message.rows[0]);
        })
      }
    })
})

//upvote
app.post('/projects/upvote', function(req, res) {
  console.log(req.body);
  console.log(req.body.projectId);
  console.log(req.decoded.id);
  //TODO check if user already upvoted that project
  pool.query(
    'insert into votes(userid, projectid, date) VALUES($1, $2, $3)', [req.decoded.id, req.body.projectId, new Date()], function(err, result) {
      if(err) {
        return res.status(403).json({ error: true, message: 'Failed to save Upvote' });
      } else {
        return res.json({});
      }
    }
  )
})

app.post('/projects/downvote', function(req, res) {
  console.log(req.body);
  console.log(req.body.projectId);
  console.log(req.decoded.id);
  //TODO check if user already upvoted that project
  pool.query(
    'delete from votes where userid=$1 and projectid=$2', [req.decoded.id, req.body.projectId], function(err, result) {
      if(err) {
        return res.status(403).json({ error: true, message: 'Failed to delete Upvote' });
      } else {
        return res.json({});
      }
    }
  )
})

app.post('/projects/incrementState', function(req, res) {
  //TODO check if Project is already completed
  checkIfOwner(req.body.projectId, req.decoded.id, function(owner) {
    if(owner) {
      pool.query(
        'update projects set phase = phase + 1 where id = $1', [req.body.projectId], function(err, result) {
          if(err) {
            console.log(err);
            return res.status(403).json({ error: true, message: 'Failed to inc state' });
          } else {
            return res.json({});
          }
        }
      )
    } else {
      return res.status(403).json({ error: true, message: 'Your are not the owner of the Project' });
    }
  })
})

app.post('/projects/deleteProject', function(req, res) {
  //TODO check if Project is already completed
  console.log(req.body);
  checkIfOwner(req.body.projectId, req.decoded.id, function(owner) {
    if(owner) {
      pool.query(
        'delete from projects where id = $1 returning id', [req.body.projectId], function(err, result) {
          if(err) {
            console.log(err);
            return res.status(403).json({ error: true, message: 'Failed to delete Project' });
          } else {
            return res.json({});
          }
        }
      )
    } else {
      return res.status(403).json({ error: true, message: 'Your are not the owner of the Project' });
    }
  })
});

app.post('/projects/editProject', function(req, res) {
  //TODO check if Project is already completed
  console.log(req.body);
  checkIfOwner(req.body.projectId, req.decoded.id, function(owner) {
    if(owner) {
      pool.query(
        'UPDATE projects SET title = $1, description = $2, imgurlink = $3 WHERE id = $4 returning *', [req.body.title, req.body.description, req.body.imgurLink, req.body.projectId], function(err, result) {
          if(err) {
            console.log(err);
            return res.status(403).json({ error: true, message: 'Failed to edit Project' });
          } else {
            return res.json(result.rows[0]);
          }
        }
      )
    } else {
      return res.status(403).json({ error: true, message: 'Your are not the owner of the Project' });
    }
  })
});

app.post('/projects/addTask', function(req, res) {
  pool.query('insert into tasks(projectid, title, description, imgurlink, creator, state) values($1, $2, $3, $4, $5, 1) returning *',
    [req.body.projectId, req.body.title, req.body.description, req.body.imgurLink, req.decoded.id], function(err, result) {
      if(err) {
        console.log('err: ',err);
        return res.status(403).json({ error: true, message: 'Failed to save Task' });
      } else {
        console.log('result: ', result);
        if(result.rows.length === 0) {
          return res.status(403).json({ error: true, message: 'Failed to save Task' });
        } else {
          result.rows[0].taskowners = [];
          return res.json(result.rows[0]);
        }
      }
    })
})

app.post('/projects/takeTask', function(req, res) {
  pool.query('insert into taskowners (userid, taskid, date) values ($1, $2, $3) returning id, taskid', [req.decoded.id, req.body.taskId, new Date()], function(err, result) {
    if(err) {
      return res.status(403).json({error: true, message: 'Failed to take task'});
    } else {
      pool.query('select username from users where id = $1', [req.decoded.id], function(err, user) {
        if(err) {
          return res.status(403).json({error: true, message: 'Failed to get user'});
        } else {
          console.log({taskId: result.rows[0].taskid, user: user.rows[0].username});
          return res.json({taskId: result.rows[0].taskid, user: user.rows[0].username});
        }
      })
    }
  })
})

app.post('/projects/moveTaskState', function(req, res) {
  pool.query('update tasks set state = state + 1 where id = $1 returning id, state', [req.body.taskId], function(err, result) {
    if(err) {
      console.log(err);
      return res.status(403).json({error: true, message: 'Failed to move task state'});
    } else {
      pool.query('select statename from dim_states where id = $1', [result.rows[0].state], function(err, state) {
        if(err) {
          return res.status(403).json({error: true, message: 'Failed to get user'});
        } else {
          console.log({taskId: result.rows[0].id, statename: state.rows[0].statename});
          return res.json({taskId: result.rows[0].id, statename: state.rows[0].statename});
        }
      })
    }
  })
})

app.post('/projects/becomeMember', function(req, res) {
  pool.query('insert into projectmembers(userid, projectid, date) values ($1, $2, $3) returning id, projectid', [req.decoded.id, req.body.taskId, new Date()], function(err, result) {
    if(err) {
      return res.status(403).json({error: true, message: 'Failed to become member'});
    } else {
      pool.query('select username from users where id = $1', [req.decoded.id], function(err, user) {
        if(err) {
          return res.status(403).json({error: true, message: 'Failed to get user'});
        } else {
          console.log({projectid: result.rows[0].projectid, user: user.rows[0].username});
          return res.json({projectid: result.rows[0].projectid, user: user.rows[0].username});
        }
      })
    }
  })
})

app.post('/api/createProject', function(req, res) {
  //the decoded jwt is in req.decoded
  console.log('in post createProject');
  console.log(req.body);
  console.log(req.body.title, req.body.imgurLink, req.body.description, req.decoded.name);
  pool.query(
    'insert into projects(title, imgurLink, date, creator, description, phase) VALUES($1, $2, $3, $4, $5, 1) returning *',
    [req.body.title, req.body.imgurLink, new Date(), req.decoded.id, req.body.description], function(err, result) {
      console.log('after db call to save project');
      console.log('err: ', err);
      console.log('res: ', result);
      //TODO get username
      pool.query('select username from users where id = $1', [req.decoded.id], function(userErr, user) {
        if(err || userErr) {
          return res.status(403).json({ error: true, message: 'Failed to save Project' });
        } else {
          result.rows[0].members = [];
          result.rows[0].creator = user.rows[0].username;
          return res.json(result.rows[0]);
        }
      })
    }
  );
});

app.get('/api/getUserDetails', function(req, res) {
  pool.query(
    'select array_agg(projectid) as votes from votes where userid = $1', [req.decoded.id], function(err, result) {
      if(err) {
        return res.status(403).json({ error: true, message: 'Failed to get Projects' });
      } else {
        return res.json(result.rows[0]);
      }
    }
  )
})

app.get("/api/secured", function(req, res) {
  console.log('/api/secured');
  res.json({message: "special secret message"});
});


http.listen(3001, function() {
  console.log("Listening on Port 3001");
});
