import React, {useState} from 'react'
import Layout from '../../Components/Layout/Layout';
import toast from 'react-hot-toast';
import axios, { Axios } from 'axios'
import {useLocation, useNavigate} from 'react-router-dom'
import "../../styles/AuthStyles.css"
import { useAuth } from '../../context/auth';

const Login = () => {

  const [email, SetEmail]= useState("");
  const [password, SetPassword]= useState("");
  const [auth, setAuth] =useAuth()

  const navigate = useNavigate();
  const location = useLocation()

    // form function
   const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
      { email, password});
      
      if(res && res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/")
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
   }
  


  return (
    <Layout title={"Register- Grontho"}>
       <div className='form-container' >
        <h1>Login Form</h1>

     <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputName">Email</label>
    <input 
    type="email" 
    value={email}
    onChange={(e)=>SetEmail(e.target.value)}
    className="form-control" 
    id="exampleInputEmail1" 
    placeholder="Enter Name" 
    required/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input 
    type="password" 
    value={password}
    onChange={(e)=>SetPassword(e.target.value)}
    className="form-control" 
    id="exampleInputPassword1" 
    placeholder="Password" 
    required/>
  </div>

  <button type="submit" className="btn btn-primary mt-3">LogIn</button>
  <div className='mt-3'>
  <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}} >Forgot Password</button>
  </div>
</form>


       </div>
    </Layout>
  )
}

export default Login