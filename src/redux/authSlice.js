import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const isPendingAction = (action) => {
    return action.type.endsWith("/pending")
}
const isRejectAction = (action) => {
    return action.type.endsWith("/rejected")
}
const handlePending = state => {
};
const handleRejected = state => {
    state.isRefreshing = false;
    state.isLoggedIn = false;
    // state.token = null;
    state.user = {
        name: null,
        email: null
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isRefreshing: false,
        isLoggedIn: false,
        token: null,
        user: {
            name: null,
            email: null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.token = null;
                state.user = {
                    name: null,
                    email: null
                };
            })
            .addCase(refreshUser.pending, (state, action) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isRefreshing = false;
                state.isLoggedIn = true;
                
                state.user = action.payload;
            })
            .addMatcher(isPendingAction, handlePending)
            .addMatcher(isRejectAction, handleRejected)
        .addDefaultCase((state, action)=>{state.error = "Default case activated"})

    } 
})

export const authReducer = authSlice.reducer