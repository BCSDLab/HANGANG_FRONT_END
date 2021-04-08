import React from "react";
import styled from "styled-components";

import { FontColor, InnerContentWidth } from "static/Shared/commonStyles";
import MajorSearchContainer from "containers/IndexContainers/MajorSearchContainer";
import RecommendResourceContainer from "containers/IndexContainers/RecommendResourceContainer";
import MyTimetableContainer from "containers/IndexContainers/MyTimetableContainer";
import RecentlyViewedLectureContainer from "containers/IndexContainers/RecentlyViewedLectureContainer";
import LectureRankingContainer from "containers/IndexContainers/LectureRankingContainer";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  height: fit-content;
  margin: 40px auto 100px auto;
`;

const Banner = styled.div`
  position: relative;
  min-width: ${InnerContentWidth};
  height: 289px;
`;

const CatchPhraseWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 240px;
  margin-bottom: 40px;
`;

const BoldSpan = styled.span`
  margin-top: 16px;
  font-size: 36px;
  font-weight: 800;
  color: ${FontColor};
`;

const NormalSpan = styled.span`
  font-size: 18px;
  font-weight: normal;
  color: ${FontColor};
`;

const BannerImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/index_page_image.png",
  alt: "메인페이지 이미지",
})`
  position: absolute;
  right: 0;
  width: 445px;
`;

const MajorSearchSection = styled.section`
  position: relative;
  width: 100%;
  margin-bottom: 32px;
`;

const LectureRankingSection = styled.section`
  width: 464px;
  height: fit-content;
`;

const RestSection = styled.section`
  width: 655px;
  margin-left: 16px;
`;

const RestTopSection = styled.section`
  width: 655px;
  margin-bottom: 32px;
`;

const RestBottomSection = styled.section`
  display: flex;
  width: 655px;
`;

const RestBottomLeftSection = styled.section`
  width: 368px;
  margin-right: 16px;
`;

const RestBottomRightSection = styled.section`
  width: 272px;
`;

const IndexPage = () => (
  <Wrapper>
    <Banner>
      <CatchPhraseWrapper>
        <NormalSpan>솔직한 강의평을 원한다면?</NormalSpan>
        <BoldSpan>가자, 한강으로!</BoldSpan>
      </CatchPhraseWrapper>
      <BannerImg />
    </Banner>
    <MajorSearchSection>
      <MajorSearchContainer />
    </MajorSearchSection>
    <div style={{ display: "flex" }}>
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
    </div>
  </Wrapper>
);

export default IndexPage;
