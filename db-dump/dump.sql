CREATE DATABASE feed;
USE feed;
CREATE TABLE feed (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(255),
    description text,
    link varchar(255),
    pubDate varchar(255),
    thumbnail varchar(255)
);