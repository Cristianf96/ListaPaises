const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { Pool } = require('pg');

app.use(cors());
app.use(express.json());

const dbp = new Pool({
  host: 'ec2-54-226-56-198.compute-1.amazonaws.com',
  user: 'stqunbchilrjmc',
  password: 'a84697335b8cbc6024399d487670389efc3d35362235c7833a5379b57c167807',
  database: 'dcd4tij3jkbgfs',
  port: '5432',
  ssl: {
    rejectUnauthorized: false
  },
});

app.post('/create', async(req, res) => {
  const name = req.body.name;
  const country = req.body.country;

  const response = await dbp.query('INSERT INTO country (name, country) VALUES ($1, $2)', [name, country]);
  res.send("Values Inserted");

  // db.query("INSERT INTO country (name, country) VALUES (?,?)", [name, country], (err, result) => {
  //   if (err){
  //     console.log(err);
  //   }else{
  //     res.send("Values Inserted");
  //   }
  // });
});

app.get("/list", async(req, res) => {
  const list = await dbp.query('SELECT * FROM country');
  res.send(list.rows);
  // db.query("SELECT * FROM country", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(result);
  //   }
  // });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });