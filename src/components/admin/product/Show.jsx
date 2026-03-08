import React, { useEffect, useState } from 'react';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import Sidebar from '../../common/Sidebar';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";
import { adminToken, apiUrl } from '../../common/http';
import Loader from '../../common/Loader';
import Nostate from '../../common/Nostate';
import { toast } from 'react-toastify';

const Show = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    
    const fetchProducts = async () => {
        try {
            setLoader(true); 
            const res = await fetch(`${apiUrl}/products`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`,
                },
            });

            const result = await res.json();
            if (result.status === 200) {
                setProducts(result.data);
            } else {
                toast.error('Something went wrong fetching products');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoader(false);
        }
    };

    
    const deleteProduct = async (id) => {
        if (!confirm('Are you sure to delete?')) return;

        try {
            const res = await fetch(`${apiUrl}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`,
                },
            });
            const result = await res.json();
            if (result.status === 200) {
                setProducts(prev => prev.filter(p => p.id !== id));
                toast.success(result.message);
            } else {
                toast.error('Something went wrong while deleting');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Layouts>
            <Container>
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Products</h4>
                        <Link to='/admin/products/create' className="btn btn-primary">Create</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <div className="card shadow">
                            <div className="card-body p-4">

                                {loader && <Loader />}

                                {!loader && products.length === 0 && <Nostate text='Products not found' />}

                                {!loader && products.length > 0 &&
                                    <table className='table table-hover'>
                                        <thead>
                                            <tr>
                                                <th width="50">ID</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Sku</th>
                                                <th>Status</th>
                                                <th width="100">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>
                                                        {product.image_url
                                                            ? <img src={product.image_url} alt="" width={60} height={40} />
                                                            : <img src='https://placehold.co/50x50' alt="no image" />
                                                        }
                                                    </td>
                                                    <td>{product.title}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.qty}</td>
                                                    <td>{product.sku}</td>
                                                    <td>
                                                        {product.status === 1
                                                            ? <span className='badge text-bg-success'>Active</span>
                                                            : <span className='badge text-bg-danger'>Block</span>
                                                        }
                                                    </td>
                                                    <td className='d-flex gap-3 align-items-center py-3'>
                                                        <Link to={`/admin/products/edit/${product.id}`} className='text-primary'>
                                                            <FaEdit />
                                                        </Link>
                                                        <button className='btn btn-link text-danger p-0' onClick={() => deleteProduct(product.id)}>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
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
