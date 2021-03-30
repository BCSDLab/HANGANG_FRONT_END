import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AuthAPI from "api/auth";
import AuthForm from "components/AuthComponents/EmailAuth/EmailAuthForm";
import Container from "components/AuthComponents/Shared/Container";
import { emailAuth } from "store/modules/auth";

/**
 * EmailAuthContainer
 * @param {*} param0
 * @returns
 */
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
            addToast(
              `아우누리 메일을 확인해주세요.
              이메일 인증 완료 후 서비스를 이용할 수 있습니다.`,
              {
                appearance: "success",
                autoDismiss: true,
              }
            );
            setResend(true);
          }
        } else if (httpStatus === "BAD_REQUEST") {
          addToast(message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch(({ response: { data } }) => {
        const { code, httpStatus } = data;
        if (httpStatus === "BAD_REQUEST") setErrorCode(code);
        if (code === 22) {
          addToast(
            `하루 최대 5번의 인증 횟수가 만료되어 
            24시간 이후에 이용하실 수 있습니다.`,
            {
              appearance: "error",
              autoDismiss: true,
            }
          );
        }
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
