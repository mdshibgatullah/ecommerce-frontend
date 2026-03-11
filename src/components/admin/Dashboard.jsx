import React, { useState } from 'react';
import Layouts from '../common/Layouts';
import { Container } from 'react-bootstrap';
import Sidebar from '../common/Sidebar';
import { adminToken, apiUrl } from '../common/http';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchUsers = async ()=>{
        setLoader(true);

        const res = await fetch(`${apiUrl}/user`, {
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
                    setUsers(result.data)
                }else{
                    console.log('something went wrong')
                }
            })
    }



    const fetchOrders = async ()=>{
        setLoader(true);

        const res = await fetch(`${apiUrl}/orders`, {
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
                    setOrders(result.data)
                }else{
                    console.log('something went wrong')
                }
            })
    }

    
    const fetchProducts = async ()=>{
        setLoader(true);

        const res = await fetch(`${apiUrl}/products`, {
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
                    setProducts(result.data)
                }else{
                    console.log('something went wrong')
                }
            })
    }
    
        
    

    useEffect(()=>{
        fetchUsers()
        fetchOrders()
        fetchProducts()
    },[])
    

    return (
        <Layouts>
            
            <Container>
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Dashboard</h4>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h1>{users.length}</h1>
                                       
                                        <span>Users</span>
                                    </div>

                                    <div className="card-footer">
                                        <a href="#">View Users</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h1>{orders.length}</h1>
                                        <span>Orders</span>
                                    </div>

                                    <div className="card-footer">
                                        <Link to={'/admin/orders'}>View Orders</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h1>{products.length}</h1>
                                        <span>Products</span>
                                    </div>

                                    <div className="card-footer">
                                        <Link to={'/admin/products'}>View Products</Link>
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

export default Dashboard;