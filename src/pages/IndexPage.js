import React, { useEffect } from "react";
import { Promise } from "core-js";

import ResourceAPI from "api/resources";
import TimetableAPI from "api/timetable";

import MajorSearchContainer from "containers/IndexContainers/MajorSearchContainer";
import RecommendResourceContainer from "containers/IndexContainers/RecommendResourceContainer";
import MyTimetableContainer from "containers/IndexContainers/MyTimetableContainer";
import RecentlyViewedLectureContainer from "containers/IndexContainers/RecentlyViewedLectureContainer";
import LectureRankingContainer from "containers/IndexContainers/LectureRankingContainer";

import {
  Banner,
  BeneathLayout,
  Wrapper,
  CatchPhraseWrapper,
  NormalSpan,
  BoldSpan,
  BannerImg,
  MajorSearchSection,
  LectureRankingSection,
  RestSection,
  RestTopSection,
  RestBottomSection,
  RestBottomLeftSection,
  RestBottomRightSection,
} from "pages/styles/IndexPage.style";
import {
  finishFetchUserData,
  setMyTimetable,
  setRecommendResources,
} from "store/modules/mainPageModule";
import { useDispatch, useSelector } from "react-redux";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDatas(dispatch);
    }
  }, [isLoggedIn]);

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
