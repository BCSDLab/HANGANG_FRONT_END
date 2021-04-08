import React from "react";
import EmailAuthContainer from "containers/AuthContainers/Shared/EmailAuthContainer";

const SignUpAuthPage = () => {
  return <EmailAuthContainer emailAuthForWhat="signup" />;
};

export default SignUpAuthPage;
