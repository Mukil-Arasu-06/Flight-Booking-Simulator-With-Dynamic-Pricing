
--FLIGHT BOOKING SIMULATOR DATABASE (PostgreSQL)



CREATE DATABASE flight_booking;



--TABLE 1: flights

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    flight_no VARCHAR(10) UNIQUE NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    departure TIMESTAMP NOT NULL,
    arrival TIMESTAMP NOT NULL,
    base_fare DECIMAL(10, 2) DEFAULT 5000 CHECK (base_fare > 0),
    total_seats INT NOT NULL CHECK (total_seats > 0),
    seats_available INT NOT NULL CHECK (seats_available >= 0),
    airline_name VARCHAR(50) NOT NULL
);


--TABLE 2: passengers

CREATE TABLE passengers (
    passenger_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    contact_no VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100),
    city VARCHAR(50)
);


--TABLE 3: bookings

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    flight_id INT REFERENCES flights(id) ON DELETE CASCADE,
    passenger_id INT REFERENCES passengers(passenger_id) ON DELETE CASCADE,
    seat_no INT UNIQUE NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'CANCELLED'))
);


--TABLE 4: transactions

CREATE TABLE transactions (
    trans_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id),
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('CARD','UPI','NETBANKING')),
    trans_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'SUCCESS' CHECK (status IN ('SUCCESS','FAILED','PENDING'))
);


--TABLE 5: pricing_rules

CREATE TABLE pricing_rules (
    rule_id SERIAL PRIMARY KEY,
    flight_id INT REFERENCES flights(id),
    seat_threshold INT NOT NULL,
    price_multiplier DECIMAL(3,2) DEFAULT 1.0,
    description VARCHAR(200)
);


--TABLE 6: airlines

CREATE TABLE airlines (
    airline_id SERIAL PRIMARY KEY,
    airline_name VARCHAR(100) UNIQUE NOT NULL,
    country VARCHAR(50),
    contact_email VARCHAR(100)
);


--SAMPLE DATA:


INSERT INTO airlines (airline_name, country, contact_email)
VALUES
('Air India', 'India', 'support@airindia.com'),
('IndiGo', 'India', 'help@goindigo.in'),
('Vistara', 'India', 'help@airvistara.com'),
('Emirates', 'UAE', 'help@emirates.com'),
('Singapore Airlines', 'Singapore', 'support@singaporeair.com');


INSERT INTO flights (flight_no, origin, destination, departure, arrival, base_fare, total_seats, seats_available, airline_name)
VALUES
('AI101', 'Delhi', 'Mumbai', '2025-03-01 10:00', '2025-03-01 12:00', 8000, 200, 150, 'Air India'),
('AI102', 'Mumbai', 'Delhi', '2025-03-01 15:00', '2025-03-01 17:00', 8000, 200, 180, 'Air India'),
('AI103', 'Chennai', 'Delhi', '2025-03-02 08:00', '2025-03-02 10:30', 9000, 180, 175, 'Air India'),
('AI104', 'Delhi', 'Chennai', '2025-03-02 11:00', '2025-03-02 13:30', 9000, 180, 160, 'Air India'),
('6E201', 'Bangalore', 'Hyderabad', '2025-03-03 09:00', '2025-03-03 10:15', 4000, 160, 150, 'IndiGo'),
('6E202', 'Hyderabad', 'Bangalore', '2025-03-03 11:00', '2025-03-03 12:15', 4000, 160, 145, 'IndiGo'),
('6E203', 'Delhi', 'Kolkata', '2025-03-04 08:30', '2025-03-04 10:45', 7000, 180, 180, 'IndiGo'),
('UK301', 'Delhi', 'Dubai', '2025-03-05 09:00', '2025-03-05 12:00', 15000, 220, 200, 'Vistara'),
('UK302', 'Dubai', 'Delhi', '2025-03-06 14:00', '2025-03-06 18:30', 15000, 220, 210, 'Vistara'),
('EK401', 'Chennai', 'Dubai', '2025-03-07 06:00', '2025-03-07 09:00', 17000, 250, 230, 'Emirates'),
('EK402', 'Dubai', 'Chennai', '2025-03-08 10:00', '2025-03-08 13:00', 17000, 250, 240, 'Emirates'),
('SQ501', 'Delhi', 'Singapore', '2025-03-09 07:00', '2025-03-09 14:00', 22000, 260, 250, 'Singapore Airlines'),
('SQ502', 'Singapore', 'Delhi', '2025-03-10 09:00', '2025-03-10 16:00', 22000, 260, 255, 'Singapore Airlines'),
('AI105', 'Kolkata', 'Mumbai', '2025-03-11 06:30', '2025-03-11 09:00', 6000, 180, 150, 'Air India'),
('AI106', 'Mumbai', 'Kolkata', '2025-03-11 10:00', '2025-03-11 12:30', 6000, 180, 160, 'Air India');

