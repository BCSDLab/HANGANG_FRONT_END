import React, { useState } from "react";
import {
  Day,
  DayWrapper,
  Down,
  EndTime,
  StartTime,
  Time,
  TimeDropdown,
  TimeWrapper,
  Wrapper,
  X,
} from "./styles/TimeComponent.style";

const TimeOnDirectlyAddContainer = ({
  info,
  class_times,
  directlyAddForm,
  setDirectlyAddForm,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    startTime: false,
    endTime: false,
  });

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
    let addForm = directlyAddForm["class_times"].filter(
      ({ order }) => order !== info.order
    );

    addForm = addForm.map((elem, idx) => {
      return { ...elem, order: idx };
    });

    setDirectlyAddForm((prev) => ({
      ...prev,
      class_times: addForm,
    }));
  };

  /**
   * 드롭다운의 시간 정보를 클릭 시 시간 데이터를 변경합니다.
   */
  const onTimeDropdownClick = (e, target, value) => {
    if (target === "startTime" && parseInt(value) > parseInt(info.time.endTime)) {
      alert("시작 시간보다 종료 시간이 빠를 수 없습니다.");
      return;
    }

    if (target === "endTime" && parseInt(value) < parseInt(info.time.startTime)) {
      alert("시작 시간보다 종료 시간이 빠를 수 없습니다.");
      return;
    }

    e.stopPropagation();

    class_times[info.order] = {
      ...info,
      time: {
        ...class_times[info.order]["time"],
        [target]: value,
      },
    };

    setIsDropdownVisible((prev) => ({ ...prev, [target]: false }));
    setDirectlyAddForm((prev) => ({
      ...prev,
      class_times: [...class_times],
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
        <StartTime
          onClick={() => setIsDropdownVisible((prev) => ({ ...prev, startTime: true }))}
        >
          {TIME_WITH_VALUE.find(({ value }) => value === info.time.startTime).label}
          <Down isChoiced={isDropdownVisible.startTime} />

          {isDropdownVisible.startTime && (
            <TimeDropdown>
              {TIME_WITH_VALUE.map(({ label, value }) => (
                <Time
                  key={value}
                  onClick={(e) => onTimeDropdownClick(e, "startTime", value)}
                >
                  {label}
                </Time>
              ))}
            </TimeDropdown>
          )}
        </StartTime>

        <EndTime
          onClick={() => setIsDropdownVisible((prev) => ({ ...prev, endTime: true }))}
        >
          {TIME_WITH_VALUE.find(({ value }) => value === info.time.endTime).label}
          <Down isChoiced={isDropdownVisible.endTime} />

          {isDropdownVisible.endTime && (
            <TimeDropdown>
              {TIME_WITH_VALUE.map(({ label, value }) => (
                <Time
                  key={value}
                  onClick={(e) => onTimeDropdownClick(e, "endTime", value)}
                >
                  {label}
                </Time>
              ))}
            </TimeDropdown>
          )}
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

const TIME_WITH_VALUE = [
  { label: "09:00", value: "00" },
  { label: "09:30", value: "01" },
  { label: "10:00", value: "02" },
  { label: "10:30", value: "03" },
  { label: "11:00", value: "04" },
  { label: "11:30", value: "05" },
  { label: "12:00", value: "06" },
  { label: "12:30", value: "07" },
  { label: "13:00", value: "08" },
  { label: "13:30", value: "09" },
  { label: "14:00", value: "10" },
  { label: "14:30", value: "11" },
  { label: "15:00", value: "12" },
  { label: "15:30", value: "13" },
  { label: "16:00", value: "14" },
  { label: "16:30", value: "15" },
  { label: "17:00", value: "16" },
  { label: "17:30", value: "17" },
];

export default TimeOnDirectlyAddContainer;
