import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./modules/auth";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
