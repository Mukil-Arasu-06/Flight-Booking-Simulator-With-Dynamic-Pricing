// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import "./index.css";
import "./styles/globals.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="book/:flightId" element={<Booking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
