import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

import LectureDetailAPI from "api/lectureDetail";

import {
  Section,
  ReviewInfoSection,
  InfoLabel,
  FilterPickSection,
  FilterPickLabel,
  LowArrowIcon,
  ReviewWrapper,
  SpinnerWrapper,
  SubWarningLabel,
} from "containers/LectureDetailContainers/styles/LectureReviewContainer.style";
import FilterModal from "components/LectureDetailComponents/FilterModal";
import Review from "components/LectureDetailComponents/Review";
import LoadingSpinner from "components/Shared/LoadingSpinner";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import { addNextPageReviews, openFilterModal } from "store/modules/lectureDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const LectureReviewContainer = ({ lectureId, lectureReviews, ...rest }) => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const { limit, page, maxPage, sort, isFilterModalOpened, isLoading } = useSelector(
    (state) => state.lectureDetailReducer
  );

  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page < maxPage) {
      getMoreReviews({ lectureId, limit, page, sort }, isLoggedIn, dispatch);
    }
  }, 500);
  const { targetRef } = useInfiniteScroll(fetchMore, 2);

  return (
    <Section>
      <ReviewInfoSection>
        <InfoLabel>개인 평가({rest.lectureReviewCount})</InfoLabel>
        <FilterPickSection onClick={() => dispatch(openFilterModal())}>
          <FilterPickLabel>{rest.sort}</FilterPickLabel>
          <LowArrowIcon />
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
          <SubWarningLabel>{NO_COMMENT_INFO}</SubWarningLabel>
        )}

        {!isLoading &&
          lectureReviews.count !== 0 &&
          lectureReviews.result?.map((props, idx) => {
            return <Review key={props.id} idx={idx} props={props} />;
          })}
      </ReviewWrapper>
    </Section>
  );
};

const getMoreReviews = async ({ lectureId, limit, page, sort }, isLoggedIn, dispatch) => {
  try {
    const accessToken = isLoggedIn
      ? getValueOnLocalStorage("hangangToken").access_token
      : null;

    const {
      data: { count, result },
      status,
    } = await LectureDetailAPI.getLectureReviews(accessToken, lectureId, {
      limit,
      page: ++page,
      sort,
    });

    if (status === 200) dispatch(addNextPageReviews({ count, result }));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

LectureReviewContainer.defaultProps = {
  lectureReviews: {},
  rest: {},
};

LectureReviewContainer.propTypes = {
  lectureReviews: PropTypes.object,
  rest: PropTypes.object,
};

const NO_COMMENT_INFO = "등록된 개인 평가 정보가 없습니다.";

export default LectureReviewContainer;
