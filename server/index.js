const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { Pool } = require('pg');

app.use(cors());
app.use(express.json());

const dbp = new Pool({
  host: 'ec2-35-168-65-132.compute-1.amazonaws.com',
  user: 'eqqeoeqcuuemcg',
  password: '0e036ec428b90a879e4e516da938eb6bf07cdc63a20625f75900f8a8d26a347b',
  database: 'db00vanqn9f29p',
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

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Yey, your server is running on port 3001");
  });