import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  InnerContentWidth,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  width: ${InnerContentWidth};
  margin: 40px auto 32px auto;
`;

export const Content = styled.div`
  display: grid;
`;

export const RightSection = styled.section`
  display: flex;
  flex-direction: column;
  grid-column: 8 / 12;
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const ReviewSection = styled.section`
  width: 752px;
  grid-column: 0 / 12;
  padding: 24px 24px 16px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
`;

export const WriteLectureReviewButton = styled.button`
  grid-column: 8/12;
  width: 368px;
  height: 40px;
  border-radius: 24px;
  border: 1px solid ${ConceptColor};
  margin-top: 24px;
  background-color: #fff;
  color: ${PlaceholderColor};
  cursor: pointer;
`;
