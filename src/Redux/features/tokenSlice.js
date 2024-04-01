import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
  refresh_token: "",
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    set_Access_Tokken: (state, action) => {
      state.access_token = action.payload;
      localStorage.setItem("accessToken", action.payload);
      // console.log('*-----------accesstoken set');
    },
    set_Refresh_Token: (state, action) => {
      state.refresh_token = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
  },
});

export default tokenSlice.reducer;
export const { set_Access_Tokken, set_Refresh_Token } = tokenSlice.actions;
