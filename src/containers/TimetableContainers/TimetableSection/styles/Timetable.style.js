import styled from "styled-components";

export const TimetableWrapper = styled.div`
  position: relative;
  width: 560px;
  margin-top: 55px;
`;

export const TimetableCanvas = styled.canvas`
  width: 562px;
  height: 977px;
  background-color: #ffffff;
`;

export const CandidateLectureCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 562px;
  height: 977px;
  z-index: 9990;
`;
