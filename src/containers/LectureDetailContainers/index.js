import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LectureDetailAPI from "api/lectureDetail";
import ResourceAPI from "api/resources";

import {
  setLectureInfo,
  requestLectureReviewsFinished,
  setLectureReviews,
  setLectureResources,
} from "store/modules/lectureDetailModule";
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

  const {
    isLoading,
    lectureReviews,
    lectureResources,
    lectureEvaluationRating,
    lectureEvaluationTotal,
    lectureClassInfo,
    page,
    limit,
    sort,
    isFetchedOnFirstReviewsMount,
    ...orderOptions
  } = useSelector((state) => state.lectureDetailReducer);
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const [isFetched, setIsFetched] = useState(false);

  const fetchLectureDetailInfo = async () => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

      const lectureInfo = await Promise.all([
        LectureDetailAPI.getLectureInfo(accessToken, lectureId),
        LectureDetailAPI.getLectureReviews(accessToken, lectureId, limit, page, sort),
        LectureDetailAPI.getEvaluationRating(accessToken, lectureId),
        LectureDetailAPI.getEvaluationTotal(accessToken, lectureId),
        LectureDetailAPI.getLectureClassInfo(accessToken, lectureId),
        LectureDetailAPI.getLectureSemesterDates(accessToken, lectureId),
      ]);

      dispatch(setLectureInfo(lectureInfo));

      /**
       * resource 가져오려면 department 정보랑 학과명 등이 필요한데
       * 이는 위에서 정보 조회후에 얻어지는 정보라 나중에 가능함
       * TODO: 이건 어떻게 할건지
       */

      // const data = await ResourceAPI.getResources(
      //   {
      //     department: orderOptions.department,
      //     order: "hits",
      //     keyword: orderOptions.name,
      //     page: orderOptions.resourcePage,
      //   },
      //   accessToken
      // );
      // console.log("rest2", data);
      // dispatch(setLectureResources(data));
    } catch (error) {
      console.dir(error);
      if (error.response.data.code === 30) {
        history.push("/lectures");
      }
      throw new Error(error);
    } finally {
      setIsFetched(true);
    }
  };

  const fetchReviews = async (options) => {
    try {
      let accessToken = isLoggedIn
        ? getValueOnLocalStorage("hangangToken").access_token
        : null;
      console.log("fetchReviews optinos=>", options);
      const { data } = await LectureDetailAPI.getLectureReviews(
        accessToken,
        lectureId,
        limit,
        page,
        sort
      );
      console.log("data => ", data);
      dispatch(setLectureReviews(data));
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(requestLectureReviewsFinished());
    }
  };

  useEffect(() => {
    console.log(
      "useEffect => ",
      isCheckedToken,
      (isCheckedToken && !isFetchedOnFirstReviewsMount) || isLoading
    );

    if ((isCheckedToken && !isFetchedOnFirstReviewsMount) || isLoading)
      fetchReviews({ page, ...orderOptions });
    else fetchLectureDetailInfo();
  }, [isCheckedToken, isFetchedOnFirstReviewsMount, isLoading]);

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
                <LectureInfoContainer lectureInfo={orderOptions}></LectureInfoContainer>

                <LectureGraphContainer
                  rating={orderOptions.total_rating}
                  count={orderOptions.review_count}
                  hashtags={orderOptions.top3_hash_tag}
                  evaluationRating={lectureEvaluationRating}
                  evaluationTotal={lectureEvaluationTotal}
                ></LectureGraphContainer>

                <LectureResourceContainer
                  lectureResource={lectureResources}
                  options={orderOptions}
                ></LectureResourceContainer>

                <LectureReviewContainer
                  lectureReviewCount={lectureReviews.count}
                  lectureReviews={lectureReviews}
                  lectureId={orderOptions.id}
                  page={orderOptions.page}
                  limit={limit}
                  sort={sort}
                ></LectureReviewContainer>
              </ReviewSection>

              <LectureClassContainer
                grade={orderOptions.grade}
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
