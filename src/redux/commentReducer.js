import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    comment:null,
    deleteCmt:null,
    loading:false,
    error:null
};

export const createComment = createAsyncThunk('comment/createComment',async(value)=>{
    try{
        // console.log(value);
        const {data} = await axios.post('http://localhost:8000/comment/create',value);

        if(!data){
            return console.log("No comment found");
        }

        return data;
    }catch(err){
        return console.log("Error in creating comment",err);
    }
})

// delete Comment 

export const deleteComment = createAsyncThunk('comment/deleteComment',async(value)=>{
    try{
        const {id,post,user} = value;
        const {data} = await axios.delete(`http://localhost:8000/comment/delete/?id=${id}&post=${post}&user=${user}`);
        if(!data){
            return console.log("comment data not found");
        }
        return data;
    }catch(err){
        return console.log("Error in deleting comment",err);
    }
})

const commentSlice = createSlice({
    name:'comment',
    initialState,
    reducers:{

    },
    extraReducers:{
        [createComment.pending]:(state,action)=>{
            state.loading = true
        },
        [createComment.fulfilled]:(state,action)=>{
            state.loading = false;
            state.comment = action.payload
        },
        [createComment.rejected]:(state,action)=>{
            state.loading = false;
            state.comment = action.payload
        },
        [deleteComment.pending]:(state,action)=>{
            state.loading = true;
        },
        [deleteComment.fulfilled]:(state,action)=>{
            state.loading = false;
            state.deleteCmt = action.payload;
        },
        [deleteComment.rejected]:(state,action)=>{
            state.loading = false;
            state.deleteCmt = action.payload;
        }
    }
});

export const commentReducer = commentSlice.reducer;
export const commentActions = commentSlice.actions;
export const commentSelector = (state)=>state.commentReducer.comment;
export const deleteCmtSelector = (state)=>state.commentReducer.deleteCmt;