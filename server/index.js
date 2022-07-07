const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const experience = req.body.experience;
  const others = req.body.others;

  const sqlInsert =
    "INSERT INTO users (name, email, experience, others) VALUES (?,?,?,?);";
  db.query(sqlInsert, [name, email, experience, others], (err, result) => {
    // console.log(result);
  });
});

app.get("/users", (req, res) => {
  const sqlGet = "SELECT * FROM users;";
  db.query(sqlGet, (err, result) => {
    // console.log(result[0].experience);
    res.send(result);
  });
});

app.get("/users/:id", (req, res) => {
  const sqlGet = `SELECT * FROM users WHERE id=${req.params.id};`;
  db.query(sqlGet, (err, result) => {
    // console.log(result[0].experience);
    res.send(result);
  });
});

app.put("/users/:id", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const experience = req.body.experience;
  const others = req.body.others;

  // console.log(req.body);

  const sqlUpdate = `UPDATE users SET name = '${name}', email = '${email}', experience = '${experience}', others = '${others}' WHERE id =${id};`;
  db.query(sqlUpdate, (err, result) => {
    // console.log(err);
    res.send(result);
  });
});

app.delete("/users/:id", (req, res) => {
  const sqlDelete = `DELETE FROM users WHERE id=${req.params.id};`;
  db.query(sqlDelete, (err, result) => {
    // console.log(result);
    // console.log(err);
  });
});

app.listen(3004, () => {
  console.log("running on port 3004!");
});
