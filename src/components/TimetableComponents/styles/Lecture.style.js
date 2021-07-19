import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";

export const Background = styled.div`
  position: relative;
  width: 100%;
  height: 111px;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid ${BorderColor};
  :hover {
    background-color: #f9f9f9;
  }
`;

export const Title = styled.span`
  font-size: 14px;
  color: ${FontColor};
`;

export const Code = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${PlaceholderColor};
`;

export const SubTitle = styled.span`
  display: block;
  margin-top: 15px;
  font-size: 12px;
  color: ${FontColor};
`;

export const OtherLabels = styled.span`
  position: absolute;
  bottom: 20px;
  font-size: 11px;
  color: ${PlaceholderColor};
`;

export const Rating = styled.span`
  position: absolute;
  top: 20px;
  right: 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

export const ReflectButton = styled.input.attrs({
  type: "button",
  value: "담기",
})`
  position: absolute;
  right: 80px;
  bottom: 16px;
  width: 56px;
  height: 28px;
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: ${ConceptColor};
  color: #fff;
  cursor: pointer;
`;

export const DrawOffButton = styled(ReflectButton).attrs({
  value: "빼기",
})`
  background-color: #ffab2e;
`;

export const LecturePageButton = styled(ReflectButton).attrs({
  value: "강의평",
})`
  right: 16px;
  border: 1px solid ${PlaceholderColor};
  background-color: #fff;
  color: ${PlaceholderColor};
`;
