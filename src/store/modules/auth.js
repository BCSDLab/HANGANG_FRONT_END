// Actions
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const EMAIL_AUTH = "EMAIL_AUTH";
export const ACCESS_WITH_NOT_VERIFIED = "ACCESS_WITH_NOT_VERIFIED";
export const SIGNUP = "SIGNUP";
export const SUCCEED_TOKEN_CHECK = "SUCCEDED_TOKEN_CHECK";

// Action Creators
export const login = (payload) => ({ type: LOGIN, payload });
export const logout = (payload) => ({ type: LOGOUT, payload });
export const emailAuth = (payload) => ({ type: EMAIL_AUTH, payload });
export const accessWithNotVerified = () => ({ type: ACCESS_WITH_NOT_VERIFIED });
export const signUp = (payload) => ({ type: SIGNUP, payload });
export const succeedTokenCheck = (payload) => ({ type: SUCCEED_TOKEN_CHECK, payload });

const INITIAL_STATE = {
  account: "",
  token: "",
  isCheckedToken: false,
  isVerifiedEmail: false,
  isLoggedIn: false,
  errorCode: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE,
        isCheckedToken: true,
        errorCode: action.payload.errorCode,
      };
    case EMAIL_AUTH:
      return {
        ...state,
        account: action.payload,
        isVerifiedEmail: true,
      };
    case ACCESS_WITH_NOT_VERIFIED:
      return {
        ...INITIAL_STATE,
        errorCode: 0,
      };
    case SIGNUP:
      return {
        ...state,
        account: action.payload,
      };
    case SUCCEED_TOKEN_CHECK:
      return {
        ...state,
        token: action.payload.token,
        isCheckedToken: true,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      return state;
  }
}
