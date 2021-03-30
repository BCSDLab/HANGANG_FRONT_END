import React, { useRef } from "react";
import { majorsFullName } from "static/majors";
import {
  BorderColor,
  ButtonColor,
  FontColor,
  NonClickButtonColor,
  PlaceholderColor,
} from "static/styles/authPageStyle";
import Terms from "static/terms";
import styled from "styled-components";
import {
  Section as AuthSection,
  Label as AuthLabel,
  LabelSection,
  AlertMsg,
  EmailAuthInput,
  KoreatechSpan,
} from "../EmailAuth/EmailAuthForm";
import { AlertImg as LoginAlertImg, LoginButton } from "../Login/LoginForm";
import PasswordToggleIcon from "../Shared/PasswordToggleIcon";

const Form = styled.form`
  margin-top: 40px;
  width: 100%;
`;

const Section = styled(AuthSection)``;

const Label = styled(AuthLabel)``;

const NotifySpan = styled.span`
  margin-left: 10px;
  color: ${PlaceholderColor};
  font-size: 12px;
  font-weight: 300;
`;

const Input = styled(EmailAuthInput)`
  width: 295px;
`;

export const ImageWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 44px;
  height: 20px;
`;

export const AlertImg = styled(LoginAlertImg)`
  position: absolute;
  left: 0;
`;

export const CheckImg = styled(LoginAlertImg).attrs(() => ({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/check.png",
  alt: "확인 이미지",
}))`
  position: absolute;
  left: 0;
`;

const MajorChoiceSection = styled.div`
  display: grid;
  grid-template-columns: 176px 176px;
  grid-template-rows: 29px 29px 29px 29px;
  gap: 8px 16px;
  margin-top: 20px;
`;

const Major = styled(LoginButton).attrs(() => ({
  type: "button",
}))`
  width: 176px;
  height: 29px;
  line-height: 0px;
  outline: none;
  color: ${({ choiced }) => (choiced ? "#fff" : `${FontColor}`)};
  background-color: ${({ choiced }) => (choiced ? `${ButtonColor}` : `${BorderColor}`)};
  font-size: 14px;
  font-weight: normal;
`;

export const Button = styled(LoginButton)`
  margin-top: 40px;
  background-color: ${({ isValid }) =>
    isValid ? `${ButtonColor}` : `${NonClickButtonColor}`};
  cursor: ${({ isValid }) => (isValid ? "pointer" : "default")};
`;

const TermWrapper = styled.div`
  margin-top: 32px;
`;

const TermLine = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TermLabel = styled(Label)`
  margin-left: 16px;
  color: ${FontColor};
  font-size: 12px;
  font-weight: 500;
`;

const TermOffButton = styled.img.attrs(() => ({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/term_off.png",
  alt: "term_off",
}))`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const TermOnButton = styled(TermOffButton).attrs(() => ({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/term_on.png",
  alt: "term_on",
}))``;

const TermContent = styled.textarea`
  width: 100%;
  height: 70px;
  margin: 8px 0px;
  border: 1px solid ${BorderColor};
  padding: 8px 12px;
  color: ${FontColor};
  font-size: 12px;
  font-weight: normal;
  line-height: 1.5;
  resize: none;
`;

