import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AuthAPI from "api/auth";
import AuthForm from "components/AuthComponents/AuthForm";
import Container from "components/AuthComponents/Container";
import { emailAuth } from "store/modules/auth";

const EmailAuthContainer = ({ findForWhat }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const [accountDisabled, setAccountDisabled] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    account: "",
    secret: "",
  });
  const [errorCode, setErrorCode] = useState();
  const [resend, setResend] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  const onChange = (e) => {
    setAuthInfo({ ...authInfo, [e.target.name]: e.target.value });
  };

  /**
   * 인증 완료를 누를 시 portal에 인증 메일을 보냅니다.
   * signup일 경우 flag가 0, findpw일 경우 1입니다.
   * @param {String} account 사용자의 계정 입니다. @koreatech.ac.kr가 없어야 합니다.
   */
  const checkPortalEmail = (account, resend) => {
    const infos = {
      flag: findForWhat === "signup" ? 0 : 1,
      portal_account: `${account}@koreatech.ac.kr`,
    };
    AuthAPI.requestEmail(infos)
      .then(({ data }) => {
        const { message, httpStatus } = data;
        if (httpStatus === "OK") {
          setAccountDisabled(true);
          setSentEmail(true);
          if (resend === "resend") {
            setResend(true);
          }
        } else if (httpStatus === "BAD_REQUEST") {
          addToast(message, {
            appearance: "error",
            authDismiss: true,
          });
        }
      })
      // .catch((res) => console.dir(res));
      .catch(({ response: { data } }) => {
        const { code, httpStatus } = data;
        if (httpStatus === "BAD_REQUEST") setErrorCode(code);
      });
  };

  /**
   * 인증 완료를 누를 시 portal에 인증 메일을 보냅니다.
   * signup일 경우 flag가 0, findpw일 경우 1입니다.
   * @param {Number} secret 사용자의 인증 번호입니다.
   */
  const checkEmailConfig = (secret) => {
    const infos = {
      flag: findForWhat === "signup" ? 0 : 1,
      portal_account: `${authInfo.account}@koreatech.ac.kr`,
      secret: secret,
    };
    AuthAPI.requestEmailConfig(infos)
      .then(({ status, data }) => {
        const { message } = data;
        if (status === 200) {
          addToast(message, {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch(emailAuth(authInfo.account));
          history.push(findForWhat === "signup" ? "/signup" : "/findpw");
        }
      })
      .catch(({ response: { data } }) => {
        const { code, httpStatus } = data;
        if (httpStatus === "BAD_REQUEST") setErrorCode(code);
      });
  };

  return (
    <Container>
      <AuthForm
        authInfo={authInfo}
        errorCode={errorCode}
        setErrorCode={setErrorCode}
        sentEmail={sentEmail}
        resend={resend}
        setResend={setResend}
        setAccountDisabled={setAccountDisabled}
        onChange={onChange}
        checkPortalEmail={checkPortalEmail}
        checkEmailConfig={checkEmailConfig}
        accountDisabled={accountDisabled}
      />
    </Container>
  );
};

export default EmailAuthContainer;
