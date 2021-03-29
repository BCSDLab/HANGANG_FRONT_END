import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AuthAPI from "api/auth";
import Container from "components/AuthComponents/Container";
import HelpField from "components/AuthComponents/HelpField";
import LoginForm from "components/AuthComponents/LoginForm";
import { getValueOnLocalStorage, setValueOnLocalStorage } from "utils/localStorageUtils";
import { succeedTokenCheck } from "store/modules/auth";

const LoginContainer = () => {
  const { addToast } = useToasts();
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    portal_account: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);

  useEffect(() => {
    if (getValueOnLocalStorage("didHangangAutoLogin") !== null) {
      setAutoLogin(getValueOnLocalStorage("didHangangAutoLogin"));
    }

    if (account !== "") {
      setLoginInfo({ ...loginInfo, portal_account: `${account}` });
    }
  }, []);

  useEffect(() => {
    setValueOnLocalStorage("didHangangAutoLogin", autoLogin);
  }, [autoLogin]);

  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthAPI.login({
      ...loginInfo,
      portal_account: `${loginInfo.portal_account}@koreatech.ac.kr`,
    })
      .then((res) => {
        if (res.status === 200) {
          addToast("로그인에 성공하였습니다.", {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch(succeedTokenCheck({ isLoggedIn: true, token: res.data }));
          setValueOnLocalStorage("token", res.data);
          history.push("/");
        }
      })
      .catch(({ response: { data, status } }) => {
        if (status === 400) {
          addToast(data.errorMessage, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        setError(true);
      });
  };

  return (
    <Container>
      <LoginForm
        loginInfo={loginInfo}
        error={error}
        setError={setError}
        onChange={onChange}
        onSubmit={onSubmit}
        autoLogin={autoLogin}
        setAutoLogin={setAutoLogin}
      />
      <HelpField />
    </Container>
  );
};

export default LoginContainer;
