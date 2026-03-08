import React, { useState } from 'react';
import Layouts from '../common/Layouts';
import { Container } from 'react-bootstrap';
import UserSidebar from '../common/UserSidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, userToken } from '../common/http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

const Account = () => {

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
    
            if (!userToken()) {
                navigate('/login');
                return {};
            }

            const res = await fetch(`${apiUrl}/account_details`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`,
                },
            });

            const result = await res.json();
            
            if (result.status === 200) {
                
                return {
                    name: result.data.name,
                    email: result.data.email,
                    city: result.data.city,
                    state: result.data.state,
                    mobile: result.data.mobile,
                    zip: result.data.zip,
                    address: result.data.address,
                };
            } else {
                navigate('/login');
                return {};
            }
        }
    });

    const updateAccount = async (data) => {
        setLoader(true);

        const res = await fetch(`${apiUrl}/update_account`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`,
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.status === 200) {
            toast.success(result.message);
            setLoader(false)
        } else {

            const formErrors = result.errors || {};

            Object.keys(formErrors).forEach(field => {
                setError(field, {
                    type: 'manual',
                    message: formErrors[field][0]
                });
            });
        }
        setLoader(false)
    }

    return (
        <Layouts>
            <Container>
                <div className="row">

                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Account</h4>
                    </div>

                    <div className="col-md-3">
                        <UserSidebar />
                    </div>

                    <div className="col-md-9">
                        <div className="card shadow mb-5">
                            <div className="card-body p-4">
                                {
                                    loader == true && <Loader />
                                }
                                {
                                loader == false &&
                                <form onSubmit={handleSubmit(updateAccount)}>

                                    <div className="row pt-3">

                                        {/* Name */}
                                        <div className="col-md-6 mb-3">
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

                                        {/* Email */}
                                        <div className="col-md-6 mb-3">
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

                                        {/* City */}
                                        <div className="col-md-6 mb-3">
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

                                        {/* State */}
                                        <div className="col-md-6 mb-3">
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

                                        {/* Zip */}
                                        <div className="col-md-6 mb-3">
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

                                        {/* Mobile */}
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errors.mobile && 'is-invalid'}`}
                                                placeholder='Mobile'
                                                {...register('mobile', { required: 'Mobile is required' })}
                                            />
                                            {errors.mobile && (
                                                <div className="invalid-feedback">
                                                    {errors.mobile.message}
                                                </div>
                                            )}
                                        </div>

                                        {/* Address */}
                                        <div className="col-12 mb-3">
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

                                        <button className='btn btn-primary mt-3'>
                                            Update
                                        </button>

                                    </div>

                                </form>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </Layouts>
    );
};

export default Account;