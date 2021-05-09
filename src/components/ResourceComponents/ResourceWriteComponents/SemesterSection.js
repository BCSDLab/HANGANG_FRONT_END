import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { UNDER_ARROW_URL } from "static/Shared/imageUrls";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  height: 30px;
`;

const Label = styled.label.attrs({
  htmlFor: "semesters",
})`
  margin-right: 50px;
  color: ${PlaceholderColor};
  font-size: 12px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;

  height: 30px;
  padding: 6px 12px;

  color: ${FontColor};
  font-size: 12px;
  cursor: pointer;

  :hover {
    background-color: ${BorderColor};
  }
`;

const SelectBox = styled.div.attrs({
  id: "semesters",
})`
  position: absolute;
  top: 0;
  left: 79px;
  width: 240px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  padding: 6px 0 0 0;

  border: solid 1px ${BorderColor};
  border-radius: 4px;

  ${Option}:last-child {
    margin-bottom: 6px;
  }
`;

const SemesterSpan = styled.span`
  color: ${FontColor};
  font-size: 12px;
`;

const SelectedBox = styled.div`
  display: flex;
  align-items: center;

  height: 18px;
  padding: 6px 12px;
  margin-bottom: 6px;
  cursor: pointer;
`;

const UnderArrow = styled.img.attrs({
  src: UNDER_ARROW_URL,
  alt: "under",
})`
  position: absolute;
  right: 6px;
  width: 16px;

  transform: ${({ isOptionOpened }) => (isOptionOpened ? `rotate(180deg)` : "none")};
  transition: transform 0.3s ease-in-out;
`;

/**
 * A Function to get semesters with value until current time.
 * Supposed first semester start on Match 1st, second on September 1st.
 * @param {number} optionStartYear A Number to set starting year by user-defined value.
 * @returns A Array contained value and semester naming. Sorted as descending order by value.
 */
const getSemesterOptionsUntilNow = (optionStartYear = 2019) => {
  let results = [];
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let value = 0;

  for (let i = 0; i < currentYear - optionStartYear; i++) {
    results.push({ value: ++value, naming: `${optionStartYear + i}년 1학기` });
    results.push({ value: ++value, naming: `${optionStartYear + i}년 2학기` });
  }

  if (currentMonth >= 3)
    results.push({ value: ++value, naming: `${currentYear}년 1학기` });
  if (currentMonth >= 9)
    results.push({ value: ++value, naming: `${currentYear}년 2학기` });

  return results.sort((a, b) => b.value - a.value);
};

const SemesterSection = ({ setForm }) => {
  const [isOptionOpened, setIsOptionOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState("2021년 1학기");
  const options = getSemesterOptionsUntilNow();

  /**
   * A Function to trigger when user click option.
   * Change option name, option open state, user form
   * @param {value} A String to convey semester info to Backend
   * @param {naming} A String to show current semester
   */
  const chooseOption = ({ value, naming }) => {
    setSelectedOption(naming);
    setIsOptionOpened(false);
    setForm((prev) => ({ ...prev, semester_date: value.toString() }));
  };

  return (
    <Wrapper>
      <Label>수강학기</Label>
      <SelectBox>
        <SelectedBox onClick={() => setIsOptionOpened((prev) => !prev)}>
          <SemesterSpan>{selectedOption}</SemesterSpan>
          <UnderArrow isOptionOpened={isOptionOpened} />
        </SelectedBox>
        {isOptionOpened &&
          options.map(({ value, naming }) => (
            <Option key={value} onClick={() => chooseOption({ value, naming })}>
              {naming}
            </Option>
          ))}
      </SelectBox>
    </Wrapper>
  );
};

SemesterSection.defaultProps = {
  setForm: () => {},
};

SemesterSection.propTypes = {
  setForm: PropTypes.func,
};

export default SemesterSection;
