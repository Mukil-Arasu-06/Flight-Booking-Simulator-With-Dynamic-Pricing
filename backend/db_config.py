import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname="flight_booking",
            user="postgres",
            password="root",
            host="localhost",
            port="5432",
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print("Database connection error:", e)
        return None
