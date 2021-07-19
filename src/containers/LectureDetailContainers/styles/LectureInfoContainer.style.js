import styled from "styled-components";
import { FontColor, ConceptColor, PlaceholderColor } from "static/Shared/commonStyles";

import { bookmark, bookmarked } from "static/LectureDetailPage/imgPath";

export const Section = styled.section`
  width: 100%;

  margin-bottom: 32px;
`;

export const Wrapper = styled.section`
  padding: 16px;
`;

export const Title = styled.label`
  display: block;

  margin: 0 10px 24px 0;

  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

export const SubTitleSection = styled.div`
  display: block;

  margin-bottom: 8px;
`;
export const SubTitle = styled.p`
  display: inline-block;

  font-size: 18px;
  color: ${FontColor};
`;
export const SubLabel = styled.label`
  margin: 4px 8px 71px 0;

  font-size: 14px;
  color: ${PlaceholderColor};
`;

export const Classification = styled.span`
  float: right;

  font-size: 14px;
  color: ${ConceptColor};
`;

export const Professor = styled(Title)`
  margin-top: 14px;

  font-size: 16px;
  font-weight: normal;
`;

export const Bookmark = styled.img.attrs(({ isScrapped }) => ({
  alt: "스크랩",
  src: isScrapped ? bookmarked : bookmark,
}))`
  float: right;
  width: 14px;

  cursor: pointer;
`;
