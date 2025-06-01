import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';

const CartPage = () => {
    const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
    const navigate=useNavigate();
    const total = cartItems
        .reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
        .toFixed(2);

    return (
        <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <>
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="text-left border-b">
                    <th className="py-2">Product</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2 text-right">Total</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                    <td className="py-4 flex items-center space-x-4">
                        <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
                        <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">Rs. {item.price}</p>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="flex items-center space-x-2">
                        <button onClick={() => decreaseQty(item.id)} className="border px-2 py-1">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)} className="border px-2 py-1">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="text-xl">🗑</button>
                        </div>
                    </td>
                    <td className="py-4 text-right">
                        Rs. {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="mt-6 text-right ">
                <p className="text-lg font-semibold">Estimated total: Rs. {total}</p>
                <button className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded cursor-pointer"
                    onClick={()=>navigate('/checkout')}
                >
                    Check out
                </button>
            </div>
            </>
        )}
        </div>
    );
};

export default CartPage;
