import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AuthLayout({children, authentication = false}){

    const authStatus = useSelector(state => state.auth.status);

    const navigate = useNavigate();
    useEffect(()=>{
        if(!authStatus){
            navigate('/login');
        }
        else if(authStatus && authentication){
            navigate('/')
        }
    }, [authStatus,authentication])

    return (authStatus||authentication)?children:null;

}