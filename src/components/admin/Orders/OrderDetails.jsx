import React, { useEffect, useState } from 'react';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { adminToken, apiUrl } from '../../common/http';
import Loader from '../../common/Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const OrderDetals = () => {

    const [orders, setOrders] = useState({});
    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const params = useParams();



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const fetchOrders = async ()=>{
        setLoader(true);

        const res = await fetch(`${apiUrl}/orders/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`,
                },
            }).then(res => res.json())
            .then(result => {
                setLoader(false);
                if(result.status == 200){
                    setOrders(result.data);
                    setItems(result.data.items);
                    reset({
                        status: result.data.status,
                        payment_status: result.data.payment_status
                    })
                }else{
                    console.log('something went wrong')
                }
            })
    }


    const updateOrder = async (data)=>{
        setLoader(true);
        console.log("Sending:", data);

        const res = await fetch(`${apiUrl}/update_order/${params.id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`,
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(result => {
                setLoader(false);
                if(result.status == 200){
                    setOrders(result.data);
                    reset({
                        status: result.data.status,
                        payment_status: result.data.payment_status
                    })
                    toast.success(result.message)
                }else{
                    console.log('something went wrong')
                }
            })
    }



    useEffect(()=>{
        fetchOrders()
    },[])


    return (
        <Layouts>            
            <Container>
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Orders</h4>
                        <Link to='/admin/orders' className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-9 mb-5">
                                <div className="card shadow">
                                    <div className="card-body p-4">
                                        {
                                            loader == true && <Loader />
                                        }
                                        {
                                        loader == false &&
                                        <div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <h3>Order Id: #{orders.id}</h3>
                                                        {orders.status == 'pending' && <span className='badge bg-warning'>Pending</span>}
                                                        {orders.status == 'shipped' && <span className='badge bg-info'>Shipped</span>}
                                                        {orders.status == 'delivered' && <span className='badge bg-success'>Delivered</span>}
                                                        {orders.status == 'cancelled' && <span className='badge bg-danger'>Cancelled</span>}
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="text-secondary">Date</div>
                                                    <h4 className="pt-2">{orders.created_at}</h4>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="text-secondary">Payment Status</div>
                                                        {
                                                        orders.payment_status == 'paid' ?
                                                        <span className='badge bg-success'>Paid</span> :
                                                        <span className='badge bg-danger'>Not paid</span>
                                                        }
                                                </div>
                                                
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className='py-5'>
                                                        <strong>{orders.name}</strong>
                                                        <div>{orders.mobile}</div>
                                                        <div>{orders.email}</div>
                                                        <div>{orders.state}, {orders.city}, {orders.zip}, {orders.address}</div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="text-secondary pt-5">Payment Method</div>
                                                        <p>COD</p>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <h3 className="pb-2 "><strong>Items</strong></h3>
                                                {
                                                    items.map((item)=> (
                                                    <div className="row justify-content-end" key={item.id}>
                                                        <div className="col-lg-12">
                                                            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                <div className="d-flex">
                                                                    {
                                                                        item.product.image && <img width="70" className="me-3" src={`${item.product.image_url}`} alt="" />
                                                                    }
                                                                
                                                                <div className="d-flex flex-column">
                                                                    <div className="mb-2"><span>{item.name}</span></div>
                                                                    <div><button className="btn btn-size">{item.size}</button></div>
                                                                </div>
                                                                </div>
                                                                <div className="d-flex">
                                                                <div>X {item.qty}</div>
                                                                <div className="ps-3">${item.price}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                            
                                                <div className="row justify-content-end">
                                                    <div className="col-lg-12">
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Subtotal</div>
                                                            <div>${orders.subtotal}</div>
                                                        </div>
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Shipping</div>
                                                            <div>${orders.shipping}</div>
                                                        </div>
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div><strong>Grand Total</strong></div>
                                                            <div>${orders.grand_total}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card shadow">
                                    <div className="card-body p-4">
                                        <form action="" onSubmit={handleSubmit(updateOrder)}>
                                            <div className="mb-3">
                                                <label htmlFor="status" className='form-label'>Status</label>
                                                <select
                                                {
                                                    ...register('status', {required: true})
                                                }
                                                id="status" className='form-select'>
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="payment_status" className='form-label'>Payment</label>
                                                <select
                                                    {...register("payment_status", { required: true })}
                                                    id="payment_status"
                                                    className="form-select">
                                                    <option value="paid">Paid</option>
                                                    <option value="unpaid">Not Paid</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-primary w-100">Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </Container>
        </Layouts>
    );
};

export default OrderDetals;