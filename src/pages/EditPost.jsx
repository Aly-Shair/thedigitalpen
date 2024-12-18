import React, { useEffect, useState } from "react"
import { PostForm } from "../components"
import { useParams } from "react-router-dom"
import configService from "../appwrite/config";
import { useNavigate } from "react-router-dom"; 

export default function EditPost(){
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            configService.getPost(id).then((postData)=>{
                if(postData){
                    setPost(postData);
                }
            })
        }else{
            navigate('/')
        }
    },[id])

    return(
        <div className="container">
            <PostForm post={post}/>
        </div>
    )
}