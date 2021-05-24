import Comment from "components/ResourceDetailComponents/Comment";
import React, { useState } from "react";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { COMMENT_ICON_URL } from "static/Shared/imageUrls";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 32px;
  height: fit-content;
`;

const CountComment = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${FontColor};
`;

const WriteSectionWrapper = styled.form`
  position: relative;
  height: calc(40px + ${({ lineAmount }) => lineAmount} * 15px);
  max-height: 194px;
`;

const CommentWriteInput = styled.textarea.attrs({
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

const CommentLetterCounter = styled.span`
  position: absolute;
  bottom: 8px;
  right: 43px;
  width: 59px;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const CommentIcon = styled.img.attrs({
  src: COMMENT_ICON_URL,
  alt: "comment",
})`
  position: absolute;
  bottom: 8px;
  right: 11px;
  width: 24px;
`;

const CommentWrapper = styled.div`
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

// TODO:
// - CommentWrapper 높이 정해야함... 지금 매우 이상
const CommentsContainer = ({ comments }) => {
  const [comment, setComment] = useState("");

  return (
    <Wrapper>
      <CountComment>{`댓글 (${comments.length})`}</CountComment>
      <WriteSectionWrapper lineAmount={comment.split("\n").length - 1}>
        <CommentWriteInput
          value={comment}
          onChange={(e) => {
            if (comment.length < 300) setComment(e.target.value);
          }}
        />
        {comment !== "" && (
          <>
            <CommentLetterCounter>{`${comment.length}/300자`}</CommentLetterCounter>
            <CommentIcon />
          </>
        )}
      </WriteSectionWrapper>
      <CommentWrapper>
        {console.log(comments)}
        <Comment />
      </CommentWrapper>
    </Wrapper>
  );
};

export default CommentsContainer;
