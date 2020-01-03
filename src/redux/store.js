import { createStore } from "redux";
import appReducer from "./App.reducer";
export const store = createStore(appReducer);
