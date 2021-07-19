import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { NOT_PUSHED_THUMB_URL, PUSHED_THUMB_URL } from "static/Shared/imageUrls";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 557px;
  height: 133px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
  background-color: "#fff";
  cursor: pointer;
`;

export const Thumbnail = styled.div`
  width: 131px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  background-image: url(${({ uri }) => uri});
  background-repeat: no-repeat;
  background-size: 65px;
  background-position: center;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 131px);
  padding: 20px 17px;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Nickname = styled(Title)`
  font-weight: normal;
  margin-top: 13px;
`;

export const LectureInfos = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
`;

export const LectureName = styled(Link)`
  all: unset;
  font-size: 14px;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

export const Delimiter = styled.div`
  width: 1px;
  height: 8px;
  margin: 0px 8px;
  background-color: ${PlaceholderColor};
`;

export const LectureProfessor = styled(LectureName)`
  cursor: default;
`;

export const Category = styled.span`
  position: absolute;
  top: 21px;
  right: 15px;
  font-size: 14px;
  color: ${ConceptColor};
`;

export const HitWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 20px;
  right: 15px;
`;

export const HitAmount = styled.div`
  margin-left: 4px;
  font-size: 16px;
  color: ${({ isHit }) => (isHit ? `${ConceptColor}` : `${PlaceholderColor}`)};
`;

export const HitIcon = styled.img.attrs(({ isHit }) => ({
  src: isHit ? PUSHED_THUMB_URL : NOT_PUSHED_THUMB_URL,
  alt: "hit_icon",
}))`
  width: 19px;
  cursor: pointer;
`;
