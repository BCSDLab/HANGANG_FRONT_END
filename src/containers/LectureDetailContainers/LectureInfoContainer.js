import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LectureDetailAPI from "api/lectureDetail";

import {
  Section,
  Wrapper,
  Title,
  SubTitleSection,
  SubTitle,
  SubLabel,
  Classification,
  Professor,
  Bookmark,
} from "containers/LectureDetailContainers/styles/LectureInfoContainer.style";

import { clickScrapIcon, unclickScrapIcon } from "store/modules/lectureDetailModule";
import { showAlertModal } from "store/modules/modalModule";

import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { triggerWhenNotLoggedIn } from "utils/reportUtils";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { convertHTMLEntities } from "utils/convertHTMLEntities";

function LectureInfoContainer({ lectureInfo = {} }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);

  const clickBookmark = async () => {
    try {
      if (!isLoggedIn && isCheckedToken) {
        triggerWhenNotLoggedIn({ history, dispatch });
      } else {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

        if (lectureInfo.is_scraped) {
          let { data } = await LectureDetailAPI.deleteLectureScrap(
            accessToken,
            lectureInfo.id
          );
          if (data.httpStatus === "OK") dispatch(unclickScrapIcon());
        } else {
          let { data } = await LectureDetailAPI.postLectureScrap(
            accessToken,
            lectureInfo.id
          );
          if (data.httpStatus === "OK") dispatch(clickScrapIcon());
        }
      }
    } catch (error) {
      if (error.response.data.code === 34) {
        dispatch(showAlertModal({ title: error.response.data.errorMessage }));
      } else if (error.response.data.code) {
        const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
        dispatch(showAlertModal({ title, content }));
      } else {
        throw new Error(error);
      }
    }
  };

  return (
    <Section>
      <Title>{`기본 정보`}</Title>
      <Wrapper>
        <SubTitleSection>
          <SubTitle>{convertHTMLEntities(lectureInfo.name)}</SubTitle>
          <SubLabel style={{ margin: "16px" }}>{lectureInfo.code}</SubLabel>
          <Classification>{lectureInfo.classification}</Classification>
        </SubTitleSection>

        <Professor>{lectureInfo.professor}</Professor>

        <SubLabel>
          {`개설학기 `}
          {lectureInfo.semester_data
            ? semesterNum(lectureInfo.semester_data.join(","))
            : `없음`}

          <Bookmark
            isScrapped={lectureInfo.is_scraped}
            onClick={() => clickBookmark(dispatch)}
          ></Bookmark>
        </SubLabel>
      </Wrapper>
    </Section>
  );
}

const semesterNum = (semester) => {
  return semester.replace("년 ", "-").replace("학기", "");
};
export default LectureInfoContainer;
