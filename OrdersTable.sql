CREATE TYPE SIZE AS ENUM ('small', 'medium', 'large');

CREATE TYPE RICE AS ENUM ('white', 'brown', 'fried');

CREATE TYPE PROTEIN AS ENUM ('chicken', 'chicken breast', 'katsu', 'shrimp' ,'bulgogi', 'orange chicken', 'mongolian beef', 'broccoli beef');

DROP TABLE IF EXISTS Orders CASCADE;
CREATE TABLE Orders (OrderID SERIAL PRIMARY KEY,
                    MemberID INT,
                    My_Size SIZE,
                    My_Rice RICE,
                    My_Protein PROTEIN,
                    Side1 BOOLEAN,
                    Side2 BOOLEAN,
                    Side3 BOOLEAN,
                    FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
);

--Remove the user test1
DELETE FROM Members 
WHERE Email='test1@test.com';

--Add the User test1  (password is: test12345)
INSERT INTO 
    Members(FirstName, LastName, Email, Password, Salt)
VALUES
    ('test1First', 'test1Last', 'test1@test.com', 'aafc93bbad0671a0531fa95168c4691be3a0d5e033c33a7b8be9941d2702e566', '5a3d1d9d0bda1e4855576fe486c3a188e14a3f1a381ea938cacdb8c799a3205f');

--Remove the user test2
DELETE FROM Members 
WHERE Email='test2@test.com';

--Add the User test2  (password is: test12345)
INSERT INTO 
    Members(FirstName, LastName, Email, Password, Salt)
VALUES
    ('test2First', 'test2Last', 'test2@test.com', 'aafc93bbad0671a0531fa95168c4691be3a0d5e033c33a7b8be9941d2702e566', '5a3d1d9d0bda1e4855576fe486c3a188e14a3f1a381ea938cacdb8c799a3205f');

--Add Multiple orders
INSERT INTO 
    Orders(MemberID, My_Size, My_Rice, My_Protein, Side1, Side2, Side3)
SELECT 
    Members.MemberId,
    'small', 
    'white',
    'chicken',
    true,
    false,
    true
FROM Members
WHERE Members.Email='test1@test.com'
RETURNING *;

INSERT INTO 
    Orders(MemberID, My_Size, My_Rice, My_Protein, Side1, Side2, Side3)
SELECT 
    Members.MemberId,
    'large', 
    'brown',
    'bulgogi',
    false,
    false,
    false
FROM Members
WHERE Members.Email='test1@test.com'
RETURNING *;

INSERT INTO 
    Orders(MemberID, My_Size, My_Rice, My_Protein, Side1, Side2, Side3)
SELECT 
    Members.MemberId,
    'medium', 
    'fried',
    'bulgogi',
    true,
    false,
    true
FROM Members
WHERE Members.Email='test2@test.com'
RETURNING *;

--This query WILL FAIL! It demostrates an invalide value for an enum.
INSERT INTO 
    Orders(MemberID, My_Size, My_Rice, My_Protein, Side1, Side2, Side3)
SELECT 
    Members.MemberId,
    'medium_fail', 
    'fried',
    'bulgogi',
    true,
    false,
    true
FROM Members
WHERE Members.Email='test2@test.com'
RETURNING *;