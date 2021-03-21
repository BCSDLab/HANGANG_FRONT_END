// Actions
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const WITHDRAW = "WITHDRAW";
export const WITHDRAW_SUCCESS = "WITHDRAW_SUCCESS";
export const WITHDRAW_ERROR = "WITHDRAW_ERROR";

export const CHECK_NICKNAME = "CHECK_NICKNAME";
export const CHECK_NICKNAME_SUCCESS = "CHECK_NICKNAME_SUCCESS";
export const CHECK_NICKNAME_ERROR = "CHECK_NICKNAME_ERROR";

export const MODIFY_INFO = "MODIFY_INFO";
export const MODIFY_INFO_SUCCESS = "MODIFY_INFO_SUCCESS";
export const MODIFY_INFO_ERROR = "MODIFY_INFO_ERROR";

// Action Creators
export const login = (payload) => ({ type: LOGIN, payload });

const INITIAL_STATE = {
  token: null,
  userInfo: null,
  data: null,
  isExecuting: false,
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
        data: null,
        authInProgree: true,
      };
    default:
      return state;
  }
}
