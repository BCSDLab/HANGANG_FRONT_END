import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AuthAPI from "api/auth";
import Container from "components/AuthComponents/Shared/Container";
import HelpField from "components/AuthComponents/Login/HelpField";
import LoginForm from "components/AuthComponents/Login/LoginForm";
import { getValueOnLocalStorage, setValueOnLocalStorage } from "utils/localStorageUtils";
import { succeedTokenCheck } from "store/modules/auth";

/**
 * LoginContainer
 * 사용자의 아이디, 비밀번호를 받아 로그인 요청합니다.
 * 로그인에 성공할 경우 홈으로 이동시킵니다.
 * 사용자가 아이디, 비밀번호, 회원가입을 요청할 수 있도록 HelpField Component를 가지고 있습니다.
 */
const LoginContainer = () => {
  const { addToast } = useToasts();
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [autoLogin, setAutoLogin] = useState(true);
  const [error, setError] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    portal_account: "",
    password: "",
  });

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
          setValueOnLocalStorage("hangangToken", res.data);
          history.push("/");
        }
      })
      .catch(({ response: { status } }) => {
        if (status === 400) {
          setError(true);
        }
      });
  };

  return (
    <Container>
      <LoginForm
        autoLogin={autoLogin}
        error={error}
        loginInfo={loginInfo}
        setAutoLogin={setAutoLogin}
        setError={setError}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <HelpField />
    </Container>
  );
};

export default LoginContainer;
