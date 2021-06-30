/* eslint-disable no-case-declarations */
const SET_USER_INFOS = "SET_USER_INFOS";
const SET_PURCHASED_RESOURCE = "SET_PURCHASED_RESOURCE";
const SET_SCRAPPED_LECTURES = "SET_SCRAPPED_LECTURES";
const REMOVE_SCRAPPED_LECTURES = "REMOVE_SCRAPPED_LECTURES";
const SET_SCRAPPED_RESOURCES = "SET_SCRAPPED_RESOURCES";
const REMOVE_SCRAPPED_RESOURCES = "REMOVE_SCRAPPED_RESOURCES";
const SET_USER_MAJOR = "SET_USER_MAJOR";
const CHANGE_USER_INFOS = "CHANGE_USER_INFOS";
const CHANGE_RESOURCE_IS_HIT_STATUS = "CHANGE_RESOURCE_IS_HIT_STATUS";
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
export const setUserMajor = (payload) => ({
  type: SET_USER_MAJOR,
  payload,
});
export const changeUserInfos = (payload) => ({ type: CHANGE_USER_INFOS, payload });
export const changeResourceIsHitStatus = (payload) => ({
  type: CHANGE_RESOURCE_IS_HIT_STATUS,
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
  isFetchedUserInfos: false,
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
    case SET_USER_MAJOR:
      return {
        ...state,
        infos: {
          ...state.infos,
          major: action.payload.major,
        },
      };
    case CHANGE_USER_INFOS:
      return {
        ...state,
        infos: {
          ...state.infos,
          name: action.payload.name,
          nickname: action.payload.nickname,
        },
      };
    case CHANGE_RESOURCE_IS_HIT_STATUS:
      const resources = state.scrappedResources.reduce((acc, curr) => {
        if (curr.id === action.payload.id) {
          if (curr.is_hit) {
            curr = { ...curr, is_hit: !curr.is_hit, hits: --curr.hits };
          } else {
            curr = { ...curr, is_hit: !curr.is_hit, hits: ++curr.hits };
          }
        }
        acc.push(curr);
        return acc;
      }, []);
      return {
        ...state,
        scrappedResources: [...resources],
      };
    case FINISH_LOAD_RESOURCES:
      return {
        ...state,
        isFetchedUserInfos: true,
      };
    default:
      return {
        ...state,
      };
  }
}
