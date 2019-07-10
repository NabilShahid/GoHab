import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import goalReducer from "./reducers/goalReducer";
import headerReducer from "./reducers/headerReducer";
import taskReducer from "./reducers/taskReducer";
import habitReducer from "./reducers/habitReducer";
import loadingReducer from "./reducers/loadingReducer";

const appReducer = combineReducers({
  userReducer,
  goalReducer,
  headerReducer,
  taskReducer,
  habitReducer,
  loadingReducer
});
/**
 * root reducer to empty all reducer states 
 */
const rootReducer = (state, action) => {
  if (action.type == "FLUSH_STORE") state = undefined;

  return appReducer(state, action);
};
export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
