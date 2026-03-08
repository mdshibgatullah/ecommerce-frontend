import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo.png'
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { apiUrl } from './http';
import { CartContext } from '../context/Cart';

const Header = () => {

    const {getQty} = useContext(CartContext)
    const[categories, setCategories] = useState([])

    const fetchCategories = async ()=> {
        await fetch(apiUrl+`/get_categories`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.status == 200){
                setCategories(result.data);
            }else{
                $error = "Data not Found";
            }
        });
    }

    useEffect(()=>{
        fetchCategories();
    },[])



    return (
        <header className='shadow'>
                <div className='bg-dark text-center py-3 text-white'>
                    <span>Your Fashion Partner</span>
                </div>

                <Container>
                    <Navbar expand="lg">              
                        <Navbar.Brand href="/">
                            <img src={Logo} alt="" width={170}/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav className="ms-auto my-2 my-lg-0">
                            {
                                categories && categories.map((category => (
                                    <Nav.Link href={`/shop?category=${category.id}`} key={category.id}>{category.name}</Nav.Link>
                                )))
                            }
                        </Nav>

                        <div className="nav-right d-flex">
                            <Link to="/account" className='ms-3'>
                                <FaUser  className='fs-5'/>                               
                            </Link>

                            <Link to="/cart" className='ms-3 cart-bucket'>
                                <span>{getQty()}</span>
                                <FaShoppingCart className='fs-5'/>
                            </Link>
                        </div>
                        </Navbar.Collapse>               
                   </Navbar>
                </Container>
            </header>
    );
};

export default Header;