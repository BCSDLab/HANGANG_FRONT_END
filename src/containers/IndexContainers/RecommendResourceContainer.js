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
  height: 183px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  margin-top: 16px;
`;

const NoResource = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const RecommendResourceContainer = () => {
  return (
    <>
      <Label>추천 강의자료</Label>
      <Content>
        <NoResource>시간표를 작성하지 않았거나 업로드된 강의자료가 없습니다.</NoResource>
      </Content>
    </>
  );
};

export default RecommendResourceContainer;
