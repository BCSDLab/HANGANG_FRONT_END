import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ReviewAPI from "api/lectureReview";
import MypageAPI from "api/mypage";
import { kickOut } from "utils/kickOut";

import LectureInfoSection from "components/LectureDetailComponents/LectureInfoSection";
import ReviewGraphSection from "components/LectureDetailComponents/ReviewGraphSection";
import LectureResourceSection from "components/LectureDetailComponents/LectureResourceSection";
import LectureReviewSection from "components/LectureDetailComponents/LectureReviewSection";
import LectureClassSection from "components/LectureDetailComponents/LectureClassSection";
import LoadingSpinner from "components/Shared/LoadingSpinner";

import {
  BorderColor,
  InnerContentWidth,
} from "static/Shared/commonStyles";
import lectureEvaluationList from "static/LecturesDetailPage/lectureEvaluationList.json";
import { requestFinished } from "store/modules/lectures";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import lecture from "api/lecture";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  margin: 40px auto 98px auto;
`;

const GridSection = styled.div`
  display: grid;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
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

/**
 *  TODO:
 * - 파라미터 값 가져오기
 * @param {*} param0 
 * @returns 
 */
const LectureDetailContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, ...orderOption } = useSelector((state) => state.lectureReducer);
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const [lectureReviews, setLectureReviews] = useState([]);
  const [lectureInfo, setLectureInfo] = useState({});
  const [lectureEvaluationTotal, setLectureEvaluationTotal] = useState({});
  const [isFetched, setIsFetched] = useState(false);



  // TODO: 파라미터 값 가져오기
  // const { lectureId } = match.params;
  // const { params } = this;
  // console.log({params});
  // const { id } = useParams();
  // console.log(lectureId);


  /**
   * 스크랩 했으면 스크랩 표시?
   */
  useEffect(async () => {
    try {
     
      if (isLoggedIn) {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

        /**
         * 라우터 파라미터 값을 가져올 수가 없어서 임의로 236 값 대입중
         */
        const [ lectureInfo,
                lectureReviews, 
                lectureEvaluationTotal 
              ] = await Promise.all([
                  ReviewAPI.getLectureInfo(accessToken, 236)
                , ReviewAPI.getLectureReviews(accessToken, 236)
                , ReviewAPI.getEvaluationTotal(accessToken, 236)
              ]);
              
        setLectureInfo(lectureInfo.data);
        setLectureReviews(lectureReviews.data);
        setLectureEvaluationTotal(lectureEvaluationTotal.data);

        console.log(lectureInfo, lectureReviews, lectureEvaluationTotal);
      }
      if(!isLoggedIn){
        setIsFetched(false);
      }
    
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(requestFinished());
      setIsFetched(true);
    }
  }, [isLoggedIn]);

  // 순서 바꾸면 다시로딩?
  // useEffect(async () => {
  //   if (isLoading) {
  //     try {
  //       const [ lectureInfo,
  //               lectureReviews, 
  //               lectureEvaluationTotal 
  //             ] = await Promise.all([
  //                 ReviewAPI.getLectureInfo(accessToken, 236)
  //               , ReviewAPI.getLectureReviews(accessToken, 236)
  //               , ReviewAPI.getEvaluationTotal(accessToken, 236)
  //             ]);
              
  //       setLectureInfo(lectureInfo.data);
  //       console.log(lectureInfo.data);
  //       setLectureReviews(lectureReviews.data);
  //       setLectureEvaluationTotal(lectureEvaluationTotal.data);
        
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       dispatch(requestFinished());
  //     }
  //   }
  // }, [isLoading]);

  return (

    <Wrapper>
      {!isFetched && (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}
      <GridSection>
      {isFetched && (
        <>
          <ReviewSection>
            <LectureInfoSection 
              name={lectureInfo.name}
              classification={lectureInfo.classification}
              professor={lectureInfo.professor}
              code={lectureInfo.code}
              isScrapped={lectureInfo.is_scraped}
              lectureSemesterDates={lectureInfo.semester_data}
            >
            </LectureInfoSection>
            
            <ReviewGraphSection
              rating={lectureInfo.total_rating}
              count={lectureInfo.review_count}
              hashtags={lectureInfo.top3_hash_tag}
              evaluationList={lectureEvaluationList}
              evaluationTotal={lectureEvaluationTotal}
            ></ReviewGraphSection>

            <LectureResourceSection
            ></LectureResourceSection>

            <LectureReviewSection
              lectureReviewCount={lectureInfo.review_count}
              lectureReviews={lectureReviews}
            ></LectureReviewSection>
          </ReviewSection>
          
          <LectureClassSection
          >
          </LectureClassSection>
        </>
      )}
      </GridSection>
    </Wrapper>
  );
};

export default LectureDetailContainer;
