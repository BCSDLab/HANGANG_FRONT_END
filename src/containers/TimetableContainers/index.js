import React, { useEffect } from "react";
import styled from "styled-components";

import ChangingSemesterBar from "components/TimetableComponents/ChangingSemesterBar";
import AddLectureSection from "containers/TimetableContainers/AddLectureSection";
import TimetableSection from "containers/TimetableContainers/TimetableSection";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { triggerWhenNotLoggedIn } from "utils/reportUtils";

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
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isCheckedToken && !isLoggedIn) {
      triggerWhenNotLoggedIn({ history, dispatch });
    }
  });

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
