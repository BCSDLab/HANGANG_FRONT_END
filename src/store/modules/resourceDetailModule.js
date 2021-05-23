// Actions
const SET_LECTURE_INFO = "SET_LECTURE_INFO";
const CLICK_HIT_ICON = "CLICK_HIT_ICON";
const OPEN_ADDITIONAL_MODAL = "OPEN_ADDITIONAL_MODAL";
const CLOSE_ADDITIONAL_MODAL = "CLOSE_ADDITIONAL_MODAL";

// Action Creators
export const setLectureInfo = (payload) => ({ type: SET_LECTURE_INFO, payload });
export const clickHitIcon = () => ({ type: CLICK_HIT_ICON });
export const openAdditionalModal = () => ({ type: OPEN_ADDITIONAL_MODAL });
export const closeAdditionalModal = () => ({ type: CLOSE_ADDITIONAL_MODAL });

const MODAL_STATE = {
  isAdditionalModalOpened: false,
};

const PURCHASE_STATE = {
  isPurchased: false,
};

const STATE = {
  ...MODAL_STATE,
  ...PURCHASE_STATE,
};

export default function resourceDetailReducer(state = STATE, action) {
  switch (action.type) {
    case SET_LECTURE_INFO:
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
