const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const db = require("./dbConnection");
const { query } = require("express");

// app.get("/", (req, res) => {
//   res.send("Hello World!!!");
// });

// app.get("/mainpage", (req, res) => {
//   //   res.send("About!!!");
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.get("/fetch", (req, res) => {
  db.query(`select * from code_view`, (err, resp) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: { status: "success", resp } });
    }
  });
});

app.post("/insert", (req, res) => {
  const id = 0;
  const code_title = req.body.code_title;
  const code_description = req.body.code_description;
  const code_body = req.body.code_body;
  const code_author = req.body.code_author;
  const code_date = req.body.code_date;
  const code_language = req.body.code_language;
  const code_difficulity = req.body.code_difficulity;
  const author_email = req.body.author_email;
  const query = `INSERT INTO code_view
  VALUES (${id},'${code_description}','${code_title}','${JSON.stringify(
    code_body
  )}','${code_author}','${code_date}','${code_language}',
  '${code_difficulity}','${author_email}')`;
  db.query(query, (err, resp) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(resp);
    }
  });
});

app.all("/", (req, res) => {
  console.log("Welcome to codeBase API");
});

app.listen(process.env.APP_PORT, () => {
  console.log("app is listening on port " + process.env.APP_PORT);
});
