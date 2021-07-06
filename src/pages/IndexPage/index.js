import {
  Banner,
  BannerImg,
  BeneathLayout,
  BoldSpan,
  CatchPhraseWrapper,
  LectureRankingSection,
  MajorSearchSection,
  NormalSpan,
  RestBottomLeftSection,
  RestBottomRightSection,
  RestBottomSection,
  RestSection,
  RestTopSection,
  Wrapper,
} from "pages/IndexPage/IndexPage.style";
import React, { useEffect } from "react";
import {
  finishFetchUserData,
  setMyTimetable,
  setRecommendResources,
} from "store/modules/mainPageModule";
import { useDispatch, useSelector } from "react-redux";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import LectureRankingContainer from "containers/IndexContainers/LectureRankingContainer";
import MajorSearchContainer from "components/IndexComponents/MajorLinkList";
import MyTimetableContainer from "components/IndexComponents/MyTimetable";
import { Promise } from "core-js";
import RecentlyViewedLectureContainer from "components/IndexComponents/RecentViewedRating";
import RecommendResourceContainer from "components/IndexComponents/RecommendResource";
import ResourceAPI from "api/resources";
import TimetableAPI from "api/timetable";
import { showAlertModal } from "store/modules/modalModule";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isCheckedToken && !isLoggedIn) {
      dispatch(finishFetchUserData());
      return;
    }

    if (isCheckedToken && isLoggedIn) {
      fetchUserDatas(dispatch);
    }
  }, [isCheckedToken, isLoggedIn]);

  return (
    <Wrapper>
      <Banner>
        <CatchPhraseWrapper>
          <NormalSpan>{SUB_CATCH_PHRASE}</NormalSpan>
          <BoldSpan>{MAIN_CATCH_PHRASE}</BoldSpan>
        </CatchPhraseWrapper>
        <BannerImg />
      </Banner>
      <MajorSearchSection>
        <MajorSearchContainer />
      </MajorSearchSection>
      <BeneathLayout>
        <LectureRankingSection>
          <LectureRankingContainer />
        </LectureRankingSection>
        <RestSection>
          <RestTopSection>
            <RecommendResourceContainer />
          </RestTopSection>
          <RestBottomSection>
            <RestBottomLeftSection>
              <MyTimetableContainer />
            </RestBottomLeftSection>
            <RestBottomRightSection>
              <RecentlyViewedLectureContainer />
            </RestBottomRightSection>
          </RestBottomSection>
        </RestSection>
      </BeneathLayout>
    </Wrapper>
  );
};

const fetchUserDatas = async (dispatch) => {
  try {
    const { fetchRecommendResources } = ResourceAPI;
    const { fetchMainTimetable } = TimetableAPI;

    const [recommendResources, myTimetable] = await Promise.all([
      fetchRecommendResources(),
      fetchMainTimetable(),
    ]);

    dispatch(setRecommendResources({ resources: recommendResources.data }));
    dispatch(setMyTimetable({ lectureList: myTimetable.data.lectureList }));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
  } finally {
    dispatch(finishFetchUserData());
  }
};

const SUB_CATCH_PHRASE = "솔직한 강의평을 원한다면?";
const MAIN_CATCH_PHRASE = "가자, 한강으로!";

export default IndexPage;
