import React from "react";
import styled from "styled-components";

const AuthFormWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const AuthSection = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 65%;
  height: 30px;
  padding-left: 20px;
  border: #d2dae2 1px solid;
  outline: none;
  font-size: 15px;

  &::placeholder {
    letter-spacing: -0.8px;
    color: #bec9d5;
    font-size: 15px;
  }
`;

const KoreatechSpan = styled.span`
  width: 32%;
  font-size: 15px;
`;

const SmallButton = styled.button`
  width: 32%;
  font-size: 15px;
`;

const BigButton = styled.button`
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  font-size: 15px;
`;

const PortalLink = styled.a`
  all: unset;
  cursor: pointer;
`;

const AuthForm = ({ authInfo, onChange, checkPortalEmail, checkEmailConfig, accountDisabled }) => {
  const { account, secret } = authInfo;
  return (
    <AuthFormWrapper>
      <Label>학교 이메일 인증</Label>
      <AuthSection>
        <Input name="account" value={account} onChange={onChange} disabled={accountDisabled} />
        <KoreatechSpan>@koreatech.ac.kr</KoreatechSpan>
      </AuthSection>
      <Label>인증번호</Label>
      <AuthSection>
        <Input name="secret" value={secret} onChange={onChange} />
        <SmallButton onClick={() => checkPortalEmail(account)}>인증번호 전송</SmallButton>
      </AuthSection>
      <PortalLink target="_blank" href="https://portal.koreatech.ac.kr/">
        <BigButton>아우누리 바로가기</BigButton>
      </PortalLink>
      <BigButton onClick={() => checkEmailConfig(secret)}>인증 완료</BigButton>
    </AuthFormWrapper>
  );
};

export default AuthForm;
