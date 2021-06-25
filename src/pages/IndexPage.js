import React, { useState } from "react";

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
import { sampleRecommendResources } from "static/IndexPage/sampleRecommendResources";

const IndexPage = () => {
  const [recommendResources, setRecommendResources] = useState([]);
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
            <RecommendResourceContainer recommendResources={recommendResources} />
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

const SUB_CATCH_PHRASE = "솔직한 강의평을 원한다면?";
const MAIN_CATCH_PHRASE = "가자, 한강으로!";

export default IndexPage;
