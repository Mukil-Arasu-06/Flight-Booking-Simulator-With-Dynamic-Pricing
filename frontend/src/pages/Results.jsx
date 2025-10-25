import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, searchFlights, getFlights } from "../api/api";
import FlightCard from "../components/FlightCard";
import "../styles/Results.css";


export default function Results(){
  const { state } = useLocation();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load(){
      setLoading(true);
      try{
        // If backend has /search endpoint
        if(state?.origin && state?.destination){
          const resp = await api.post("/search", { origin: state.origin, destination: state.destination });
          setFlights(resp.data.flights || []);
        } else {
          const resp = await api.get("/flights");
          setFlights(resp.data || []);
        }
      }catch(e){ console.error(e); }
      setLoading(false);
    }
    load();
  }, [state]);

  if(loading) return <div>Loading...</div>;
  if(!flights.length) return <div>No flights found</div>;

  return (
    <div>
      <h3>Flights</h3>
      <div style={{display:"grid",gap:12}}>
        {flights.map(f => <FlightCard key={f.id} flight={f} />)}
      </div>
    </div>
  );
}

