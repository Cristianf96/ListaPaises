const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'countrySystem'
});

app.post('/create', (req, res) => {
  const name = req.body.name;
  const country = req.body.country;

  db.query("INSERT INTO country (name, country) VALUES (?,?)", [name, country], (err, result) => {
    if (err){
      console.log(err);
    }else{
      res.send("Values Inserted");
    }
  });
});

app.get("/list", (req, res) => {
  db.query("SELECT * FROM country", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });