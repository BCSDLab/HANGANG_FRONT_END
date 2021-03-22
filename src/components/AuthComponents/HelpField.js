import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HelpFieldWrapper = styled.div`
  width: 100%;
  height: 43px;
  border-top: 1px #d2dae2 solid;
  padding-top: 18px;
  letter-spacing: -0.6px;
  font-size: 12px;
  color: #858585;
  text-align: center;
`;

const FindUserIdLink = styled.a`
  border-right: 1px #d2dae2 solid;
  padding-right: 19px;
  padding-left: 14px;
  color: #858585;
  text-decoration: none;
  cursor: pointer;
`;

const SignUpLink = styled(Link)`
  padding-right: 19px;
  padding-left: 14px;
  color: #858585;
  text-decoration: none;
  cursor: pointer;
`;

const FindPasswordLink = styled(SignUpLink)`
  border-right: 1px #d2dae2 solid;
`;

const HelpField = () => {
  return (
    <HelpFieldWrapper>
      <FindUserIdLink target="_blank" href="https://portal.koreatech.ac.kr/kut/page/findUser.jsp">
        아이디 찾기
      </FindUserIdLink>
      <FindPasswordLink to="/findpw">비밀번호 찾기</FindPasswordLink>
      <SignUpLink to="/emailauth">회원가입</SignUpLink>
    </HelpFieldWrapper>
  );
};

export default HelpField;
