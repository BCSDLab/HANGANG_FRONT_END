import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ReviewAPI from "api/lectureReview";
import MypageAPI from "api/mypage";

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


const LectureDetailContainer = ({ match }) => {
  const dispatch = useDispatch();
  
  // const { lectureId } = match.params;
  // const { params } = this;
  // console.log({params});
  // const { id } = useParams();

  // console.log(lectureId);
  const { isLoading, ...filterOptions } = useSelector((state) => state.lectureReducer);
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const [reviews, setReviews] = useState([]);
  const [lectureTimeTable, setLectureTimeTable] = useState([]);
  const [scrapped, setScrapped] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  /**
   * 스크랩 했으면 스크랩 표시?
   */
  useEffect(async () => {
    try {
     
      if (isLoggedIn) {
        console.log("로그인");

        const { access_token: accessToken }   = getValueOnLocalStorage("hangangToken");
        const { data }                        = await MypageAPI.getScrapLecture(accessToken);
        const { dataLectrueReviews }          = await ReviewAPI.getLectureReviews(accessToken, 236);
        const { dataLectureReviewTimetable }  = await ReviewAPI.getLectureReviewTimetable(accessToken, 236);

        let scrappedId = [];
        data.forEach(({ id }) => scrappedId.push(id));

        setScrapped(scrappedId);
        setLectureTimeTable(dataLectureReviewTimetable);
        setReviews(dataLectrueReviews);

        console.log(dataLectureReviewTimetable);
        console.log(dataLectrueReviews);

      }

      // if (!isLoggedIn) {
        
      // }
      

    } catch (error) {
      console.log(error);
    } finally {
      dispatch(requestFinished());
      setIsFetched(true);
    }
  }, [isLoggedIn]);


  // useEffect(async () => {
  //   if (isLoading) {
  //     try {
  //       const { data } = await ReviewAPI.getLectureReviews(accessToken, filterOptions);
  //       setReviews(data);
        
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
              lectureReviewTimetable={lectureTimeTable}
            >
            </LectureInfoSection>
            {lectureTimeTable}
            <ReviewGraphSection
            ></ReviewGraphSection>

            <LectureResourceSection
            ></LectureResourceSection>

            <LectureReviewSection
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
