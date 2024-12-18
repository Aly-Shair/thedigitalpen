import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    replys: []
}

const commentsReplySlice = createSlice({
    name: 'reply',
    initialState,
    reducers:{
        setReplys: (state,action)=>{
            state.replys = action.payload;
        },
        addReply: (state, action) => {
            state.replys = [...state.replys, action.payload] 
        },
        removeReply: (state, action)=>{
            state.replys = state.replys.filter(reply => reply.$id != action.payload)
        }
    }
})

export const {setReplys, addReply, removeReply} = commentsReplySlice.actions;
export const commentsReplyReducers = commentsReplySlice.reducer;