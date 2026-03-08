import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/http";
import Layouts from "../common/Layouts";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {


    const [showPassword,setShowPassword] = useState(false);
    const [email,setEmail] = useState("");

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState:{errors}
        } = useForm();

    const checkEmail = async(data)=>{

        const res = await fetch(`${apiUrl}/check-email`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
            });

        const result = await res.json();

        if(result.status === 200){
            setEmail(data.email);
            setShowPassword(true);
            toast.success("Email Found");
        }else{
            toast.error(result.message);
        }

    }

    const updatePassword = async(data)=>{

        data.email = email;

        const res = await fetch(`${apiUrl}/update-password`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        });

        const result = await res.json();

    if(result.status === 200){
        toast.success(result.message);

        setTimeout(()=>{
        navigate("/account/login");
        },1500);

    }else{
        toast.error(result.message);
    }

    }

return(

    <Layouts>
        <Container className="d-flex justify-content-center py-5">

        <div className="card shadow border-0 login">
            <div className="card-body p-4">

              <h3 className="mb-3 border-bottom pb-2">Forgot Password</h3>

            {/* Step 1 Email */}

            {!showPassword &&

            <form onSubmit={handleSubmit(checkEmail)}>

                <div className="mb-3">

                <label className="form-label">Email</label>

                <input
                    type="email"
                    className={`form-control ${errors.email && "is-invalid"}`}
                    placeholder="Enter Email"
                    {...register("email",{
                    required:"Email is required"
                    })}
                />

                {errors.email && <p className="invalid-feedback">{errors.email?.message}</p>}

                </div>

                <button className="btn btn-secondary w-100 mt-2">
                    Check Email
                </button>

            </form>

            }

            {/* Step 2 Password */}

            {showPassword &&

            <form onSubmit={handleSubmit(updatePassword)}>

            <div className="mb-3">

            <label className="form-label">New Password</label>

            <input
            type="password"
            className={`form-control ${errors.password && "is-invalid"}`}
            placeholder="New Password"
            {...register("password",{
            required:"Password is required"
            })}
            />

            {errors.password && <p className="invalid-feedback">{errors.password?.message}</p>}

            </div>

            <div className="mb-3">

            <label className="form-label">Confirm Password</label>

            <input
            type="password"
            className={`form-control ${errors.password_confirmation && "is-invalid"}`}
            placeholder="Confirm Password"
            {...register("password_confirmation",{
            required:"Confirm password is required"
            })}
            />

            {errors.password_confirmation && <p className="invalid-feedback">{errors.password_confirmation?.message}</p>}

            </div>

            <button className="btn btn-secondary w-100">
            Update Password
            </button>

            </form>

            }

            </div>
        </div>

        </Container>
    </Layouts>

)
}

export default ForgotPassword;