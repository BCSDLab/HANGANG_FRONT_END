import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LectureDetailAPI from "api/lectureDetail";

import { setLectureInfo } from "store/modules/lectureDetailModule";
import { BorderColor, InnerContentWidth } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import LectureInfoContainer from "./LectureInfoContainer";
import LectureGraphContainer from "./LectureGraphContainer";
import LectureResourceContainer from "./LectureResourceContainer";
import LectureReviewContainer from "./LectureReviewContainer";
import LectureClassContainer from "./LectureClassContainer";

import LoadingSpinner from "components/Shared/LoadingSpinner";
import { showAlertModal } from "store/modules/modalModule";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  margin: 40px auto 32px auto;
`;

const Content = styled.div`
  display: grid;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ReviewSection = styled.section`
  width: 752px;
  grid-column: 0 / 12;
  padding: 24px 24px 16px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
`;

const LectureDetailContainer = () => {
  let { lectureId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, ...orderOption } = useSelector((state) => state.lectureReducer);
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const [isFetched, setIsFetched] = useState(false);
  const {
    lectureReviews,
    lectureEvaluationRating,
    lectureEvaluationTotal,
    lectureClassInfo,
    page,
    limit,
    sort,
    ...rest
  } = useSelector((state) => state.lectureDetailReducer);

  const fetchLectureDetailInfo = async () => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

      const lectureInfo = await Promise.all([
        LectureDetailAPI.getLectureInfo(accessToken, lectureId),
        LectureDetailAPI.getLectureReviews(accessToken, lectureId, limit, page, sort),
        LectureDetailAPI.getEvaluationRating(accessToken, lectureId),
        LectureDetailAPI.getEvaluationTotal(accessToken, lectureId),
        LectureDetailAPI.getLectureClassInfo(accessToken, lectureId),
      ]);

      dispatch(setLectureInfo(lectureInfo));
    } catch (error) {
      if (error.response.data.code === 30) {
        history.push("/lectures");
      }
      throw new Error(error);
    } finally {
      setIsFetched(true);
    }
  };

  useEffect(() => fetchLectureDetailInfo(), []);

  return (
    <>
      <Wrapper>
        {!isFetched && (
          <SpinnerWrapper>
            <LoadingSpinner />
          </SpinnerWrapper>
        )}
        <Content>
          {isFetched && (
            <>
              <ReviewSection>
                <LectureInfoContainer lectureInfo={rest}></LectureInfoContainer>

                <LectureGraphContainer
                  rating={rest.total_rating}
                  count={rest.review_count}
                  hashtags={rest.top3_hash_tag}
                  evaluationRating={lectureEvaluationRating}
                  evaluationTotal={lectureEvaluationTotal}
                ></LectureGraphContainer>

                <LectureResourceContainer></LectureResourceContainer>

                <LectureReviewContainer
                  lectureReviewCount={lectureReviews.count}
                  lectureReviews={lectureReviews}
                  lectureId={rest.id}
                  page={rest.page}
                  limit={limit}
                  sort={sort}
                ></LectureReviewContainer>
              </ReviewSection>

              <LectureClassContainer
                grade={rest.grade}
                lectureClassInfo={lectureClassInfo}
              ></LectureClassContainer>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default LectureDetailContainer;
