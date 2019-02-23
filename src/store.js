import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/userReducer";
import goalReducer from "./reducers/goalReducer";

export default createStore(  
  combineReducers({userReducer,goalReducer})   
 );
