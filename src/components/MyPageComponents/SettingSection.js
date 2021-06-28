import React, { useState } from "react";
import { majorsFullName } from "static/MyPage/majors";
import {
  SettingSectionWrapper,
  Profile,
  Label,
  ProfileLeftSection,
  SubLabel,
  ProfileInput,
  AlertLabel,
  NicknameInputWrapper,
  NicknameModifySection,
  ModifyButton,
  AbleButton,
  ProfileRightSection,
  MajorSubLabel,
  MajorChoiceSection,
  Setting,
  Row,
  NotifyLabel,
  ToggleButton,
  Circle,
  VersionNotify,
  Etc,
  RightButton,
  WithdrawalButton,
} from "components/MyPageComponents/styles/SettingSection.style";
import { getValueOnLocalStorage, setValueOnLocalStorage } from "utils/localStorageUtils";

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
    <SettingSectionWrapper>
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
    </SettingSectionWrapper>
  );
};

export default SettingSection;
