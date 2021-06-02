import React from "react";
import styled from "styled-components";

import ChangingSemesterBar from "components/TimetableComponents/ChangingSemesterBar";
import LectureAddContainer from "containers/TimetableContainers/LectureAddContainer";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 1000px;
  padding: 66px 0px;
  background-color: #f7f7f7;
`;

const MainContentsWrapper = styled.div`
  width: 1135px;
`;

const TimetableContainer = () => {
  return (
    <Background>
      <ChangingSemesterBar />
      <MainContentsWrapper>
        <LectureAddContainer />
      </MainContentsWrapper>
    </Background>
  );
};

export default TimetableContainer;
