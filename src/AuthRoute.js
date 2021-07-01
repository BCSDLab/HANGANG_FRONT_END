import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const AuthRoute = ({ path, ...rest }) => {
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !isCheckedToken &&
      [LOGIN, FIND_PW_AUTH, FIND_PW, SIGNUP_AUTH, SIGNUP, MYPAGE].includes(path)
    ) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["INVALID_URL_ACCESS"];
      dispatch(showAlertModal({ title, content }));
    }

    if (
      [LOGIN, FIND_PW_AUTH, FIND_PW, SIGNUP_AUTH, SIGNUP].includes(path) &&
      isCheckedToken &&
      isLoggedIn
    ) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["ALREADY_LOGGED_IN"];
      dispatch(showAlertModal({ title, content }));
    }
  }, [path]);

  if (
    !isCheckedToken &&
    [LOGIN, FIND_PW_AUTH, FIND_PW, SIGNUP_AUTH, SIGNUP].includes(path)
  ) {
    return <Redirect from="*" to="/" />;
  }

  if (
    [LOGIN, FIND_PW_AUTH, FIND_PW, SIGNUP_AUTH, SIGNUP].includes(path) &&
    isCheckedToken &&
    isLoggedIn
  ) {
    return <Redirect from="*" to="/" />;
  }

  console.log("rest");
  return <Route {...rest} />;
};

const LOGIN = "/login";
const FIND_PW_AUTH = "/findpwauth";
const FIND_PW = "/findpw";
const SIGNUP_AUTH = "/signupauth";
const SIGNUP = "/signup";
const MYPAGE = "/my";

export default AuthRoute;
