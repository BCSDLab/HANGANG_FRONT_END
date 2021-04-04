/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { debounce } from "lodash";

import AuthAPI from "api/auth";
import { kickOut } from "utils/kickOut";
import { signUp } from "store/modules/auth";

import Container from "components/AuthComponents/Shared/Container";
import SignUpForm from "components/AuthComponents/SignUp/SignUpForm";

/**
 * SignUpContainer
 * 사용자의 정보들을 받아 회원 가입을 요청합니다.
 * 회원 가입에 성공할 경우 홈으로 이동시킵니다.
 */
const SignUpContainer = () => {
  const { addToast } = useToasts();
  const { account, isVerifiedEmail } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState({});
  const [nicknameTest, setNicknameTest] = useState({
    tried: false,
    errorCode: "",
  });
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

  const letterLengthRegex = /^.{8,15}$/;
  const numberRegex = /[0-9]/gi;
  const symbolRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  useEffect(() => {
    if (!letterLengthRegex.test(signUpInfo.pw)) {
      setError({ pwLetterLengthError: true });
    } else if (!numberRegex.test(signUpInfo.pw)) {
      setError({ pwNumberError: true });
    } else if (!symbolRegex.test(signUpInfo.pw)) {
      setError({ pwSymbolError: true });
    } else {
      setError({});
    }

    if (signUpInfo.pw !== signUpInfo.pwConfirm) {
      setError((prev) => ({ ...prev, notEqualPw: true }));
    } else {
      setError((prev) => ({ ...prev, notEqualPw: false }));
    }
  }, [signUpInfo.pw, signUpInfo.pwConfirm]);

  useEffect(() => {
    if (account !== null) {
      setSignUpInfo({ ...signUpInfo, account: account });
    }
  }, [account]);

  /**
   * 약관 동의를 핸들링 하는 함수
   * 1. all 약관이 true가 아닌데 나머지 두개를 선택하는 경우
   * 2. all 을 true로 해서 모든 term이 true인데 다른 하나를 false하는 경우
   */
  useEffect(() => {
    if (!terms.all && terms.hangang && terms.privacy) {
      setTerms({ ...terms, all: true });
    } else if ((terms.all && !terms.hangang) || (terms.all && !terms.privacy)) {
      setTerms({ ...terms, all: false });
    }
  }, [terms]);

  const onChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  /**
   * sendQuery, delayedQueryCall, onNicknameChange
   * nickname 중복 체크 함수로, 300ms debounce를 걸어두었다.
   */
  const sendQuery = async (query) => {
    if (query.length === 0) return;
    try {
      const res = await AuthAPI.checkValidNickname(query);
      if (res.data.httpStatus === "OK") {
        setNicknameTest({ tried: true, errorCode: "" });
      }
    } catch ({ response }) {
      setNicknameTest({ tried: true, errorCode: response.data.code });
    }
  };
  const delayedQueryCall = useRef(debounce((q) => sendQuery(q), 300)).current;
  const onNicknameChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
    delayedQueryCall(e.target.value);
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

    const infos = {
      major: signUpInfo.majors,
      nickname: signUpInfo.nickname,
      password: signUpInfo.pw,
      portal_account: `${signUpInfo.account}@koreatech.ac.kr`,
    };
    AuthAPI.signUp(infos)
      .then(({ status }) => {
        if (status === 200) {
          addToast(
            `환영합니다. 
          한기대 강의평, 이제는 한강에서 만나요!`,
            {
              appearance: "success",
              autoDismiss: true,
            }
          );
          dispatch(signUp(signUpInfo.account));
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
    <>
      {!isVerifiedEmail && kickOut()}
      {isVerifiedEmail && (
        <Container>
          <SignUpForm
            error={error}
            nicknameTest={nicknameTest}
            signUpInfo={signUpInfo}
            terms={terms}
            setTerms={setTerms}
            onChange={onChange}
            onClickMajor={onClickMajor}
            onNicknameChange={onNicknameChange}
            onSubmit={onSubmit}
          />
        </Container>
      )}
    </>
  );
};

export default SignUpContainer;
