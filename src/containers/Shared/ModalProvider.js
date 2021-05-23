import React from "react";
import AlertModalComponent from "components/ModalComponents/AlertModalComponent";
import ConfirmModalComponent from "components/ModalComponents/ConfirmModalComponent";
import ReportModalComponent from "components/ModalComponents/ReportModalComponent";

const ModalProvider = ({ children }) => {
  return (
    <>
      {children}
      <AlertModalComponent />
      <ConfirmModalComponent />
      <ReportModalComponent />
    </>
  );
};

export default ModalProvider;
