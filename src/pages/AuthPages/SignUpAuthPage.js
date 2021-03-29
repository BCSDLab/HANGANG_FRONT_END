import EmailAuthContainer from "containers/AuthContainers/EmailAuthContainer";
import React from "react";

const SignUpAuthPage = () => {
  return <EmailAuthContainer findForWhat="signup" />;
};

export default SignUpAuthPage;
