import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
} from "static/Shared/commonStyles";
import { CLOSE_WRITE_FORM_URL } from "static/Shared/imageUrls";

export const Wrapper = styled.div`
  position: absolute;
  display: ${({ show }) => (show ? "block" : "none")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div`
  position: absolute;
  top: 222px;
  /* top: calc(50% - 333.5px); 정중앙에 위치 시키는게 이상해서 zeppelin 따름 문제 될 시 해당 코드 사용*/
  left: calc(50% - 424px);
  width: 848px;
  height: 667px;

  padding: 24px;

  border-radius: 24px;
  border: solid 1px ${CopyRightColor};
  background-color: #fff;
`;

export const CloseButton = styled.img.attrs({
  src: CLOSE_WRITE_FORM_URL,
  alt: "close_resource_form_btn",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  cursor: pointer;
`;

export const Title = styled.input.attrs({
  type: "text",
  placeholder: "제목을 입력해 주세요.",
})`
  width: calc(100% - 40px); // 40px is space for "X button"
  height: 30px;

  border: none;
  outline: none;

  font-size: 20px;
  color: ${FontColor};
  ::placeholder {
    color: #999999;
  }
`;

export const Delimiter = styled.div`
  width: 100%;
  height: 1px;
  margin: 14px 0px 21.5px 0px;
  background-color: ${BorderColor};
`;

export const SubmitButton = styled.input.attrs({
  type: "button",
  value: "작성완료 (+10P)",
})`
  position: absolute;
  left: calc(50% - 171.5px);
  bottom: 24px;
  width: 343px;
  height: 36px;
  border: none;
  border-radius: 24px;
  background-color: ${({ isValid }) => (isValid ? `${ConceptColor}` : "#bddcff")};

  font-size: 14px;
  color: #fff;

  cursor: ${({ isValid }) => (isValid ? "pointer" : "default")};
`;
