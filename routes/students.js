const express = require("express");
const router = express.Router();
const dbconn = require("../lib/db");
const Student = require("../models/student");

// GET

router.get("/list/:message?", (req, res, next) => {
  const fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  const query = "SELECT * FROM students";
  dbconn.query(query, (err, rows) => {
    if (err) {
      res.render("students", {
        title: "Error - All students",
        desc: "Sorry no students were found. Please try again!",
        students: "",
        message: req.params.message,
      });
    } else {
      res.render("students", {
        title: "All students",
        desc: "Here you will find a list of all students",
        students: rows,
        message: req.params.message,
        url: fullUrl,
      });
    }
  });
});

// POST

router.get("/add", (req, res, next) => {
  res.render("students_new", {
    title: "Add a new Student",
    desc: "",
    students: "",
    message: "",
  });
});

router.post("/add/", (req, res, next) => {
  let student = new Student(
    undefined,
    req.body.fname,
    req.body.lname,
    req.body.date,
    req.body.tuition,
    req.body.courseid
  );
  console.log(student);
  const query =
    "INSERT INTO students (first_name, last_name, birth_date, tuition, course_id) VALUES (? , ?, ?, ?, ?)";
  dbconn.execute(
    query,
    [
      student.first_name,
      student.last_name,
      student.birth_date,
      student.tuition,
      student.course_id,
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.render("students_new", {
          title: "Add Student",
          desc: "",
          students: "",
          message: "Error inserting new student",
        });
      } else {
        res.redirect("/students/list/A new student was created!!!");
      }
    }
  );
});

// PUT

router.get("/edit/:id", (req, res, next) => {
  const studentId = req.params.id;
  const query = "SELECT * FROM `students` WHERE `student_id` = ?";
  dbconn.execute(query, [studentId], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.render("student_edit", {
        title: "Students - Edit",
        message: "There was an error editing this student!",
        students: "",
      });
    } else {
      console.log(result[0]);
      let student = new Student(
        result[0].student_id,
        result[0].first_name,
        result[0].last_name,
        result[0].birth_date,
        result[0].tuition,
        result[0].course_id
      );
      console.log(student);
      res.render("student_edit", {
        title: "Students - Edit",
        message: "",
        student: student,
      });
    }
  });
});

router.post("/update", (req, res, next) => {
  let student = new Student(
    req.body.student_id,
    req.body.first_name,
    req.body.last_name,
    req.body.birth_date,
    req.body.tuition,
    req.body.cid
  );
  const query =
    "UPDATE `students` SET first_name = ?, last_name = ?, birth_date = ?, tuition = ?, course_id = ? WHERE student_id = ?";

  dbconn.execute(
    query,
    [
      student.first_name,
      student.last_name,
      student.birth_date,
      student.tuition,
      student.course_id,
      student.student_id,
    ],
    (err, result, fields) => {
      if (err) {
        res.render("student_edit", {
          title: "Student - Edit",
          message: "Update failed! Check the values again!",
          student: student,
        });
      } else {
        res.redirect(
          "/students/list/Student with id " +
            req.body.student_id +
            " is updated!"
        );
      }
    }
  );
});

// DELETE

router.get("/delete/:id", (req, res, next) => {
  const query = "DELETE FROM `students` WHERE `student_id` = ?";
  const studentId = req.params.id;
  console.log(studentId);
  const fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  dbconn.execute(query, [studentId], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.render("student_error", {
        title: "error_page",
        message: "Could not delete this student!",
        url: fullUrl,
      });
    } else {
      res.redirect(
        "/students/list/Student with id " + studentId + " is deleted!"
      );
    }
  });
});

module.exports = router;
