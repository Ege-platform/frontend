import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    user: any;
};

type AuthData = {
    accessToken: string | null;
    user: any;
};

const authSlice = createSlice({
    name: "auth",
    initialState: <AuthState>{
        token: null,
        user: null,
    },
    reducers: {
        setCredentials: (state: AuthState, action: PayloadAction<AuthData>) => {
            // if (action.payload.accessToken === null) {
            //     return;
            // }
            state.token = action.payload.accessToken;
            state.user = action.payload.user;

            localStorage.setItem("token", state.token!);
        },
        setUser: (state: AuthState, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        logoutUser: (state: AuthState) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});

export default authSlice.reducer;
export const { setCredentials, logoutUser, setUser } = authSlice.actions;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
