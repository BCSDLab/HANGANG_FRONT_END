import React, { useRef } from "react";
import styled from "styled-components";
import {
  Section as AuthSection,
  Label as AuthLabel,
  LabelSection,
  AlertMsg,
} from "./AuthForm";
import { Input as LoginInput } from "./LoginForm";
import { AlertImg, Button, CheckImg, ImageWrapper } from "./SignUpForm";
import PasswordToggleIcon from "./PasswordToggleIcon";

const Form = styled.form`
  margin-top: 40px;
  width: 100%;
`;

const Section = styled(AuthSection)`
  margin-top: 16px;
`;

const Label = styled(AuthLabel)``;

const Input = styled(LoginInput)`
  width: 90%;
  margin: 0;
  border: none;
`;

const NewPwForm = ({ infos, error, onChange, onSubmit }) => {
  const { newPw, confirmPw } = infos;
  const newPwRef = useRef();
  const newPwConfirmRef = useRef();

  const submitValidCheck = () => {
    if (Object.values(error)[0] === false) {
      return true;
    } else {
      return false;
    }
  };

  console.log(error);
  return (
    <Form>
      <LabelSection>
        <Label>새 비밀번호</Label>
        {newPw.length !== 0 && (
          <AlertMsg>
            {error.pwLetterLengthError && "비밀번호는 8 ~ 15자여야 합니다!"}
            {error.pwNumberError && "숫자가 포함되어 있지 않습니다!"}
            {error.pwSymbolError && "특수 기호가 포함되어 있지 않습니다!"}
          </AlertMsg>
        )}
      </LabelSection>
      <Section>
        <Input
          type="password"
          value={newPw}
          onChange={onChange}
          name="newPw"
          placeholder="영문, 숫자, 특수기호 반드시 포함 8자~15자"
          autoComplete="new-password"
          ref={newPwRef}
        />
        <ImageWrapper>
          {newPw.length !== 0 &&
            (!error.pwLetterLengthError &&
            !error.pwNumberError &&
            !error.pwSymbolError ? (
              <CheckImg />
            ) : (
              <AlertImg />
            ))}
          <PasswordToggleIcon target={newPwRef} />
        </ImageWrapper>
      </Section>
      <LabelSection>
        <Label>새 비밀번호 확인</Label>
        {confirmPw.length !== 0 && error.notEqualPw && (
          <AlertMsg>비밀번호가 일치하지 않습니다!</AlertMsg>
        )}
      </LabelSection>
      <Section>
        <Input
          type="password"
          value={confirmPw}
          onChange={onChange}
          name="confirmPw"
          placeholder="비밀번호를 한번 더 입력해주세요."
          autoComplete="new-password"
          ref={newPwConfirmRef}
        />
        <ImageWrapper>
          {confirmPw.length !== 0 && (error.notEqualPw ? <AlertImg /> : <CheckImg />)}
          <PasswordToggleIcon target={newPwConfirmRef} />
        </ImageWrapper>
      </Section>
      <Button
        type="submit"
        onClick={onSubmit}
        isValid={submitValidCheck()}
        disabled={!submitValidCheck()}
      >
        비밀번호 변경
      </Button>
    </Form>
  );
};

export default NewPwForm;
