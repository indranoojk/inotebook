import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
// let history = useHistory();

const Signup = (props) => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})

    const onChange = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/login");
            // history.push("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

  return (
    <div className='container mt-2'>
    <h2 className='my-3'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit} id='signup' action="/signup" method="post">
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}


export default Signup

// import React from 'react'

// const Signup = () => {
//     return (
//         <div>
//             I am signup
//         </div>
//     )
// }

// export default Signup
