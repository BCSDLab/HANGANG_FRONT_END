import React from "react";
import { PlaceholderColor } from "static/Shared/commonStyles";
import { NO_DATA_URL } from "static/Shared/imageUrls";
import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin-top: 160px;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: 200px;
`;

const NoDataImage = styled.img.attrs({
  src: NO_DATA_URL,
  alt: "no_data",
})`
  width: 200px;
`;

const Label = styled.label`
  width: 220px;
  margin: 16px 0 0;

  text-align: center;
  font-size: 14px;
  line-height: 21px;
  white-space: pre-line;
  color: ${PlaceholderColor};
`;

const NoData = ({ isSeasonSemester }) => (
  <Background>
    <Wrapper>
      <NoDataImage />
      <Label>{isSeasonSemester ? NO_SEASON_SEMESTER_DATA : NO_SEARCH_DATA}</Label>
    </Wrapper>
  </Background>
);

const NO_SEARCH_DATA = "검색결과가 없습니다.";
const NO_SEASON_SEMESTER_DATA =
  "계절학기 과목 데이터가 없습니다.\n데이터가 없어 직접추가만 가능합니다.";

export default NoData;
