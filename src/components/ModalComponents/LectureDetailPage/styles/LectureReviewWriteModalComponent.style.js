import styled from "styled-components";
import { X_URL } from "static/Shared/imageUrls";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const LectureReviewWriteModalBackground = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ screenHeight }) => screenHeight}px;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9995;
`;

export const LectureReviewWriteModal = styled.form`
  position: fixed;
  top: calc(50% - 388.5px);
  left: calc(50% - 376px);
  height: 777px;
  width: 752px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${CopyRightColor};
  background-color: #fff;
`;

export const CloseButton = styled.img.attrs({
  src: X_URL,
  alt: "close",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  position: absolute;
  left: calc(50% - 171.5px);
  bottom: 24px;
  width: 343px;
  height: 36px;
  border: none;
  outline: none;
  border-radius: 24px;
  background-color: ${ConceptColor};
  color: #fff;
  cursor: pointer;
`;
