import { createSlice } from "@reduxjs/toolkit";

const initialState=''

const tokenslice=createSlice({
    name:'tokenSlice',
    initialState,
    reducers:{
        addToken(state,action){
            // console.log(`action.payload`, action.payload);
            localStorage.setItem('token',action.payload)
            return action.payload
        }
    }
});

export const {addToken} = tokenslice.actions;
export default tokenslice.reducer