const pg = require('pg');
const config = require('../../apiServer/config/constants');
console.log(config);
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:' + config.config.password + '@localhost:5432/collab';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE dim_phases(id SERIAL PRIMARY KEY, phasename varchar(10))');
query.on('end', () => { client.end(); });


var insert = `
insert into dim_phases values(1, 'Draft');
insert into dim_phases values(2, 'Planning');
insert into dim_phases values(3, 'Exection');
insert into dim_phases values(4, 'Completed');
`;
