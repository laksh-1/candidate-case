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
  let idOfCurrentInsert;
  const formFields = req.body.formFields;
  const name = req.body.user.name;
  const email = req.body.user.email;
  const experience = req.body.user.experience;
  const others = req.body.user.others;
  const academics = req.body.user.academics;
  const handle = req.body.user.handle;
  const offerInHand = req.body.user.offerInHand;
  const age = req.body.user.age;
  const location = req.body.user.location;
  const salary = req.body.user.salary;

  // console.log(formFields);
  const sqlInsert =
    "INSERT INTO users (name,email,experience,others,academics,handle,offerInHand,age,location,salary) VALUES (?,?,?,?,?,?,?,?,?,?);";
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
      age,
      location,
      salary,
    ],
    (err, result) => {
      console.log(result);
      idOfCurrentInsert = result.insertId;
      if (formFields.length == 1) {
        const sqlInsert =
          "INSERT INTO work (id,company1, profile1 ,startDate1, endDate1) VALUES (?,?,?,?,?);";
        db.query(
          sqlInsert,
          [
            idOfCurrentInsert,
            formFields[0].work,
            formFields[0].profile,
            formFields[0].startDate,
            formFields[0].endDate,
          ],
          (err, result) => {
            // console.log(result);
          }
        );
      } else if (formFields.length == 2) {
        const sqlInsert =
          "INSERT INTO work (id,company1, profile1 ,startDate1, endDate1,company2, profile2 ,startDate2, endDate2) VALUES (?,?,?,?,?,?,?,?,?);";
        db.query(
          sqlInsert,
          [
            idOfCurrentInsert,
            formFields[0].work,
            formFields[0].profile,
            formFields[0].startDate,
            formFields[0].endDate,
            formFields[1].work,
            formFields[1].profile,
            formFields[1].startDate,
            formFields[1].endDate,
          ],
          (err, result) => {
            // console.log(result);
          }
        );
      } else {
        const sqlInsert =
          "INSERT INTO work (id,company1, profile1 ,startDate1, endDate1,company2, profile2 ,startDate2, endDate2,company3, profile3 ,startDate3, endDate3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";
        db.query(
          sqlInsert,
          [
            idOfCurrentInsert,
            formFields[0].work,
            formFields[0].profile,
            formFields[0].startDate,
            formFields[0].endDate,
            formFields[1].work,
            formFields[1].profile,
            formFields[1].startDate,
            formFields[1].endDate,
            formFields[2].work,
            formFields[2].profile,
            formFields[2].startDate,
            formFields[2].endDate,
          ],
          (err, result) => {
            // console.log(result);
          }
        );
      }

      res.send(result);
    }
  );
});

app.get("/users", (req, res) => {
  const sqlGet = "SELECT * FROM users;";

  db.query(sqlGet, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});
app.get("/review/:id", (req, res) => {
  const sqlGet = `SELECT * FROM review where id=${req.params.id};`;
  db.query(sqlGet, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});
app.get("/users/:id", (req, res) => {
  const sqlGet = `SELECT name,email,experience,others,academics,handle,offerInHand,age,location,salary,company1,profile1,startDate1,endDate1 FROM users LEFT JOIN work ON users.id=work.id  WHERE users.id=${req.params.id};`;
  // const sqlGetExp = `SELECT * FROM work WHERE id=${req.params.id};`;
  db.query(sqlGet, (err, result) => {
    console.log("help", result);
    res.send(result);
  });
});

app.post("/review", (req, res) => {
  const content = req.body.content;
  const time = req.body.time;
  const id = req.body.id.id;
  const sqlInsert = "INSERT into review (id,post,time) VALUES (?,?,?);";
  db.query(sqlInsert, [id, content, time], (err, result) => {
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
