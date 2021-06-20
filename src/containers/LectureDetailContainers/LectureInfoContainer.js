import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LectureDetailAPI from "api/lectureDetail";

import { clickScrapIcon, unclickScrapIcon } from "store/modules/lectureDetailModule";
import { showAlertModal } from "store/modules/modalModule";
import { FontColor, ConceptColor, PlaceholderColor } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { triggerWhenNotLoggedIn } from "utils/reportUtils";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const Section = styled.section`
  width: 100%;
  margin-bottom: 32px;
`;

const Wrapper = styled.section`
  padding: 16px;
`;

const Title = styled.label`
  display: block;
  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

const SubTitleSection = styled.div`
  display: block;
  margin-bottom: 8px;
`;
const SubTitle = styled.p`
  display: inline-block;
  font-size: 18px;
  color: ${FontColor};
`;
const SubLabel = styled.label`
  margin: 4px 8px 71px 0;
  font-size: 14px;
  color: ${PlaceholderColor};
`;

const Classification = styled.span`
  float: right;
  font-size: 14px;
  color: ${ConceptColor};
`;

const Professor = styled(Title)`
  margin-top: 14px;
  font-size: 16px;
  font-weight: normal;
`;

const Bookmark = styled.img.attrs(({ isScrapped }) => ({
  alt: "스크랩",
  src: isScrapped
    ? "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/bookmarked.png"
    : "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/bookmark.png",
}))`
  float: right;
  width: 14px;

  cursor: pointer;
`;

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
          <SubTitle>{lectureInfo.name}</SubTitle>
          <SubLabel style={{ margin: "16px" }}>{lectureInfo.code}</SubLabel>
          <Classification>{lectureInfo.classification}</Classification>
        </SubTitleSection>

        <Professor>{lectureInfo.professor}</Professor>

        <SubLabel>
          {`개설학기 `}
          {lectureInfo.semester_data
            ? semesterNum(lectureInfo.semester_data.join(","))
            : `없음`}

          {isLoggedIn && (
            <Bookmark
              isScrapped={lectureInfo.is_scraped}
              onClick={() => clickBookmark(dispatch)}
            ></Bookmark>
          )}
        </SubLabel>
      </Wrapper>
    </Section>
  );
}

const semesterNum = (semester) => {
  return semester.replace("년 ", "-").replace("학기", "");
};
export default LectureInfoContainer;
