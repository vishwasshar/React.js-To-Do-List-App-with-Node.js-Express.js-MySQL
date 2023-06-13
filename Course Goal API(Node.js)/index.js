const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const app = express();

const db = mysql2
  .createPool({
    host: "localhost",
    port: "3308",
    user: "root",
    password: "91051",
    database: "nodejs",
  })
  .promise();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.execute("SELECT * FROM task_list").then((result) => {
    const [data] = result;
    res.send({ taskList: data });
  });
});

app.use("/", (req, res, next) => {
  if (req.body.authKey === "vishwas") {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized Access" });
  }
});

app.post("/", (req, res) => {
  db.execute(`INSERT INTO task_list (Task) VALUES ('${req.body.Task}')`)
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/", (req, res) => {
  db.execute(
    `UPDATE task_list SET Task = '${req.body.updateText}' WHERE (id = '${req.body.updateID}');`
  )
    .then((result) => {
      res.send({ status: "Updated" });
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/", (req, res) => {
  db.execute(`DELETE FROM task_list WHERE id = '${req.body.deleteID}'`)
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3001);
