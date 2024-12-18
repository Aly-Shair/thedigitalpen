import React, { useState } from "react";
import {Input, Button} from '../index'
import { useForm } from "react-hook-form";
import authService from '../../appwrite/auth'
import {login as authLogin} from '../../store/authSlice'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Login() {

    const {register, handleSubmit} = useForm();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (data) =>{
      try {
        const session = await authService.login(data);
        if(session){
          const userData = await authService.getCurrentUser();
          console.log("user data -->" + userData)
          if(userData){
            dispatch(authLogin(userData));
            navigate('/')
          }
        }
      } catch (error) {
        setError(error.message);
      }   
    }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-3">Login to your account</h2>
        <p className="text-center text-muted">Don't have any account? <Link to="/signup">Sign-Up</Link></p>
    <form onSubmit={handleSubmit(login)} className="p-3">
      <div className="mb-3">
        <Input
            label = 'Email'
            type = 'email'
            placeholder = 'Enter your email'
            {
                ...register('email',{
                    required: true
                })
            }
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
      <Input
            label = 'Password'
            type = 'password'
            placeholder = 'Enter your password'
            {
                ...register('password',{
                    required: true
                })
            }
        />
      </div>
      <Button
        type = 'submit'
        value = 'Login'
        className="btn-outline-secondary w-100"
      />
    </form>
    
    {error && (
          <div className="alert alert-danger mt-3 text-center" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
