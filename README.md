# Flight-Booking-Simulator-With-Dynamic-Pricing
A full-stack Flight Booking Simulator built with FastAPI, PostgreSQL, and React. This project simulates real-time flight bookings with dynamic pricing based on demand, seasonality, and other factors. Features include user authentication, flight search, booking management, and a responsive frontend.



## Project Overview
This project simulates a flight booking system. Users can:
- View available flights
- Book seats for passengers
- See dynamic pricing based on availability and time
- Track passenger and booking information

---

## Backend Features
The backend, built with **FastAPI**, handles:

1. **Flights**
   - Add, view, and manage flights
   - Track seats available and total seats
   - Store airline details, departure, arrival, and base fare

2. **Passengers**
   - Register passengers with full name, contact number, email, and city
   - Retrieve passenger details

3. **Bookings**
   - Book flights for passengers
   - Auto-assign dynamic pricing
   - Track booking status and booking date

4. **Dynamic Pricing**
   - Prices increase as seats fill up
   - Prices adjust near departure time
   - Simulated demand factor affects pricing

---

## Technology Stack
- **Python 3.13**
- **FastAPI** – backend framework
- **PostgreSQL** – relational database
- **psycopg2** – PostgreSQL adapter for Python
- **uvicorn** – ASGI server
- **anyio** – concurrency for FastAPI
- **Pydantic** – data validation

---
