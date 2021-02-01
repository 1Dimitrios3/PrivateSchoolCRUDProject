const express = require("express");
const router = express.Router();
const dbconn = require("../lib/db");
const Course = require("../models/course");

router.get("/list/:message?", (req, res, next) => {
  const fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  const query = "SELECT * FROM courses";
  dbconn.query(query, (err, rows) => {
    if (err) {
      res.render("courses", {
        title: "Error - All courses",
        desc: "Sorry no courses were found. Please try again!",
        courses: "",
        message: req.params.message,
      });
    } else {
      res.render("courses", {
        title: "All courses",
        desc: "Here you will find a list of all available courses",
        courses: rows,
        message: req.params.message,
        url: fullUrl,
      });
    }
  });
});

router.get("/add", (req, res, next) => {
  res.render("courses_new", {
    title: "Add a new Course",
    desc: "",
    students: "",
    message: "",
  });
});

router.post("/add/", (req, res, next) => {
  let course = new Course(
    undefined,
    req.body.title,
    req.body.stream,
    req.body.type,
    req.body.startDate,
    req.body.endDate
  );
  console.log(course);
  const query =
    "INSERT INTO courses (title, stream, type, start_date, end_date) VALUES (? , ?, ?, ?, ?)";
  dbconn.execute(
    query,
    [
      course.title,
      course.stream,
      course.type,
      course.start_date,
      course.end_date,
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.render("courses_new", {
          title: "Add Course",
          desc: "",
          students: "",
          message: "Error inserting new course",
        });
      } else {
        res.redirect("/courses/list/A new course was created!!!");
      }
    }
  );
});

module.exports = router;
