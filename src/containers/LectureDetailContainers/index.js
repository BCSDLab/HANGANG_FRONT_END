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

  const [lectureInfo, setLectureInfo] = useState([]);
  const [lectureReviews, setLectureReviews] = useState([]);
  const [lectureEvaluationTotal, setLectureEvaluationTotal] = useState({});
  const [lectureEvaluationRating, setLectureEvaluationRating] = useState({});
  const [lectureClassInfo, setLectureClassInfo] = useState({});

  const [isFetched, setIsFetched] = useState(false);
  const { ...rest } = useSelector((state) => state.lectureDetailReducer);

  const fetchLectureDetailInfo = async () => {
    try {
      if (!isLoggedIn && !getValueOnLocalStorage("hangangToken")) {
        history.push("/lectures");
      }

      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
      const [
        lectureInfo,
        lectureReviews,
        lectureEvaluationRating,
        lectureEvaluationTotal,
        lectureClassInfo,
      ] = await Promise.all([
        LectureDetailAPI.getLectureInfo(accessToken, lectureId),
        LectureDetailAPI.getLectureReviews(accessToken, lectureId),
        LectureDetailAPI.getEvaluationRating(accessToken, lectureId),
        LectureDetailAPI.getEvaluationTotal(accessToken, lectureId),
        LectureDetailAPI.getLectureClassInfo(accessToken, lectureId),
      ]);

      setLectureInfo(lectureInfo.data);
      setLectureReviews(lectureReviews.data);
      setLectureEvaluationRating(lectureEvaluationRating.data);
      setLectureEvaluationTotal(lectureEvaluationTotal.data);
      setLectureClassInfo(lectureClassInfo.data);

      dispatch(setLectureInfo(lectureInfo.data));
    } catch (error) {
      console.log(error);
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
                <LectureInfoContainer
                  lectureInfo={lectureInfo}
                  isScrapped={lectureInfo.is_scraped}
                  lectureId={lectureId}
                ></LectureInfoContainer>

                <LectureGraphContainer
                  rating={lectureInfo.total_rating}
                  count={lectureInfo.review_count}
                  hashtags={lectureInfo.top3_hash_tag}
                  evaluationRating={lectureEvaluationRating}
                  evaluationTotal={lectureEvaluationTotal}
                ></LectureGraphContainer>

                <LectureResourceContainer></LectureResourceContainer>

                <LectureReviewContainer
                  lectureReviewCount={lectureInfo.review_count}
                  lectureReviews={lectureReviews}
                ></LectureReviewContainer>
              </ReviewSection>

              <LectureClassContainer
                grade={lectureInfo.grade}
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
