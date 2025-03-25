import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication logic
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('authToken', 'dummyToken'); // Set a dummy token
      localStorage.setItem('userRole', 'admin'); // Set user role
      console.log('Logged in as admin');
      navigate('/'); 
    } else if (username === 'marketing' && password === 'marketing123') {
      localStorage.setItem('authToken', 'dummyToken'); 
      localStorage.setItem('userRole', 'marketing'); // Set user role
      console.log('Logged in as marketing');
      navigate('/'); 
    } else {
      alert('Invalid credentials');
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">admin / admin123</h2>
        <h2 className="text-2xl font-semibold mb-4 text-center">marketing / marketing123</h2>
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;