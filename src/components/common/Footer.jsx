import React from 'react';
import { Container } from 'react-bootstrap';
import FooterLogo from '../../assets/images/logo-white.png'
import { FaTruck, FaMoneyBill, FaRegCreditCard } from "react-icons/fa";

const Footer = () => {
    return (
         <footer className='py-5 text-white'>
                <Container>
                    <div className="row">
                        <div className="col-md-3 pb-4">
                            <img src={FooterLogo} alt="" width={170}/>
                            <div className='pt-3 pe-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, temporibus.</div>
                        </div>


                        <div className="col-md-3 pb-4">
                            <h2 className='mb-3'>Categories</h2>
                            <ul>
                                <li><a href="">Kids</a></li>
                                <li><a href="">Mens</a></li>
                                <li><a href="">Womens</a></li>
                            </ul>
                        </div>


                        <div className="col-md-3 pb-4">
                            <h2 className='mb-3'>Quick Links</h2>
                            <ul>
                                <li><a href="">Login</a></li>
                                <li><a href="">Register</a></li>
                            </ul>
                        </div>


                        <div className="col-md-3 pb-4">
                            <h2 className='mb-3'>Contact</h2>
                            <ul>
                                <li><a href="">01880960014</a></li>
                                <li><a href="">mdshibgatullah94@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>


                    <div className="row mt-5 py-3 spotlight">
                        <div className="col-md-4 py-3">
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                <FaTruck className='fs-4'/> 
                                <h3>Free Delivery</h3>
                            </div>
                        </div>


                        <div className="col-md-4 py-3">
                            <div className="d-flex justify-content-center align-items-center gap-3"> 
                                <FaMoneyBill className='fs-4'/>                               
                                 <h3>Money Back Guarantee</h3>
                            </div>
                        </div>


                        <div className="col-md-4 py-3">
                            <div className="d-flex justify-content-center align-items-center gap-3"> 
                                <FaRegCreditCard  className='fs-4'/>                   
                                <h3>Secure Payment</h3>
                            </div>
                        </div>
                        
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-center pt-5">
                            <p>&copy; 2026 All Right Reserved</p>
                        </div>
                    </div>
                </Container>
            </footer>
    );
};

export default Footer;