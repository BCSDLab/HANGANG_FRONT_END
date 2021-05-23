import React from "react";
import ReportModalContainer from "./ModalContainers/ReportModalContainer";

const ModalProvider = ({ children }) => {
  return (
    <>
      {children}
      <ReportModalContainer />
    </>
  );
};

export default ModalProvider;
