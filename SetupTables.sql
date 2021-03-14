DROP TABLE IF EXISTS Members CASCADE;
CREATE TABLE Members (MemberID SERIAL PRIMARY KEY,
                      FirstName VARCHAR(255) NOT NULL,
		              LastName VARCHAR(255) NOT NULL,
                      Email VARCHAR(255) NOT NULL UNIQUE,
                      Password VARCHAR(255) NOT NULL,
                      SALT VARCHAR(255),
                      Verification INT DEFAULT 0
);


DROP TABLE IF EXISTS Demo;
CREATE TABLE Demo (DemoID SERIAL PRIMARY KEY,
                        Name VARCHAR(255) NOT NULL UNIQUE,
                        Message VARCHAR(255)
);
INSERT INTO 
    Members(FirstName, LastName, Email, Password, Salt)
VALUES
    ('test2First', 'test2Last', 'test2@test.com', 'aafc93bbad0671a0531fa95168c4691be3a0d5e033c33a7b8be9941d2702e566', '5a3d1d9d0bda1e4855576fe486c3a188e14a3f1a381ea938cacdb8c799a3205f');