CREATE DATABASE studentdb;

USE studentdb;

CREATE TABLE students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(200),
    course VARCHAR(200),
    age INT
);
