import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Movie Explorer</h1>
      <ul className="nav-links">
        <li>Home</li>
        <li>Trending</li>
        <li>Top Rated</li>
        <li>About</li>
      </ul>
    </nav>
  );
};

export default Navbar;
