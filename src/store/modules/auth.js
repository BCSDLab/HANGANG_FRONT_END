// Actions
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const EMAIL_AUTH = "EMAIL_AUTH";
export const SIGNUP = "SIGNUP";
export const RENEW_PW = "RENEW_PW";
export const SUCCEED_TOKEN_CHECK = "SUCCEDED_TOKEN_CHECK";

// Action Creators
export const login = (payload) => ({ type: LOGIN, payload });
export const emailAuth = (payload) => ({ type: EMAIL_AUTH, payload });
export const signUp = (payload) => ({ type: SIGNUP, payload });
export const renewPw = (payload) => ({ type: RENEW_PW, payload });
export const succeedTokenCheck = (payload) => ({ type: SUCCEED_TOKEN_CHECK, payload });

const INITIAL_STATE = {
  token: "",
  didTokenCheck: false,
  account: "",
  isVerifiedEmail: false,
  isLoggedIn: false,
  isAvailable: false,
  checkedAutoLogin: false,
  error: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case EMAIL_AUTH:
      return {
        ...state,
        account: action.payload,
        isVerifiedEmail: true,
      };
    case SIGNUP:
      return {
        ...state,
        account: action.payload,
      };
    case RENEW_PW:
      return {
        ...state,
        // userInfo.pw: action.payload,
      };
    case SUCCEED_TOKEN_CHECK:
      return {
        ...state,
        token: action.payload.token,
        didTokenCheck: true,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      return state;
  }
}
