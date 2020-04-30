const { Client } = require('pg');
const express = require('express');

const app = express();
const port = 3000;

const client = new Client({
  connectionString: 'postgres://aunyheipusmsan:9991e0c9017992e076140123aa1c9eb306be4505e3e4c051109be62c4227a85e@ec2-3-234-109-123.compute-1.amazonaws.com:5432/d7t6af5r5aip0g',
  ssl: true
});

client.connect();

tableCreation = 'create table study_groups (course varchar (50), assignment varchar (50), location varchar (50))';
addRow = "insert into study_groups (course, assignment, location) values ('calc', 'a1', 'mc')";
get_all_query = 'select * from study_groups';

function get_table() {
  client.query(get_all_query, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log('first log', JSON.stringify(row));
      return JSON.stringify(row)
    }
  });
}

function query( sql, args ) {
  return new Promise( ( resolve, reject ) => {

    client.query(get_all_query, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log('first log', JSON.stringify(row));
        resolve( JSON.stringify(row))
      }
    });

  });
}

function hi() {
	return '123'
}

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/get_table', (req, res) => res.send(get_table() ));
app.get('/query', (req, res) => query().then(val => res.send(val) ));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
