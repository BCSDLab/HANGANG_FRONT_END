import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./modules/auth";
import lectureReducer from "./modules/lectures";
import resourceReducer from "./modules/resources";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
  lectureReducer,
  resourceReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
