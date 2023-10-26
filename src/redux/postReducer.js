import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    posts:null,
    deletepost:null,
    allPosts:[],
    searchData:[],
    loading:false,
    error:null
};

//create post

export const createPost = createAsyncThunk('post/createPost',async(value)=>{
    try{
        const {data} = await axios.post('http://localhost:8000/post/create',value);
        // console.log(data);
        return data; 
    }catch(err){
        return console.log("Error in Creating post",err);
    }
})

// getAll Posts

export const getAllPost = createAsyncThunk('post/getAllPost',async()=>{
    try{
        const {data} = await axios.get('http://localhost:8000/post/getAll');
        return data;
    }catch(err){
        return console.log("error in getting all posts",err);
    }
})

export const deletePost = createAsyncThunk('post/deletePost',async(value)=>{
    try{
        const {id,user} = value;
        const {data} = await axios.delete(`http://localhost:8000/post/delete/?id=${id}&user=${user}`);
        return data;
    }catch(err){
        return console.log("Error in deleting post",err);
    }
})

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        searchPost:(state,action)=>{
            state.searchData = action.payload;
        }
    },
    extraReducers:{
        [createPost.pending]:(state,action)=>{
            state.loading = true;
        },
        [createPost.fulfilled]:(state,action)=>{
            state.loading = false;
            state.posts = action.payload;
        },[createPost.rejected]:(state,action)=>{
            state.loading = false;
            state.posts = action.payload;
        },
        [getAllPost.pending]:(state,action)=>{
            state.loading = true;
        },
        [getAllPost.fulfilled]:(state,action)=>{
            state.loading = false;
            state.allPosts = action.payload;
        },
        [getAllPost.rejected]:(state,action)=>{
            state.loading = false;
            state.allPosts = action.payload
        },
        [deletePost.pending]:(state,action)=>{
            state.loading = true;
        },
        [deletePost.fulfilled]:(state,action)=>{
            state.loading = false;
            state.deletepost = action.payload;
        },
        [deletePost.rejected]:(state,action)=>{
            state.loading = false;
            state.deletePost = action.payload;
        }
    }
});

export const postReducer = postSlice.reducer;
export const postActions = postSlice.actions;
export const postSelector = (state)=>state.postReducer;
export const deletePostSelector = (state)=>state.postReducer.deletepost;
export const allPostSelector = (state)=>state.postReducer.allPosts;
export const postSearchData = (state)=>(state.postReducer.searchData);
export const postLoading = (state)=>state.postReducer.loading;