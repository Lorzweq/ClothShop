import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check credentials from Supabase
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      alert('Invalid credentials');
      console.error('Error logging in:', error);
      return;
    }

    const userRole = data.role; 
    const userId = data.id; // Assuming 'id' is the user ID in the Supabase database

    // Store the authToken, userRole, and userId in localStorage
    localStorage.setItem('authToken', 'dummyToken'); 
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userId', userId); // Store userId here

    // Navigate based on user role
    if (userRole === 'admin') {
      console.log('Logged in as admin');
      navigate('/AdminDashboard');
    } else if (userRole === 'marketing') {
      console.log('Logged in as marketing');
      navigate('/MarketingDashboard');
    } else {
      console.log('Logged in as user');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center">
      <div className="bg-gray-300 text-gray-600 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">admin@example.com / admin123</h2>
        <h2 className="text-2xl font-semibold mb-4 text-center">marketing@example.com / marketing123</h2>
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
            Login
          </button>
        </form>
        <h2 className='text-center px-4 py-4 hover:underline'>
          <a href="/Register">Don't have an account yet? Sign up</a>
        </h2>
      </div>
    </div>
  );
};

export default Login;
