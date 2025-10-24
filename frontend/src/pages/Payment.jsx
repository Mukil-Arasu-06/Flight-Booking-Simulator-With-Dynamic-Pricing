import { useLocation, useNavigate } from "react-router-dom";

export default function Payment(){
  const { state } = useLocation();
  const booking = state?.booking;
  const navigate = useNavigate();

  async function pay(){
    // in real app you'd call backend to create a transaction or call Stripe
    // simulate success:
    setTimeout(()=>{
      navigate("/confirmation", { state: { booking, pnr: "PNR123456" } });
    }, 1000);
  }

  return (
    <div>
      <h3>Payment</h3>
      <p>Amount: ₹ {booking?.transaction?.amount || booking?.price || "TBD"}</p>
      <button onClick={pay}>Pay (Mock)</button>
    </div>
  );
}
