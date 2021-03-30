import EmailAuthContainer from "containers/AuthContainers/Shared/EmailAuthContainer";
import React from "react";

const SignUpAuthPage = () => {
  return <EmailAuthContainer findForWhat="signup" />;
};

export default SignUpAuthPage;
