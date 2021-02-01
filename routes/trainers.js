const express = require("express");
const router = express.Router();
const dbconn = require("../lib/db");
const Trainer = require("../models/trainer");

// GET

router.get("/list/:message?", (req, res, next) => {
  const fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  const query = "SELECT * FROM trainers";
  dbconn.query(query, (err, rows) => {
    if (err) {
      res.render("trainers", {
        title: "Error - All trainers",
        desc: "Sorry no trainers were found. Please try again!",
        trainers: "",
        message: req.params.message,
      });
    } else {
      res.render("trainers", {
        title: "All trainers",
        desc: "Here you will find a list of all available trainers",
        trainers: rows,
        message: req.params.message,
        url: fullUrl,
      });
    }
  });
});

// POST

router.get("/add", (req, res, next) => {
  res.render("trainers_new", {
    title: "Add a new Trainer",
    desc: "",
    trainers: "",
    message: "",
  });
});

router.post("/add/", (req, res, next) => {
  let trainer = new Trainer(
    undefined,
    req.body.fname,
    req.body.lname,
    req.body.subject
  );
  console.log(trainer);
  const query =
    "INSERT INTO trainers (first_name, last_name, subject) VALUES (? , ?, ?)";
  dbconn.execute(
    query,
    [trainer.first_name, trainer.last_name, trainer.subject],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.render("trainers_new", {
          title: "Add a new Trainer",

          trainers: "",
          message: "Error inserting new trainer",
        });
      } else {
        res.redirect("/trainers/list/A new trainer was created!!!");
      }
    }
  );
});

// PUT

router.get("/edit/:id", (req, res, next) => {
  const trainerId = req.params.id;
  const query = "SELECT * FROM `trainers` WHERE `trainer_id` = ?";
  dbconn.execute(query, [trainerId], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.render("trainer_edit", {
        title: "Trainers - Edit",
        message: "There was an error editing this trainer!",
        trainer: "",
      });
    } else {
      console.log(result[0]);
      let trainer = new Trainer(
        result[0].trainer_id,
        result[0].first_name,
        result[0].last_name,
        result[0].subject
      );
      console.log(trainer);
      res.render("trainer_edit", {
        title: "Trainers - Edit",
        message: "",
        trainer: trainer,
      });
    }
  });
});

router.post("/update", (req, res, next) => {
  let trainer = new Trainer(
    req.body.id,
    req.body.first_name,
    req.body.last_name,
    req.body.subject
  );
  const query =
    "UPDATE `trainers` SET first_name = ?, last_name = ?, subject = ? WHERE trainer_id = ?";

  dbconn.execute(
    query,
    [
      trainer.first_name,
      trainer.last_name,
      trainer.subject,
      trainer.trainer_id,
    ],
    (err, result, fields) => {
      if (err) {
        res.render("trainer_edit", {
          title: "Trainer - Edit",
          message: "Update failed! Check the values again!",
          trainer: trainer,
        });
      } else {
        res.redirect(
          "/trainers/list/Trainer with id " + req.body.id + " is updated!"
        );
      }
    }
  );
});

// DELETE

router.get("/delete/:id", (req, res, next) => {
  const query = "DELETE FROM `trainers` WHERE `trainer_id` = ?";
  const trainerId = req.params.id;
  console.log(trainerId);
  const fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  dbconn.execute(query, [trainerId], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.render("trainers_error", {
        title: "error_page",
        message: "Could not delete this trainer!",
        url: fullUrl,
      });
    } else {
      res.redirect(
        "/trainers/list/Trainer with id " + trainerId + " is deleted!"
      );
    }
  });
});

module.exports = router;
