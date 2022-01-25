import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AddUser = () => {
    const nameRef=useRef();
    const emailRef=useRef();

    const location=useLocation();
    const history=useHistory();
    const url=location.state?.from || '/users'

    const handleAddUser=e=>{
        const name=nameRef.current.value;
        const email=emailRef.current.value;
        const newUser={name,email};
        fetch('http://localhost:5000/users',{
            method:"POST",
            headers:{"content-type":"application/json"
        },
        body:JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                alert("User added Success");
                e.target.reset();
                history.push(url)
            }
        })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Please Add an User</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" placeholder='Name' ref={nameRef}/>
                <input type="text" placeholder='Email' ref={emailRef}/>
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddUser;