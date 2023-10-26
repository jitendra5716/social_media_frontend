import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    like:null,
    loading:false,
    error:null
};

export const createLike = createAsyncThunk('like/createLike',async(value)=>{
    try{
        const {data} = await axios.post('http://localhost:8000/like/create',value);
        return data;
    }catch(err){
        return console.log("Error in creatin like",err);
    }
})

const likeSlice = createSlice({
    name:'like',
    initialState,
    reducers:{

    },
    extraReducers:{
        [createLike.pending]:(state,action)=>{
            state.loading = true;
        },
        [createLike.fulfilled]:(state,action)=>{
            state.loading = false;
            state.like = action.payload;
        },
        [createLike.rejected]:(state,action)=>{
            state.loading = false;
            state.like = action.payload;
        }
    }
});

export const likeReducer = likeSlice.reducer;
export const likeActions = likeSlice.actions;
export const likeSelector = (state)=>state.likeReducer.like;