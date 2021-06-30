import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ReviewSection,
  ReviewTitleSection,
  ReviewWriterInfo,
  ReviewStarSection,
  StarIcon,
  HalfStarIcon,
  ReviewContent,
  ContentReportSection,
  ReportButton,
  ThumbUpSection,
  ThumbUpIcon,
  SubLabelGrey,
  SubLabel,
} from "./styles/Review.style";

import LectureDetailAPI from "api/lectureDetail";

import { clickLikeIcon } from "store/modules/lectureDetailModule";
import { showAlertModal } from "store/modules/modalModule";

import { triggerWhenNotLoggedIn, callReportModal } from "utils/reportUtils";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

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
