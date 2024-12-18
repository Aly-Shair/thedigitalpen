import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./authSlice";
import { postReducers } from "./postSlice"; 
import { commentReducers } from "./commentSlice";
import {commentsReplyReducers} from './commentsReplySlice'

const store = configureStore({
    reducer:{
        auth: authReducers,
        post: postReducers,
        comment: commentReducers,
        reply: commentsReplyReducers
    }
})

export default store;