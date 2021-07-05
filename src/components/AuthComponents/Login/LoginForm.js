import {
  AlertColor,
  BorderColor,
  ButtonColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  margin-top: 40px;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${BorderColor} 1px solid;
`;

export const KoreatechSpan = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  line-height: 30px;
  font-size: 16px;
  color: ${FontColor};
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  filter: none;
  font-size: 15px;

  color: ${FontColor};

  &::placeholder {
    color: ${PlaceholderColor};
    font-size: 14px;
    font-style: normal;
  }
  /* 
  &[type="password"] {
    font: small-caption;
    font-size: 50px;
  } */
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  border: none;
  border-radius: 24px;
  outline: none;
  background-color: ${ButtonColor};
  color: #ffffff;
  font-size: 16px;
  line-height: 40px;
  font-weight: 500;
  cursor: pointer;
`;

const AlertMsgWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 16px;
  margin: 18px 0px;
`;

const AlertMsg = styled.span`
  margin-right: 4px;
  line-height: 17px;
  color: ${AlertColor};
  font-size: 11px;
`;

export const AlertImg = styled.img.attrs({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/alert.png",
  alt: "경고 이미지",
})`
  width: 20px;
  height: 20px;
`;

const AutoLoginField = styled.div`
  width: 100%;
  height: 20px;
  margin: 16px 0px;
  display: flex;
  align-items: center;
`;

const AutoLoginText = styled.span`
  height: 100%;
  line-height: 22px;
  margin-left: 8px;
  color: #858585;
  font-size: 12px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const AutoLoginFalseImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/auto_login_false.png",
  alt: "자동 로그인 이미지",
})`
  width: 100%;
  height: 100%;
`;

const AutoLoginTrueImg = styled(AutoLoginFalseImg).attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/auto_login_true.png",
  alt: "자동 로그인 이미지",
})``;

const LoginForm = ({
  autoLogin,
  error,
  loginInfo,
  setAutoLogin,
  setError,
  onChange,
  onSubmit,
}) => {
  const { portal_account, password } = loginInfo;
  return (
    <>
      <Form onSubmit={onSubmit} onChange={() => setError(false)}>
        <Section style={{ marginBottom: "32px" }}>
          <Input
            type="text"
            value={portal_account}
            onChange={onChange}
            name="portal_account"
            placeholder="KOREATECH 이메일"
            autoComplete="username"
          />
          <KoreatechSpan>@koreatech.ac.kr</KoreatechSpan>
        </Section>
        <Section>
          <Input
            type="password"
            value={password}
            onChange={onChange}
            name="password"
            placeholder="비밀번호"
            autoComplete="current-password"
          />
        </Section>

        <AlertMsgWrapper>
          {error && (
            <>
              <AlertMsg>가입되지 않은 아이디거나, 잘못된 비밀번호 입니다.</AlertMsg>
              <AlertImg />
            </>
          )}
        </AlertMsgWrapper>
        <LoginButton type="submit">로그인</LoginButton>
      </Form>
      <AutoLoginField onClick={() => setAutoLogin((prev) => !prev)}>
        <ImageWrapper>
          {autoLogin ? <AutoLoginTrueImg /> : <AutoLoginFalseImg />}
        </ImageWrapper>
        <AutoLoginText>자동 로그인</AutoLoginText>
      </AutoLoginField>
    </>
  );
};

LoginForm.propTypes = {
  autoLogin: PropTypes.bool,
  error: PropTypes.bool,
  loginInfo: PropTypes.shape({
    portal_account: PropTypes.string,
    password: PropTypes.string,
  }),
  setAutoLogin: PropTypes.func,
  setError: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default LoginForm;
