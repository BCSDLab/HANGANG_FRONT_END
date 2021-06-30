import styled from "styled-components";

import { FontColor } from "static/Shared/commonStyles";
import { RIGHT_BUTTON_URL } from "static/Shared/imageUrls";

export const Bar = styled.div`
  width: fit-content;
  height: 24px;
  display: flex;
  align-items: center;
`;

export const Semester = styled.span`
  margin: 0 30px;
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

export const RightButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
`;

export const RightImage = styled.img.attrs({
  src: RIGHT_BUTTON_URL,
  alt: "rightBtn",
})`
  width: 100%;
  cursor: pointer;
`;

export const LeftButton = styled(RightButton)``;

export const LeftImage = styled(RightImage)`
  transform: rotate(180deg);
`;
