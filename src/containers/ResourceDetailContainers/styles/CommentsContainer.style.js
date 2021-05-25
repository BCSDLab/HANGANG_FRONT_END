import styled from "styled-components";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { COMMENT_ICON_URL } from "static/Shared/imageUrls";

export const Wrapper = styled.div`
  margin-top: 32px;
  height: fit-content;
`;

export const CountComment = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${FontColor};
`;

export const WriteSectionWrapper = styled.form`
  position: relative;
  height: calc(40px + ${({ lineAmount }) => lineAmount} * 15px);
  max-height: 194px;
`;

export const CommentWriteInput = styled.textarea.attrs({
  placeholder: "댓글을 작성해주세요.",
})`
  overflow: hidden;
  resize: none;

  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  padding: 13px 113px 13px 11px;
  margin-top: 24px;

  border: none;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: ${BorderColor};

  line-height: 1.3;
  font-family: NotoSansCJKKR;
  font-size: 12px;
  color: ${FontColor};

  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

export const CommentLetterCounter = styled.span`
  position: absolute;
  bottom: 8px;
  right: 43px;
  width: 59px;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const CommentIcon = styled.img.attrs({
  src: COMMENT_ICON_URL,
  alt: "comment",
})`
  position: absolute;
  bottom: 8px;
  right: 11px;
  width: 24px;
  cursor: pointer;
`;

export const CommentWrapper = styled.div`
  /* height: calc(100vh - 860px);
overflow-y: auto; */

  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome
  }
  > div:not(:last-child) {
    border-bottom: 1px solid ${BorderColor};
  }
`;
