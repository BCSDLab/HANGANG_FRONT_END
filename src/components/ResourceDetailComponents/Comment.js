import React from "react";
import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  /* min-height: 76px; */
  padding: 16px 0px;
`;

const Writer = styled.span`
  font-size: 12px;
  color: ${FontColor};
`;

const Date = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const Content = styled.span`
  display: block;
  width: 649px;
  margin-top: 13px;
  font-size: 12px;
  line-height: 1.5em;
  color: ${FontColor};
`;

const Report = styled.button`
  all: unset;
  position: absolute;
  bottom: 16px;
  right: 0;
  font-size: 12px;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

const Comment = () => (
  <Wrapper>
    <Writer>도미는이유정</Writer>
    <Date>4일전</Date>
    <Content>
      댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는
      649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대
      넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의
      최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는
      649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대
      넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의
      최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는
      649입니다.댓글의 최대 넓이는 649입니다.댓글의 최대 넓이는 649입니다. 댓글의 최대
      넓이는 649입니다.
    </Content>
    <Report>신고</Report>
  </Wrapper>
);

export default Comment;
