import React, { useState } from 'react';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';


const Shipping = () => {

    const [disable, setDisable] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: async ()=> {
        
            await fetch(`${apiUrl}/get_shipping`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`,
            }
            }).then(res => res.json())
            .then(result => {
                if(result.status == 200){
                    reset({
                        shipping_charge: result.data.shipping_charge
                    })
                }else{
                    console.log('somethn went wrong')
                }
            })
        }
    });

    const saveShipping = async (data) => {
        setDisable(true)
        
        const res = await fetch(`${apiUrl}/save_shipping`, {
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
            <h4 className="h4 pb-0 mb-0">Shipping</h4>
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveShipping)}>
              <div className="card shadow">
                <div className="card-body p-4">

                  
                  <div className="mb-3">
                    <label className="form-label">Shipping Charge</label>
                    <input
                      type="text"
                      className={`form-control ${errors.shipping_charge ? 'is-invalid' : ''}`}
                      placeholder="Shipping Charge"
                      {...register('shipping_charge', {
                        required: 'The shipping charge field is required',
                      })}
                    />
                    {errors.shipping_charge && (
                      <div className="invalid-feedback">
                        {errors.shipping_charge.message}
                      </div>
                    )}
                  </div>

                  

                  <button
                   disabled={disable}
                   type="submit" className="btn btn-primary">
                    Save
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

export default Shipping;