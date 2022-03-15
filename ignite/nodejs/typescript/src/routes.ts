import { Request, Response } from "express";
import CourseService from "./course-service";

export function getCourses(_: Request, res: Response) {
  res.status(200).json(CourseService.getAll());
}

export function createCourse(_: Request, res: Response) {
  CourseService.create({
    name: "NodeJs Advanced",
    duration: 14,
    educator: "Leandro Dias",
  });

  CourseService.create({
    name: "ReactJs Advanced",
    educator: "Leandro Dias",
  });

  CourseService.create({
    name: "React Native Advanced",
  });

  res.status(200).json({ message: "Course created with success!" });
}
