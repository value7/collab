const password = require('../config/constants').constants.password;
const pg = require('pg');
const connectionString = 'postgres://postgres:' + password + '@localhost:5432/collab';

const client = new pg.Client(connectionString);
client.connect();
client.query(
  'select * from users where username=$1', ['testuser'], function(err, res) {
    if (err) throw err;
    console.log(res.rows[0]);

    client.end(function(err) {
      if(err) throw err;
    })
  }
)
