import express from "express";
import { createCourse, getCourses } from "./routes";

const app = express();

app.get("/get-courses", getCourses);
app.get("/create-course", createCourse);

app.listen(4000, () => {
  console.log("Server is running 🚀...");
});