const SignUpForm = ({
  onChange,
  onNicknameChange,
  onSubmit,
  signUpInfo,
  error,
  terms,
  setTerms,
  nicknameTest,
  onClickMajor,
}) => {
  const { account, pw, pwConfirm, nickname, majors } = signUpInfo;
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const majorChoices = majorsFullName;

  /**
   * term button onClick 함수
   * SignUpContainer - useEffect[terms] 와 비슷, 해당 함수는 click 했을 때만,
   * useEffect에서는 약관의 참 거짓에 따른 상호작용 담당
   * @param {string} term 모든 약관, 나머지
   */
  const toggleTermButton = (term) => {
    if (term === "all") {
      if (terms.all) {
        setTerms({ all: false, hangang: false, privacy: false });
      } else {
        setTerms({ all: true, hangang: true, privacy: true });
      }
    } else {
      setTerms({ ...terms, [term]: !terms[term] });
    }
  };

  const submitValidCheck = () => {
    if (
      account.length !== 0 &&
      Object.values(error)[0] === false &&
      nicknameTest.tried &&
      nicknameTest.errorCode === "" &&
      signUpInfo.majors.length !== 0 &&
      terms.all
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Form>
      <LabelSection>
        <Label>아이디</Label>
        <AlertMsg>아이디는 인증 요청한 이메일입니다.</AlertMsg>
      </LabelSection>
      <Section>
        <Input
          type="text"
          value={account}
          onChange={onChange}
          name="account"
          placeholder="학교 이메일을 입력해주세요."
          autoComplete="username"
          disabled
        />
        <KoreatechSpan>@koreatech.ac.kr</KoreatechSpan>
      </Section>
      <LabelSection>
        <Label>비밀번호</Label>
        {pw.length !== 0 && (
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
          value={pw}
          onChange={onChange}
          name="pw"
          placeholder="영문, 숫자, 특수기호 반드시 포함 8자~15자"
          autoComplete="new-password"
          ref={pwRef}
        />
        <ImageWrapper>
          {pw.length !== 0 &&
            (!error.pwLetterLengthError &&
            !error.pwNumberError &&
            !error.pwSymbolError ? (
              <CheckImg />
            ) : (
              <AlertImg />
            ))}

          <PasswordToggleIcon target={pwRef} />
        </ImageWrapper>
      </Section>
      <LabelSection>
        <Label>비밀번호 확인</Label>
        {pwConfirm.length !== 0 && error.notEqualPw && (
          <AlertMsg>비밀번호가 일치하지 않습니다!</AlertMsg>
        )}
      </LabelSection>
      <Section>
        <Input
          type="password"
          value={pwConfirm}
          onChange={onChange}
          name="pwConfirm"
          placeholder="비밀번호를 한번 더 입력해주세요."
          autoComplete="new-password"
          ref={pwConfirmRef}
        />
        <ImageWrapper>
          {pwConfirm.length !== 0 && (error.notEqualPw ? <AlertImg /> : <CheckImg />)}
          <PasswordToggleIcon target={pwConfirmRef} />
        </ImageWrapper>
      </Section>
      <LabelSection>
        <Label>닉네임</Label>
        {nicknameTest.tried && nicknameTest.errorCode === 26 && (
          <AlertMsg>사용 중인 닉네임 입니다.</AlertMsg>
        )}
        {nicknameTest.tried && nicknameTest.errorCode === 27 && (
          <AlertMsg>허용되지 않은 닉네임 입니다.</AlertMsg>
        )}
      </LabelSection>
      <Section>
        <Input
          type="text"
          value={nickname}
          onChange={onNicknameChange}
          name="nickname"
          placeholder="10자 미만"
          autoComplete="nickname"
        />
        <ImageWrapper style={{ width: "20px" }}>
          {nicknameTest.tried &&
            (nicknameTest.errorCode === "" ? <CheckImg /> : <AlertImg />)}
        </ImageWrapper>
      </Section>
      <Label>
        전공 선택 <NotifySpan>복수선택 가능</NotifySpan>
      </Label>
      <MajorChoiceSection>
        {majorChoices.map((val) => (
          <Major
            as="input"
            key={val}
            value={val}
            choiced={majors.includes(val)}
            onClick={() => onClickMajor(val)}
          />
        ))}
      </MajorChoiceSection>
      <TermWrapper>
        <Label>약관 동의</Label>
        <TermLine style={{ marginTop: "16px" }}>
          {!terms.all && <TermOffButton onClick={() => toggleTermButton("all")} />}
          {terms.all && <TermOnButton onClick={() => toggleTermButton("all")} />}
          <div>
            <TermLabel>아래 약관에 모두 동의합니다.</TermLabel>
          </div>
        </TermLine>
        <TermLine style={{ marginTop: "16px" }}>
          {!terms.privacy && (
            <TermOffButton onClick={() => toggleTermButton("privacy")} />
          )}
          {terms.privacy && <TermOnButton onClick={() => toggleTermButton("privacy")} />}
          <div>
            <TermLabel>개인정보 이용약관(필수)</TermLabel>
          </div>
        </TermLine>
        <TermContent defaultValue={Terms.privacy} />
        <TermLine>
          {!terms.hangang && (
            <TermOffButton onClick={() => toggleTermButton("hangang")} />
          )}
          {terms.hangang && <TermOnButton onClick={() => toggleTermButton("hangang")} />}
          <div>
            <TermLabel>한강 이용약관(필수)</TermLabel>
          </div>
        </TermLine>
        <TermContent defaultValue={Terms.hangang} />
      </TermWrapper>
      <Button
        type="submit"
        onClick={onSubmit}
        isValid={submitValidCheck()}
        disabled={!submitValidCheck()}
      >
        회원가입
      </Button>
    </Form>
  );
};

export default SignUpForm;
