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
  setLectureTimetables,
  closeFilterModal,
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
    timetables,
    lectureReviews,
    lectureResources,
    lectureEvaluationRating,
    lectureEvaluationTotal,
    lectureClassInfo,
    page,
    resourcePage,
    limit,
    resourceLimit,
    sort,
    isFetchedOnFirstReviewsMount,
    ...rest
  } = useSelector((state) => state.lectureDetailReducer);
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const [isFetched, setIsFetched] = useState(false);

  const fetchLectureDetailInfo = async () => {
    try {
      if (isLoggedIn && isCheckedToken) {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

        const lectureInfo = await Promise.all([
          LectureDetailAPI.getLectureInfo(accessToken, lectureId),
          LectureDetailAPI.getLectureReviews(accessToken, lectureId, {
            limit: limit,
            page: page,
            sort: sort,
          }),
          LectureDetailAPI.getEvaluationRating(lectureId),
          LectureDetailAPI.getEvaluationTotal(lectureId),
          LectureDetailAPI.getLectureClassInfo(accessToken, lectureId),
          LectureDetailAPI.getLectureSemesterDates(accessToken, lectureId),
        ]);

        const { data: resources } = await ResourceAPI.getResources(
          {
            department: lectureInfo[0].data.department,
            order: "hits",
            keyword: lectureInfo[0].data.name,
            page: resourcePage,
          },
          accessToken
        );

        dispatch(setLectureInfo(lectureInfo));
        dispatch(setLectureResources(resources));
        if (lectureInfo[5].data) {
          const usersTimetables = await LectureDetailAPI.getTimetables(
            accessToken,
            lectureInfo[5].data
          );
          dispatch(setLectureTimetables(usersTimetables));
        }
      } else {
        const lectureInfo = await Promise.all([
          LectureDetailAPI.getLectureInfo(null, lectureId),
          LectureDetailAPI.getLectureReviews(null, lectureId, {
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
      }
    } catch (error) {
      if (error.response.data.code === 30) {
        alert("존재하지 않는 게시물입니다.");
      } else {
        alert("확인되지 않은 오류입니다. 관리자에게 문의하세요.");
      }
      history.push("/lectures");
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
    if ((isCheckedToken && isFetchedOnFirstReviewsMount) || isLoading) {
      fetchReviews();
    } else {
      fetchLectureDetailInfo();
    }
  }, [isLoggedIn, isCheckedToken, isFetchedOnFirstReviewsMount, isLoading]);

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
                ></LectureGraphContainer>

                <LectureResourceContainer
                  lectureResource={lectureResources}
                  options={rest}
                ></LectureResourceContainer>

                <LectureReviewContainer
                  lectureReviewCount={lectureReviews.count}
                  lectureReviews={lectureReviews}
                  lectureId={lectureId}
                  page={rest.page}
                  limit={limit}
                  sort={sort}
                ></LectureReviewContainer>
              </ReviewSection>

              <LectureClassContainer
                grade={rest.grade}
                lectureClassInfo={lectureClassInfo}
                timetables={timetables}
              ></LectureClassContainer>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default LectureDetailContainer;
