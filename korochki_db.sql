CREATE DATABASE korochki;
DROP DATABASE korochki;

	CREATE TABLE statuses (
	id_status INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL
	);

	CREATE TABLE users (
	id_user INT PRIMARY KEY AUTO_INCREMENT,
	login VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	full_name VARCHAR(100) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	email VARCHAR(100) NOT NULL,
	role ENUM('user', 'admin') DEFAULT 'user'
	);

	CREATE TABLE courses (
	id_course INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL
	);

	CREATE TABLE requests(
	id_request INT PRIMARY KEY AUTO_INCREMENT,
	id_user INT NOT NULL,
	id_course INT NOT NULL,
	start_date DATE NOT NULL,
	id_status INT DEFAULT 1,
	review TEXT,
    payment ENUM('cash', 'transfer') NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_user) REFERENCES users(id_user),
	FOREIGN KEY (id_course) REFERENCES courses(id_course),
	FOREIGN KEY (id_status) REFERENCES statuses(id_status)
	);

SELECT requests.*, users.full_name, courses.name, statuses.name FROM requests
JOIN id_user ON requests.id_user = users.id_user
JOIN id_course ON requests.id_course = courses.id_course
JOIN id_status ON statuses.id_status = statuses.id_status;

	INSERT INTO statuses(name) VALUES
	('Новое'), ('Идёт обучение'), ('Обучение завершено');

	INSERT INTO courses(name) VALUES 
	('Основы алгоритмизации и программирования'), ('Основы веб-дизайна'), ('Основы проектирования баз данных');

	INSERT INTO users(login, password, full_name, phone, email, role) VALUES 
	('Admin', 'KorokNET', 'Администратор', '8(000)000-00-00', 'admin@gmail.com', 'admin');