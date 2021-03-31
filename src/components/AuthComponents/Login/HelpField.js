import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { BorderColor, FontColor } from "static/styles/authPageStyle";

const HelpFieldWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${BorderColor};
  padding-top: 16px;
  font-size: 12px;
  text-align: center;
`;

const SignUpLink = styled(Link)`
  height: 12px;
  padding-left: 35px;
  color: ${FontColor};
  text-decoration: none;
  cursor: pointer;
`;

const FindPasswordLink = styled(SignUpLink)`
  border-right: 1px solid ${BorderColor};
  padding-right: 35px;
`;

const FindUserIdLink = styled(FindPasswordLink)`
  padding-left: 0px;
`;

const HelpField = () => {
  return (
    <HelpFieldWrapper>
      <FindUserIdLink
        as="a"
        target="_blank"
        href="https://portal.koreatech.ac.kr/kut/page/findUser.jsp"
      >
        아이디 찾기
      </FindUserIdLink>
      <FindPasswordLink to="/findpwauth">비밀번호 찾기</FindPasswordLink>
      <SignUpLink to="/signupauth">회원가입</SignUpLink>
    </HelpFieldWrapper>
  );
};

export default HelpField;
