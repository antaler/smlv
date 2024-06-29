create database if not exists smlv;

CREATE TABLE if not exists user (
    id VARCHAR(100) NOT NULL PRIMARY KEY COMMENT 'Primary Key',
    alias VARCHAR(50) NOT NULL COMMENT 'user name',
    email VARCHAR(200) NOT NULL UNIQUE COMMENT 'user credential',
    birthDate DATE null COMMENT 'user birthday',
    gender CHAR(1) null COMMENT 'users biological gender',
    password VARCHAR(200) NOT NULL COMMENT 'user password',
    verified BOOLEAN not null DEFAULT FALSE COMMENT 'user has email verification',
    last_otp DATETIME NULL COMMENT 'last time that the user introduce otp'
) COMMENT 'user in application';

CREATE TABLE if not exists health (
    userId VARCHAR(100) not null,
    height INTEGER not null,
    weight DOUBLE not null,
    register_date DATE not null,
    PRIMARY KEY(userId, register_date),
    Foreign Key (userId) REFERENCES user(id)
) COMMENT 'users health data';