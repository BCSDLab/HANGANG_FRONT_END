import React from "react";
import { useSelector } from "react-redux";

import FetchingBox from "components/Shared/FetchingBox";
import {
  Label,
  Content,
  NoTimetableWrapper,
  NoTimetableSpan,
  GotoTimetable,
  GotoTimetableButton,
  Lecture,
  Name,
  Professor,
  AssessButton,
  AssessedButton,
} from "containers/IndexContainers/styles/MyTimetableContainer.style";

/**
 * MyTimetableContainer
 * 내 시간표 컨테이너입니다.
 * lectureList 크기에 따라 없으면 안내 문구, 있으면 내 시간표 강의를 보여줍니다.
 */
const MyTimetableContainer = () => {
  const { lectureList, isFetchFinished } = useSelector((state) => state.mainPageReducer);

  return (
    <>
      <Label>{MY_TIMETABLE_LABEL}</Label>
      <Content>
        {!isFetchFinished && <FetchingBox height={276} />}

        {isFetchFinished &&
          lectureList.filter(({ is_custom }) => !is_custom).length !== 0 &&
          lectureList
            .filter(({ is_custom }) => !is_custom)
            .map(({ name, professor, is_reviewed, id, lecture_id }) => (
              <Lecture key={id}>
                <Name>{name}</Name>
                <Professor>{professor}</Professor>
                {!is_reviewed && (
                  <AssessButton to={`/lecture/${lecture_id}`}>
                    {GO_TO_ASSESS}
                  </AssessButton>
                )}
                {is_reviewed && (
                  <AssessedButton as="div">{COMPLETE_ASSESS}</AssessedButton>
                )}
              </Lecture>
            ))}

        {isFetchFinished &&
          lectureList.filter(({ is_custom }) => !is_custom).length === 0 && (
            <NoTimetableWrapper>
              <NoTimetableSpan>
                <NoTimetableSpan>{NO_TIMETABLE_ALERT}</NoTimetableSpan>
                <GotoTimetable to="/timetable">
                  <GotoTimetableButton>{GO_TO_WRITE_ALERT}</GotoTimetableButton>
                </GotoTimetable>
              </NoTimetableSpan>
            </NoTimetableWrapper>
          )}
      </Content>
    </>
  );
};

const MY_TIMETABLE_LABEL = "내 시간표";
const NO_TIMETABLE_ALERT = "아직 작성한 시간표가 없습니다.";
const GO_TO_WRITE_ALERT = "작성하러 가기";
const GO_TO_ASSESS = "평가하기";
const COMPLETE_ASSESS = "평가완료";

export default MyTimetableContainer;
