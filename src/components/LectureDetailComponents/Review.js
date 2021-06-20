import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LectureDetailAPI from "api/lectureDetail";

import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

import { clickLikeIcon } from "store/modules/lectureDetailModule";
import { showAlertModal } from "store/modules/modalModule";

import { callReportModal } from "utils/reportUtils";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const ReviewSection = styled.div`
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
  :last-child {
    border: none;
  }
`;

const ReviewTitleSection = styled.div`
  display: block;
  margin: 0 0 4px 0;
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
  alt: "star",
})`
  width: 16px;
  height: 16px;
`;
const HalfStarIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/half-star.png",
  alt: "half-star",
})`
  width: 16px;
  height: 16px;
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
const ThumbUpIcon = styled.img.attrs(({ isLiked }) => ({
  src: isLiked
    ? "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up_pushed.png"
    : "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up.png",
  alt: "thumb up",
}))`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const ThumbUpPushedIcon = styled(ThumbUpIcon).attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up_pushed.png",
  alt: "thumb upped ",
})`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
const FilterPickSection = styled.div`
  margin-left: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const FilterPickLabel = styled.label`
  margin: 0 2px 0 0;
  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${FontColor};
`;
const LowArrowIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/arrow-low.png",
  alt: "arrow low",
})`
  width: 9px;
  height: 5px;
  margin-left: 4px;
`;
const SubLabelGrey = styled.label`
  margin: 4px 4px 8px 0;
  font-size: 12px;
  color: ${PlaceholderColor};
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

/**
 *  리뷰
 * TODO:
 * - 순서 클릭시 모달 띄우기
 * - 각 리뷰 좋아요 클릭시 반응 보여주기 (리덕스 사용 미숙으로 해매는 중입니다..)
 * @param {*} param0
 * @returns
 */
const LectureClassSection = ({ props, ...rest }) => {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const isAuthenticated = !isLoggedIn && isCheckedToken ? false : true;
  const dispatch = useDispatch();
  const history = useHistory();

  const clickLike = async (id, index) => {
    try {
      if (!isLoggedIn && isCheckedToken) {
        triggerWhenNotLoggedIn({ history, dispatch });
      } else {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
        let { data } = await LectureDetailAPI.postLectureReviewLike(accessToken, id);
        if (data.httpStatus === "OK") {
          dispatch(clickLikeIcon({ idx: index }));
        }
      }
    } catch (error) {
      if (error.response) {
        const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
        dispatch(showAlertModal({ title, content }));
      }
      console.dir(error);
      throw new Error(error);
    }
  };

  return (
    <ReviewSection>
      <ReviewTitleSection>
        <ReviewWriterInfo>{props.semester_date} 수강자</ReviewWriterInfo>

        <ReviewStarSection>
          {[...Array(parseInt(props.rating))].map((num, idx) => {
            return <StarIcon key={idx}></StarIcon>;
          })}
          {!Number.isInteger(props.rating) && <HalfStarIcon />}
        </ReviewStarSection>
      </ReviewTitleSection>

      <SubLabelGrey>과제정보</SubLabelGrey>
      <SubLabel>{props.assignment.map((name) => name.name).join(" ")}</SubLabel>
      <ReviewContent>{props.comment}</ReviewContent>

      <ContentReportSection>
        <ThumbUpSection
          id={props.id}
          isLiked={props.is_liked}
          onClick={() => clickLike(props.id, rest.idx)}
        >
          <ThumbUpIcon isLiked={props.is_liked} />
          <SubLabelGrey>{props.likes}</SubLabelGrey>
        </ThumbUpSection>
        <ReportButton
          onClick={() =>
            callReportModal("review", props.id, isAuthenticated, history, dispatch)
          }
        >
          신고
        </ReportButton>
      </ContentReportSection>
    </ReviewSection>
  );
};

export default LectureClassSection;
