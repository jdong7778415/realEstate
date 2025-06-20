import PayButton from "../components/PayButton";

export default function ListingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Pay to List Your Property</h2>
      <p className="mb-6">One-time payment for each property listing.</p>
      <PayButton priceId="price_1RZuUqKXoDAI9HNhRdoxMzvK" mode="payment" label="Pay to List" />
    </div>
  );
}