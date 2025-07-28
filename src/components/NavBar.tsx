import React, { ReactNode } from 'react';
import Link from 'next/link';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link href="/" className="flex items-center gap-2">
              <img src="/icons/HomeIcon.svg" alt="Home" className="w-5 h-5" />
              <span>StreamList</span>
            </Link>
          </li>
          <li>
            <Link href="/movies" className="flex items-center gap-2">
              <img src="/icons/MovieIcon.svg" alt="Home" className="w-5 h-5" />
              <span>Movies</span>
            </Link></li>
          <li>
            <Link href="/cart" className="flex items-center gap-2">
              <img src="/icons/CartIcon.svg" alt="Home" className="w-5 h-5" />
              <span>Cart</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center gap-2">
              <img src="/icons/AboutIcon.svg" alt="Home" className="w-5 h-5" />
              <span>About</span>
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default NavBar;