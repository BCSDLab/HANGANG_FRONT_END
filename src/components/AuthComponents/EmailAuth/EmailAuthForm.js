import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  AlertColor,
  BorderColor,
  ButtonColor,
  NonClickButtonColor,
} from "static/Shared/commonStyles";
import {
  AlertImg as LoginAlertImg,
  Input as LoginInput,
  LoginButton,
  KoreatechSpan as KSpan,
} from "../Login/LoginForm";

const Form = styled.div`
  margin-top: 50px;
  width: 100%;
`;

export const Section = styled.section`
  position: relative;
  display: flex;
  margin-bottom: 32px;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${BorderColor} 1px solid;
`;

export const AuthSection = styled(Section)`
  border: none;
`;

export const LabelSection = styled.section`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-right: 8px;
`;

export const AlertMsg = styled.span`
  color: ${AlertColor};
  font-size: 11px;
`;

const EmailWrapper = styled.div`
  position: relative;
`;

export const EmailAuthInput = styled(LoginInput)`
  width: 258px;
  padding-right: 33px;
  border: none;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
  }

  &:disabled {
    background-color: #fff;
  }
`;

const AlertImg = styled(LoginAlertImg)`
  position: absolute;
  top: 6px;
  right: 0;
  margin-right: 4px;
`;

const NumberAuthInput = styled(EmailAuthInput)`
  border-bottom: ${BorderColor} 1px solid;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const KoreatechSpan = styled(KSpan)`
  font-size: 14px;
  line-height: 32px;
`;

const AuthSendButton = styled(LoginButton)`
  position: absolute;
  top: 0;
  right: 0;
  width: 108px;
  height: 100%;
  line-height: 0px;
  padding: 4px 13px;
  margin: 0;
  border: none;
  background-color: ${({ emailEmpty }) =>
    emailEmpty ? `${NonClickButtonColor}` : `${ButtonColor}`};
  font-size: 14px;
  cursor: ${({ emailEmpty }) => (emailEmpty ? "default" : "pointer")};

  &:disabled {
    background-color: transparent;
  }
`;

const ResendButton = styled(AuthSendButton)`
  color: ${ButtonColor};
  border: 1px solid ${ButtonColor};
  background-color: transparent;
`;

export const AuthCompleteButton = styled(LoginButton)`
  margin-top: 24px;
  height: 35px;
  background-color: ${({ emptySecret }) =>
    emptySecret ? `${ButtonColor}` : `${NonClickButtonColor}`};
`;

const PortalSendButton = styled(AuthCompleteButton)`
  margin-top: 48px;
  background-color: ${AlertColor};
`;

const PortalLink = styled.a`
  all: unset;
  cursor: pointer;
`;

const EmailAuthForm = ({
  accountDisabled,
  authInfo,
  errorCode,
  resend,
  sentEmail,
  onChange,
  setAccountDisabled,
  setErrorCode,
  setResend,
  checkPortalEmail,
  checkEmailConfig,
}) => {
  const { account, secret } = authInfo;

  return (
    <Form>
      <LabelSection>
        <Label>?????? ????????? ??????</Label>
        {errorCode === 14 && <AlertMsg>?????? ????????? ??????????????????!</AlertMsg>}
        {errorCode === 15 && <AlertMsg>???????????? ?????? ??????????????????!</AlertMsg>}
        {accountDisabled && <AlertMsg>?????? ????????? ???????????? ????????? ??? ????????????.</AlertMsg>}
      </LabelSection>
      <Section>
        <EmailWrapper>
          <EmailAuthInput
            type="text"
            value={account}
            onChange={onChange}
            name="account"
            placeholder="?????? ???????????? ??????????????????."
            disabled={accountDisabled}
            autocomplete="off"
          />
          {(errorCode === 14 || errorCode === 15) && <AlertImg />}
        </EmailWrapper>
        <KoreatechSpan>@koreatech.ac.kr</KoreatechSpan>
      </Section>
      <LabelSection>
        <Label>????????????</Label>
        {errorCode === 11 && <AlertMsg>????????? ??????????????? ?????????????????????.</AlertMsg>}
        {errorCode === 13 && <AlertMsg>??????????????? ???????????? ????????????.</AlertMsg>}
        {errorCode === 16 && <AlertMsg>??????????????? 6?????? ?????????.</AlertMsg>}
        {errorCode === 22 && <AlertMsg>?????? ????????? ?????????????????????.</AlertMsg>}
        {resend && <AlertMsg>??????????????? ????????????????????????.</AlertMsg>}
      </LabelSection>
      <AuthSection>
        <EmailWrapper>
          <NumberAuthInput
            type="number"
            value={secret}
            onChange={(e) => {
              if (resend) {
                setResend(false);
              }
              onChange(e);
            }}
            name="secret"
            placeholder="?????? ???????????? ??????????????? ???????????????."
            autocomplete="off"
          />
          {(errorCode === 11 ||
            errorCode === 13 ||
            errorCode === 16 ||
            errorCode === 22) && <AlertImg />}
        </EmailWrapper>

        {!sentEmail && (
          <AuthSendButton
            as="input"
            type="button"
            value="???????????? ??????"
            emailEmpty={authInfo.account.length === 0}
            onClick={() => {
              if (authInfo.account.length !== 0) {
                checkPortalEmail(account);
              }
              setErrorCode();
            }}
          />
        )}
        {sentEmail && (
          <ResendButton
            as="input"
            type="button"
            value="?????????"
            onClick={() => {
              if (authInfo.account.length !== 0) {
                checkPortalEmail(account, "resend");
              }
              setErrorCode();
            }}
          />
        )}
      </AuthSection>
      <PortalLink
        target="_blank"
        href="https://portal.koreatech.ac.kr/"
        rel="noopener noreferrer"
      >
        <PortalSendButton>???????????? ????????????</PortalSendButton>
      </PortalLink>
      <AuthCompleteButton
        type="button"
        emptySecret={secret.length !== 0}
        onClick={() => {
          checkEmailConfig(secret);
          setAccountDisabled(false);
        }}
      >
        ?????? ??????
      </AuthCompleteButton>
    </Form>
  );
};

EmailAuthForm.propTypes = {
  accountDisabled: PropTypes.bool,
  authInfo: PropTypes.shape({
    account: PropTypes.string,
    secret: PropTypes.string,
  }),
  errorCode: PropTypes.number,
  resend: PropTypes.bool,
  sentEmail: PropTypes.bool,
  onChange: PropTypes.func,
  setAccountDisabled: PropTypes.func,
  setErrorCode: PropTypes.func,
  setResend: PropTypes.func,
  checkPortalEmail: PropTypes.func,
  checkEmailConfig: PropTypes.func,
};

export default EmailAuthForm;
