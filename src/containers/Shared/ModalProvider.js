import React from "react";
import AlertModalComponent from "components/ModalComponents/AlertModalComponent";
import ConfirmModalComponent from "components/ModalComponents/ConfirmModalComponent";
import ReportModalComponent from "components/ModalComponents/ReportModalComponent";
import AddTimetableComponent from "components/ModalComponents/TimetablePage/AddTimetableComponent";
import TimetableMoreComponent from "components/ModalComponents/TimetablePage/TimetableMoreComponent";

const ModalProvider = ({ children }) => (
  <>
    {children}
    <AlertModalComponent />
    <ConfirmModalComponent />
    <ReportModalComponent />
    <AddTimetableComponent />
    <TimetableMoreComponent />
  </>
);

export default ModalProvider;
