// Actions
const SET_FORM = "SET_FORM";
const SET_DEFAULT_FORM = "SET_DEFAULT_FORM";
const SET_LECTURE_ID_WITH_TERM = "SET_LECTURE_ID_WITH_TERM";

// Action Creators
export const setForm = (key, value) => ({ type: SET_FORM, key, value });
export const setDefaultForm = () => ({ type: SET_DEFAULT_FORM });
export const setLectureIdWithTerm = (lecture_id, term) => ({
  type: SET_LECTURE_ID_WITH_TERM,
  lecture_id,
  term,
});

// Reducer
const DEFAULT_FORM_OPTIONS = {
  title: "",
  semester_id: 5,
  lecture_id: -1,
  term: {
    id: -1,
    name: "",
    code: "",
    professor: "",
  },
  category: ["기출자료"],
  content: "",
  materials: [], //  exclude when request ~/lecture-banks/write(POST) api bcz its already added.
};

const STATE = {
  ...DEFAULT_FORM_OPTIONS,
};

export default function resourceCreateReducer(state = STATE, action) {
  switch (action.type) {
    case SET_FORM:
      return {
        ...state,
        [action.key]: action.value,
      };
    case SET_LECTURE_ID_WITH_TERM:
      return {
        ...state,
        lecture_id: action.lecture_id,
        term: action.term,
      };
    case SET_DEFAULT_FORM:
      return {
        ...DEFAULT_FORM_OPTIONS,
      };
    default:
      return {
        ...state,
      };
  }
}
