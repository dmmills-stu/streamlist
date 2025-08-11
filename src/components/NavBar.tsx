'use client'; // Needed for IconContext.

import React from 'react';
import Link from 'next/link';
import '../styles/NavBar.css';
import { IconContext } from 'react-icons';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { IoMdInformationCircle } from 'react-icons/io';

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <div className="outside-spacer"></div>
          <li>
            <Link href="/"
            onClick={() => {
              localStorage.removeItem("searchResults");
              localStorage.removeItem("searchQuery");
            }}>
              <IconContext.Provider value={{ className: "react-icon" }}>
                <FaHome />
              </IconContext.Provider>
              <span>StreamList</span>
            </Link>
          </li>
          <div className="inside-spacer"></div>
          <li>
            <Link href="/search"
              onClick={() => {
                localStorage.removeItem("streamListInput");
            }}>
              <IconContext.Provider value={{ className: "react-icon" }}>
                <MdMovie />
              </IconContext.Provider>
              <span>Search Movies</span>
            </Link>
          </li>
          <div className="inside-spacer"></div>
          <li>
            <Link href="/cart"
              onClick={() => {
                localStorage.removeItem("streamListInput");
                localStorage.removeItem("searchResults");
                localStorage.removeItem("searchQuery");
            }}>
              <IconContext.Provider value={{ className: "react-icon" }}>
                <FaShoppingCart />
              </IconContext.Provider>
              <span>Cart</span>
            </Link>
          </li>
          <div className="inside-spacer"></div>
          <li>
            <Link href="/about"
              onClick={() => {
                localStorage.removeItem("streamListInput");
                localStorage.removeItem("searchResults");
                localStorage.removeItem("searchQuery");
            }}>
              <IconContext.Provider value={{ className: "react-icon" }}>
                <IoMdInformationCircle />
              </IconContext.Provider>
              <span>About</span>
            </Link>
          </li>
          <div className="outside-spacer"></div>
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default NavBar;