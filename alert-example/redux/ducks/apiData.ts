import {
  ResponseStatus,
  type ApiResponse,
} from "@/Service/helpers/serviceConstants";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IApiData {
  ok: boolean;
  errorMessage: string;
  data: any;
  loading: boolean;
  status?: ResponseStatus;
}

const initialState: IApiData = {
  ok: true,
  errorMessage: "",
  data: {},
  loading: false,
};

const apiDataSlice = createSlice({
  name: "apiData",
  initialState,
  reducers: {
    apiRequest(state) {
      state.ok = false;
      state.loading = true;
      state.data = {};
      state.errorMessage = "";
    },
    apiSuccess(state, action: PayloadAction<any>) {
      state.ok = true;
      state.errorMessage = "";
      state.data = action.payload;
      state.loading = false;
      state.status = ResponseStatus.OK;
    },
    apiFail(state, action: PayloadAction<ApiResponse>) {
      state.ok = false;
      state.errorMessage = action.payload.error;
      state.data = action.payload.data ? action.payload.data : {};
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const { apiRequest, apiSuccess, apiFail } = apiDataSlice.actions;
export default apiDataSlice.reducer;
