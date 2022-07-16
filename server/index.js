const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const db = mysql.createPool({
  host: "bnhiovial5cl0u3lc6zm-mysql.services.clever-cloud.com",
  user: "uzpj6ckvryhhrcwe",
  password: "0BcD3NfbXbdEo3BfHaIl",
  database: "bnhiovial5cl0u3lc6zm",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3004;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
app.get("/", (req, res) => {
  res.send("server is running");
});
app.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const experience = req.body.experience;
  const others = req.body.others;
  const academics = req.body.academics;
  const handle = req.body.handle;
  const offerInHand = req.body.offerInHand;
  const company = req.body.company;
  const profile = req.body.profile;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const age = req.body.age;
  const location = req.body.location;
  const salary = req.body.salary;

  const sqlInsert =
    "INSERT INTO users (name,email,experience,others,academics,handle,offerInHand,company,profile,startDate,endDate,age,location,salary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [
      name,
      email,
      experience,
      others,
      academics,
      handle,
      offerInHand,
      company,
      profile,
      startDate,
      endDate,
      age,
      location,
      salary,
    ],
    (err, result) => {
      res.send(result);
      console.log("yash", result);
    }
  );
});

app.get("/users", (req, res) => {
  const sqlGet = "SELECT * FROM users;";
  db.query(sqlGet, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/users/:id", (req, res) => {
  const sqlGet = `SELECT * FROM users WHERE id=${req.params.id};`;
  db.query(sqlGet, (err, result) => {
    // console.log(result[0]);
    res.send(result);
  });
});

app.put("/users/:id", (req, res) => {
  const id = req.params["id"];
  const name = req.body.name;
  const email = req.body.email;
  const experience = req.body.experience;
  const others = req.body.others;
  const academics = req.body.academics;
  const handle = req.body.handle;
  const offerInHand = req.body.offerInHand;
  const company = req.body.company;
  const profile = req.body.profile;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const age = req.body.age;
  const location = req.body.location;
  const salary = req.body.salary;

  // console.log(req.body);

  const sqlUpdate = `UPDATE users SET name = '${name}', email = '${email}', experience = '${experience}', others = '${others}',academics = '${academics}', handle = '${handle}', offerInHand= '${offerInHand}', company= '${company}', profile = '${profile}', startDate= '${startDate}',endDate= '${endDate}', age= '${age}',location= '${location}' ,salary='${salary}' WHERE id ='${id}'`;
  db.query(sqlUpdate, (err, result) => {
    // console.log(err);
    res.send(result);
  });
});

app.delete("/users/:id", (req, res) => {
  const sqlDelete = `DELETE FROM users WHERE id=${req.params.id};`;
  db.query(sqlDelete, (err, result) => {
    // console.log(result);
    res.send(result);
    // console.log(err);
  });
});

app.listen(port, () => {
  console.log("running on port 3004!");
});
