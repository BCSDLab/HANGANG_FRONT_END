import styled from "styled-components";
import { FontColor, PlaceholderColor, BorderColor } from "static/Shared/commonStyles";

export const Section = styled.section`
  width: 100%;
  height: 120px;

  margin-bottom: 32px;
`;

export const Wrapper = styled.div`
  overflow-x: hidden;

  min-height: 109px;
`;

export const InfoLabel = styled.label`
  display: block;

  margin: 0 10px 24px 0;

  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

export const SubWarningLabel = styled.p`
  margin-top: 50px;

  text-align: center;
  line-height: normal;
  font-size: 12px;
  letter-spacing: normal;
  color: ${PlaceholderColor};
`;

export const ResourceSection = styled.section`
  position: relative;

  width: 100%;
`;

export const ResourceWrapper = styled.div`
  display: flex;

  position: relative;

  width: 100%;

  transition: transform 0.3s ease;

  > div:not(:last-child) {
    margin-right: 8px;
  }
`;

export const RightImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/ResourceDetailPage/move_right.png",
  alt: "right",
})`
  width: 20px;
`;

export const LeftImg = styled(RightImg)`
  transform: rotate(180deg);
`;

export const MoveRightButton = styled.div`
  display: flex;

  position: absolute;

  width: 50px;
  height: 50px;

  border: solid 1px #eeeeee;

  background-color: #fff;

  top: calc(50% + -35px);
  right: 0;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  z-index: 2;
`;
export const MoveLeftButton = styled(MoveRightButton)`
  left: 0;
`;

export const ResourceBox = styled.div`
  position: relative;

  width: 90px;
  height: 90px;

  border: 1px solid ${BorderColor};
  border-radius: 8px;

  cursor: pointer;
`;

export const Resource = styled.div``;

export const Thumbnail = styled.img.attrs(({ thumbnail }) => ({
  src: thumbnail,
  alt: "thumbnail",
}))`
  position: absolute;

  width: 28px;

  top: calc(50% - 14px);
  left: calc(50% - 14px);
`;

export const ResourceTitle = styled.p`
  margin-top: 4px;

  text-align: left;
  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${FontColor};
`;
