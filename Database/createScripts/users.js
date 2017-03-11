const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:12109872@localhost:5432/collab';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE Users(id SERIAL PRIMARY KEY, username VARCHAR(40) not null, password VARCHAR(40) not null)');
query.on('end', () => { client.end(); });
