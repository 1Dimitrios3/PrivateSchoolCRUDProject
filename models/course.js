class Course {
  constructor(id, title, stream, type, start_date, end_date) {
    this.id = id;
    this.title = title;
    this.stream = stream;
    this.type = type;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}

module.exports = Course;
