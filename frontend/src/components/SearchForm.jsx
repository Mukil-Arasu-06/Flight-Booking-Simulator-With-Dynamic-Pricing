import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchForm.css";



export default function SearchForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [datetime, setDatetime] = useState("");
  const [tripType, setTripType] = useState("oneway");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: origin,
        destination: destination,
        datetime: datetime, 
      }),
    });

    if (response.ok) {
      const data = await response.json();
      navigate("/results", { state: { flights: datatime } });
    } else {
      const error = await response.json();
      alert(error.detail || "No flights found");
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 700 }}>
      <div>
        <label>Origin</label>
        <input
          required
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>
      <div>
        <label>Destination</label>
        <input
          required
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div>
        <label>Date & Time</label>
        <input
          type="datetime-local"
          required
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
      </div>
      {/* <div>
        <label>
          <input
            type="radio"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
          />{" "}
          One-way
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            checked={tripType === "round"}
            onChange={() => setTripType("round")}
          />{" "}
          Round-trip
        </label>
      </div> */}
      <button type="submit">Search</button>
    </form>
  );
}
