import React, { useState } from 'react';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import Sidebar from '../../common/Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';

const Edit = () => {

    const [disable, setDisable] = useState(false);
    const [category, setCategory] = useState([]);
    
        const navigate = useNavigate();
        const params = useParams();
    
        const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm({
            defaultValues: async ()=>{
                const res = await fetch(`${apiUrl}/categories/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`,
                }
                }).then(res => res.json())
                .then(result => {
                    if(result.status == 200){
                        setCategory(result.data)
                        reset({
                            name: result.data.name,
                            status: result.data.status,
                        })
                        
                    }else{
                        console.log('somethn went wrong')
                    }
                })
            }
        });
    

        const saveCategory = async (data) => {
            setDisable(true)
            
            const res = await fetch(`${apiUrl}/categories/${params.id}`, {
                method: 'PUT',
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
                        navigate('/admin/categories')
                    }else{
                        console.log('somethn went wrong')
                    }
                })
            };
    
    return (
        <Layouts>            
            <Container>
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Categories / Edit</h4>
                        <Link to='/admin/categories' className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(saveCategory)}>
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
                                    Update
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

export default Edit;