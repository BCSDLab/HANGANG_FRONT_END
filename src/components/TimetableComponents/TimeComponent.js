import React from "react";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
} from "static/Shared/commonStyles";
import { DOWN_URL, X_URL } from "static/Shared/imageUrls";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  height: 54px;
`;

const Day = styled.div`
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

const DayWrapper = styled.div`
  display: flex;

  ${Day}:not(:last-child) {
    margin-right: 8px;
  }
`;

const X = styled.img.attrs({
  src: X_URL,
  alt: "x",
})`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  cursor: pointer;
`;

const StartTime = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
  color: ${FontColor};
  cursor: pointer;
`;

const Down = styled.img.attrs({
  src: DOWN_URL,
  alt: "down",
})`
  margin: 2px 0 0 4px;
  width: 14px;
`;

const EndTime = styled(StartTime)`
  margin-left: 16px;
`;

const TimeWrapper = styled.div`
  display: flex;
`;

const TimeOnDirectlyAddContainer = ({ info, class_times, setDirectlyAddForm }) => {
  /**
   * 요일 정보를 받아 class_times 의 현재 변경하려는 타겟의 요일을 변경합니다.
   * @param {number} value 요일 정보가 담겨있는 value 값입니다.
   */
  const onDayElementClick = (value) => {
    class_times[info.order] = { ...info, day: value };
    setDirectlyAddForm((prev) => ({
      ...prev,
      class_times: [...class_times],
    }));
  };

  /**
   * X 버튼을 누를 경우 해당 시간을 제거합니다.
   */
  const onXElementClick = () => {
    setDirectlyAddForm((prev) => ({
      ...prev,
      class_times: prev["class_times"].filter(({ order }) => order !== info.order),
    }));
  };

  return (
    <Wrapper>
      <DayWrapper>
        {DAY_WITH_VALUE.map(({ label, value }) => (
          <Day
            key={value}
            onClick={() => onDayElementClick(value)}
            isChoiced={info.day === value}
          >
            {label}
          </Day>
        ))}
      </DayWrapper>
      <X onClick={onXElementClick} />
      <TimeWrapper>
        <StartTime>
          09:00
          <Down />
        </StartTime>
        <EndTime>
          10:00
          <Down />
        </EndTime>
      </TimeWrapper>
    </Wrapper>
  );
};

const DAY_WITH_VALUE = [
  { label: "월", value: 0 },
  { label: "화", value: 1 },
  { label: "수", value: 2 },
  { label: "목", value: 3 },
  { label: "금", value: 4 },
];

export default TimeOnDirectlyAddContainer;
