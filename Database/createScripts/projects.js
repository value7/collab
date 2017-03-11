const pg = require('pg');
const config = require('../../apiServer/config/constants');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:' + config.config.password + '@localhost:5432/collab';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  `CREATE TABLE projects(id SERIAL PRIMARY KEY,
     title VARCHAR(40) not null,
     description text,
     imgurLink varchar(100),
     creator integer not null,
     date timestamp,
     phase int)`);
query.on('end', () => { client.end(); });
