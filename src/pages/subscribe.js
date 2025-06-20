import PayButton from "../components/PayButton";

export default function SubscribePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Subscribe to Membership</h2>
      <p className="mb-6">Enjoy premium features and more!</p>
      <PayButton priceId="price_1RZuHfKXoDAI9HNhJND8uFZD" mode="subscription" label="Subscribe Now" />
    </div>
  );
  
}