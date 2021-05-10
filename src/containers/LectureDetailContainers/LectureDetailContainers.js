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
import { requestFinished, } from "store/modules/lectures";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  height: 833px;
  margin: 90px auto 98px auto;
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
const LectureDetailContainer = ({ match }) => {
  const dispatch = useDispatch();
  
  // TODO: 파라미터 값 가져오기
  // const { lectureId } = match.params;
  // const { params } = this;
  // console.log({params});
  // const { id } = useParams();
  // console.log(lectureId);

  // order
  const { isLoading, ...orderOption } = useSelector((state) => state.lectureReducer);
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const [lectureReviews, setLectureReviews] = useState([]);
  const [lectureSemesterDates, setLectureSemesterDates] = useState([]);
  const [lectureReviewTimeTable, setLectureReviewTimeTable] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  /**
   * 유저가 token이 없이 접근할 경우 홈으로 내보냅니다.
   */
  if (getValueOnLocalStorage("hangangToken") === null) {
    kickOut(1);
  }
  
  /**
   * 스크랩 했으면 스크랩 표시?
   */
  useEffect(async () => {
    try {
     
      if (isLoggedIn) {

        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

        /**
         * 라우터 파라미터 값을 가져올 수가 없어서 임의로 236 값 대입중입니다. 
         * 
         */
        const { data } = await ReviewAPI.getLectureReviewTimetable(accessToken, 236);
        const { semesterdata } = await ReviewAPI.getLectureSemesterDates(accessToken, 236);
        const { lecturereviews } = await ReviewAPI.getLectureReviews(accessToken, 236);

        
        setLectureReviewTimeTable(data);
        setLectureSemesterDates(semesterdata);
        setLectureReviews(lecturereviews);
        

      }
      
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(requestFinished());
      setIsFetched(true);
    }
  }, [isLoggedIn]);


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
              name={lectureReviewTimeTable.name}
              classification={lectureReviewTimeTable.classification}
              professor={lectureReviewTimeTable.professor}
              code={lectureReviewTimeTable.code}
              isScrapped={lectureReviewTimeTable.is_scraped}
              lectureSemesterDates={lectureSemesterDates}
            >
            </LectureInfoSection>
            
            <ReviewGraphSection
            ></ReviewGraphSection>

            <LectureResourceSection
            ></LectureResourceSection>

            {/* {reviews.map((data) => (
              <LectureReviewSection
                data={data}
              />
            ))} */}
            <LectureReviewSection
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
