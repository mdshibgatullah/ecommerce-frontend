import React, { useContext, useState } from 'react';
import Layouts from '../common/Layouts';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';




const Login = () => {

    const {login} = useContext(AdminAuthContext);
    const [loader, setLoader] = useState(false);

const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data)=>{
    setLoader(true)

    const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(result => {
        setLoader(false);

        if(result.status == 200){
            const adminInfo ={
                token: result.token,
                id: result.id,
                name: result.name
            }

            localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

            login(adminInfo);
            navigate('/admin/dashboard')

        }else{
            toast.error(result.message);
        }
    })
  }


    return (
        <Layouts>
            <Container className='d-flex justify-content-center py-5'>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="card shadow border-0 login">
                    <div className="card-body p-4">
                        <div className="card-body p-4">
                            <h3 className='mb-3 border-bottom pb-2'>User Login</h3>
                            
                                <div className='mb-2'>
                                    <label htmlFor="" className='form-label'>Email</label>
                                    <input
                                    {
                                        ...register('email',{
                                            required: "The email field is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            } 
                                        })
                                    }
                                    type="text" className={`form-control ${errors.email && 'is-invalid'}`} 
                                    placeholder='Email'/>
                                    {
                                        errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                    }
                                </div>

                                <div className='mb-2'>
                                    <label htmlFor="" className='form-label'>Password</label>
                                    <input
                                    {
                                        ...register('password',{
                                            required: 'The password field is required'
                                        })
                                    }
                                    type="password" className={`form-control ${errors.password && 'is-invalid'}`}  
                                    placeholder='Password'/>
                                    {
                                        errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                    }
                                </div>

                                <div className="text-end my-3">
                                    <Link to="/admin/forgot-password">Forgot Password?</Link>
                                </div>
                                
                                <button
                                disabled={loader}
                                 className='btn btn-secondary w-100 '>Login</button>

                                <div className="d-flex justify-content-center mt-3 gap-2">
                                    Don't have an account? <Link to="/admin/register">Register</Link>
                                </div>
                            
                        </div>
                    </div>
                </div>
                </form>
            </Container>
        </Layouts>
    );
};

export default Login;