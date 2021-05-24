// Actions
const SET_RESOURCE_INFO = "SET_RESOURCE_INFO";
const CLICK_HIT_ICON = "CLICK_HIT_ICON";
const PURCHASE_RESOURCE = "PURCHASE_RESOURCE";
const SCRAP_RESOURCE = "SCRAP_RESOURCE";
const UNSCRAP_RESOURCE = "UNSCRAP_RESOURCE";
const OPEN_ADDITIONAL_MODAL = "OPEN_ADDITIONAL_MODAL";
const CLOSE_ADDITIONAL_MODAL = "CLOSE_ADDITIONAL_MODAL";

// Action Creators
export const setResourceInfo = (payload) => ({ type: SET_RESOURCE_INFO, payload });
export const clickHitIcon = () => ({ type: CLICK_HIT_ICON });
export const purchaseResource = () => ({ type: PURCHASE_RESOURCE });
export const scrapResource = (payload) => ({ type: SCRAP_RESOURCE, payload });
export const unscrapResource = (payload) => ({ type: UNSCRAP_RESOURCE, payload });
export const openAdditionalModal = () => ({ type: OPEN_ADDITIONAL_MODAL });
export const closeAdditionalModal = () => ({ type: CLOSE_ADDITIONAL_MODAL });

const MODAL_STATE = {
  isAdditionalModalOpened: false,
};

const STATE = {
  ...MODAL_STATE,
};

export default function resourceDetailReducer(state = STATE, action) {
  switch (action.type) {
    case SET_RESOURCE_INFO:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case CLICK_HIT_ICON:
      return {
        ...state,
        hits: state.is_hit ? state.hits - 1 : state.hits + 1,
        is_hit: !state.is_hit,
      };
    case PURCHASE_RESOURCE:
      return {
        ...state,
        is_purchase: true,
      };
    case SCRAP_RESOURCE:
      return {
        ...state,
        user_scrap_id: 16,
      };
    case UNSCRAP_RESOURCE:
      return {
        ...state,
        user_scrap_id: 0,
      };
    case OPEN_ADDITIONAL_MODAL:
      return {
        ...state,
        isAdditionalModalOpened: true,
      };
    case CLOSE_ADDITIONAL_MODAL:
      return {
        ...state,
        isAdditionalModalOpened: false,
      };
    default:
      return state;
  }
}
