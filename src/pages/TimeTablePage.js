import React from "react";
import TimetablePageContainer from "containers/TimetableContainers";
import AddTimetableComponent from "components/ModalComponents/TimetablePage/AddTimetableComponent";
import TimetableMoreComponent from "components/ModalComponents/TimetablePage/TimetableMoreComponent";
import LectureInfoModalComponent from "components/ModalComponents/TimetablePage/LectureInfoModalComponent";

const TimetablePage = () => {
  return (
    <>
      <TimetablePageContainer />
      <AddTimetableComponent />
      <TimetableMoreComponent />
      <LectureInfoModalComponent />
    </>
  );
};

export default TimetablePage;
