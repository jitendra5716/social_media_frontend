import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userData :null,
    loading:false,
    error:null
};

export const userSelfData = createAsyncThunk('user/userData',async(value)=>{
    try{
        // console.log(value)
        const {data} = await axios.post("http://localhost:8000/user/profileData",value);
        return data;
    }catch(err){
        return console.log("Error in getting user Data ",err);
    }
})


const userDataSlice = createSlice({
    name:'userData',
    initialState,
    reducers:{

    },
    extraReducers:{
        [userSelfData.pending]:(state,action)=>{
            state.loading = true;
        },
        [userSelfData.fulfilled]:(state,action)=>{
            state.loading = false;
            state.userData = action.payload;
        },
        [userSelfData.rejected]:(state,action)=>{
            state.loading = false;
            state.userData = action.payload;
        }
    }
});

export const userDataReducer = userDataSlice.reducer;
export const userDataActions = userDataSlice.actions;
export const userDataSelector = (state)=>state.userDataReducer.userData;