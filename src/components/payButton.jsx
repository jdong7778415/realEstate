
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PayButton({ priceId, mode = "payment", label = "Pay with Stripe" }) {
  const handlePay = async () => {
    // 检查本地用户信息
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user.email) {
      alert("Please log in before making a payment.");
      window.location.href = "/login";
      return;
    }
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, email: user.email, mode }),
    });
    const data = await res.json();
    if (data.url) {
      window.location = data.url;
    } else {
      alert("Payment error: " + data.error);
    }
  };

  return (
    <button
      onClick={handlePay}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      {label}
    </button>
  );
}
