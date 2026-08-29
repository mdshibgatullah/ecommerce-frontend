import React from 'react';
import {  FaFacebookF, FaInstagram, FaTiktok,  FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo-white.png';


const Footer = () => {
  return (
    <footer className="main-footer pt-5 pb-3 w-100">
      <div className="container">
        <div className="row g-4 pb-4">
          
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <img src={logo} alt="SHIBGAT Logo" height="40" className="mb-3" />
            <p className="footer-brand-text pe-lg-4">
              Your trusted fashion partner for trendy, comfortable and elegant outfits for the whole family.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a href="#" className="social-icon-btn"><FaFacebookF /></a>
              <a href="#" className="social-icon-btn"><FaInstagram /></a>
              <a href="#" className="social-icon-btn"><FaTiktok /></a>
              <a href="#" className="social-icon-btn"><FaYoutube /></a>
            </div>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-heading">Categories</h5>
            <ul className="footer-links">
              <li><a href="#">Kids</a></li>
              <li><a href="#">Mens</a></li>
              <li><a href="#">Womens</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">Footwear</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#">Login</a></li>
              <li><a href="#">Register</a></li>
              <li><a href="#">My Orders</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Contact</h5>
            <ul className="contact-list">
              <li>
                <FaPhoneAlt />
                <span>01880960014</span>
              </li>
              <li>
                <FaEnvelope />
                <span>mdshibgatullah94@gmail.com</span>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>Chittagong, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom pt-3 text-center">
          <div>
            &copy; 2026 All Right Reserved
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;