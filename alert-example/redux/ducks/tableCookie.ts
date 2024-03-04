import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string = "5";

const tableCookieSlice = createSlice({
  name: "tableCookie",
  initialState,
  reducers: {
    setTableCookie(_, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setTableCookie } = tableCookieSlice.actions;
export default tableCookieSlice.reducer;
