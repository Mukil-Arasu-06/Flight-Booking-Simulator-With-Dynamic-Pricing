from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FlightSearch(BaseModel):
    origin: str
    destination: str 

class Flight(BaseModel):
    id: Optional[int] = None
    flight_no: str
    origin: str
    destination: str
    departure: datetime
    arrival: datetime
    base_fare: float
    total_seats: int
    seats_available: int
    airline_name: str

class Passenger(BaseModel):
    passenger_id: Optional[int] = None
    full_name: str
    contact_no: str
    email: Optional[str] = None
    city: str


class Booking(BaseModel):
    booking_id: Optional[int] = None
    flight_id: int
    passenger_id: int
    seat_no: int
    booking_date: Optional[datetime] = None
    status: Optional[str] = "CONFIRMED"

class Transaction(BaseModel):
    transaction_id: Optional[int] = None
    booking_id: int
    amount: float
    status: str = "SUCCESS"
    transaction_time: Optional[datetime] = None

class PricingRule(BaseModel):
    rule_id: Optional[int] = None
    flight_id: int
    demand_factor: float = 1.0
    time_factor: float = 1.0
    seat_factor: float = 1.0

class FareHistory(BaseModel):
    id: Optional[int] = None
    flight_id: int
    timestamp: Optional[datetime] = None
    fare: float
