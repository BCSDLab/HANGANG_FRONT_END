/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

import AuthAPI from "api/auth";
import Container from "components/AuthComponents/Shared/Container";
import FindPwForm from "components/AuthComponents/FindPw/FindPwForm";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const FindPwContainer = () => {
  const { addToast } = useToasts();
  const { account, isVerifiedEmail } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [error, setError] = useState({});
  const [infos, setInfos] = useState({
    newPw: "",
    confirmPw: "",
  });

  const letterLengthRegex = /^.{8,15}$/;
  const numberRegex = /[0-9]/gi;
  const symbolRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  useEffect(() => {
    if (!letterLengthRegex.test(infos.newPw)) {
      setError({ pwLetterLengthError: true });
    } else if (!numberRegex.test(infos.newPw)) {
      setError({ pwNumberError: true });
    } else if (!symbolRegex.test(infos.newPw)) {
      setError({ pwSymbolError: true });
    } else {
      setError({});
    }

    if (infos.newPw !== infos.confirmPw) {
      setError((prev) => ({ ...prev, notEqualPw: true }));
    } else {
      setError((prev) => ({ ...prev, notEqualPw: false }));
    }
  }, [infos.newPw, infos.confirmPw]);

  const onChange = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { newPw, confirmPw } = infos;

    if (newPw !== confirmPw) {
      addToast("비밀번호가 일치하지 않습니다.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (account === "") {
      // 비밀번호는 일치하지만 알 수 없는 이유로 계정이 전역 상태에 없는 경우
      addToast("사용자의 계정에 오류가 있습니다. 관리자에게 문의하세요.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      AuthAPI.renewPw({
        password: newPw,
        portal_account: `${account}@koreatech.ac.kr`,
      })
        .then(({ status }) => {
          if (status === 200) {
            addToast(
              `비밀번호가 변경되었습니다.
              환영합니다.
              한기대 강의평, 이제는 한강에서 만나요!
            `,
              {
                appearance: "success",
                autoDismiss: true,
              }
            );
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
    }
  };

  const kickOut = () => {
    history.push("/login");
    alert("이메일 인증 이후에 접근할 수 있습니다.");
  };

  return (
    <>
      {!isVerifiedEmail && kickOut()}
      {isVerifiedEmail && (
        <Container>
          <FindPwForm
            infos={infos}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </Container>
      )}
    </>
  );
};

export default FindPwContainer;
