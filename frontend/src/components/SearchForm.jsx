import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchForm.css";



export default function SearchForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
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
      }),
    });

    if (response.ok) {
      const data = await response.json();
      navigate("/results", { state: { flights: data } });
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
      <button type="submit">Search</button>
    </form>
  );
}
