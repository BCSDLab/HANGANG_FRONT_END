import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AuthAPI from "api/auth";
import Container from "components/AuthComponents/Container";
import Logo from "components/AuthComponents/Logo";
import SignUpForm from "components/AuthComponents/SignUpForm";
import { signUp } from "store/modules/auth";

const SignUpContainer = () => {
  const { addToast } = useToasts();
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState({
    account: "",
    pw: "",
    pwConfirm: "",
    nickname: "",
    majors: [],
  });
  const [terms, setTerms] = useState({
    all: false,
    hangang: false,
    privacy: false,
  });

  useEffect(() => {
    if (userInfo !== null) {
      setSignUpInfo({ ...signUpInfo, account: userInfo.account });
    }
  }, [userInfo]);

  const onChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const onClickMajor = (value) => {
    if (!signUpInfo.majors.includes(value)) {
      setSignUpInfo({ ...signUpInfo, majors: [...signUpInfo.majors, value] });
    } else {
      const erasedMajor = signUpInfo.majors.filter((major) => major !== value);
      setSignUpInfo({ ...signUpInfo, majors: erasedMajor });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { majors, nickname, pw, account } = signUpInfo;
    const infos = {
      major: majors,
      nickname: nickname,
      password: pw,
      portal_account: account,
    };
    AuthAPI.signUp(infos)
      .then(({ status, data }) => {
        const { message } = data;
        if (status === 200) {
          addToast(message, {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch(signUp(signUpInfo));
          history.push("/login");
        }
      })
      .catch(({ response: { data, status } }) => {
        const { errorMessage } = data;
        if (status === 400) {
          addToast(errorMessage, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  };

  return (
    <Container>
      <Logo />
      <SignUpForm
        onChange={onChange}
        onSubmit={onSubmit}
        signUpInfo={signUpInfo}
        terms={terms}
        onClickMajor={onClickMajor}
      />
    </Container>
  );
};

export default SignUpContainer;
