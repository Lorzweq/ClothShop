import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import supabase from '../../supabaseClient';

const Cart = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Delete product from cart
  const deleteFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  // Proceed to checkout
  const proceedToCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId'); // Ensure user ID is stored

      if (!userId) {
        throw new Error('You must be logged in to proceed to checkout');
      }

      if (cart.length === 0) {
        throw new Error('Your cart is empty.');
      }

      // Prepare order data
      const totalAmount = cart.reduce((total, item) => total + item.price, 0);
      const orderData = cart.map(item => ({
        user_id: userId,
        product_name: item.name,
        price: item.price,
        amount: 1, // Adjust based on your cart structure
        payment_status: 'Pending',
      }));

      // Insert into Supabase
      const { data, error } = await supabase.from('shopping_history').insert(orderData);

      if (error) {
        throw new Error(error.message);
      }

      console.log('Order placed:', data);
      alert('Order placed successfully!');
      setCart([]);
      localStorage.removeItem('cart');
      setShowCheckout(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Close checkout form
  const closeCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-lg">
      <h1 className="text-4xl font-bold mb-12 text-center">Shopping Cart</h1>
      <h2 className="text-2xl font-bold text-gray-100 mb-12 bg-gray-600 px-4 py-4 w-1/4 rounded text-center mx-auto flex justify-center items-center text-white bg-gray-600 rounded hover:text-white hover:bg-gray-800 hover:border border-2">
        <Link to="/ShoppingHistory">Shopping history</Link>
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-lg">
          <p>
            Your cart is empty. <Link to="/" className="text-white bg-gray-600 px-4 py-4 rounded hover:text-white hover:bg-gray-800 hover:border border-2">Continue shopping</Link>
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <span className="text-xl font-semibold">{item.name}</span> - 
                  <span className="text-lg text-gray-700">{item.price}€</span>
                </div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 text-lg"
                  onClick={() => deleteFromCart(item.id)}
                >
                  &times; Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <span className="text-2xl font-bold">Total: {cart.reduce((total, item) => total + item.price, 0)}€</span>
            <button
              onClick={proceedToCheckout}
              disabled={loading}
              className="bg-black text-white font-bold px-6 py-3 rounded-lg text-lg hover:bg-gray-600 transition duration-300"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-gray-800 backdrop-blur-md">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeCheckout}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
            <CheckoutForm cart={cart} onClose={closeCheckout} deleteFromCart={deleteFromCart} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
