import { configureStore } from "@reduxjs/toolkit";
import reducers from "./redux-slice/brandRegistrationSlice";

export const store = configureStore({
  reducer: { registrationReducer: reducers },
});
