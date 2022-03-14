const express = require("express");

const app = express();

app.use(express.json());

const courses = ["NodeJS", "ReactJS", "React Native"];

app.get("/courses", (req, res) => {
  console.log(req.query);
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  console.log(req.params);
  res.json(courses);
});

app.post("/courses", (req, res) => {
  console.log(req.body);
  res.json(courses);
});

app.put("/courses/:id", (req, res) => {
  res.json(courses);
});

app.patch("/courses/:id", (req, res) => {
  res.json(courses);
});

app.delete("/courses/:id", (req, res) => {
  res.json(courses);
});

app.listen(3000, () => {
  console.log("Server is running");
});
