import React from "react";
import { majorsFullName } from "static/majors";
import styled from "styled-components";

const SignUpFormWrapper = styled.form`
  margin-top: 40px;
  width: 100%;
`;

const Section = styled.div`
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
  width: 100%;
  height: 30px;
  border-bottom: #d2dae2 1px solid;
  outline: none;

  &::placeholder {
    letter-spacing: -0.8px;
    color: #bec9d5;
    font-size: 15px;
  }
`;

const MajorChoiceSection = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 25% 25% 25% 25%;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
`;

const Major = styled.input.attrs(() => ({
  type: "button",
}))`
  width: 100%;
  height: 20px;
  outline: none;
  background-color: ${(props) => (props.choiced ? "transparent" : "default")};
`;

const Button = styled.button`
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  font-size: 15px;
`;

const SignUpForm = ({ onChange, onSubmit, signUpInfo, terms, onClickMajor }) => {
  const { account, pw, pwConfirm, nickname, majors } = signUpInfo;
  const majorChoices = majorsFullName;
  return (
    <SignUpFormWrapper onSubmit={onSubmit}>
      <Label>아이디</Label>
      <Section>
        <Input type="text" name="account" value={account} onChange={onChange} autoComplete="username" />
      </Section>
      <Label>비밀번호</Label>
      <Section>
        <Input type="password" name="pw" value={pw} onChange={onChange} autoComplete="new-password" />
      </Section>
      <Label>비밀번호 확인</Label>
      <Section>
        <Input type="password" name="pwConfirm" value={pwConfirm} onChange={onChange} autoComplete="new-password" />
      </Section>
      <Label>닉네임</Label>
      <Section>
        <Input type="text" name="nickname" value={nickname} onChange={onChange} />
      </Section>
      <Label>전공 선택</Label>
      <MajorChoiceSection>
        {majorChoices.map((val) => (
          <Major key={val} value={val} choiced={majors.includes(val)} onClick={() => onClickMajor(val)} />
        ))}
      </MajorChoiceSection>
      <Label>약관 동의</Label>
      <Button>회원가입</Button>
    </SignUpFormWrapper>
  );
};

export default SignUpForm;
