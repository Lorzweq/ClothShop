import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import supabase from '../../supabaseClient';

const ProductPage = () => {
  const { id } = useParams();
  
  // State hooks
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addedToCartMessage, setAddedToCartMessage] = useState("");

  // Fetch product data based on the id parameter
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch the product by id from Supabase
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (productError) {
          throw new Error('Failed to fetch product');
        }

        setProduct(productData);

        // Fetch suggested products (excluding the current product)
        const { data: allProducts, error: allProductsError } = await supabase
          .from('products')
          .select('*');

        if (allProductsError) {
          throw new Error('Failed to fetch products');
        }

        const suggested = allProducts.filter(p => p.id !== id).slice(0, 4); // Get 4 suggested products
        setSuggestedProducts(suggested);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add product to cart
  const addToCart = () => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage

      // Set message and start the fade effect
      setAddedToCartMessage('Added to cart');
      
      // Remove message after 3 seconds
      setTimeout(() => {
        setAddedToCartMessage('');
      }, 3000);

      return updatedCart;
    });
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    setShowCheckout(true);
  };

  // Close checkout form
  const closeCheckout = () => {
    setShowCheckout(false);
  };

  // Loading and error handling
  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-red-500">Product not found</p>;

  // Render the product details and suggested items
  return (
    <div className={`container mx-auto p-6 ${showCheckout ? 'backdrop-blur-sm' : ''}`}>
      <div className="bg-white border border-gray-200 p-6 rounded shadow-lg max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-auto object-cover mb-4 md:mb-0" 
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-900 font-bold text-2xl mb-4">{product.price}€</p>
            <button 
              onClick={addToCart} 
              className="bg-black text-white px-4 py-2 font-bold rounded mb-4 hover:bg-white hover:text-black transition duration-200"
            >
              Add to Cart
            </button>
            <div
              className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500 ${
                addedToCartMessage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2>{addedToCartMessage}</h2>
            </div>

            <button 
              onClick={proceedToCheckout} 
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-gray-800 backdrop-blur-md">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeCheckout}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <CheckoutForm cart={cart} onClose={closeCheckout} />
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Suggested</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {suggestedProducts.map(suggestedProduct => (
            <Link key={suggestedProduct.id} to={`/product/${suggestedProduct.id}`} className="no-underline">
              <div className="bg-white border border-gray-200 p-4 rounded shadow flex flex-col items-center cursor-pointer">
                <img
                  src={suggestedProduct.image_url}
                  alt={suggestedProduct.name}
                  className="w-full h-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-center">{suggestedProduct.name}</h2>
                <p className="text-gray-700 mb-2 text-center">{suggestedProduct.description}</p>
                <p className="text-gray-900 font-bold text-center">{suggestedProduct.price}€</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;