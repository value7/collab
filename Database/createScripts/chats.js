const pg = require('pg');
const config = require('../../apiServer/config/constants');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:' + config.config.password + '@localhost:5432/collab';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  `CREATE TABLE chats(id SERIAL PRIMARY KEY,
    projectid int not null,
    taskid int not null,
    message text,
    userid integer not null,
    date timestamp)`);
query.on('end', () => { client.end(); });
