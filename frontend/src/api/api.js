import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Example calls
export const searchFlights = (origin, destination, date) =>
  api.post("/search", { origin, destination });

export const getFlightPrice = (flightId) =>
  api.get(`/flights/${flightId}/price`);

export const createBooking = (bookingPayload) =>
  api.post("/bookings", bookingPayload);

export const createPassenger = (passenger) =>
  api.post("/passengers", passenger);

// If you made endpoint /flights to create flight, /flights GET returns flights
export const getFlights = () => api.get("/flights");
