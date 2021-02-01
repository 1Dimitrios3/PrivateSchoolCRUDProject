-- CREATE DATABASE IF NOT EXISTS pvdb;

-- USE pvdb;

-- DROP TABLE IF EXISTS courses;

-- CREATE TABLE courses 
-- (
-- 	   course_id SMALLINT PRIMARY KEY AUTO_INCREMENT,
--     title VARCHAR(255) NOT NULL,
--     stream VARCHAR(35) NOT NULL,
-- 	   type VARCHAR(35) NOT NULL,
--     start_date DATE NOT NULL,
--     end_date DATE NOT NULL
-- );

-- DROP TABLE IF EXISTS trainers;

-- CREATE TABLE trainers 
-- (
-- 	   trainer_id SMALLINT PRIMARY KEY AUTO_INCREMENT,
-- 	   first_name VARCHAR(35) NOT NULL,
--     last_name  VARCHAR(45) NOT NULL,
--     subject    VARCHAR(85) NOT NULL
-- ); 

-- DROP TABLE IF EXISTS stud_assignment;
-- DROP TABLE IF EXISTS students;

-- CREATE TABLE students 
-- (
-- 	   student_id INT PRIMARY KEY AUTO_INCREMENT,
--     course_id  SMALLINT,
--     first_name VARCHAR(35) NOT NULL,
--     last_name  VARCHAR(35) NOT NULL,
--     birth_date DATE NOT NULL,
--     tuition    MEDIUMINT,
--     FOREIGN KEY fk_students_courses (course_id)
--     REFERENCES  courses (course_id)
--     ON UPDATE CASCADE
--     ON DELETE NO ACTION
-- );

-- DROP TABLE IF EXISTS assignments;

-- CREATE TABLE assignments 
-- (
-- 	   assignment_id INT PRIMARY KEY AUTO_INCREMENT,
--     course_id     SMALLINT NOT NULL,
--     title 		  VARCHAR(255) NOT NULL,
--     description   TEXT,
--     due_date       DATETIME,
--     FOREIGN KEY fk_assignments_courses (course_id)
--     REFERENCES  courses (course_id)
--     ON UPDATE CASCADE
--     ON DELETE NO ACTION
-- );

-- DROP TABLE IF EXISTS course_trainer;

-- CREATE TABLE course_trainer 
-- (
-- 	course_id  SMALLINT NOT NULL,
--     trainer_id SMALLINT NOT NULL,
--  FOREIGN KEY fk_course_trainer_courses (course_id)
-- 		REFERENCES courses (course_id)
--         ON UPDATE NO ACTION
--         ON DELETE NO ACTION,
-- 	FOREIGN KEY fk_course_trainer_trainers (trainer_id)
-- 		REFERENCES trainers (trainer_id)
--         ON UPDATE NO ACTION
--         ON DELETE NO ACTION,
-- 	PRIMARY KEY (course_id, trainer_id)
-- );


-- CREATE TABLE stud_assignment 
-- (
-- 	student_id INT NOT NULL,
--     assignment_id INT NOT NULL,
--     oral_mark INT NOT NULL,
--     total_mark INT NOT NULL,
-- FOREIGN KEY fk_stud_assignment_students (student_id)
-- 		REFERENCES students (student_id)
--         ON UPDATE NO ACTION
--         ON DELETE NO ACTION,
-- FOREIGN KEY fk_stud_assignment_assignments (assignment_id)
-- 		REFERENCES assignments (assignment_id)
--         ON UPDATE NO ACTION
--         ON DELETE NO ACTION,
-- 	PRIMARY KEY (student_id, assignment_id)
-- );

-- INSERT INTO courses 
-- ( title, stream, type, start_date, end_date)
-- VALUES 
-- ('CB8FT C#', 'C#, ASP.NET', 'Full Time', '2019-01-01', '2019-03-31');

-- INSERT INTO students 
-- (student_id, course_id, first_name, last_name, birth_date, tuition)
-- VALUES 
-- ('1','1', 'Leonidas', 'Papadopoulos', '1977-06-12', '2500');

-- INSERT INTO trainers 
-- ( first_name, last_name, subject)
-- VALUES 
-- ( 'Nikita', 'Popova', 'Html/Css');

-- INSERT INTO assignments 
-- (assignment_id, course_id, title, description, due_date)
-- VALUES 
-- ('1','1', 'Understanding the fundamentals', 'A short overview of the basic principles of programming. From the very beginnings to the current state of affairs.', '2019-02-03');

-- INSERT INTO course_trainer
-- (course_id, trainer_id)
-- VALUES
-- ('5', '4');

-- INSERT INTO stud_assignment 
-- (student_id, assignment_id, oral_mark, total_mark)
-- VALUES
-- ('3', '1', '10', '65');


-- START TRANSACTION;
--    INSERT INTO students 
--  ( course_id, first_name, last_name, birth_date, tuition)
-- 	VALUES 
--  ('4', 'Panos', 'Pavlou', '1983-08-02', '2500');
--    INSERT INTO stud_assignment 
--    (student_id, assignment_id, oral_mark, total_mark)
--    VALUES
--    (last_insert_id() , '2', '12', '78');
-- COMMIT;




