import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/userReducer";
import goalReducer from "./reducers/goalReducer";
import headerReducer from "./reducers/headerReducer";

export default createStore(  
  combineReducers({userReducer,goalReducer,headerReducer})   
 );
