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
  }, [isCheckedToken, isLoggedIn]);

  useEffect(() => getDefaultData(dispatch), []);

  return (
    <Background>
      {!isFetched ? (
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

/**
 * 우선 main 시간표와 유저가 만든 시간표 목록을 가져옵니다.
 * 이후, 검색 추가란의 강의들을 가져옵니다.
 * Default 강의들은 유저가 세팅한 메인 시간표의 학기를 기준으로 가져오게 됩니다.
 */
const getDefaultData = async (dispatch) => {
  try {
    const {
      fetchMainTimetable,
      fetchUserCreatedTimetables,
      fetchDefaultLectures,
    } = TimetableAPI;

    let [{ data: mainTimetable }, { data: userCreatedTimetable }] = await Promise.all([
      fetchMainTimetable(),
      fetchUserCreatedTimetables(),
    ]);

    userCreatedTimetable = userCreatedTimetable.map((t) => ({
      ...t,
      isMain: t.id === mainTimetable.id,
    }));

    dispatch(setDisplayTimetable({ displayTimetable: mainTimetable }));
    dispatch(setUserCreatedTimetable({ userCreatedTimetable }));

    const { data: defaultLectures } = await fetchDefaultLectures(
      mainTimetable.tableSemesterDate
    );

    dispatch(setLectureList(defaultLectures));
    dispatch(finishFetchDefaultData());
  } catch (error) {
    throw new Error(error);
  }
};

export default TimetablePageContainer;
