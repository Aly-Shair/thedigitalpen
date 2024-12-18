import React from "react";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn({
    className = ''
}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () =>{
        try {
            const sessionEnd = await authService.logout();
            if(sessionEnd){
                dispatch(logout());
            }
        } catch (error) {
            throw error
        }
    }

    return(
        <button onClick={logoutHandler} type="button" className={`btn ${className}`}>Log-out</button>
    )
}