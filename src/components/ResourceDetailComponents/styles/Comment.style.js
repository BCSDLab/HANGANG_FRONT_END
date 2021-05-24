import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  /* min-height: 76px; */
  padding: 16px 0px;
`;

export const Writer = styled.span`
  font-size: 12px;
  color: ${FontColor};
`;

export const Date = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const Content = styled.div`
  display: block;
  width: 649px;
  margin-top: 13px;
  font-size: 12px;
  line-height: 1.5em;
  color: ${FontColor};
  word-wrap: break-word;
`;

export const Report = styled.button`
  all: unset;
  position: absolute;
  bottom: 16px;
  right: 0;
  font-size: 12px;
  color: ${PlaceholderColor};
  cursor: pointer;
`;
