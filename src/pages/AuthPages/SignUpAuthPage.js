import EmailAuthContainer from "containers/AuthContainers/Shared/EmailAuthContainer";
import React from "react";

const SignUpAuthPage = () => {
  return <EmailAuthContainer emailAuthForWhat="signup" />;
};

export default SignUpAuthPage;
