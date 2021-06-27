import styled from "styled-components";
import { InnerContentWidth } from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  position: relative;
  min-height: ${MIN_HEIGHT};
  width: 100%;
`;

export const UpperContent = styled.div`
  width: 100%;
  height: 285px;
  background-color: #f7f7f7;
`;

export const BelowContent = styled.div`
  width: 100%;
  background-color: transparent;
`;

export const Content = styled.div`
  width: ${InnerContentWidth};
  height: 100%;
  margin: 0 auto;
`;

const MIN_HEIGHT = "798px";
