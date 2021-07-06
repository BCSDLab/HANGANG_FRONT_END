import styled from "styled-components";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";

export const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 183px;
  border: 1px solid ${({ isData }) => (isData ? "transparent" : `${BorderColor}`)};
  border-radius: 8px;
  margin-top: 16px;
`;

export const LeftSide = styled.div`
  width: 465px;
  margin-right: 16px;
`;

export const LeftTopSide = styled.div`
  display: flex;
  height: 80px;
  margin-bottom: 16px;
`;

export const LeftBottomSide = styled.div`
  display: flex;
  height: 87px;
`;

export const RightSide = styled.div``;

export const NoResource = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
`;
