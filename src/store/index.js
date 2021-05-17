import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./modules/auth";
import lectureReducer from "./modules/lectures";
import resourceDetailReducer from "./modules/resourceDetail";

const rootReducer = combineReducers({
  authReducer,
  lectureReducer,
  resourceDetailReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
