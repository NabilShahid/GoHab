import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/userReducer";
import goalReducer from "./reducers/goalReducer";
import headerReducer from "./reducers/headerReducer";
import taskReducer from "./reducers/taskReducer";

export default createStore(  
  combineReducers({userReducer,goalReducer,headerReducer,taskReducer})   
 );
