import {
  Content,
  Department,
  DepartmentLabel,
  Label,
  LectureList,
  LectureRow,
  Professor,
  Ranking,
  Rating,
  Title,
  TitleProfessorWrapper,
  Topbar,
} from "components/IndexComponents/LectureRanking/LectureRanking.style";
import React, { useEffect } from "react";
import {
  setDepartmentOnRanking,
  setDisplayLectureRanking,
} from "store/modules/mainPageModule";
import { useDispatch, useSelector } from "react-redux";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import DEPARTMENT_LIST from "static/IndexPage/DEPARTMENT_LIST";
import LectureAPI from "api/lecture";
import { showAlertModal } from "store/modules/modalModule";
import { useHistory } from "react-router-dom";

/**
 * LectureRankingContainer
 * 강의랭킹 페이지입니다.
 * department에 따라 API를 호출합니다.
 */
const LectureRankingContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentDepartment, displayLectures } = useSelector(
    (state) => state.mainPageReducer
  );

  useEffect(() => {
    fetchLecturesOnDepartment(currentDepartment.value, dispatch);
  }, [currentDepartment]);

  return (
    <>
      <Label>강의랭킹</Label>
      <Content>
        <Topbar>
          {DEPARTMENT_LIST.map(({ label, value }) => (
            <Department key={label} isTarget={label === currentDepartment.label}>
              <DepartmentLabel
                onClick={() =>
                  dispatch(setDepartmentOnRanking({ department: { label, value } }))
                }
              >
                {label}
              </DepartmentLabel>
            </Department>
          ))}
        </Topbar>
        <LectureList>
          {displayLectures.map(({ id, name, professor, total_rating }, index) => (
            <LectureRow key={index} onClick={() => history.push(`/lecture/${id}`)}>
              <Ranking>{`${++index}`.padStart(2, "0")}</Ranking>
              <TitleProfessorWrapper>
                <Title>{name}</Title>
                <Professor>{professor}</Professor>
              </TitleProfessorWrapper>
              <Rating>{total_rating.toFixed(1)}</Rating>
            </LectureRow>
          ))}
        </LectureList>
      </Content>
    </>
  );
};

const fetchLecturesOnDepartment = async (department, dispatch) => {
  try {
    const { data } = await LectureAPI.requestLecturesOnDepartment(department);
    dispatch(setDisplayLectureRanking({ lectures: data.result }));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

export default LectureRankingContainer;
