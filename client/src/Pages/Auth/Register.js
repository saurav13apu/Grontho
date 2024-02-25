import React, {useState} from 'react'
import Layout from '../../Components/Layout/Layout';
import toast from 'react-hot-toast';
import axios, { Axios } from 'axios'
import {useNavigate} from 'react-router-dom'
import "../../styles/AuthStyles.css"
import { getClientKey } from 'login-secure';

const Register = () => {

  const [name, SetName]= useState("");
  const [email, SetEmail]= useState("");
  const [password, SetPassword]= useState("");
  const [address, SetAddress]= useState("");
  const [phone, SetPhone]= useState("");
  const [answer, SetAnswer]= useState("");
  const navigate = useNavigate()

  // form function
   const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
      {name, email, password, phone, address, answer});
      
      if(res && res.data.success){
        toast.success(res.data.message)
        navigate('/login')
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
   }
  
   console.log(process.env.REACT_APP_API);
   console.log({name, email, password, phone, address, answer});
  return (
    <Layout title={"Register- Grontho"}>
       <div className='form-container' >
        <h1>Register Form</h1>

     <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputName">Name</label>
    <input 
    type="text" 
    value={name}
    onChange={(e)=>SetName(e.target.value)}
    className="form-control" 
    id="exampleInputEmail1" 
    placeholder="Enter Name" 
    required/>
  </div>
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
  <div className="form-group">
    <label htmlFor="exampleInputName">Phone</label>
    <input 
    type="text" 
    value={phone}
    onChange={(e)=>SetPhone(e.target.value)}
    className="form-control" 
    id="exampleInputEmail1" 
    placeholder="Enter Name" 
    required/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputName">Address</label>
    <input 
    type="text" 
    value={address}
    onChange={(e)=>SetAddress(e.target.value)}
    className="form-control" 
    id="exampleInputEmail1" 
    placeholder="Enter Your Address" 
    required/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputName">Answer</label>
    <input 
    type="text" 
    value={answer}
    onChange={(e)=>SetAnswer(e.target.value)}
    className="form-control" 
    id="exampleInputEmail1" 
    placeholder="What is your fav date" 
    required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


       </div>
    </Layout>
  )
}

export default Register