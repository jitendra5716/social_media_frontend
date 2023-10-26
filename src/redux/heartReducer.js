import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    heart:null,
    loading:false,
    error:null
}

export const createHeart = createAsyncThunk('heart/createHeart',async(value)=>{
    try{
        const {data} = await axios.post("http://localhost:8000/heart/create",value);
        return data;
    }catch(err){
        return console.log("error in create heart",err);
    }
})

const heartSlice = createSlice({
    name:'heart',
    initialState,
    reducers:{

    },
    extraReducers:{
        [createHeart.pending]:(state,action)=>{
            state.loading = true;
        },
        [createHeart.fulfilled]:(state,action)=>{
            state.loading = false;
            state.heart = action.payload;
        },
        [createHeart.rejected]:(state,action)=>{
            state.loading = false;
            state.heart = action.payload;
        }
    }
});

export const heartReducer = heartSlice.reducer;
export const heartAction = heartSlice.actions;
export const heartSelector = (state)=>state.heartReducer.heart;