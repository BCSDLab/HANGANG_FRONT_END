const SET_USER_INFOS = "SET_USER_INFOS";
const SET_PURCHASED_RESOURCE = "SET_PURCHASED_RESOURCE";
const FINISH_LOAD_RESOURCES = "FINISH_LOAD_RESOURCES";

export const setUserInfos = (payload) => ({ type: SET_USER_INFOS, payload });
export const setPurchasedResource = (payload) => ({
  type: SET_PURCHASED_RESOURCE,
  payload,
});
export const finishLoadResources = () => ({ type: FINISH_LOAD_RESOURCES });

const USER_INFO_STATE = {
  nickname: "",
  activityAmount: {},
  infos: {},
  pointRecords: [],
};

const STATE = {
  isLoaded: false,
  purchasedResource: [],
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
    case SET_PURCHASED_RESOURCE:
      return {
        ...state,
        purchasedResource: action.payload.resource,
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
