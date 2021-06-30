import styled from "styled-components";

import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

export const Section = styled.section`
  width: 100%;
  margin-bottom: 32px;
`;

export const InfoLabel = styled.label`
  display: block;

  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

export const SubInfoLabel = styled.p`
  display: contents;

  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

export const SubLabel = styled.label`
  float: left;
  margin: 3px 8px 0 0;

  font-size: 14px;
  color: ${PlaceholderColor};
`;

export const SubLabelContent = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: ${FontColor};
`;

export const SubSubLabel = styled.label`
  display: flex;
  float: right;
  width: 56px;
  font-size: 11px;
  color: #999999;
  line-height: normal;
  text-align: right;
  justify-content: flex-end;
`;

export const GraphWrapper = styled.div`
  width: 704px;
  height: 146px;
  margin: 24px 0 32px;
  padding: 16px 16px 0;
  background-color: #fafafa;
`;

export const GraphSection = styled.div`
  position: relative;
  width: 209px;
  display: flex;
  justify-content: center;
  margin-left: 230px;
  height: 133px;
  top: -12px;
`;

export const Graph = styled.ul`
  display: flex;
  position: absolute;
  transform: transalte(-50%, -50%);
  li {
    padding-right: 1px;
  }
  div {
    position: relative;
    width: 20px;
    height: 117px;
  }
  li div span {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    bottom: -5px;
    background: #ffab2e;
  }

  label {
    position: relative;
    top: 123px;
    left: 3px;
    font-size: 11px;
    font-weight: normal;
    color: ${PlaceholderColor};
  }
`;

export const EvaluationWrapper = styled.div`
  margin: 0px 16px 24px 16px;
`;

export const EvaluationInfo = styled.div`
  display: grid;
  grid-template-columns: auto 4fr auto 1fr;
  grid-gap: 16px;
`;

export const HashTagWrapper = styled.div`
  margin-top: 16px;
`;

export const HashTag = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-right: 7px;
`;
