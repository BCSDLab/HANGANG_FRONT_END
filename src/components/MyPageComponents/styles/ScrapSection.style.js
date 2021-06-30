import styled from "styled-components";
import { FontColor, MyPageSectionHeight } from "static/Shared/commonStyles";

export const ScrapSectionWrapper = styled.div`
  height: calc(${MyPageSectionHeight} - 48px);
  min-height: calc(${MyPageSectionHeight} - 48px);
  padding-top: 26px;
  margin-bottom: 48px;
  overflow-y: scroll;

  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // FireFox

  //Chrome
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ActionRow = styled.div`
  position: relative;
`;

export const ActionLabel = styled.label`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${FontColor};
  cursor: pointer;
`;

export const AllChoose = styled(ActionLabel)`
  top: -4px;
  left: 0;
  width: fit-content;
  text-align: center;
`;

export const CheckImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/check_mypage.png",
  alt: "체크 이미지",
})`
  width: 18px;
  margin-right: 4px;
  margin-bottom: 2px;
`;

export const ScrapGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 18px;
  width: 100%;
  margin-top: 30px;
`;
