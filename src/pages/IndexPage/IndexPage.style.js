import styled from "styled-components";

import { FontColor, InnerContentWidth } from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  width: ${InnerContentWidth};
  height: fit-content;
  margin: 40px auto 100px auto;
`;

export const Banner = styled.div`
  position: relative;
  min-width: ${InnerContentWidth};
  height: 289px;
`;

export const CatchPhraseWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 240px;
  margin-bottom: 40px;
`;

export const BoldSpan = styled.span`
  margin-top: 16px;
  font-size: 36px;
  font-weight: 800;
  color: ${FontColor};
`;

export const NormalSpan = styled.span`
  font-size: 18px;
  font-weight: normal;
  color: ${FontColor};
`;

export const BannerImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/represent.svg",
  alt: "banner-img",
})`
  position: absolute;
  right: 0;
  fill-opacity: 0;
`;

export const MajorSearchSection = styled.section`
  position: relative;
  width: 100%;
  margin-bottom: 32px;
`;

export const BeneathLayout = styled.div`
  display: flex;
`;

export const LectureRankingSection = styled.section`
  width: 464px;
  height: fit-content;
`;

export const RestSection = styled.section`
  width: 655px;
  margin-left: 16px;
`;

export const RestTopSection = styled.section`
  width: 655px;
  margin-bottom: 32px;
`;

export const RestBottomSection = styled.section`
  display: flex;
  width: 655px;
`;

export const RestBottomLeftSection = styled.section`
  width: 368px;
  margin-right: 16px;
`;

export const RestBottomRightSection = styled.section`
  width: 272px;
`;
