import { FaHeart, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';

const Header = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <div className="flex items-center space-x-8">
        <div className="text-xl font-bold text-gray-800">eSalesOne</div>
        <nav className="flex items-center space-x-6 text-sm text-gray-700">
          <Link
            to="/"
            className={`hover:text-black ${isActive('/') ? 'underline font-medium' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`hover:text-black ${isActive('/products') ? 'underline font-medium' : ''}`}
          >
            Catalog
          </Link>
          <Link
            to="/contact"
            className={`hover:text-black ${isActive('/contact') ? 'underline font-medium' : ''}`}
          >
            Contact Us
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm w-52"
          />
        </div>
        <button className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <FaHeart className="text-gray-600" />
        </button>
        <button
          className="relative p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate('/cart')}
        >
          <FaShoppingBag className="text-gray-600" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
