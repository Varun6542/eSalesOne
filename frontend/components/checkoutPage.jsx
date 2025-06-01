import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", 
    email: "", 
    phone: "",
    address: "", 
    city: "", 
    state: "", 
    zip: "",
    card: "", 
    expiry: "", 
    cvv: ""
  });

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  ).toFixed(2);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
        customer: form,
        items: cartItems,
        total,
        orderId: Math.floor(100000000 + Math.random() * 900000000),
        date: new Date().toLocaleDateString(),
    };

    const sendEmail = () =>
        fetch(`${import.meta.env.VITE_API_BASE}/send-confirmation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            name: form.name,
            email: form.email,
            orderId: orderDetails.orderId,
            items: cartItems,
            total,
            }),
    }).then(res => res.json()); 


    toast.promise(
        sendEmail(),
        {
            loading: "Confirming order...",
            success: (res) => {
            clearCart();
            navigate("/order-success", { state: orderDetails });
            return res.message || "Confirmation email sent!";
            },
            error: (err) => {
            return err.message || "Failed to send confirmation email.";
            },
        }
    );

    }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row p-6 lg:p-12 gap-8">
      <div className="bg-white p-6 rounded shadow-md w-full lg:w-3/5">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
        <form className="grid grid-cols-1 gap-4 max-w-[500px]" onSubmit={handleSubmit}>
          <input type="text" name="name" onChange={handleChange} placeholder="Enter your full name" required className="border px-2 py-2 rounded-md" />
          <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required className="border px-2 py-2 rounded-md" />
          <input type="tel" name="phone" onChange={handleChange} placeholder="Enter your phone number" required className="border px-2 py-2 rounded-md" />
          <input type="text" name="address" onChange={handleChange} placeholder="Enter your address" required className="border px-2 py-2 rounded-md" />
          <input type="text" name="city" onChange={handleChange} placeholder="Enter your city" required className="border px-2 py-2 rounded-md" />
          <input type="text" name="state" onChange={handleChange} placeholder="Enter your state" required className="border px-2 py-2 rounded-md" />
          <input type="text" name="zip" onChange={handleChange} placeholder="Enter your zip code" required className="border px-2 py-2 rounded-md" />
          <input type="text" name="card" onChange={handleChange} placeholder="Enter your 16-digit card number" required className="border px-2 py-2 rounded-md" />
          <input type="text" name="expiry" onChange={handleChange} placeholder="MM/YY" required className="border px-2 py-2 rounded-md" />
          <input type="text" name="cvv" onChange={handleChange} placeholder="Enter your 3-digit CVV" required className="border px-2 py-2 rounded-md" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >Submit</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow-md w-full lg:w-2/5">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-2">
              <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-semibold">
                ₹{(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="text-right mt-4 font-bold text-lg">Total: ₹{total}</div>
      </div>
    </div>
  );
};

export default CheckoutPage;
