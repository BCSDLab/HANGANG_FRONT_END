import React, { useState } from "react";
import { majorsFullName } from "static/MyPage/majors";
import {
  AlertColor,
  BorderColor,
  ButtonColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";
import { getValueOnLocalStorage, setValueOnLocalStorage } from "utils/localStorageUtils";

const Profile = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 48px;
`;

const Setting = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const Etc = styled(Setting)`
  margin-bottom: 112px;
`;

const ProfileLeftSection = styled.div`
  width: 547px;
  margin-top: 16px;
  margin-right: 112px;
`;

const ProfileInput = styled.input`
  all: unset;
  height: 22px;
  width: 547px;
  margin: 16px 0px 32px 0px;
  border-bottom: 1px solid ${BorderColor};
  font-size: 15px;
`;

const NicknameInputWrapper = styled.div`
  position: relative;
`;

const AlertImg = styled.img.attrs({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/alert.png",
  alt: "경고 이미지",
})`
  position: absolute;
  right: 33px;
  bottom: 4px;
  width: 20px;
  height: 20px;
`;

const NicknameModifySection = styled.div`
  position: absolute;
  right: 0;
  bottom: 6px;

  cursor: pointer;
`;

const ModifyButton = styled.button`
  all: unset;
  font-size: 14px;
  color: ${PlaceholderColor};
`;

const AbleButton = styled(ModifyButton)`
  color: ${ConceptColor};
`;

const MajorChoiceSection = styled.div`
  display: grid;
  grid-template-columns: 176px 176px;
  grid-template-rows: 29px 29px 29px 29px;
  gap: 24px 16px;
  margin-top: 16px;
`;

const Major = styled.input.attrs(() => ({
  type: "button",
}))`
  width: 176px;
  height: 29px;
  line-height: 0px;
  outline: none;
  border: none;
  border-radius: 24px;
  color: ${({ choiced }) => (choiced ? "#fff" : `${FontColor}`)};
  background-color: ${({ choiced }) => (choiced ? `${ButtonColor}` : `${BorderColor}`)};
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
`;

const ProfileRightSection = styled.div`
  width: calc(100% - 547px);
  margin-top: 16px;
`;

const Label = styled.label`
  color: ${ConceptColor};
  font-size: 16px;
  font-weight: 500;
`;

const SubLabel = styled(Label)`
  color: ${FontColor};
`;

const NotifyLabel = styled(Label)`
  color: ${FontColor};
  line-height: 25px;
  font-weight: normal;
`;

const VersionNotify = styled.span`
  position: absolute;
  right: 0;
  color: ${PlaceholderColor};
  font-size: 14px;
  line-height: 24px;
`;

const MajorSubLabel = styled.span`
  margin-left: 12px;
  color: ${PlaceholderColor};
  font-size: 12px;
  font-weight: normal;
`;

const AlertLabel = styled.span`
  margin-left: 8px;
  color: ${AlertColor};
  font-size: 11px;
  font-weight: normal;
`;

const Row = styled.div`
  height: 24px;
  position: relative;
`;

const ToggleButton = styled.button`
  all: unset;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 0px 2px;
  align-items: center;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ status }) => (status ? `${ConceptColor}` : `${CopyRightColor}`)};
  cursor: pointer;
`;

const Circle = styled.div`
  position: absolute;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.2s ease;
  transform: translateX(${({ status }) => (status ? 0 : -28)}px);
  /* transform: translateX(-28px); */
`;

const RightButton = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/right.png",
  alt: "오른쪽 화살표",
})`
  position: absolute;
  top: 2px;
  right: 0;
  width: 20px;
`;

const WithdrawalButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const SettingSection = ({
  nicknameTest,
  checkValidNickname,
  changeNickname,
  changeMajor,
  userInfo,
  membershipWithdrawal,
}) => {
  const majors = majorsFullName;
  const [isModify, setIsModify] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(
    getValueOnLocalStorage("didHangangAutoLogin")
  );

  return (
    <>
      <Profile>
        <Label>프로필</Label>
        <div style={{ display: "flex" }}>
          <ProfileLeftSection>
            <SubLabel>이름 (학번)</SubLabel>
            <ProfileInput value={"박종호 (2015136053)"} disabled />
            <SubLabel>아이디</SubLabel>
            <ProfileInput value={userInfo.portal_account} disabled />
            <SubLabel>
              닉네임
              {nicknameTest.errorCode === 26 && (
                <AlertLabel>사용중인 닉네임입니다!</AlertLabel>
              )}
            </SubLabel>
            <NicknameInputWrapper>
              <ProfileInput
                style={{ marginBottom: "0px" }}
                value={nicknameTest.currentNickname}
                onChange={checkValidNickname}
                disabled={!isModify}
              />
              {nicknameTest.errorCode !== "" && <AlertImg />}

              <NicknameModifySection onClick={() => setIsModify((prev) => !prev)}>
                {!isModify && <ModifyButton>수정</ModifyButton>}

                {isModify && nicknameTest.errorCode !== "" && (
                  <ModifyButton style={{ cursor: "default" }} disabled>
                    완료
                  </ModifyButton>
                )}

                {isModify && nicknameTest.errorCode === "" && (
                  <AbleButton onClick={changeNickname}>완료</AbleButton>
                )}
              </NicknameModifySection>
            </NicknameInputWrapper>
          </ProfileLeftSection>
          <ProfileRightSection>
            <SubLabel>
              전공 선택<MajorSubLabel>복수선택 가능</MajorSubLabel>
            </SubLabel>
            <MajorChoiceSection>
              {majors.map((val) => (
                <Major
                  key={val}
                  value={val}
                  choiced={userInfo.major.includes(val)}
                  onClick={() => changeMajor(val)}
                />
              ))}
            </MajorChoiceSection>
          </ProfileRightSection>
        </div>
      </Profile>
      <Setting>
        <Label>설정</Label>
        <Row style={{ marginTop: "16px" }}>
          <NotifyLabel>자동로그인</NotifyLabel>
          <ToggleButton
            onClick={() => {
              setValueOnLocalStorage("didHangangAutoLogin", !isAutoLogin);
              setIsAutoLogin((prev) => !prev);
            }}
            status={isAutoLogin}
          >
            <Circle status={isAutoLogin} />
          </ToggleButton>
        </Row>
        <Row style={{ marginTop: "24px" }}>
          <NotifyLabel>버전 정보</NotifyLabel>
          <VersionNotify>최신 버전입니다.</VersionNotify>
        </Row>
      </Setting>
      <Etc>
        <Label>기타</Label>
        <Row style={{ marginTop: "16px" }}>
          <NotifyLabel>문의하기</NotifyLabel>
          <RightButton />
        </Row>
        <Row style={{ marginTop: "24px" }}>
          <NotifyLabel>회원탈퇴</NotifyLabel>
          <WithdrawalButton onClick={membershipWithdrawal}>
            <RightButton />
          </WithdrawalButton>
        </Row>
      </Etc>
    </>
  );
};

export default SettingSection;
