import { createSlice } from "@reduxjs/toolkit";



const profileSlice = createSlice({
    name:'profile',
    initialState:{
        profileImage:require('../assets/ProfilePic.jpeg'),
    },
    reducers:{
        setProfileImage:(state, action)=>{
            state.profileImage = action.payload;
        },
    },
});

export const {setProfileImage} = profileSlice.actions;
export default profileSlice.reducer;