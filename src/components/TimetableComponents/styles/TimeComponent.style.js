import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
} from "static/Shared/commonStyles";
import { DOWN_URL, X_URL } from "static/Shared/imageUrls";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  height: 54px;
`;

export const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  border: ${({ isChoiced }) => (isChoiced ? "none" : `1px solid ${CopyRightColor}`)};
  background-color: ${({ isChoiced }) =>
    isChoiced ? `${ConceptColor}` : `${BorderColor}`};
  color: ${({ isChoiced }) => (isChoiced ? "#fff" : `${CopyRightColor}`)};
  font-size: 14px;
  cursor: pointer;
`;

export const DayWrapper = styled.div`
  display: flex;

  ${Day}:not(:last-child) {
    margin-right: 8px;
  }
`;

export const X = styled.img.attrs({
  src: X_URL,
  alt: "x",
})`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  cursor: pointer;
`;

export const StartTime = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
  color: ${FontColor};
  cursor: pointer;
`;

export const Down = styled.img.attrs({
  src: DOWN_URL,
  alt: "down",
})`
  margin: 2px 0 0 4px;
  width: 14px;
`;

export const EndTime = styled(StartTime)`
  margin-left: 16px;
`;

export const TimeWrapper = styled.div`
  display: flex;
`;

export const Time = styled.div`
  width: 100%;
  height: 30px;
  padding: 8px 0 8px 12px;
  background-color: #fff;
  color: ${FontColor};
  font-size: 12px;
  cursor: pointer;

  :hover {
    background-color: ${BorderColor};
  }
`;

export const TimeDropdown = styled.div`
  position: absolute;
  top: 25px;
  overflow-y: scroll;
  width: 106px;
  height: 182px;
  border-radius: 4px;
  border: solid 1px #eeeeee;
  background-color: #ffffff;
  z-index: 9999;
`;
