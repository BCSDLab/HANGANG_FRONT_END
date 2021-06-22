import styled from "styled-components";

export const ThumbnailWrapper = styled.div`
  position: relative;

  width: ${({ index }) => widthConverter(index)};
  height: ${({ index }) => heightConverter(index)};
  margin-right: ${({ index }) => (index === 0 || index === 2 ? "16px" : "0px")};
  border-radius: 8px;

  //background
  background-color: rgba(153, 153, 153, 0.7);
  background-image: url(${({ thumbnailURL }) => thumbnailURL});
  background-blend-mode: saturation;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Title = styled.span`
  position: absolute;
  left: 12px;
  bottom: 10px;
  width: ${({ index }) => (index === 1 || index === 2 ? "94px" : "111px")};

  padding: 1px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 500;

  color: #fff;
`;

export const LectureNameAndAuthor = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 500;
  color: #fff;
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
