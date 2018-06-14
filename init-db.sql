DROP DATABASE IF EXISTS corpalif;
CREATE DATABASE corpalif;
CREATE USER IF NOT EXISTS 'server'@'localhost';
GRANT ALL PRIVILEGES ON corpalif.* To 'server'@'localhost' IDENTIFIED BY 'mysql';

USE corpalif;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(250) NOT NULL,
	adress VARCHAR(256),
	postCode INT(50),
	city VARCHAR(50),
	phone INT(10),
	structure VARCHAR(250),
	service VARCHAR(250),
	fonction VARCHAR(250),
	isAdmin TINYINT DEFAULT 0,
	isDoc TINYINT DEFAULT 0,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL,
	PRIMARY KEY (id),
	UNIQUE KEY (email)
) ENGINE=INNODB;

CREATE TABLE categories (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(250) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY (title)
) ENGINE=INNODB;

CREATE TABLE posts (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(250),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL,
	description TEXT,
	imageURL VARCHAR(2083),
	source TEXT,
	categories INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (categories) REFERENCES categories(id)
) ENGINE=INNODB;

-- INSERT INTO users (firstName, lastName, email, password)
-- 	VALUES("ok", "ok", "ok", "ok");