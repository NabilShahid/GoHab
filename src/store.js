import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import goalReducer from "./reducers/goalReducer";
import headerReducer from "./reducers/headerReducer";
import taskReducer from "./reducers/taskReducer";
import habitReducer from "./reducers/habitReducer";
import loadingReducer from "./reducers/loadingReducer";

export default createStore(
  combineReducers({
    userReducer,
    goalReducer,
    headerReducer,
    taskReducer,
    habitReducer,
    loadingReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
