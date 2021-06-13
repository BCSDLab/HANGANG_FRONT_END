import styled from "styled-components";
import {
  BorderColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { RIGHT_ARROW_URL, X_URL } from "static/Shared/imageUrls";

export const LectureInfoModalBackground = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ screenHeight }) => screenHeight}px;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9995;
`;

export const LectureInfoModal = styled.form`
  position: fixed;
  top: 478px;
  left: calc(50% - 262px);
  width: 524px;
  height: 268px;
  padding: 24px 24px 12px;
  border-radius: 16px;
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

export const MoveLectureDetailPageButton = styled.img.attrs({
  src: RIGHT_ARROW_URL,
  alt: "close",
})`
  margin-left: 8px;
  width: 16px;
`;

export const Title = styled.h2`
  margin: 4px 0 10px 0;
  font-size: 20px;
  color: ${FontColor};
  cursor: ${({ isCustom }) => (isCustom ? "default" : "pointer")};
`;

export const Label = styled.h4`
  font-size: 14px;
  color: ${FontColor};
`;

export const SubLabel = styled.label`
  margin-left: 10px;
  font-size: 11px;
  color: ${PlaceholderColor};
`;

export const DelimiterLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 15px 0;
  background-color: ${BorderColor};
`;

export const Memo = styled.textarea.attrs({
  placeholder: "메모를 추가해주세요.",
})`
  width: 100%;
  height: 100px;
  line-height: 1.3;
  font-family: NotoSansCJKKR;
  font-size: 14px;
  border: none;
  outline: none;
  resize: none;
  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

export const MemoModifyButton = styled.input.attrs({
  type: "button",
  value: "수정",
})`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 65px;
  height: 24px;
  margin-left: 8px;
  border-radius: 20px;
  border: solid 1px ${PlaceholderColor};
  font-size: 12px;
  color: ${PlaceholderColor};
  background-color: #fff;
  cursor: pointer;
`;

export const DeleteButton = styled(MemoModifyButton).attrs({
  value: "과목삭제",
})`
  right: 89px;
`;
