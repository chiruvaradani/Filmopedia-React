import { createSlice } from "@reduxjs/toolkit";

const initialState=[]

const UserSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        LoggedUserData(state,action){
            return action.payload;
        }
    }
})

export const {LoggedUserData}=UserSlice.actions
export default UserSlice.reducer