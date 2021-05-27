import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import LectureDetailAPI from "api/lectureDetail";

import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { clickLikeIcon } from "store/modules/lectureDetailModule";

import { getValueOnLocalStorage } from "utils/localStorageUtils";

const Section = styled.section`
  width: 100%;
`;
const Wrapper = styled.section`
  padding: 40px;
`;

const InfoLabel = styled.label`
  display: block;
  margin: 32px 4px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;
const SubInfoLabel = styled.p`
  display: contents;
  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;
const SubLabelGrey = styled.label`
  margin: 4px 4px 8px 0;
  font-size: 12px;
  color: #999999;
`;
const SubLabelInfo = styled.label`
  display: block;
  margin: 4px 29px 8px 0;
  font-size: 12px;
  color: ##222222;
`;
const SubLabel = styled.label`
  margin: 4px 29px 8px 4px;
  font-size: 12px;
  color: ##222222;
`;

const ReviewSection = styled.div`
  border-bottom: 1px solid #eeeeee;
  :last-child {
    border: none;
  }
`;

const ReviewTitleSection = styled.div`
  display: block;
  margin: 24px 0 4px 0;
`;
const ReviewWriterInfo = styled.label`
  display: inline-felx;
  justtify-content: flex-start;
  font-size: 12px;
  color: ${FontColor};
`;
const ReviewStarSection = styled.div`
  float: right;
`;
const StarIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/star.png",
  alt: "stars",
})`
  width: 16px;
  height: 16px;
  z-index: 9990;
`;

const ReviewWrapper = styled.div`
  height: auto;

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const ReviewContent = styled.p`
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  color: ${FontColor};
`;

const ContentReportSection = styled.div``;
const ReportButton = styled.a`
  float: right;
  margin: 4px 0 0 0;

  font-size: 12px;
  text-align: right;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

const ThumbUpSection = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  cursor: pointer;
`;
const ThumbUpIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up.png",
  alt: "thumb up",
})`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  z-index: 9990;
`;
const ThumbUpPushedIcon = styled(ThumbUpIcon).attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up_pushed.png",
  alt: "thumb upped ",
})`
  width: 16px;
  height: 16px;
  margin-right: 4px;

  z-index: 9990;
`;

/**
 * TODO:
 * - 좋아요 누를시 좋아요 불 들어오록 css 수정
 *  - 좋아요 순 백엔드 확인해야함
 * - 무한스크롤
 * - 후기 평점 표시 array 고민중
 *
 * - 신고 기능
 *  - 신고창 UI
 * @param {*} param0
 * @returns
 */
const LectureReviewContainer = ({ lectureReviews, ...rest }) => {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(lectureReviews);
  const clickLike = async () => {
    try {
      console.log(this.props.id, this.props.isLiked);
      if (!isLoggedIn && isCheckedToken) {
        const onConfirm = () => history.push("/login");
      } else {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
        if (!is_liked) {
          let { data } = await LectureDetailAPI.postLectureReviewLike(accessToken, id);
          if (data.httpStatus === "OK") {
            dispatch(clickLikeIcon());
            is_liked = true;
          }
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
      <InfoLabel>개인 평가({rest.lectureReviewCount})</InfoLabel>

      <ReviewWrapper>
        {lectureReviews.result.map((props) => (
          <ReviewSection key={props.id}>
            <ReviewTitleSection>
              <ReviewWriterInfo>{props.semester_date} 수강자</ReviewWriterInfo>
              <ReviewStarSection>
                {/* {{ ...Array(props.rating) }.map((num, idx) => (
                  <StarIcon></StarIcon>
                ))} */}

                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
              </ReviewStarSection>
            </ReviewTitleSection>

            <SubLabelGrey>과제정보</SubLabelGrey>
            <SubLabel>{props.assignment.map(({ id, name }) => name + " ")}</SubLabel>
            <ReviewContent>{props.comment}</ReviewContent>

            <ContentReportSection>
              <ThumbUpSection
                id={props.id}
                isLiked={props.is_liked}
                onClick={() => clickLike(dispatch)}
              >
                {props.is_liked ? <ThumbUpPushedIcon /> : <ThumbUpIcon />}
                <SubLabelGrey>{props.likes}</SubLabelGrey>
              </ThumbUpSection>
              <ReportButton>신고</ReportButton>
            </ContentReportSection>
          </ReviewSection>
        ))}
      </ReviewWrapper>
    </Section>
  );
};

LectureReviewContainer.defaultProps = {
  lectureReviews: {},
  rest: {},
};
LectureReviewContainer.propTypes = {
  lectureReviews: PropTypes.object,
  rest: PropTypes.object,
};
export default LectureReviewContainer;
