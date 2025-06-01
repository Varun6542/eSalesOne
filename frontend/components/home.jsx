import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const HomePage = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 py-10">Loading products...</div>;
    }


  return (
  <div className="bg-[#1a1c23] min-h-screen px-6 py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {( products.slice(0, 6)).map((product) => (
        <div key={product.id} className="bg-white rounded-lg p-4 flex flex-col text-center">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-48 object-contain"
          />
          <h3 className="text-sm font-semibold text-gray-800 mt-4">{product.title}</h3>
          <p className="text-sm text-gray-600 mt-1">RS. {Number(product.price)}</p>
          <div className="mt-auto pt-4">
            <button className="w-full px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition cursor-pointer"
                onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-10">
    <button
        className="px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition cursor-pointer"
        onClick={()=>navigate('/products')}
    >
        View all
    </button>
    </div>
  </div>
);

};

export default HomePage;
