import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Promise } from "core-js";

import LectureDetailAPI from "api/lectureDetail";
import ResourceAPI from "api/resources";
import LectureReviewWriteModalComponent from "components/ModalComponents/LectureDetailPage/LectureReviewWriteModalComponent";
import LoadingSpinner from "components/Shared/LoadingSpinner";

import {
  setLectureInfo,
  setLectureClassSemester,
  requestLectureReviewsFinished,
  setLectureReviews,
  setLectureResources,
  setLectureTimetables,
  closeFilterModal,
} from "store/modules/lectureDetailModule";
import {
  showAlertModal,
  showConfirmModal,
  showLectureReviewWriteModal,
} from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

import { getValueOnLocalStorage } from "utils/localStorageUtils";

import LectureInfoContainer from "./LectureInfoContainer";
import LectureGraphContainer from "./LectureGraphContainer";
import LectureResourceContainer from "./LectureResourceContainer";
import LectureReviewContainer from "./LectureReviewContainer";
import LectureClassContainer from "./LectureClassContainer";

import {
  Wrapper,
  Content,
  SpinnerWrapper,
  RightSection,
  ReviewSection,
  WriteLectureReviewButton,
} from "./styles/index.style";

const LectureDetailContainer = () => {
  let { lectureId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    lectureReviews,
    lectureResources,
    lectureEvaluationRating,
    lectureEvaluationTotal,
    lectureClassInfo,
    page,
    resourcePage,
    limit,
    sort,
    ...rest
  } = useSelector((state) => state.lectureDetailReducer);
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (isCheckedToken) {
      fetchLectureDetailInfo();
    }
  }, [isCheckedToken]);

  useEffect(() => {
    if (isCheckedToken && isLoggedIn) {
      fetchReviews();
    }
  }, [isCheckedToken, isLoggedIn]);

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

        if (lectureClassSemesterInfo[1].data) {
          const usersTimetables = await LectureDetailAPI.getTimetables(
            accessToken,
            lectureClassSemesterInfo[1].data
          );
          dispatch(setLectureTimetables(usersTimetables));
        }
      }
    } catch (error) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
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
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
      dispatch(showAlertModal({ title, content }));
      throw new Error(error);
    } finally {
      dispatch(requestLectureReviewsFinished());
    }
  };

  const closeModalEventTriggered = () => {
    if (rest.isFilterModalOpened) dispatch(closeFilterModal());
  };

  const checkLoggedIn = () => {
    if (isCheckedToken && !isLoggedIn) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_LOGGED_IN"];
      const onConfirm = () => history.push("/login");
      dispatch(showConfirmModal({ title, content, onConfirm }));
      return;
    }

    dispatch(
      showLectureReviewWriteModal({
        basicLectureInfos: {
          id: rest.id,
          name: rest.name,
          professor: rest.professor,
        },
      })
    );
  };

  return (
    <>
      <Wrapper onClick={() => closeModalEventTriggered()}>
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

              <RightSection>
                <LectureClassContainer
                  grade={rest.grade}
                  lectureClassInfo={lectureClassInfo}
                />

                <WriteLectureReviewButton onClick={checkLoggedIn}>
                  {"강의평가 작성하기 >"}
                </WriteLectureReviewButton>
              </RightSection>
            </>
          )}
        </Content>
      </Wrapper>
      <LectureReviewWriteModalComponent />
    </>
  );
};

export default LectureDetailContainer;