--Passengers

INSERT INTO passengers (full_name, contact_no, email, city)
VALUES
('Mukil Arasu', '9876543210', 'mukil@example.com', 'Chennai'),
('Aarav Patel', '9012345678', 'aarav@gmail.com', 'Delhi'),
('Priya Sharma', '9123456789', 'priya@gmail.com', 'Mumbai'),
('John Mathew', '9345678123', 'john@gmail.com', 'Bangalore'),
('Fatima Noor', '9456789012', 'fatima@gmail.com', 'Dubai');

--Bookings

INSERT INTO bookings (flight_id, passenger_id, seat_no)
VALUES
(1, 1, 12),
(2, 2, 23),
(3, 3, 14),
(8, 4, 45),
(10, 5, 56);

--Transactions:

INSERT INTO transactions (booking_id, amount, payment_method, status)
VALUES
(1, 8200, 'UPI', 'SUCCESS'),
(2, 8000, 'CARD', 'SUCCESS'),
(3, 9000, 'NETBANKING', 'SUCCESS'),
(4, 15000, 'UPI', 'SUCCESS'),
(5, 17000, 'CARD', 'SUCCESS');

--Pricing rules:

INSERT INTO pricing_rules (flight_id, seat_threshold, price_multiplier, description)
VALUES
(1, 50, 1.2, 'Increase price by 20% when fewer than 50 seats'),
(2, 40, 1.3, '30% price increase under 40 seats'),
(3, 30, 1.4, '40% price increase under 30 seats');


--PRACTICE QUERIES:



-- SELECT * FROM flights;


-- SELECT flight_no, origin, destination, base_fare FROM flights;


-- UPDATE flights
-- SET seats_available = 300
-- WHERE id = 6;


-- DELETE FROM flights WHERE id = 3;

--ORDER BY:

-- SELECT flight_no, base_fare FROM flights ORDER BY base_fare ASC;

-- WHERE:

--SELECT * FROM flights WHERE origin = 'Mumbai';

-- LIMIT

--SELECT flight_no, base_fare FROM flights ORDER BY base_fare ASC LIMIT 3;

-- Aggregate

--SELECT COUNT(*) AS total_flights FROM flights;
--SELECT AVG(base_fare) AS avg_fare FROM flights WHERE origin = 'Mumbai';

-- GROUP BY and HAVING

-- SELECT origin, AVG(base_fare) AS avg_fare
-- FROM flights
-- GROUP BY origin
-- HAVING AVG(base_fare) < 10000;

-- Joins

-- Inner Join

-- SELECT b.booking_id, p.full_name, f.flight_no, f.origin, f.destination
-- FROM bookings b
-- INNER JOIN passengers p ON b.passenger_id = p.passenger_id
-- INNER JOIN flights f ON b.flight_id = f.id;

-- Left Join

-- SELECT f.flight_no, f.origin, f.destination, p.full_name
-- FROM flights f
-- LEFT JOIN bookings b ON f.id = b.flight_id
-- LEFT JOIN passengers p ON b.passenger_id = p.passenger_id;

--Transactions

-- BEGIN;
-- SELECT seats_available FROM flights WHERE id = 1;
-- UPDATE flights SET seats_available = seats_available - 1 WHERE id = 1;
-- INSERT INTO bookings (flight_id, passenger_id, seat_no) VALUES (1, 2, 99);
-- COMMIT;
--ROLLBACK;  

-- Constraints 

--ALTER TABLE flights ADD CONSTRAINT seat_check CHECK (seats_available <= total_seats);
