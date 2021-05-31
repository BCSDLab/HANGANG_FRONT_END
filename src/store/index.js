import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./modules/auth";
import lectureReducer from "./modules/lecturesModule";
import lectureDetailReducer from "./modules/lectureDetailModule";
import resourceReducer from "./modules/resourcesModule";
import resourceCreateReducer from "./modules/resourceCreateModule";
import resourceDetailReducer from "./modules/resourceDetailModule";
import modalReducer from "./modules/modalModule";

const rootReducer = combineReducers({
  authReducer,
  lectureReducer,
  lectureDetailReducer,
  resourceReducer,
  resourceCreateReducer,
  resourceDetailReducer,
  modalReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
