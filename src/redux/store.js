import { configureStore } from "@reduxjs/toolkit";
import { firebaseSlice } from "../slice/firebaseSlice";

export const store = configureStore({
  reducer: {
    firebase: firebaseSlice.reducer,
  },
});
