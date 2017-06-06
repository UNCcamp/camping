### Preliminary Schema 

CREATE DATABASE BootCamping_db;
USE BootCamping_db;

CREATE TABLE Profiles
    (
        profile_id INT NOT NULL AUTO_INCREMENT,
        user_name VARCHAR (155) NOT NULL,
        email_name VARCHAR (100) NOT NULL,
        image_URL VARCHAR (300),
        interest_one VARCHAR(50) NOT NULL,
        interest_two VARCHAR(50),
        interest_three VARCHAR(50),
        interest_four VARCHAR(50),
        PRIMARY KEY (profile_id)
    );
    
CREATE TABLE Activity
    (
        activity_id INT NOT NULL AUTO_INCREMENT,
        activity_name VARCHAR (50) NOT NULL,
        activity_type VARCHAR (20),
        PRIMARY KEY (activity_id)
        );

 CREATE TABLE Inventory
    (
        inventory_id INT NOT NULL AUTO_INCREMENT,
        item_name VARCHAR (50) NOT NULL,
		item_description VARCHAR (255) NOT NULL,
		activity_id activity_id INT,
		PRIMARY KEY (inventory_id),
		FOREIGN KEY (profile_id) REFERENCES PROFILES(profile_id)
        );

CREATE TABLE Location
    (
        location_id INT NOT NULL AUTO_INCREMENT,
        location_name VARCHAR (50) NOT NULL,
		location_description VARCHAR (255) NOT NULL,
		lat_location DECIMAL (6,9),
		long_location DECIMAL (6,9),
		PRIMARY KEY (location_id),
		FOREIGN KEY (profile_id) REFERENCES PROFILES(profile_id)
        );

 CREATE TABLE Loadouts
    (
        id INT NOT NULL AUTO_INCREMENT,
        activity_name VARCHAR (50) NOT NULL,
        item_1  VARCHAR (50),
        item_2 VARCHAR (50),
        item_3 VARCHAR (50),
        item_4 VARCHAR (50),
        item_5 VARCHAR (50), 
        item_6 VARCHAR (50),
        item_7 VARCHAR (50),
        item_8 VARCHAR (50),
        item_9 VARCHAR (50),
        item_10 VARCHAR (50),
        item_11 VARCHAR (50),
        item_12 VARCHAR (50),
        PRIMARY KEY (Loadout_id),
        FOREIGN KEY (profile_id) REFERENCES PROFILES(profile_id)
        );