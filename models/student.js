class Student {
  constructor(
    student_id,
    first_name,
    last_name,
    birth_date,
    tuition,
    course_id
  ) {
    this.student_id = student_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birth_date = birth_date;
    this.tuition = tuition;
    this.course_id = course_id;
  }
}

module.exports = Student;
