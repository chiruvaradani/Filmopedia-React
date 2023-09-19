import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import tokenSlice from "./tokenSlice";

const Store=configureStore({
   reducer:{
    userData:UserSlice,
    token: tokenSlice,
   }
})

export default Store