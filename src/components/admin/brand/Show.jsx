import React, { useEffect, useState } from 'react';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { adminToken, apiUrl } from '../../common/http';
import Loader from '../../common/Loader';
import Nostate from '../../common/Nostate';
import { FaEdit, FaTrash } from "react-icons/fa";

const Show = () => {

        const [brands, setBrands] = useState([]);
        const [loader, setLoader] = useState(false);
    
        const fetchBrands = async ()=>{
            setLoader(true);
    
            const res = await fetch(`${apiUrl}/brands`, {
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
                        setBrands(result.data)
                    }else{
                        console.log('somethn went wrong')
                    }
                })
        }
    
    
    const deleteBrand = async (id)=>{
    
        if(confirm('Are you sure to delete?')){
       
            const res = await fetch(`${apiUrl}/brands/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`,
                    },
                }).then(res => res.json())
                .then(result => {
                    if(result.status == 200){
                        const newBrands = brands.filter(Brand => Brand.id != id)
                        setBrands(newBrands);
                        toast.success(result.message);
                    }else{
                        console.log('somethn went wrong')
                    }
                })
        }
    }
    
    useEffect(()=>{
        fetchBrands()
    },[])
    

    return (
        <Layouts>            
            <Container>
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Brands</h4>
                        <Link to='/admin/brands/create' className="btn btn-primary">Create</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                {
                                    loader == true && <Loader />
                                }

                                {
                                    loader == false && brands.length == 0 && <Nostate text='Brands not found'/>
                                }

                                {
                                    brands && brands.length > 0 &&                               
                                <table className='table table-hover'>
                                    <thead>           
                                        <tr>
                                            <th width="50">ID</th>
                                            <th>Name</th>
                                            <th width="100">Status</th>
                                            <th width="100">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            brands.map(brand=> {
                                                return (
                                                    <tr>
                                                        <td>{brand.id}</td>
                                                        <td>{brand.name}</td>
                                                        <td>
                                                            {
                                                                brand.status == 1 ? <span className='badge text-bg-success'>Active</span>
                                                                : <span className='badge text-bg-danger'>Block</span>
                                                            }
                                                            
                                                        </td>
                                                        <td className='d-flex gap-3 align-items-center'>
                                                            <Link to={`/admin/brands/edit/${brand.id}`} className='text-primary'>
                                                                <FaEdit />
                                                            </Link>

                                                            <Link className='text-danger' onClick={()=> deleteBrand(brand.id)}>
                                                                <FaTrash />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Layouts> 
    );
};

export default Show;