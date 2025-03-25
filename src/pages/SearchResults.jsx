import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredProducts(products.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4 mb-24">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
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

export default SearchResults;