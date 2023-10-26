import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { commentReducer } from "./commentReducer";
import { heartReducer } from "./heartReducer";
import { userDataReducer } from "./userDataReducer";

export const store = configureStore({
    reducer:{
        userReducer,
        postReducer,
        commentReducer,
        heartReducer,
        userDataReducer
    }
});