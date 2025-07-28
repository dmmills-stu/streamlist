import React, { ReactNode } from 'react';
import Link from 'next/link';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link href="/">StreamList</Link></li>
          <li><Link href="/movies">Movies</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default NavBar;