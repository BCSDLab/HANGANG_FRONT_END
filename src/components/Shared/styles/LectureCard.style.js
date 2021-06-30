import styled from "styled-components";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 557px;
  height: 133px;
  padding: 24px 0px 16px 28px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
  background-color: ${({ isChosen }) => (isChosen ? `${BorderColor}` : "#fff")};
  cursor: pointer;
`;

export const LeftSide = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 447px;
  flex-direction: column;
`;

export const RightSide = styled.div`
  position: relative;
  width: calc(555px - 447px);
  right: 28px;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Amount = styled.span`
  font-size: 13px;
  color: ${PlaceholderColor};
  margin-left: 4px;
`;

export const Professor = styled(Title)`
  font-weight: normal;
  margin-top: 16px;
`;

export const HashTagWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;

  margin-top: 16px;
`;

export const HashTag = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-right: 7px;
`;

export const Classification = styled.span`
  position: absolute;
  right: 0;
  font-size: 14px;
  color: ${ConceptColor};
`;

export const Rating = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 22px;
  color: ${FontColor};
`;

export const Bookmark = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/bookmark.png",
  alt: "북마크",
})`
  position: absolute;
  top: -8px;
  left: 0;
  width: 32px;
`;
