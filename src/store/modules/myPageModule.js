const SET_USER_INFOS = "SET_USER_INFOS";
const FINISH_LOAD_RESOURCES = "FINISH_LOAD_RESOURCES";

export const setUserInfos = (payload) => ({ type: SET_USER_INFOS, payload });
export const finishLoadResources = () => ({ type: FINISH_LOAD_RESOURCES });

const USER_INFO_STATE = {
  nickname: "",
  activityAmount: {},
  infos: {},
  pointRecords: [],
};

const STATE = {
  isLoaded: false,
  ...USER_INFO_STATE,
};

export default function myPageReducer(state = STATE, action) {
  switch (action.type) {
    case SET_USER_INFOS:
      return {
        ...state,
        activityAmount: action.payload.activityAmount,
        infos: action.payload.infos,
        pointRecords: action.payload.pointRecords,
      };
    case FINISH_LOAD_RESOURCES:
      return {
        ...state,
        isLoaded: true,
      };
    default:
      return STATE;
  }
}
