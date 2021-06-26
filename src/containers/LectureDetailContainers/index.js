import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LectureDetailAPI from "api/lectureDetail";
import ResourceAPI from "api/resources";

import {
  setLectureInfo,
  setLectureClassSemester,
  requestLectureReviewsFinished,
  setLectureReviews,
  setLectureResources,
  setLectureTimetables,
  closeFilterModal,
} from "store/modules/lectureDetailModule";
import { showAlertModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

import { BorderColor, InnerContentWidth } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import LectureInfoContainer from "./LectureInfoContainer";
import LectureGraphContainer from "./LectureGraphContainer";
import LectureResourceContainer from "./LectureResourceContainer";
import LectureReviewContainer from "./LectureReviewContainer";
import LectureClassContainer from "./LectureClassContainer";

import LoadingSpinner from "components/Shared/LoadingSpinner";
import { Promise } from "core-js";

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
    resourcePage,
    limit,
    sort,
    isFetchedOnFirstReviewsMount,
    ...rest
  } = useSelector((state) => state.lectureDetailReducer);
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const [isFetched, setIsFetched] = useState(false);

  const fetchLectureDetailInfo = async () => {
    try {
      const accessToken = isLoggedIn
        ? getValueOnLocalStorage("hangangToken").access_token
        : null;

      const lectureInfo = await Promise.all([
        LectureDetailAPI.getLectureInfo(accessToken, lectureId),
        LectureDetailAPI.getLectureReviews(accessToken, lectureId, {
          limit: limit,
          page: page,
          sort: sort,
        }),
        LectureDetailAPI.getEvaluationRating(lectureId),
        LectureDetailAPI.getEvaluationTotal(lectureId),
      ]);

      const { data: resources } = await ResourceAPI.getResources(
        {
          department: lectureInfo[0].data.department,
          order: "hits",
          keyword: lectureInfo[0].data.name,
          page: resourcePage,
        },
        null
      );

      dispatch(setLectureInfo(lectureInfo));
      dispatch(setLectureResources(resources));

      if (isLoggedIn && isCheckedToken) {
        const lectureClassSemesterInfo = await Promise.all([
          LectureDetailAPI.getLectureClassInfo(accessToken, lectureId),
          LectureDetailAPI.getLectureSemesterDates(accessToken, lectureId),
        ]);

        dispatch(setLectureClassSemester(lectureClassSemesterInfo));

        if (lectureClassSemesterInfo[1]?.data) {
          const usersTimetables = await LectureDetailAPI.getTimetables(
            accessToken,
            lectureClassSemesterInfo[1].data
          );
          dispatch(setLectureTimetables(usersTimetables));
        }
      }
    } catch (error) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
      dispatch(showAlertModal({ title, content }));
      history.push("/lectures");
      throw new Error(error);
    } finally {
      setIsFetched(true);
    }
  };

  const fetchReviews = async () => {
    try {
      const accessToken = isLoggedIn
        ? getValueOnLocalStorage("hangangToken").access_token
        : null;
      const { data } = await LectureDetailAPI.getLectureReviews(accessToken, lectureId, {
        limit: limit,
        page: page,
        sort: sort,
      });
      dispatch(setLectureReviews(data));
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(requestLectureReviewsFinished());
    }
  };

  useEffect(() => {
    if (isCheckedToken) {
      fetchLectureDetailInfo();
    }
  }, [isCheckedToken]);

  useEffect(() => {
    if ((isCheckedToken && isFetchedOnFirstReviewsMount) || isLoading) {
      fetchReviews();
    }
  }, [isCheckedToken, isFetchedOnFirstReviewsMount, isLoading]);

  const closeFilterModalEventTriggered = () => {
    if (rest.isFilterModalOpened) dispatch(closeFilterModal());
  };

  return (
    <>
      <Wrapper onClick={() => closeFilterModalEventTriggered()}>
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
                />

                <LectureResourceContainer lectureResource={lectureResources} />

                <LectureReviewContainer
                  lectureReviewCount={lectureReviews.count}
                  lectureReviews={lectureReviews}
                  lectureId={lectureId}
                  page={rest.page}
                  limit={limit}
                  sort={sort}
                />
              </ReviewSection>

              <LectureClassContainer
                grade={rest.grade}
                lectureClassInfo={lectureClassInfo}
              />
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default LectureDetailContainer;
