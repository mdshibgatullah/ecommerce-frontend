import React, { useContext, useState } from 'react';
import Layouts from './common/Layouts';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { CartContext } from './context/Cart';



const Cart = () => {

    const {cartData, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem} = useContext(CartContext);
    
    const [qty, setQty] = useState({});

    const handleQty = (e, id) => {
        let value = Number(e.target.value);

        if (value < 1) value = 1;
        if (value > 20) value = 20;

        setQty(prev => ({
            ...prev,
            [id]: value
        }));

        updateCartItem(id, value)
    };



    return (
            <Layouts>
                <Container>
                    <div className="row">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className='py-4'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to="/cart">Cart</Link></li>
                                </ol>
                            </nav>
                        </div>

                        <div className="col-md-12">
                            <h2 className='pb-3 border-bottom'>Cart</h2>

                            <table className="table">
                                <tbody>
                                    {
                                        cartData.length == 0 && 
                                        <tr >
                                            <td colSpan={4} align='center' className='py-3'>Your Cart is Empty</td>
                                        </tr>
                                    }
                                    {
                                        cartData && cartData.map(item => (
                                            <tr key={item.id}>
                                                <td width={100}><img src={item.image_url} alt="" width={80}/></td>
                                                <td width={600}>
                                                    <h4>{item.title}</h4>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span>{item.price}</span>
                                                        {
                                                            item.size && <button className='btn btn-size'>{item.size}</button>
                                                        }
                                                        
                                                    </div>
                                                </td>

                                                <td valign='middle'>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={20}
                                                        value={qty[item.id] ?? item.qty}
                                                        className="form-control"
                                                        style={{ width: '100px' }}
                                                        onChange={(e) => handleQty(e, item.id)}
                                                    />
                                                </td>
                                                <td valign='middle'>
                                                    <a href='#'
                                                    onClick={()=> deleteCartItem(item.id)}
                                                    >
                                                    <MdDeleteForever className='fs-2'/>
                                                    </a>
                                                    
                                                    </td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                {
                    cartData.length > 0 && 
                    <div className="row justify-content-end py-3">
                        <div className="col-md-3">
                            <div className="d-flex justify-content-between border-bottom">
                                <h5>Subtotal</h5>
                                <span>{subTotal()}</span>
                            </div>

                            <div className="d-flex justify-content-between border-bottom">
                                <h5>Shipping</h5>
                                <span>{shipping()}</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <h5 className='fw-bold'>Grand Total</h5>
                                <span>{grandTotal()}</span>
                            </div>

                            <div className="d-flex justify-content-end py-3">
                                 <Link to="/checkout" className='btn btn-primary'>Proceed To Checkout</Link>
                            </div>
                        </div>
                    </div>
                }
                </Container>
            </Layouts>
    );
};

export default Cart;