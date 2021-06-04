import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import styled from "styled-components";
import LectureDetailAPI from "api/lectureDetail";
import FilterModal from "components/LectureDetailComponents/FilterModal";
import Review from "components/LectureDetailComponents/Review";
import {
  addNextPageReviews,
  clickLikeIcon,
  openFilterModal,
  openTimetableModal,
} from "store/modules/lectureDetailModule";
import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

import { getValueOnLocalStorage } from "utils/localStorageUtils";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import debounce from "lodash.debounce";

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

const ReviewSection = styled.div`
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
  :last-child {
    border: none;
  }
`;

const ReviewWrapper = styled.div`
  height: auto;

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
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
  const dispatch = useDispatch();
  const [reveiws, setReveiws] = useState("");
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const { limit, page, maxPage, sort, isFilterModalOpened } = useSelector(
    (state) => state.lectureDetailReducer
  );
  /**
   * 무한 스크롤
   * 다음 페이지 리뷰 호출합니다.
   */
  const getMoreReviews = async () => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
      const {
        data: { count, result },
        status,
      } = await LectureDetailAPI.getLectureReviews(
        accessToken,
        lectureId,
        limit,
        page + 1,
        sort
      );
      if (status === 200) {
        dispatch(addNextPageReviews({ count, result }));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page < maxPage) {
      getMoreReviews();
    }
  }, 20);
  const { targetRef } = useInfiniteScroll(fetchMore, 5);

  if (isFilterModalOpened) {
    console.log("modal-open");
  }

  return (
    <Section>
      <ReviewInfoSection>
        <InfoLabel>개인 평가({rest.lectureReviewCount})</InfoLabel>
        {/* <FilterPickSection onClick={() => clickFilter(props.id, props.is_liked)}> */}
        <FilterPickSection onClick={() => dispatch(openFilterModal())}>
          <FilterPickLabel style={{ cursor: "pointer" }}>{rest.sort}</FilterPickLabel>
          <LowArrowIcon></LowArrowIcon>
        </FilterPickSection>
        {isFilterModalOpened && (
          <FilterModal
            lectureId={lectureId}
            isLoggedIn={isLoggedIn}
            isCheckedToken={isCheckedToken}
          />
        )}
      </ReviewInfoSection>

      <ReviewWrapper ref={targetRef}>
        {lectureReviews.result.map((props, idx) => {
          return <Review key={props.id} idx={idx} props={props} />;
        })}

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
