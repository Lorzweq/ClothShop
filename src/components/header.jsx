import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage
  const authToken = localStorage.getItem('authToken'); // Get the auth token from localStorage
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    alert('Logged out');
    navigate('/'); // redirect to login page after logout
    window.location.reload(); // refresh the site
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`); // Navigate to search results page with query
  };

  return (
    <header className="bg-gray-100 text-black font-semibold px-4 md:px-8">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <nav className="flex flex-col md:flex-row justify-between w-full items-center">
          {/* Left Navigation */}
          <ul className="flex flex-col md:flex-row ml-0 md:ml-24 space-y-2 py-3 md:space-y-0 md:space-x-2 items-center">
            {["Women", "Men", "Kids"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase()}`} 
                  className={({ isActive }) =>
                    `px-4 py-2 ${isActive ? "bg-black text-white " : "hover:bg-gray-200"}`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/">
            <h1 className="text-2xl mt-4 md:mt-0 text-center">
              <span className="text-red-500">e</span>
              <span className="text-blue-500">b</span>
              <span className="text-yellow-500">a</span>
              <span className="text-green-500">y</span>
              <span className="">zalando</span>
            </h1>
          </NavLink>
          {/* Right Icons */}
          <ul className="flex space-x-4 mt-4 md:mt-0 mr-0 md:mr-24 items-center">
            <li>
              <NavLink to="/login" className="flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">person</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">favorite</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">shopping_bag</span>
              </NavLink>
            </li>
            {userRole === 'admin' && (
              <li>
                <NavLink to="/admin" className="flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                </NavLink>
              </li>
            )}
            {authToken && (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <ul className="flex flex-col md:flex-row md:space-y-0 md:space-x-2 items-center mx-4 md:mx-45 md:mt-0 text-center">
        <li><NavLink to="/nordic-style" className="hover:underline">Nordic Style</NavLink></li>
        <li><NavLink to="/new" className="hover:underline">New</NavLink></li>
        <li><NavLink to="/clothing" className="hover:underline">Clothing</NavLink></li>
        <li><NavLink to="/shoes" className="hover:underline">Shoes</NavLink></li>
        <li><NavLink to="/accessories" className="hover:underline">Accessories</NavLink></li>
        <li><NavLink to="/streetwear" className="hover:underline">Streetwear</NavLink></li>
        <li><NavLink to="/sports" className="hover:underline">Sports</NavLink></li>
        <li><NavLink to="/designer" className="hover:underline">Designer</NavLink></li>
        <li><NavLink to="/pre-owned" className="hover:underline">Pre-owned</NavLink></li>
        <li className="text-orange-700 hover:underline"><NavLink to="/outlet">Outlet</NavLink></li>
        <li>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              id="searchBar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 ml-0 md:ml-84 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Search..."
            />
            <button type="submit" className="hidden">Search</button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;