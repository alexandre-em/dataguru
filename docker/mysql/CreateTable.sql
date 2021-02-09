USE dataguruDB;

CREATE TABLE tags(
       tagName VARCHAR (15) NOT NULL,
	primary key (tagName)
       );

CREATE TABLE images(
       imgId int NOT NULL AUTO_INCREMENT,
	imgName VARCHAR(32) NOT NULL,
       imgUrl VARCHAR(500) NOT NULL,
       imgType VARCHAR(32),
       PRIMARY KEY(imgId),
       constraint urlUnique unique(imgUrl)
       );

CREATE TABLE imagetags(
       tagName VARCHAR (15) NOT NULL,
       imgId int NOT NULL,
	primary key (tagName, imgId),
       FOREIGN KEY (tagName) REFERENCES tags(tagName),
       FOREIGN KEY (imgId) REFERENCES images(imgId)
       );

CREATE TABLE datasets(
       groupName VARCHAR(32) NOT NULL,
       imgId int NOT NULL,
       PRIMARY KEY(groupName, imgId)
       );

CREATE TABLE versions(
       tagName VARCHAR (15) NOT NULL,
       imgId int NOT NULL,
       numVers int NOT NULL,
	primary key (tagName, imgId, numVers),
       FOREIGN KEY (tagName) REFERENCES tags(tagName),
       FOREIGN KEY (imgId) REFERENCES images(imgId)
       );
