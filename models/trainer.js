class Trainer {
  constructor(trainer_id, first_name, last_name, subject) {
    this.trainer_id = trainer_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.subject = subject;
  }
  add() {
    return this.first_name + this.last_name;
  }
}

module.exports = Trainer;
