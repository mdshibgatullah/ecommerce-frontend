import React, { useContext, useEffect, useState } from 'react';
import Layouts from './common/Layouts';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './context/Cart';
import { useForm } from 'react-hook-form';
import { apiUrl, userToken } from './common/http';
import { toast } from 'react-toastify';

const Checkout = () => {

    const navigate = useNavigate();
    const [payment, setPayment] = useState('cod');
    const { cartData, grandTotal, subTotal, shipping } = useContext(CartContext);
    

    const handleMethod = (e) => {
        setPayment(e.target.value);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const processOrder = (data) => {

       const paymentStatus = payment === 'cod' ? 'unpaid' : 'Paid';
        saveOrder(data, paymentStatus);
    }

    const saveOrder = (formData, paymentStatus) =>{

        const newFormData = {
            ...formData,
            grand_total: grandTotal(),
            subtotal: subTotal(),
            shipping: shipping(),
            discount: 0,
            payment_method: payment,
            payment_status: paymentStatus,
            status: 'pending',
            cart: cartData
        }

        fetch(`${apiUrl}/save_order`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`,
            },
            body: JSON.stringify(newFormData)
        })
        .then(res => res.json())
        .then(result => {

            if(result.status == 200){
                localStorage.removeItem('cart')
                navigate(`/order/confirmation/${result.id}`);
            }else{
                toast.error(result.message)
            }

        })   
    }

     

    return (
        <Layouts>
            <Container className='pb-5'>

                {/* Breadcrumb */}
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Checkout
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <form onSubmit={handleSubmit(processOrder)}>
                    <div className="row">

                        {/* Billing Section */}
                        <div className="col-md-7">
                            <h3 className='border-bottom pb-2 fw-bold'>Billing Details</h3>

                            <div className="row pt-3">

                                {/* Name */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name && 'is-invalid'}`}
                                            placeholder='Name'
                                            {...register('name', { required: 'Name is required' })}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.email && 'is-invalid'}`}
                                            placeholder='Email'
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* City */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.city && 'is-invalid'}`}
                                            placeholder='City'
                                            {...register('city', { required: 'City is required' })}
                                        />
                                        {errors.city && (
                                            <div className="invalid-feedback">
                                                {errors.city.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* State */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.state && 'is-invalid'}`}
                                            placeholder='State'
                                            {...register('state', { required: 'State is required' })}
                                        />
                                        {errors.state && (
                                            <div className="invalid-feedback">
                                                {errors.state.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Zip */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.zip && 'is-invalid'}`}
                                            placeholder='Zip'
                                            {...register('zip', { required: 'Zip is required' })}
                                        />
                                        {errors.zip && (
                                            <div className="invalid-feedback">
                                                {errors.zip.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.mobile && 'is-invalid'}`}
                                            placeholder='Mobile'
                                            {...register('mobile', { required: 'Mobile is required' })}
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">
                                                {errors.mobile.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className='pt-3'>
                                    <textarea
                                        rows={3}
                                        className={`form-control ${errors.address && 'is-invalid'}`}
                                        placeholder='Address'
                                        {...register('address', { required: 'Address is required' })}
                                    ></textarea>
                                    {errors.address && (
                                        <div className="invalid-feedback">
                                            {errors.address.message}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-md-5">
                            <h3 className='border-bottom pb-2 fw-bold'>Items</h3>

                            <table className="table">
                                <tbody>
                                    {cartData.map((item, index) => (
                                        <tr key={index}>
                                            <td width={100}>
                                                <img src={item.image_url} alt="" width={80} />
                                            </td>
                                            <td>
                                                <h6>{item.title}</h6>
                                                <div>
                                                    ${item.price} x {item.qty}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="border-top pt-3">
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${subTotal()}</span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span>Shipping</span>
                                    <span>${shipping()}</span>
                                </div>

                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Grand Total</span>
                                    <span>${grandTotal()}</span>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="pt-4">
                                <h5>Payment Method</h5>

                                <div className="form-check">
                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={payment === 'cod'}
                                        onChange={handleMethod}
                                    />
                                    <label className='ps-2'>Cash on Delivery</label>
                                </div>

                                <div className="form-check">
                                    <input
                                        type="radio"
                                        value="bkash"
                                        checked={payment === 'bkash'}
                                        onChange={handleMethod}
                                    />
                                    <label className='ps-2'>Bkash</label>
                                </div>

                                <button type="submit" className='btn btn-primary mt-3 w-100'>
                                    Place Order
                                </button>
                            </div>

                        </div>

                    </div>
                </form>

            </Container>
        </Layouts>
    );
};

export default Checkout;