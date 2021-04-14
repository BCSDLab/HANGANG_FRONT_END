/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AuthAPI from "api/auth";

import Container from "components/AuthComponents/Shared/Container";
import FindPwForm from "components/AuthComponents/FindPw/FindPwForm";

/**
 * FindPwContainer
 * 사용자가 새로운 비밀번호를 설정하도록 해줍니다.
 * 올바른 비밀번호를 입력하는지 체킹하며,
 * 정상적인 비밀번호를 입력했을 경우 로그인 페이지로 이동시킵니다.
 */
const FindPwContainer = () => {
  const { addToast } = useToasts();
  const { account } = useSelector((state) => state.authReducer);
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

  return (
    <>
      <Container>
        <FindPwForm error={error} infos={infos} onChange={onChange} onSubmit={onSubmit} />
      </Container>
    </>
  );
};

export default FindPwContainer;
