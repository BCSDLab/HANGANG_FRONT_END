import React from "react";
import styled from "styled-components";

const Form = styled.form`
  margin-top: 40px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  padding-left: 20px;
  margin-bottom: 12px;
  border: #d2dae2 1px solid;
  outline: none;
  font-size: 15px;

  &::placeholder {
    letter-spacing: -0.8px;
    color: #bec9d5;
    font-size: 15px;
  }
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 45px;
  border: 1px solid #175c8e;
  border-radius: 0;
  line-height: 1.3;
  background-color: #175c8e;
  color: #ffffff;
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: 700;
  cursor: pointer;
`;

const AutoLoginField = styled.div`
  width: 100%;
  height: 43px;
  text-align: left;
`;

const AutoLoginText = styled.label`
  display: inline-block;
  position: relative;
  margin-top: 14px;
  padding-left: 24px;
  padding-bottom: 2px;
  color: #858585;
  text-align: left;
  letter-spacing: -0.6px;
  font-size: 12px;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 14px;
    border: 1px solid #d2dae2;
    background-color: #ffffff;
    line-height: 13px;
  }
`;

const AutoLoginCheckbox = styled.input`
  display: none;
  margin-top: 14px;
  margin-right: 10px;
  border-radius: 0;
  cursor: pointer;

  &:checked + ${AutoLoginText}:before {
    content: "";
    background-image: url("https://static.koreatech.in/assets/img/check.png");
    background-size: cover;
  }
`;

const LoginForm = ({ loginInfo, onChange, onSubmit, autoLogin, setAutoLogin }) => {
  const { portal_account, password } = loginInfo;
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          value={portal_account}
          onChange={onChange}
          name="portal_account"
          placeholder="아이디를 입력하세요."
          autoComplete="username"
          autoFocus
        />
        <Input
          type="password"
          value={password}
          onChange={onChange}
          name="password"
          placeholder="비밀번호를 입력하세요."
          autoComplete="current-password"
        />
        <LoginButton type="submit">로그인</LoginButton>
      </Form>
      <AutoLoginField>
        <AutoLoginCheckbox type="checkbox" />
        <AutoLoginText>자동 로그인</AutoLoginText>
      </AutoLoginField>
    </>
  );
};

export default LoginForm;
