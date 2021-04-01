import React from "react";
import styled from "styled-components";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";

const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 276px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  margin-top: 16px;
`;

const NoViewedLectureMaterial = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const RecentlyViewedLectureContainer = () => {
  return (
    <>
      <Label>최근 본 강의</Label>
      <Content>
        <NoViewedLectureMaterial>최근에 본 강의평이 없습니다.</NoViewedLectureMaterial>
      </Content>
    </>
  );
};

export default RecentlyViewedLectureContainer;
