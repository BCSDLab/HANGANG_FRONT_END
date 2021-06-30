import styled from "styled-components";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";

export const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: fit-content;
  min-height: 276px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  margin-top: 16px;
  padding: 12px 20px;
`;

export const Lecture = styled.div`
  position: relative;
  width: 100%;
  height: 39px;
  margin: 12px 0px;
  cursor: pointer;
`;

export const Name = styled.span`
  position: absolute;
  top: 2px;
  left: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Professor = styled.span`
  position: absolute;
  bottom: 2px;
  left: 0;
  font-size: 12px;
  color: #828282;
`;

export const Rating = styled.span`
  position: absolute;
  top: calc(50% - 9px);
  right: 0;
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
`;

export const NoViewedLectureMaterial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  font-size: 12px;
  color: ${PlaceholderColor};
`;
