import styled from "styled-components";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  MyPageSectionHeight,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Section = styled.section`
  min-height: ${MyPageSectionHeight};
  padding-top: 48px;
`;

export const Label = styled.label`
  color: ${ConceptColor};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const SystemGuidance = styled.span`
  white-space: pre-wrap;
  color: ${PlaceholderColor};
  font-size: 15px;
  font-weight: normal;
  line-height: 1.5;
`;

export const UsageGuidance = styled.div`
  width: 270px;
  height: 28px;
  display: flex;
  justify-content: space-between;
`;

export const Mark = styled.mark`
  all: unset;
  color: ${FontColor};
  font-size: 15px;
  line-height: 28px;
`;

export const PointGuidance = styled.span`
  color: ${PlaceholderColor};
  font-size: 14px;
  line-height: 28px;
`;

export const PointBreakdownSection = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const TotalLabel = styled(Label)`
  position: absolute;
  right: 0;
  font-size: 16px;
  color: ${FontColor};
`;

export const BreakdownWrapper = styled.div`
  overflow-y: scroll;
  height: 290px;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid ${BorderColor};

  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome
  }
`;

export const Breakdown = styled.div`
  position: relative;
  height: 40px;
  margin-bottom: 24px;
`;

export const Title = styled.span`
  font-size: 15px;
  color: ${FontColor};
`;

export const CreatedAt = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const Variance = styled.span`
  position: absolute;
  top: calc(50% - 7.5px);
  right: 0;
  height: 15px;
  font-size: 16px;
  font-weight: 500;
  color: ${PlaceholderColor};
`;
