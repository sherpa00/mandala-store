import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfo: "",
    },
    reducers: {
        addUserInfo : (state,action) => {
            state.userInfo = action.payload;
        },
        removeUserInfo : (state) => {
            state.userInfo = "";
        }
    }
});

export const {addUserInfo,removeUserInfo} = userInfoSlice.actions;
export default userInfoSlice.reducer;