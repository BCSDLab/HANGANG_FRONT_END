import { BorderColor, FontColor } from "static/Shared/commonStyles";
import styled from "styled-components";

export const ThumbnailWrapper = styled.div`
  position: relative;

  width: ${({ index }) => widthConverter(index)};
  height: ${({ index }) => heightConverter(index)};
  margin-right: ${({ index }) => (index === 0 || index === 2 ? "16px" : "0px")};
  border-radius: 8px;
  border: 1px solid ${BorderColor};
`;

export const Title = styled.span`
  position: absolute;
  left: 12px;
  bottom: 11px;
  width: ${({ index }) => (index === 1 || index === 2 ? "94px" : "111px")};

  padding: 1px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 500;

  color: ${FontColor};
`;

export const LectureNameAndAuthor = styled.div`
  position: absolute;
  display: flex;
  top: 9px;
  right: 12px;
`;

export const Name = styled.div`
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Slash = styled(Name)`
  margin: 0 4px;
`;

export const Author = styled(Name)``;

export const Icon = styled.img.attrs(({ thumbnailURL }) => ({
  src: thumbnailURL,
  alt: "thumbnail",
}))`
  width: 32px;
  margin: 5px;
`;

const widthConverter = (index) => {
  switch (index) {
    case 0:
    case 3:
      return "273px";
    case 1:
    case 2:
      return "176px";
    case 4:
      return "174px";
    default:
      return;
  }
};

const heightConverter = (index) => {
  switch (index) {
    case 0:
    case 1:
      return "80px";
    case 2:
    case 3:
      return "87px";
    case 4:
      return "183px";
    default:
      return;
  }
};
