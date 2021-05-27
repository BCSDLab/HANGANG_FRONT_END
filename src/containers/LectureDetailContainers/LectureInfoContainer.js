import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import LectureDetailAPI from "api/lectureDetail";

import {
  BorderColor,
  InnerContentWidth,
  FontColor,
  ConceptColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { clickBookmarkIcon } from "store/modules/lectureDetailModule";

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

const Bookmark = styled.img.attrs((props) => ({
  alt: "스크랩",
  src: props.isScrapped
    ? "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/bookmark.png"
    : "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/bookmark.png",
}))`
  float: right;
  width: 24px;

  cursor: pointer;
`;

/**
 * TODO:
 * - 북마크 버튼 클릭해서 스크랩 기능 성공시 버튼 아이콘 스크랩된 상태의 아이콘으로 바꾸기
 * @param {*} param0
 * @returns
 */
const LectureInfoContainer = ({ lectureInfo, lectureId, isScrapped = false }) => {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const bookmarkLecture = async () => {
    try {
      if (!isLoggedIn && isCheckedToken) {
        const onConfirm = () => history.push("/login");
      } else {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
        if (isScrapped) {
          let { data } = await LectureDetailAPI.deleteLectureScrap(
            accessToken,
            lectureId
          );

          if (data.httpStatus === "OK") dispatch(clickBookmarkIcon());
          isScrapped = false;
        } else {
          let { data } = await LectureDetailAPI.postLectureScrap(accessToken, lectureId);
          if (data.httpStatus === "OK") dispatch(clickBookmarkIcon());
          isScrapped = true;
        }
      }
    } catch (error) {
      if (error.response.data.code) {
        alert(error.response.data.errorMessage);
      }
      throw new Error(error);
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
          {lectureInfo.semester_data ? lectureInfo.semester_data.join(" ") : `없음`}
          <Bookmark
            isScrapped={isScrapped}
            onClick={() => bookmarkLecture(dispatch)}
          ></Bookmark>
        </SubLabel>
      </Wrapper>
    </Section>
  );
};

LectureInfoContainer.defaultProps = {
  lectureInfo: {},
};

LectureInfoContainer.propTypes = {
  lectureInfo: PropTypes.object,
};

export default LectureInfoContainer;
