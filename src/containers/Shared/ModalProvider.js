import React from "react";
import AlertModalContainer from "./ModalContainers/AlertModalContainer";
import ReportModalContainer from "./ModalContainers/ReportModalContainer";

const ModalProvider = ({ children }) => {
  return (
    <>
      {children}
      <AlertModalContainer />
      <ReportModalContainer />
    </>
  );
};

export default ModalProvider;
