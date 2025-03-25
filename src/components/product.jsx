import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage

  // Fetch product data from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  }, [category, products]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4 my-12">
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-2">Filter by category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="All">All</option>
          <option value="Chinos">Chinos</option>
          <option value="Underwear">Underwear</option>
          <option value="T-shirts">T-shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Suit">Suit</option>
          <option value="Sweatshirt">Sweatshirt</option>
          <option value="Pants">Pants</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="no-underline">
            <div className="bg-white p-4 rounded shadow flex flex-col items-center cursor-pointer">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
              <p className="text-gray-700 mb-2 text-center">{product.description}</p>
              <p className="text-gray-900 font-bold text-center">{product.price}€</p>
              {(userRole === 'admin' || userRole === 'marketing') && (
                <p className="text-gray-700 text-center">In stock: {product.stock}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;