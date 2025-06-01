import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="p-10">No order found.</p>;

  const { customer, items, total, orderId, date } = state;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white max-w-2xl w-full p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Order Confirmation</h1>
        <p className="text-center text-gray-600 mb-6">
          Thank you, {customer.name}, for your order! Your items will be shipped soon.
        </p>

        <div className="text-sm mb-6">
          <p><strong>Order Number:</strong> #{orderId}</p>
          <p><strong>Order Date:</strong> {date}</p>
          <p><strong>Shipping Address:</strong> {customer.address}, {customer.city}, {customer.state} - {customer.zip}</p>
          <p><strong>Payment:</strong> Card ending in {customer.card.slice(-4)}</p>
        </div>

        <h2 className="font-semibold mb-2">Items:</h2>
        <ul className="mb-4 space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title} (x{item.quantity})</span>
              <span>₹{(item.quantity * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="text-right text-lg font-bold">Total: ₹{total}</div>

        <div className="text-center mt-6">
          <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
