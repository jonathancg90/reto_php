CREATE TABLE UserGroup (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40)  NOT NULL,
    PRIMARY KEY(id)
)   ENGINE=INNODB;

CREATE TABLE User (
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(40) NOT NULL,
	password VARCHAR(30) NOT NULL,
	name VARCHAR(40) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	address VARCHAR(100) NOT NULL,
	photo VARCHAR(250) NOT NULL,
	group_id int NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (group_id)
      REFERENCES UserGroup(id)
) ENGINE=INNODB;