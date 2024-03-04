import { loadState, saveState } from "@/helpers/localStorageForRedux";
import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./ducks/url";
import tableCookieReducer from "./ducks/tableCookie";
import throttle from "lodash/throttle";
import apiDataReducer from "./ducks/apiData";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    url: urlReducer,
    apiData: apiDataReducer,
    tableCookie: tableCookieReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      url: store.getState().url,
      tableCookie: store.getState().tableCookie,
    });
  }, 1000)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
