import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";


const initialState = {
    user:null,
    userSelf:null,
    allUsers:[],
    loading:false,
    error:null
};

export const signupUser = createAsyncThunk('user/signupUser',async(value)=>{
    try{
        const {data} = await axios.post('http://localhost:8000/user/register',value);   
    return data;
    }catch(err){
        return console.log("error in creating the user",err);
    }
    
});

export const signinUser = createAsyncThunk('user/signinUser',async(value)=>{
    try{
        const {data} = await axios.post('http://localhost:8000/user/login',value,{
            withCredentials: true,
          });

        return data;
    }catch(err){
        return console.log("Error in login the user",err);
    }
})

export const getProfile = createAsyncThunk('user/getProfile',async(value)=>{
    try{
        // console.log(value);
        const {data} = await axios.get('http://localhost:8000/user/profile',{
            headers: {
              Authorization: `${value}`,
            },
          });
        // console.log(data);
        return data;
    }catch(err){
        return console.log("Error in getting the user",err);
    }
})

export const friendProfile = createAsyncThunk('user/friendProfile',async(value)=>{
    try{
        const {data} = await axios.get(`http://localhost:8000/user/friend/${value}`);
        return data;
    }catch(err){
        return console.log("Error in finding friend profile",err);
    }
})

export const setInitial = createAsyncThunk('user/setInitial',async(value,thunkAPI)=>{
    try{
        // console.log(value);
        const {data} = await axios.get('http://localhost:8000/user/profile',{
            headers: {
              Authorization: `${value}`,
            },
          });
        // console.log(data);
        thunkAPI.setInitialState(data);
        return ;
    }catch(err){
        return console.log("Error in getting the user",err);
    }
})

export const signOutUser = createAsyncThunk('user/signOutUser',async()=>{
    const {data} =await axios.get('http://localhost:8000/user/logout',{
        withCredentials: true,
      });
    //   console.log(data);
    return data;
    
});

// get all users

export const getAllUsers = createAsyncThunk('user/getAllUsers',async()=>{
    const {data} = await axios.get('http://localhost:8000/user/getAll');
    if(!data){
        console.log("no data available");
    }
    // console.log(data);
    return data;
})

// update user data

export const updateUserData = createAsyncThunk('user/updateUserData',async({userId,updatedData})=>{
    try{
        // console.log(userId);
        // console.log(updatedData);
        const {data} = await axios.put(`http://localhost:8000/user/update/${userId}`,updatedData);
        return data;
    }catch(err){
        return console.log("Error in updating user data",err);
    }
})

// delete user

export const deleteUser = createAsyncThunk('user/deleteUser',async(value)=>{
    try{
        const {data} = await axios.delete(`http://localhost:8000/user/delete/${value}`);
        return data;
    }catch(err){
        return console.log("Error in deleting the user ",err);
    }
})

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setInitialState :(state,action)=>{
            state.user = action.payload;
        }
    },
    extraReducers:{
        [signupUser.pending]:(state,action)=>{
            state.loading = true;
        },
        [signupUser.fulfilled]:(state,action)=>{
            // console.log(action.payload);
            state.loading = false;
            state.user = action.payload
        },
        [signupUser.rejected]:(state,action)=>{
            // console.log(action.payload);
            state.loading = false;
            state.error = action.payload;
        },
        [signinUser.pending]:(state,action)=>{
            state.loading = true;
        },
        [signinUser.fulfilled]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [signinUser.rejected]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [getProfile.pending]:(state,action)=>{
            state.loading = true;
        },
        [getProfile.fulfilled]:(state,action)=>{
            state.loading = false;
            // console.log(action.payload);
            state.user = action.payload;
        },
        [getProfile.rejected]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [signOutUser.pending] : (state,action)=>{
            state.loading = true;
        },
        [signOutUser.fulfilled] : (state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [signOutUser.rejected]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [getAllUsers.pending]:(state,action)=>{
            state.loading = true;
        },
        [getAllUsers.fulfilled]:(state,action)=>{
            state.loading = false;
            state.allUsers = action.payload;
        },
        [getAllUsers.rejected]:(state,action)=>{
            state.loading = false;
            state.allUsers = action.payload;
        },
        [friendProfile.pending]:(state,action)=>{
            state.loading = true;
        },
        [friendProfile.fulfilled]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [friendProfile.rejected]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [updateUserData.pending]:(state,action)=>{
            state.loading = true;
        },
        [updateUserData.fulfilled]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [updateUserData.rejected]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [deleteUser.pending]:(state,action)=>{
            state.loading = true;
        },
        [deleteUser.fulfilled]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        [deleteUser.rejected]:(state,action)=>{
            state.loading = false;
            state.user= action.payload;
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state)=>state.userReducer.user;
export const allUsersSelector = (state)=>state.userReducer.allUsers;

