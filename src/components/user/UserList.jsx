import React, { useEffect, useState } from 'react';
import Layouts from '../common/Layouts';
import { Container } from 'react-bootstrap';
import Sidebar from '../common/Sidebar';
import Loader from '../common/Loader';
import Nostate from '../common/Nostate';
import { Link } from 'react-router-dom';
import { adminToken, apiUrl } from '../common/http';

const UserList = () => {
    
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);


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

    useEffect(()=>{
        fetchUsers()
    },[])
    

    return (
        <Layouts>
            <Container>
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Users</h4>
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
                                    loader == false && users.length == 0 && <Nostate text='Users not found'/>
                                }
                                {
                                users && users.length > 0 && 
                                <table className='table table-strped'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {
                                            users.map((user)=> (
                                            <tr>
                                                <td>
                                                    <Link to='#'>{user.id}</Link>

                                                </td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone ? user.phone: 'N/A'}</td>
                                            </tr>
                                            ))
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

export default UserList;