import { useLocation } from "react-router-dom";

export default function Confirmation(){
  const { state } = useLocation();
  const { booking, pnr } = state || {};
  return (
    <div>
      <h2>Booking Confirmed</h2>
      <p>PNR: <strong>{pnr || booking?.pnr || booking?.booking_id}</strong></p>
      <pre>{JSON.stringify(booking, null, 2)}</pre>
    </div>
  );
}
