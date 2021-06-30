import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./modules/auth";
import lectureReducer from "./modules/lecturesModule";
import lectureDetailReducer from "./modules/lectureDetailModule";
import resourceReducer from "./modules/resourcesModule";
import resourceCreateReducer from "./modules/resourceCreateModule";
import resourceDetailReducer from "./modules/resourceDetailModule";
import modalReducer from "./modules/modalModule";
import myPageReducer from "./modules/myPageModule";
import mainPageReducer from "./modules/mainPageModule";
import timetableReducer from "./modules/timetableModule";

const rootReducer = combineReducers({
  authReducer,
  lectureReducer,
  lectureDetailReducer,
  mainPageReducer,
  resourceReducer,
  resourceCreateReducer,
  resourceDetailReducer,
  modalReducer,
  myPageReducer,
  timetableReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
