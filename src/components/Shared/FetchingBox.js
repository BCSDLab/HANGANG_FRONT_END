import React from "react";
import styled, { keyframes } from "styled-components";

const flowBackground = keyframes`
  0%{background-position:0% 92%}
  100%{background-position:100% 9%}
`;

const Fetching = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
  border-radius: 10px;

  opacity: 0.5;
  background: linear-gradient(
    90deg,
    rgba(211, 223, 232, 0.5) 30%,
    rgba(169, 184, 197, 0.5) 38%,
    rgba(168, 182, 193, 0.6) 41%,
    rgba(168, 182, 193, 0.6) 50%,
    rgba(168, 182, 193, 0.6) 50%,
    rgba(169, 184, 197, 0.6) 51%,
    rgba(211, 223, 232, 0.6) 57%,
    rgba(211, 223, 232, 0.6) 80%,
    rgba(211, 223, 232, 0.6) 80%
  );
  background-size: 1200% 1200%;

  animation: ${flowBackground} 0.7s linear infinite reverse;
`;

const FetchingBox = ({ height }) => {
  return <Fetching height={height} />;
};

export default FetchingBox;
