import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";

import AuthAPI from "api/auth";
import { kickOut } from "utils/kickOut";
import { emailAuth } from "store/modules/auth";

import EmailAuthForm from "components/AuthComponents/EmailAuth/EmailAuthForm";
import Container from "components/AuthComponents/Shared/Container";

/**
 * EmailAuthContainer
 * 이메일 인증 페이지에서 사용하는 컨테이너 입니다.
 * 사용자의 이메일 인증을 위해 한강 백엔드 서버에게 이메일 요청을 하며,
 * 올바른 인증번호를 넣는지 체킹합니다.
 * 인증번호가 유효하다면 SignUp / FindPw 페이지로 이동시킵니다.
 * 공동 사용 중 : FindPwAuthPage, SignUpAuthPage
 */
const EmailAuthContainer = ({ emailAuthForWhat = "signup" }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const [accountDisabled, setAccountDisabled] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    account: "",
    secret: "",
  });
  const [errorCode, setErrorCode] = useState(0);
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
      flag: emailAuthForWhat === "signup" ? 0 : 1,
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
      flag: emailAuthForWhat === "signup" ? 0 : 1,
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
          history.push(emailAuthForWhat === "signup" ? "/signup" : "/findpw");
        }
      })
      .catch(({ response: { data } }) => {
        const { code, httpStatus } = data;
        if (httpStatus === "BAD_REQUEST") setErrorCode(code);
      });
  };

  return (
    <>
      {isLoggedIn && kickOut(2)}
      {!isLoggedIn && (
        <Container>
          <EmailAuthForm
            accountDisabled={accountDisabled}
            authInfo={authInfo}
            errorCode={errorCode}
            resend={resend}
            sentEmail={sentEmail}
            onChange={onChange}
            setAccountDisabled={setAccountDisabled}
            setErrorCode={setErrorCode}
            setResend={setResend}
            checkPortalEmail={checkPortalEmail}
            checkEmailConfig={checkEmailConfig}
          />
        </Container>
      )}
    </>
  );
};

EmailAuthContainer.propTypes = {
  emailAuthForWhat: PropTypes.string,
};

export default EmailAuthContainer;
