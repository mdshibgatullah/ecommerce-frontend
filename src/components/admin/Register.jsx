import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Layouts from '../common/Layouts';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl } from '../common/http';



const Register = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const navigate = useNavigate();

      const onSubmit = async (data)=>{
          console.log(data)
      
          const res = await fetch(`${apiUrl}/admin/register`, {
              method: 'POST',
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(res => res.json())
          .then(result => {
              console.log(result)
      
              if(result.status == 200){
                  toast.success(result.message);
                  navigate('/admin/login')
      
              }else{
                //   toast.error(result.message);
                 const formErrors = result.errors || {};
                Object.keys(formErrors).forEach(field => {
                setError(field, { type: 'manual', message: formErrors[field][0] });
                });
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
                            <h3 className='mb-3 border-bottom pb-2'>User Registration</h3>


                                <div className='mb-2'>
                                    <label htmlFor="" className='form-label'>Name</label>
                                    <input
                                    {
                                        ...register('name',{
                                            required: "The name field is required",
                                        })
                                    }
                                    type="text" className={`form-control ${errors.name && 'is-invalid'}`} 
                                    placeholder='Name'/>
                                    {
                                        errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                    }
                                </div>
                            
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
                                
                                <button className='btn btn-secondary w-100 mt-3'>Register</button>

                                <div className="d-flex justify-content-center mt-3 gap-2">
                                    Already have an account? <Link to="/admin/login">Login</Link>
                                </div>
                            
                        </div>
                    </div>
                </div>
                </form>
            </Container>
        </Layouts>
    );
};

export default Register;