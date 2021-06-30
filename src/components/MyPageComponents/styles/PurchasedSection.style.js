import styled from "styled-components";
import {
  BorderColor,
  FontColor,
  MyPageSectionHeight,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  cursor: pointer;
`;

export const SectionWrapper = styled.div`
  height: calc(${MyPageSectionHeight} - 48px);
  min-height: calc(${MyPageSectionHeight} - 48px);
  padding-top: 48px;
  margin-bottom: 48px;
  overflow-y: scroll;

  // hide overflow scrollbar
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // FireFox
  //Chrome
  ::-webkit-scrollbar {
    display: none;
  }

  ${Wrapper}:not(:last-child) {
    margin-bottom: 40px;
  }
`;

export const Label = styled.label`
  margin-bottom: 13px;
  color: ${FontColor};
  font-size: 14px;
  font-weight: 500;
`;

export const SubLabel = styled(Label)`
  margin-bottom: 17px;
  color: ${PlaceholderColor};
  font-size: 12px;
  font-weight: normal;
`;

export const MiddleLine = styled.div`
  display: inline-block;
  width: 1px;
  height: 8px;
  margin: 0px 8px;
  background-color: ${PlaceholderColor};
`;

export const MaterialWrapper = styled.div`
  position: relative;
  min-width: 123px;
  height: 64px;
  padding: 7px 4px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};
`;

export const MaterialRow = styled.div`
  display: flex;
  width: fit-content;

  transition: transform 0.3s ease;

  ${MaterialWrapper}:not(:last-child) {
    margin-right: 12px;
  }
`;

export const RightIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/bold_right.png",
  alt: "right button",
})`
  position: absolute;
  top: calc(50% + 20px);
  right: 0;
  width: 18px;
  z-index: 9990;
`;

export const LeftIcon = styled(RightIcon)`
  left: 0;
  transform: rotate(180deg);
`;

export const MaterialName = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: ${FontColor};
`;
