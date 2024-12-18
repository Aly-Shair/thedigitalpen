// import React, { useState } from "react";
// import {Input, Button} from '../index'
// import { useForm } from "react-hook-form";
// import authService from "../../appwrite/auth";
// import { login } from "../../store/authSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {

//     const {register, handleSubmit} = useForm();
//     const [error, setError] = useState();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const signup = async (data) => {
//       // console.log(data);
//       try {
//         const account = authService.createAccount(data);
//         if(account){
//           const userData = authService.getCurrentUser();
//           if(user){
//             dispatch(login(userData));
//             navigate('/');
//           }
//         }
//       } catch (error) {
//         setError(error);
//       }
//     }


//  return (
//   // <div className=" d-flex justify-content-center align-items-center min-vh-100">
//   <div className=" d-flex justify-content-center align-items-center">
//  <form onSubmit={handleSubmit(signup)} className="mx-auto w-50 p-4 border rounded shadow-sm">
//       <div className="mb-3">
//        <Input
//             label = 'Your Name'
//             type = 'text'
//             placeholder = 'Enter your Name'
//             {
//                 ...register('name',{
//                     required: true
//                 })
//             }
//         />
//       </div>
//       {/* {
//         <div className="mb-3 text-danger">
//               {
//                 error && error
//               }
//         </div>
//       } */}
//       <div className="mb-3">
//         <Input
//             label = 'Email'
//             type = 'email'
//             placeholder = 'Enter your email'
//             {
//                 ...register('email', {
//                     required: true  
//                 })
//             }
//         />
//         <div id="emailHelp" className="form-text">
//           We'll never share your email with anyone else.
//         </div>
//       </div>
//       <div className="mb-3">
//       <Input
//             label = 'Password'
//             type = 'password'
//             placeholder = 'Enter your password'
//             {
//                 ...register('password', {
//                     required: true
//                 })
//             }
//         />
//       </div>
//       <Button
//         type = 'submit'
//         value = 'Sign Up'
//       />
//     </form>
//   </div>
   
//   );
// }

import React, { useState } from "react";
import { Input, Button } from '../index';
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate('/');
        }
      }
    } catch (error) {
      // setError("Failed to create account. Please try again.");
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-3">Sign up for an account</h2>
        <p className="text-center text-muted">Already have an account? <Link to="/login">Login</Link></p>
        
        <form onSubmit={handleSubmit(signup)} className="p-3">
          <div className="mb-3">
            <Input
              label='Your Name'
              type='text'
              placeholder='Enter your Name'
              {...register('name', { required: true })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <Input
              label='Email'
              type='email'
              placeholder='Enter your email'
              {...register('email', { required: true })}
              className="form-control"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="mb-3">
            <Input
              label='Password'
              type='password'
              placeholder='Enter your password'
              {...register('password', { required: true })}
              className="form-control"
            />
          </div>
          <Button
            type='submit'
            value='Sign Up'
            className="btn btn-outline-secondary w-100"
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
