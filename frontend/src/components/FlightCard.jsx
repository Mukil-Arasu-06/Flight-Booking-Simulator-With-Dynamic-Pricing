import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlightPrice } from "../api/api";
import "../styles/FlightCard.css";


export default function FlightCard({ flight }){
  const [price,setPrice] = useState(flight.dynamic_fare ?? null);

  useEffect(()=>{
    async function fetchPrice(){
      try{
        // If backend exposes /flights/{id}/price
        const resp = await getFlightPrice(flight.id);
        setPrice(resp.data.dynamic_price ?? resp.data.price ?? price);
      }catch(e){
        // fallback to dynamic_fare sent by search
      }
    }
    fetchPrice();
  }, [flight]);

  return (
    <div style={{border:"1px solid #ddd", padding:12, borderRadius:6}}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>
          <div><strong>{flight.flight_no} — {flight.airline_name ?? ""}</strong></div>
          <div>{flight.origin} → {flight.destination}</div>
          <div>Departure: {new Date(flight.departure).toLocaleString()}</div>
          <div>Arrival: {new Date(flight.arrival).toLocaleString()}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:20, fontWeight:700}}>₹ {price ?? flight.base_fare}</div>
          <div>{flight.seats_available} seats left</div>
          <Link to={`/book/${flight.id}`} state={{ flight }}>Book</Link>
        </div>
      </div>
    </div>
  );
}
