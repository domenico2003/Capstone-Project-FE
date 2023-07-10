import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProfiloReducer from "../reducers/ProfiloReducer";
import HomeReducer from "../reducers/HomeReducer";

const rootReducer = combineReducers({
  profilo: ProfiloReducer,
  home: HomeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
