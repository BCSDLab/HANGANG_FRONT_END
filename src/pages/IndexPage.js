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
  const [timetableLectures, setTimetableLectures] = useState(sampleTimetableLectures);
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
              <MyTimetableContainer timetableLectures={timetableLectures} />
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

const sampleTimetableLectures = [
  { name: "사랑의 역사", professor: "김사랑", isAssessed: true },
  { name: "하트의 역사", professor: "박사랑", isAssessed: false },
  { name: "사랑의 히스토리", professor: "김하트", isAssessed: false },
  { name: "사랑역사", professor: "최사랑", isAssessed: false },
];

const SUB_CATCH_PHRASE = "솔직한 강의평을 원한다면?";
const MAIN_CATCH_PHRASE = "가자, 한강으로!";

export default IndexPage;
