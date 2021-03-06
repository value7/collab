const pg = require('pg');
const config = require('../../apiServer/config/constants');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:' + config.config.password + '@localhost:5432/collab';

var rows = [{
  id: 1,
  name: 'idea'
},
{
  id: 2,
  name: 'approved'
},
{
  id: 3,
  name: 'done'
}
]

var buildStatement = function(rows) {
  var params = [];
  var chunks = [];
  for(var i = 0; i < rows.length; i++) {
    var valuesClause = [];
    var row = rows[i];
    params.push(row.id);
    valuesClause.push('$' + params.length);
    params.push(row.name);
    valuesClause.push('$' + params.length);
    chunks.push('(' + valuesClause.join(', ') + ')');
  }
  return {
    text: 'insert into dim_states values ' + chunks.join(', '),
    values: params
  }
}


const client = new pg.Client(connectionString);
client.connect();
const query = client.query(buildStatement(rows));
query.on('end', () => { client.end(); });


// insert into dim_states values (1, 'idea'), (2, 'approved'), (3, 'done');
