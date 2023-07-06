import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProfiloReducer from "../reducers/ProfiloReducer";

const rootReducer = combineReducers({
  profilo: ProfiloReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
