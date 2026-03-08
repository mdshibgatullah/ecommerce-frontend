import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import Sidebar from '../../common/Sidebar';
import { toast } from 'react-toastify';

const Create = () => {

    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const saveBrand = async (data) => {
        setDisable(true)
        
        const res = await fetch(`${apiUrl}/brands`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`,
            },
            body:JSON.stringify(data)
            }).then(res => res.json())
            .then(result => {
                setDisable(false);
                if(result.status == 200){
                    toast.success(result.message);
                    navigate('/admin/brands')
                }else{
                    console.log('something went wrong')
                }
            })
        };

    return (
        <Layouts>
            <Container>
                <div className="row">
                <div className="d-flex justify-content-between mt-5 pb-3">
                    <h4 className="h4 pb-0 mb-0">Brands / Create</h4>
                    <Link to="/admin/brands/create" className="btn btn-primary">
                    Back
                    </Link>
                </div>

                <div className="col-md-3">
                    <Sidebar />
                </div>

                <div className="col-md-9">
                    <form onSubmit={handleSubmit(saveBrand)}>
                    <div className="card shadow"> 
                        <div className="card-body p-4">

                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Name"
                            {...register('name', {
                                required: 'The name field is required',
                            })}
                            />
                            {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name.message}
                            </div>
                            )}
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                            {...register('status', {
                                required: 'Please select a status',
                            })}
                            >
                            <option value="">Select Status</option>
                            <option value="1">Active</option>
                            <option value="0">Block</option>
                            </select>
                            {errors.status && (
                            <div className="invalid-feedback">
                                {errors.status.message}
                            </div>
                            )}
                        </div>

                        <button
                        disabled={disable}
                        type="submit" className="btn btn-primary">
                            Create
                        </button>

                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </Container>
            </Layouts>
    );
};

export default Create;