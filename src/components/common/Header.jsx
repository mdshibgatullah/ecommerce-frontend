import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiUrl } from "./http";
import { CartContext } from "../context/Cart";

const Header = () => {
  const { getQty } = useContext(CartContext);

  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchCategories = async () => {
    await fetch(apiUrl + `/get_categories`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setCategories(result.data);
        }
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
          <div className='bg-dark text-center py-3 text-white'>
            <span>Your Fashion Partner</span>
          </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <Container>
            <div className="d-flex align-items-center justify-content-between py-3 header-wrapper">

                {/* Logo */}
                <Link to="/" className="logo">
                <img src={Logo} alt="logo" className="img-fluid" />
                </Link>

                {/* Desktop Menu */}
                <ul className="desktop-menu d-none d-lg-flex align-items-center gap-4 mb-0">
                <li>
                    <Link to="/">Home</Link>
                </li>

                {categories?.map((category) => (
                    <li key={category.id}>
                    <Link to={`/shop?category=${category.id}`}>
                        {category.name}
                    </Link>
                    </li>
                ))}
                </ul>

                {/* Right Side */}
                <div className="d-flex align-items-center gap-3">

                <Link to="/account">
                    <FaUser size={20} />
                </Link>

                <Link to="/cart" className="cart-bucket">
                    <span>{getQty()}</span>
                    <FaShoppingCart size={20} />
                </Link>

                <button
                    className="btn p-0 border-0 d-lg-none"
                    onClick={() => setMenuOpen(true)}
                >
                    <FaBars size={24} />
                </button>

                </div>

            </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${
          menuOpen ? "active" : ""
        }`}
      >
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>

        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          {categories?.map((category) => (
            <li key={category.id}>
              <Link
                to={`/shop?category=${category.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;