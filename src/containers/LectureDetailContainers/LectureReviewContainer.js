import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import LectureDetailAPI from "api/lectureDetail";

import styled from "styled-components";
import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

import FilterModal from "components/LectureDetailComponents/FilterModal";
import Review from "components/LectureDetailComponents/Review";

import { addNextPageReviews, openFilterModal } from "store/modules/lectureDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import debounce from "lodash.debounce";

import LoadingSpinner from "components/Shared/LoadingSpinner";

const Section = styled.section`
  width: 100%;
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
const SubWarningLabel = styled.p`
  margin: 50px 0;
  text-align: center;
  font-size: 12px;
  line-height: normal;
  letter-spacing: normal;
  color: ${PlaceholderColor};
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
  cursor: pointer;
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
const SpinnerWrapper = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
`;

const LectureReviewContainer = ({ lectureId, lectureReviews, ...rest }) => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const { limit, page, maxPage, sort, isFilterModalOpened, isLoading } = useSelector(
    (state) => state.lectureDetailReducer
  );
  /**
   * 무한 스크롤
   * 다음 페이지 리뷰를 호출합니다.
   */
  const getMoreReviews = async () => {
    try {
      const accessToken = isLoggedIn
        ? getValueOnLocalStorage("hangangToken").access_token
        : null;

      const {
        data: { count, result },
        status,
      } = await LectureDetailAPI.getLectureReviews(accessToken, lectureId, {
        limit: limit,
        page: page + 1,
        sort: sort,
      });

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
  }, 300);
  const { targetRef } = useInfiniteScroll(fetchMore, 5);

  return (
    <Section>
      <ReviewInfoSection>
        <InfoLabel>개인 평가({rest.lectureReviewCount})</InfoLabel>
        <FilterPickSection onClick={() => dispatch(openFilterModal())}>
          <FilterPickLabel>{rest.sort}</FilterPickLabel>
          <LowArrowIcon></LowArrowIcon>
        </FilterPickSection>
        {isFilterModalOpened && <FilterModal />}
      </ReviewInfoSection>

      <ReviewWrapper ref={targetRef}>
        {isLoading && (
          <SpinnerWrapper>
            <LoadingSpinner />
          </SpinnerWrapper>
        )}

        {!isLoading && lectureReviews.count === 0 && (
          <SubWarningLabel>등록된 개인 평가 정보가 없습니다.</SubWarningLabel>
        )}

        {!isLoading &&
          lectureReviews.count !== 0 &&
          lectureReviews.result.map((props, idx) => {
            return <Review key={props.id} idx={idx} props={props} />;
          })}
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
