import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Insert new user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password, role }]);

    if (error) {
      alert('Error registering user');
      console.error('Error registering user:', error);
      return;
    }

    alert('Registration successful');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-6">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full hidden px-4 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
            Register
          </button>
        </form>
        <h2 className='text-center px-4 py-4 hover:underline'><a href="/login">Already have an account? Login</a></h2>
      </div>
    </div>
  );
};

export default Register;