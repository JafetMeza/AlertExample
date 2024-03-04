import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setUrl(_, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setUrl } = urlSlice.actions;
export default urlSlice.reducer;
