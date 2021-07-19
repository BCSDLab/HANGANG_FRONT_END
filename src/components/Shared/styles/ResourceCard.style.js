import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { NOT_PUSHED_THUMB_URL, PUSHED_THUMB_URL } from "static/Shared/imageUrls";

export const Layout = styled.div`
  position: relative;
  display: flex;
  width: 557px;
  height: 133px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};
  background-color: ${({ isChosen }) => (isChosen ? `${BorderColor}` : "#fff")};
  cursor: pointer;
`;

export const InfoLayout = styled.div`
  position: relative;
  width: calc(100% - 113px);
  height: 100%;
  padding: 16px;
`;

export const Title = styled.span`
  display: block;
  margin-bottom: 14px;
  font-family: NotoSansCJKKR;
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Bookmark = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/bookmark.png",
  alt: "bookmark",
})`
  position: absolute;
  top: -8px;
  left: 0;
  width: 32px;
`;

export const ThumbnailLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 133px;
  height: 100%;
  border-right: 1px solid ${BorderColor};
`;

export const Thumbnail = styled.img.attrs(({ src }) => ({
  src,
  alt: "ext",
}))`
  width: 43px;
`;

export const Writer = styled.span`
  display: block;
  font-family: NotoSansCJKKR;
  font-size: 14px;
  color: ${FontColor};
`;

export const Category = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: NotoSansCJKKR;
  font-size: 14px;

  color: ${ConceptColor};
`;

export const HitsBlock = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-family: NotoSansCJKKR;

  color: ${ConceptColor};
`;

export const Thumb = styled.img.attrs(({ isHitted }) => ({
  src: isHitted ? PUSHED_THUMB_URL : NOT_PUSHED_THUMB_URL,
  alt: "thumb",
}))`
  width: 20px;
`;

export const Amount = styled.span`
  margin-left: 4px;
  font-family: NotoSansCJKKR;
  font-size: 16px;
  color: ${({ isHitted }) => (isHitted ? `${ConceptColor}` : `${PlaceholderColor}`)};
`;

export const ResourceDetailInfoBlock = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 16px;
  bottom: 16px;
`;

export const Lecture = styled.span`
  font-family: NotoSansCJKKR;
  font-size: 14px;
  color: ${PlaceholderColor};
`;
export const Delimiter = styled.div`
  width: 1px;
  height: 8px;
  margin: 0 8px;
  background-color: ${PlaceholderColor};
`;

export const Professor = styled(Lecture)``;
