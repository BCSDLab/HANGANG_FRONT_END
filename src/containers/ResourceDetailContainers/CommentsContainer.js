import Comment from "components/ResourceDetailComponents/Comment";
import React from "react";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
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

const CommentWriteInput = styled.textarea.attrs({
  placeholder: "댓글을 작성해주세요.",
})`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;

  padding: 11px 8px;
  margin-top: 24px;

  border: none;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: ${BorderColor};

  font-size: 12px;
  color: ${PlaceholderColor};
`;

const CommentWrapper = styled.div`
  min-height: 200px;
  overflow-y: auto;
  > div:not(:last-child) {
    border-bottom: 1px solid ${BorderColor};
  }
`;

// TODO:
// - CommentWrapper 높이 정해야함... 지금 매우 이상
// - CommentWriteInput 가변적으로 높이 받을 수 있도록 추후 수정
const CommentsContainer = ({ comments }) => {
  //   console.log(comments);

  return (
    <Wrapper>
      <CountComment>{`댓글 (${comments.length})`}</CountComment>
      <CommentWriteInput />
      <CommentWrapper>
        <Comment />
        <Comment />
      </CommentWrapper>
    </Wrapper>
  );
};

export default CommentsContainer;
