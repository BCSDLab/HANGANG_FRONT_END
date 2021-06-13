import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Promise } from "core-js";

import TimetableAPI from "api/timetable";
import LoadingSpinner from "components/Shared/LoadingSpinner";
import ChangingSemesterBar from "components/TimetableComponents/ChangingSemesterBar";
import AddLectureSection from "containers/TimetableContainers/AddLectureSection";
import TimetableSection from "containers/TimetableContainers/TimetableSection";
import {
  finishFetchDefaultData,
  setDisplayTimetable,
  setLectureList,
  setUserCreatedTimetable,
} from "store/modules/timetableModule";
import { triggerWhenNotLoggedIn } from "utils/reportUtils";
import { Background, SpinnerWrapper, MainContentsWrapper } from "./index.style";

const TimetablePageContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const { isFetched } = useSelector((state) => state.timetableReducer);

  useEffect(() => {
    if (isCheckedToken && !isLoggedIn) {
      triggerWhenNotLoggedIn({ history, dispatch });
    }
  });

  useEffect(() => getDefaultData(dispatch), []);

  return (
    <Background>
      {!isFetched || (isCheckedToken && !isLoggedIn) ? (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      ) : (
        <>
          <ChangingSemesterBar />
          <MainContentsWrapper>
            <AddLectureSection />
            <TimetableSection />
          </MainContentsWrapper>
        </>
      )}
    </Background>
  );
};

const getDefaultData = async (dispatch) => {
  try {
    const {
      fetchDefaultLectures,
      fetchMainTimetable,
      fetchUserCreatedTimetables,
    } = TimetableAPI;
    let [
      { data: defaultLectures },
      { data: mainTimetable },
      { data: userCreatedTimetable },
    ] = await Promise.all([
      fetchDefaultLectures(),
      fetchMainTimetable(),
      fetchUserCreatedTimetables(),
    ]);

    userCreatedTimetable = userCreatedTimetable.map((t) => ({
      ...t,
      isMain: t.id === mainTimetable.id,
    }));

    dispatch(setLectureList(defaultLectures));
    dispatch(setDisplayTimetable({ displayTimetable: mainTimetable }));
    dispatch(setUserCreatedTimetable({ userCreatedTimetable }));

    dispatch(finishFetchDefaultData());
  } catch (error) {
    throw new Error(error);
  }
};

export default TimetablePageContainer;
