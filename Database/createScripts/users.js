const pg = require('pg');
const config = require('../../apiServer/config/constants');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:' + config.config.password + '@localhost:5432/collab';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE Users(id SERIAL PRIMARY KEY, username VARCHAR(40) not null, password VARCHAR(70) not null)');
query.on('end', () => { client.end(); });
