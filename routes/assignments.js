const express = require("express");
const router = express.Router();
const dbconn = require("../lib/db");
const Assignment = require("../models/assignment");

router.get("/list/:message?", (req, res, next) => {
  const query = "SELECT * FROM assignments";
  dbconn.query(query, (err, rows) => {
    if (err) {
      res.render("assignments", {
        title: "Error - All assignments",
        desc: "Sorry no assignments were found. Please try again!",
        assignments: "",
        message: req.params.message,
      });
    } else {
      res.render("assignments", {
        title: "All assignments",
        desc: "Here you will find a list of all available assignments",
        assignments: rows,
        message: req.params.message,
      });
    }
  });
});

router.get("/add", (req, res, next) => {
  res.render("assignments_new", {
    title: "Add a new Assignment",
    desc: "",
    students: "",
    message: "",
  });
});

router.post("/add/", (req, res, next) => {
  let assignment = new Assignment(
    undefined,
    req.body.cid,
    req.body.title,
    req.body.desc,
    req.body.dueDate
  );
  console.log(assignment);
  const query =
    "INSERT INTO assignments (course_id, title, description, due_Date) VALUES (? , ?, ?, ?)";
  dbconn.execute(
    query,
    [
      assignment.course_id,
      assignment.title,
      assignment.description,
      assignment.due_date,
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.render("assignments_new", {
          title: "Add Assignment",
          desc: "",
          students: "",
          message: "Error inserting new assignment",
        });
      } else {
        res.redirect("/assignments/list/A new assignment was created!!!");
      }
    }
  );
});

module.exports = router;
