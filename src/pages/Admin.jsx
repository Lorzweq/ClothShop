import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image_url: '', description: '' });

  useEffect(() => {
    // Fetch products from the products.json file
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change for new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Add new product
  const addProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ name: '', price: '', image_url: '', description: '' });
  };

  // Delete product
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Save changes to products.json
  const saveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products),
      });
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      alert('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
      <div className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Product Price"
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            name="image_url"
            value={newProduct.image_url}
            onChange={handleInputChange}
            placeholder="Product Image URL"
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="border p-2 rounded w-full mb-2"
          />
          <button onClick={addProduct} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
              <div>
                <span className="text-xl font-semibold">{product.name}</span> - 
                <span className="text-lg text-gray-700">{product.price}€</span>
              </div>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-lg"
                onClick={() => deleteProduct(index)}
              >
                &times; Remove
              </button>
            </li>
          ))}
        </ul>
        <button onClick={saveChanges} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Admin;