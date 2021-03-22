import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import AuthAPI from "api/auth";
import AuthForm from "components/AuthComponents/AuthForm";
import Container from "components/AuthComponents/Container";
import Logo from "components/AuthComponents/Logo";
import { useDispatch } from "react-redux";
import { emailAuth } from "store/modules/auth";
import { useHistory } from "react-router-dom";

const EmailAuthContainer = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const [accountDisabled, setAccountDisabled] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    account: "",
    secret: "",
  });

  const onChange = (e) => {
    setAuthInfo({ ...authInfo, [e.target.name]: e.target.value });
  };

  const checkPortalEmail = (account) => {
    const infos = {
      flag: 0,
      portal_account: `${account}@koreatech.ac.kr`,
    };
    AuthAPI.requestEmail(infos)
      .then(({ data }) => {
        const { message, httpStatus } = data;
        if (httpStatus === "OK") {
          setAccountDisabled(true);
          addToast(message, {
            appearance: "success",
            autoDismiss: true,
          });
        } else if (httpStatus === "BAD_REQUEST") {
          addToast(message, {
            appearance: "error",
            authDismiss: true,
          });
        }
      })
      .catch(({ response: { data } }) => {
        const { errorMessage, httpStatus } = data;
        if (httpStatus === "BAD_REQUEST") {
          addToast(errorMessage, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  };

  const checkEmailConfig = (secret) => {
    const infos = {
      flag: 0,
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
          dispatch(emailAuth(authInfo));
          history.push("/signup");
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
      <AuthForm
        authInfo={authInfo}
        onChange={onChange}
        checkPortalEmail={checkPortalEmail}
        checkEmailConfig={checkEmailConfig}
        accountDisabled={accountDisabled}
      />
    </Container>
  );
};

export default EmailAuthContainer;
