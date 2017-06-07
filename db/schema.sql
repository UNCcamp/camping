### Preliminary Schema 

CREATE DATABASE BootCamping_db;

USE BootCamping_db;

CREATE TABLE Profiles (
        profile_id INT NOT NULL AUTO_INCREMENT,
        user_name VARCHAR (50) NULL,
        email_name VARCHAR (50) NULL,
        image_URL VARCHAR (100) NULL,
        PRIMARY KEY (profile_id)
    );

 CREATE TABLE ProfileInterests
    (
    	interest VARCHAR (50) NOT NULL,
        profile_id INT NOT NULL,
    	PRIMARY KEY (interest),
    	FOREIGN KEY (profile_id) REFERENCES PROFILES(profile_id)
    	);    
    
CREATE TABLE Activity
    (
        activity_id INT NOT NULL AUTO_INCREMENT,
        activity_name VARCHAR (50) NOT NULL,
        profile_id INT,
        PRIMARY KEY (activity_id)
        );

 CREATE TABLE Inventory
    (
        inventory_id INT NOT NULL AUTO_INCREMENT,
        profile_id INT NOT NULL,
        item_name VARCHAR (50) NOT NULL,
		item_description VARCHAR (255) NOT NULL,
		item_quantity INT,
		Purchase_URL VARCHAR (300),
		PRIMARY KEY (inventory_id),
		FOREIGN KEY (profile_id) REFERENCES PROFILES(profile_id)
        );

CREATE TABLE Location
    (
        location_id INT NOT NULL AUTO_INCREMENT,
        profile_id INT NOT NULL,
        location_name VARCHAR (50) NOT NULL,
		location_description VARCHAR (255) NOT NULL,
		lat_location DECIMAL (9,9),
		long_location DECIMAL (9,9),
		PRIMARY KEY (location_id),
		FOREIGN KEY (profile_id) REFERENCES PROFILES(profile_id)
        );

 CREATE TABLE Loadouts
    (
    	loadout_id INT NOT NULL AUTO_INCREMENT,
        profile_id INT,
        loadout_description VARCHAR (255) NOT NULL,
        PRIMARY KEY (loadout_id),
        FOREIGN KEY (profile_id) REFERENCES PROFILES(profile_id)
        );

    CREATE TABLE LoadoutItems
    (
    	inventory_id INT NOT NULL, 
        loadout_id INT NOT NULL,
    	item_quantity INT,
    	FOREIGN KEY (loadout_id) REFERENCES Loadouts(loadout_id)
    	);