from datetime import datetime
from decimal import Decimal

def calculate_dynamic_price(base_fare, seats_available, total_seats, departure_time):
    base_fare = Decimal(base_fare)
    remaining_ratio = Decimal(seats_available) / Decimal(total_seats)
    hours_to_departure = Decimal((departure_time - datetime.now()).total_seconds() / 3600)

    seat_factor = Decimal('1') + (Decimal('1') - remaining_ratio) * Decimal('0.5')
    time_factor = Decimal('1.2') if hours_to_departure < Decimal('24') else Decimal('1')
    demand_factor = Decimal('1.1')

    return round(base_fare * seat_factor * time_factor * demand_factor, 2)
