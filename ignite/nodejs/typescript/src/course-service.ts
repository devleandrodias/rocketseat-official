interface Course {
  name: string;
  educator?: string;
  duration?: number;
}

class CourseService {
  courses: Course[] = [];

  create({ educator = "Anonymous", ...course }: Course): void {
    this.courses.push({ educator, ...course });
  }

  getAll(): Course[] {
    return this.courses;
  }
}

export default new CourseService();
