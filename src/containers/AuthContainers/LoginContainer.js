import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import AuthAPI from "api/auth";
import Container from "components/AuthComponents/Container";
import CopyRight from "components/AuthComponents/CopyRight";
import HelpField from "components/AuthComponents/HelpField";
import LoginForm from "components/AuthComponents/LoginForm";
import Logo from "components/AuthComponents/Logo";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "store/modules/auth";

const LoginContainer = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    portal_account: "",
    password: "",
  });
  const [autoLogin, setAutoLogin] = useState(false);

  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthAPI.login(loginInfo)
      .then(({ status, data }) => {
        if (status === 200) {
          addToast("로그인에 성공하였습니다.", {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch(login(data));
          history.push("/");
        }
      })
      .catch(({ response: { data, status } }) => {
        const { code, errorMessage } = data;
        if (status === 400) {
          addToast(errorMessage, {
            appearance: "error",
            autoDismiss: true,
          });
        } else {
          if (code === 8) {
            // ACCESS TOKEN 요청
          } else if (code === 9) {
            // REFRESH TOKEN 요청
          }
        }
      });
  };

  return (
    <Container>
      <Logo />
      <LoginForm
        loginInfo={loginInfo}
        onChange={onChange}
        onSubmit={onSubmit}
        autoLogin={autoLogin}
        setAutoLogin={setAutoLogin}
      />
      <HelpField />
      <CopyRight />
    </Container>
  );
};

export default LoginContainer;
