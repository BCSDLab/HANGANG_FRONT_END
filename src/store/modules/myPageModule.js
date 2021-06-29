const SET_USER_INFOS = "SET_USER_INFOS";
const SET_PURCHASED_RESOURCE = "SET_PURCHASED_RESOURCE";
const SET_SCRAPPED_LECTURES = "SET_SCRAPPED_LECTURES";
const REMOVE_SCRAPPED_LECTURES = "REMOVE_SCRAPPED_LECTURES";
const SET_SCRAPPED_RESOURCES = "SET_SCRAPPED_RESOURCES";
const REMOVE_SCRAPPED_RESOURCES = "REMOVE_SCRAPPED_RESOURCES";
const FINISH_LOAD_RESOURCES = "FINISH_LOAD_RESOURCES";

export const setUserInfos = (payload) => ({ type: SET_USER_INFOS, payload });
export const setPurchasedResource = (payload) => ({
  type: SET_PURCHASED_RESOURCE,
  payload,
});
export const setScrappedLectures = (payload) => ({
  type: SET_SCRAPPED_LECTURES,
  payload,
});
export const removeScrappedLectures = (payload) => ({
  type: REMOVE_SCRAPPED_LECTURES,
  payload,
});
export const setScrappedResources = (payload) => ({
  type: SET_SCRAPPED_RESOURCES,
  payload,
});
export const removeScrappedResources = (payload) => ({
  type: REMOVE_SCRAPPED_RESOURCES,
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
  scrappedLectures: [],
  scrappedResources: [],
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
    case SET_SCRAPPED_LECTURES:
      return {
        ...state,
        scrappedLectures: action.payload.lectures,
      };
    case REMOVE_SCRAPPED_LECTURES:
      return {
        ...state,
        scrappedLectures: state.scrappedLectures.filter(
          (elem) => !action.payload.selected.includes(elem.id)
        ),
      };
    case SET_SCRAPPED_RESOURCES:
      return {
        ...state,
        scrappedResources: action.payload.resources,
      };
    case REMOVE_SCRAPPED_RESOURCES:
      return {
        ...state,
        scrappedResources: state.scrappedResources.filter(
          (elem) => !action.payload.selected.includes(elem.scrap_id)
        ),
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
