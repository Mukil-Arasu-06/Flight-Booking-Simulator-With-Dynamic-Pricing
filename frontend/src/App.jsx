// src/App.jsx
import { Outlet, Link } from "react-router-dom";
export default function App(){
  return (
    <div className="app">
      <header style={{padding:20, borderBottom:"1px solid #ddd"}}>
        <Link to="/"><strong>Flight Booking Simulator</strong></Link>
      </header>
      <main style={{padding:20}}>
        <Outlet />
      </main>
    </div>
  );
}
