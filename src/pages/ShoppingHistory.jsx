import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const ShoppingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get user ID from localStorage

        if (!userId) {
          throw new Error('You must be logged in to view shopping history');
        }

        console.log('User ID:', userId); // Debugging: Check if userId is retrieved correctly

        // Fetch from the shopping_history table
        const { data, error } = await supabase
          .from('shopping_history')
          .select('*')
          .eq('user_id', userId);

        if (error) {
          throw new Error('Failed to fetch shopping history');
        }

        // Calculate total for each entry if not present in the backend (optional)
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading shopping history...</p>;
  if (error) return (
    <div className="text-red-600 bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded text-center">
      {error}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping History</h1>
      {history.length === 0 ? (
        <p>No shopping history found.</p>
      ) : (
        history.map((order) => (
          <div key={order.order_id} className="bg-white border border-2 border-gray-200 p-6 rounded shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Order #{order.order_id}</h2>
            <p className="text-gray-700 mb-2">Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4">Total: {order.price * order.amount}€</p>
            <h3 className="text-xl font-semibold mb-2">Items:</h3>
            <ul>
              <li key={order.order_id} className="mb-2">
                <div className="flex items-center">
                  <div>
                    <p className="text-gray-900 font-bold">{order.product_name}</p>
                    <p className="text-gray-700">Quantity: {order.amount}</p>
                    <p className="text-gray-700">Price: {order.price}€</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ShoppingHistory;
