### Preliminary Schema 

CREATE DATABASE BootCamping_db;

USE BootCamping_db;

CREATE TABLE Profiles (
        profileId INT NOT NULL AUTO_INCREMENT,
        password VARCHAR (250) NOT NULL,
        userName VARCHAR (50) NOT NULL,
        userCity VARCHAR (50) NOT NULL,
        userState VARCHAR (50) NOT NULL,
        userZip int(5) NOT NULL, 
        aboutMe TEXT (1000), NOT NULL;
        emailName VARCHAR (50) NULL,
        imageURL VARCHAR (100) NULL,
        twitterID VARCHAR (30) NULL,
        facebookID VARCHAR (30) NULL,
        snapchatId VARCHAR (30) NULL,
        status BOOLEAN,
        PRIMARY KEY (profileId)
    );

 CREATE TABLE Interests
    (
        interestId INT NOT NULL AUTO_INCREMENT,
    	interestName VARCHAR (50) NOT NULL,
        interestDescription VARCHAR (255) NOT NULL,
        profileId INT NOT NULL,
    	PRIMARY KEY (interest),
    	FOREIGN KEY (profileId) REFERENCES PROFILES(profileId)
    	);    
    
CREATE TABLE Activity
    (
        activityId INT NOT NULL AUTO_INCREMENT,
        activityName VARCHAR (50) NOT NULL,
        activityDescription, VA, (200) NOT NULL,
        profileId INT,
        PRIMARY KEY (activityId),
        FOREIGN KEY (profileId) REFERENCES PROFILES(profileId)
        );

CREATE TABLE Inventory
    (
        inventoryId INT NOT NULL AUTO_INCREMENT,
        profileId INT NOT NULL,
        itemName VARCHAR (50) NOT NULL,
		itemDescription VARCHAR (255) NOT NULL,
		itemQuantity INT, NOT NULL,
		PurchaseURL VARCHAR (300),
		PRIMARY KEY (inventoryId),
		FOREIGN KEY (profileId) REFERENCES PROFILES(profileId)
        );

CREATE TABLE Location
    (
        locationId INT NOT NULL AUTO_INCREMENT,
        profileId INT NOT NULL,
        locationName VARCHAR (50) NOT NULL,
		locationDescription VARCHAR (255) NOT NULL,
		latLocation FLOAT (10,6),
		longLocation FLOAT (10,6),
		PRIMARY KEY (locationId),
		FOREIGN KEY (profileId) REFERENCES PROFILES(profileId)
        );

 CREATE TABLE Loadouts
    (
    	loadoutId INT NOT NULL AUTO_INCREMENT,
        profileId INT,
        loadoutDescription VARCHAR (255) NOT NULL,
        PRIMARY KEY (loadoutId),
        FOREIGN KEY (profileId) REFERENCES PROFILES(profileId)
        );

CREATE TABLE LoadoutItems
    (	
        loadoutId INT NOT NULL,
        inventoryId INT NOT NULL, 
    	itemQuantity INT, DEFAULT 1,
    	FOREIGN KEY (loadoutId) REFERENCES Loadouts(loadoutId),
        PRIMARY KEY (loadoutId, inventoryId)
    	);