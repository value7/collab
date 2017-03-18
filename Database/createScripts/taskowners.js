const pg = require('pg');
const config = require('../../apiServer/config/constants');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:' + config.config.password + '@localhost:5432/collab';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE taskowners(id SERIAL PRIMARY KEY, userid int, taskid int, date timestamp, unique(userid, taskid))');
query.on('end', () => { client.end(); });
