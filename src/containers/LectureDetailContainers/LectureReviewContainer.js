import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import LectureDetailAPI from "api/lectureDetail";

import { addNextPageReviews, clickLikeIcon } from "store/modules/lectureDetailModule";
import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

import { getValueOnLocalStorage } from "utils/localStorageUtils";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import debounce from "lodash.debounce";
import { callReportModal } from "utils/reportUtils";

const Section = styled.section`
  width: 100%;
`;
const Wrapper = styled.section`
  padding: 40px;
`;

const ReviewInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const SubWarningLabel = styled.p`
  margin: 50px 0;
  text-align: center;
  font-size: 12px;
  line-height: normal;
  letter-spacing: normal;
  color: ${PlaceholderColor};
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
  z-index: 9990;
`;
const HalfStarIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/half-star.png",
  alt: "half-star",
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
const ThumbUpIcon = styled.img.attrs(({ isLiked }) => ({
  src: isLiked
    ? "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up_pushed.png"
    : "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up.png",
  alt: "thumb up",
}))`
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

/**
 * TODO:
 * - 좋아요 누를시 좋아요 불 들어오록 dispatch 수정
 *  - 좋아요 순 백엔드 확인해야함
 * - 무한스크롤
 *
 * - 신고 기능
 *  - 신고창 UI
 * @param {*} param0
 * @returns
 */
const LectureReviewContainer = ({ lectureId, lectureReviews, ...rest }) => {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const isAuthenticated = !isLoggedIn && isCheckedToken ? false : true;
  const dispatch = useDispatch();
  const history = useHistory();
  const { limit, page, maxPageOnComment } = useSelector(
    (state) => state.lectureDetailReducer
  );

  const clickLike = async (id) => {
    console.log(id);
    try {
      if (!isLoggedIn && isCheckedToken) {
        history.push("/login");
      } else {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
        let { data } = await LectureDetailAPI.postLectureReviewLike(accessToken, id);
        if (data.httpStatus === "OK") {
          dispatch(clickLikeIcon());
        }
      }
    } catch (error) {
      if (error.response.data.code) {
        alert(error.response.data.errorMessage);
      }
      throw new Error(error);
    }
  };

  /**
   * 스크린이 댓글 중 마지막 3번째 댓글을 보이게 되면 fetchMore를 호출합니다.
   * fetchMore는 현재 페이지와 최대 페이지를 비교하여, 최대 페이지를 넘어가지 않았다면
   * 새로운 페이지의 댓글을 호출합니다.
   */
  const getMoreReviews = async () => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
      let { data } = await ResourceDetailAPI.getComment(
        accessToken,
        lectureId,
        limit,
        page + 1
      );
      if (data.httpStatus === "OK") {
        dispatch(addNextPageReviews({ lectureReviews }));
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page < maxPageOnComment) {
      getMoreReviews();
    }
  }, 200);
  const { targetRef } = useInfiniteScroll(fetchMore, 5);

  return (
    <Section>
      <ReviewInfoSection>
        <InfoLabel>개인 평가({rest.lectureReviewCount})</InfoLabel>
        <FilterPickSection onClick={() => clickFilter(props.id, props.is_liked)}>
          <FilterPickLabel>{rest.sort}</FilterPickLabel>
          <LowArrowIcon></LowArrowIcon>
        </FilterPickSection>
      </ReviewInfoSection>

      <ReviewWrapper ref={targetRef}>
        {lectureReviews.result.map((props) => (
          <ReviewSection key={props.id}>
            <ReviewTitleSection>
              <ReviewWriterInfo>{props.semester_date} 수강자</ReviewWriterInfo>
              <ReviewStarSection>
                {[...Array(parseInt(props.rating))].map((num, idx) => {
                  return <StarIcon key={idx}></StarIcon>;
                })}
                {props.rating - parseInt(props.rating) === 0 && (
                  <HalfStarIcon></HalfStarIcon>
                )}
              </ReviewStarSection>
            </ReviewTitleSection>

            <SubLabelGrey>과제정보</SubLabelGrey>
            <SubLabel>{props.assignment.map((name) => name.name).join(" ")}</SubLabel>
            <ReviewContent>{props.comment}</ReviewContent>

            <ContentReportSection>
              <ThumbUpSection
                id={props.id}
                isLiked={props.is_liked}
                onClick={() => clickLike(props.id, props.is_liked)}
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
        ))}
        {lectureReviews.count === 0 && (
          <SubWarningLabel>등록된 개인 평가 정보가 없습니다.</SubWarningLabel>
        )}
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
