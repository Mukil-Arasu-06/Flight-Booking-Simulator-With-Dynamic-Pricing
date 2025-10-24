import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { createPassenger, createBooking, api } from "../api/api";

export default function Booking(){
  const { flightId } = useParams();
  const location = useLocation();
  const flight = location.state?.flight;
  const [name,setName]=useState("");
  const [contact,setContact]=useState("");
  const [email,setEmail]=useState("");
  const [seat,setSeat]=useState(1);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const pResp = await createPassenger({ full_name: name, contact_no: contact, email, city: "Unknown" });
      const passenger = pResp.data.passenger || pResp.data;
      // create booking payload
      const bookingPayload = {
        flight_id: Number(flightId),
        passenger_id: passenger.passenger_id || passenger.id || passenger.passengerId,
        seat_no: Number(seat),
        booking_time: new Date().toISOString(),
        status: "CONFIRMED"
      };
      const bResp = await createBooking(bookingPayload);
      // bResp should contain booking and transaction; redirect to payment or confirmation
      // assume backend returns booking and transaction
      navigate("/payment", { state: { booking: bResp.data.booking || bResp.data } });
    }catch(err){
      console.error(err);
      alert("Booking failed: " + (err?.response?.data?.detail || err.message));
    }
  }

  return (
    <div style={{maxWidth:700}}>
      <h3>Booking — {flight?.flight_no}</h3>
      <form onSubmit={submit}>
        <div><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div><label>Contact</label><input value={contact} onChange={e=>setContact(e.target.value)} required/></div>
        <div><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div><label>Seat No</label><input type="number" value={seat} onChange={e=>setSeat(e.target.value)} min="1" max={flight?.total_seats || 200} required/></div>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}
