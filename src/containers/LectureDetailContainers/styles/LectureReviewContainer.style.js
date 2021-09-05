import styled from "styled-components";
import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

export const Section = styled.section`
  width: 100%;
`;

export const ReviewInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.label`
  display: block;
  margin: 32px 4px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

export const SubWarningLabel = styled.p`
  margin: 50px 0;
  text-align: center;
  font-size: 12px;
  line-height: normal;
  letter-spacing: normal;
  color: ${PlaceholderColor};
`;

export const ReviewWrapper = styled.div`
  height: auto;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const FilterPickSection = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 1;
`;

export const FilterPickLabel = styled.label`
  margin: 0 2px 0 0;

  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;

  color: ${FontColor};
  cursor: pointer;
`;

export const LowArrowIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/arrow-low.png",
  alt: "arrow low",
})`
  width: 9px;
  height: 5px;
  margin-left: 4px;
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
`;

export const ReviewListFooter = styled.div`
  height: 50px;
`;
