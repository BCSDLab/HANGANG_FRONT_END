import React from "react";
import styled from "styled-components";

import ChangingSemesterBar from "components/TimetableComponents/ChangingSemesterBar";
import AddLectureSection from "containers/TimetableContainers/AddLectureSection";
import TimetableSection from "containers/TimetableContainers/TimetableSection";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 66px 0px;
  background-color: #f7f7f7;
`;

const MainContentsWrapper = styled.div`
  width: 1135px;
  display: flex;
  justify-content: space-between;
`;

const TimetablePageContainer = () => {
  return (
    <Background>
      <ChangingSemesterBar />
      <MainContentsWrapper>
        <AddLectureSection />
        <TimetableSection />
      </MainContentsWrapper>
    </Background>
  );
};

export default TimetablePageContainer;
