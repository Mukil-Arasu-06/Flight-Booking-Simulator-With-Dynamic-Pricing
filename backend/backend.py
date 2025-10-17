from fastapi import FastAPI, HTTPException
from backend.db_config import get_db_connection
from backend.models import Flight, Passenger, Booking, Transaction, PricingRule, FareHistory
from backend.utils import generate_pnr
from backend.pricing_engine import calculate_dynamic_price

app = FastAPI(title="Flight Booking System")

# ✅ HEALTH CHECK
@app.get("/")
def root():
    return {"message": "Flight Booking API is running successfully!"}

# ✈️ Flights
@app.get("/flights")
def get_all_flights():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM flights;")
    flights = cur.fetchall()
    conn.close()
    return flights

@app.post("/flights")
def create_flight(flight: Flight):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO flights (flight_no, origin, destination, departure, arrival, base_fare, total_seats, seats_available, airline_name)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;
""", (
    flight.flight_no, flight.origin, flight.destination, flight.departure, flight.arrival,
    flight.base_fare, flight.total_seats, flight.seats_available, flight.airline_name
))

    new_flight = cur.fetchone()
    conn.commit()
    conn.close()
    return new_flight

# 👤 Passengers
@app.post("/passengers")
def create_passenger(passenger: Passenger):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO passengers (full_name, contact_no, email,city)
        VALUES (%s, %s, %s,%s) RETURNING *;
    """, (passenger.full_name, passenger.contact_no, passenger.email,passenger.city))
    new_passenger = cur.fetchone()
    conn.commit()
    conn.close()
    return new_passenger

@app.get("/passengers")
def get_all_passengers():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM passengers;")
    passengers = cur.fetchall()
    conn.close()
    return passengers

# 💺 Bookings
@app.post("/bookings")
def create_booking(booking: Booking):
    conn = get_db_connection()
    cur = conn.cursor()
    # Check seat availability
    cur.execute("SELECT seats_available, total_seats, base_fare, departure FROM flights WHERE id = %s;", (booking.flight_id,))
    flight = cur.fetchone()
    if not flight or flight["seats_available"] <= 0:
        raise HTTPException(status_code=400, detail="No seats available")

    price = calculate_dynamic_price(flight["base_fare"], flight["seats_available"], flight["total_seats"], flight["departure"])

    # Reduce seat
    cur.execute("UPDATE flights SET seats_available = seats_available - 1 WHERE id = %s;", (booking.flight_id,))

    # Create booking
    cur.execute("""
        INSERT INTO bookings (flight_id, passenger_id, seat_no)
        VALUES (%s, %s, %s) RETURNING *;
    """, (booking.flight_id, booking.passenger_id, booking.seat_no))
    new_booking = cur.fetchone()

    # Calculate dynamic price
    # price = calculate_dynamic_price(
    #     base_fare=flight["base_fare"],
    #     seats_available=flight["seats_available"],
    #     total_seats=flight["total_seats"],
    #     departure_time=flight["departure"]
    # )

    # Log transaction
    cur.execute("""
        INSERT INTO transactions (booking_id, amount, status)
        VALUES (%s, %s, %s) RETURNING *;
    """, (new_booking["booking_id"], price, "SUCCESS"))
    new_transaction = cur.fetchone()

    conn.commit()
    conn.close()

    return {"booking": new_booking, "transaction": new_transaction, "price": price, "pnr": generate_pnr()}

@app.get("/bookings")
def get_all_bookings():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM bookings;")
    bookings = cur.fetchall()
    conn.close()
    return bookings

# 💳 Transactions
@app.get("/transactions")
def get_all_transactions():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM transactions;")
    tx = cur.fetchall()
    conn.close()
    return tx

# ⚙️ Pricing Rules
@app.get("/pricing_rules")
def get_pricing_rules():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM pricing_rules;")
    rules = cur.fetchall()
    conn.close()
    return rules

# 🕒 Fare History
@app.get("/fare_history")
def get_fare_history():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM fare_history;")
    history = cur.fetchall()
    conn.close()
    return history
