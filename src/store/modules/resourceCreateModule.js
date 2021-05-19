/* eslint-disable no-case-declarations */
// Actions
const SET_FORM = "SET_FORM";
const SET_DEFAULT_FORM = "SET_DEFAULT_FORM";
const SET_LECTURE_ID_WITH_TERM = "SET_LECTURE_ID_WITH_TERM";

const SET_FILES = "SET_FILES";
const ERASE_FILE = "ERASE_FILE";

// Action Creators
export const setForm = (key, value) => ({ type: SET_FORM, key, value });
export const setDefaultForm = () => ({ type: SET_DEFAULT_FORM });
export const setLectureIdWithTerm = (lecture_id, term) => ({
  type: SET_LECTURE_ID_WITH_TERM,
  lecture_id,
  term,
});
export const setFiles = ({ fileUrl, trimmedFiles }) => ({
  type: SET_FILES,
  fileUrl,
  trimmedFiles,
});
export const eraseFile = (fileId) => ({
  type: ERASE_FILE,
  fileId,
});

// Reducer
const DEFAULT_FORM_OPTIONS = {
  title: "",
  semester_id: 5,
  lecture_id: -1,
  category: ["기출자료"],
  content: "",
  files: [],
  file_infos: [], //  exclude when request ~/lecture-banks/write(POST) api
  term: {
    //  exclude when request ~/lecture-banks/write(POST) api
    id: -1,
    name: "",
    code: "",
    professor: "",
  },
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
    case SET_FILES:
      return {
        ...state,
        files: [...state.files, ...action.fileUrl],
        file_infos: [...state.file_infos, ...action.trimmedFiles],
      };
    case ERASE_FILE:
      let targetFile = state.files.find(
        (elem) => elem.split("-")[5].split(".")[0] === action.fileId
      );
      return {
        ...state,
        files: state.files.filter((file) => file !== targetFile),
        file_infos: state.file_infos.filter((file) => file.id !== action.fileId),
      };
    default:
      return {
        ...state,
      };
  }
}
