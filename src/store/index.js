import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./modules/auth";
import lectureReducer from "./modules/lectures";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
  lectureReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
