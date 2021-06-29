import React from "react";

import {
  Label,
  Profile,
  ProfileLeftSection,
  SubLabel,
  ProfileInput,
  AlertLabel,
  NicknameInputWrapper,
  NicknameModifySection,
  ModifyButton,
  AbleButton,
  Major,
  AlertImg,
  ProfileRightSection,
  MajorSubLabel,
  MajorChoiceSection,
} from "./styles/EnvironmentSettingSection.style";

const UserInfoBox = ({ infos }) => {
  return (
    <Profile>
      <Label>프로필</Label>
      <SubLabel>이름 (학번)</SubLabel>
      <ProfileInput value={"박종호 (2015136053)"} disabled />
      <SubLabel>아이디</SubLabel>
      <ProfileInput value={infos.portal_account} disabled />
      <SubLabel>
        닉네임
        {/* {nicknameTest.errorCode === 26 && (
              <AlertLabel>사용중인 닉네임입니다!</AlertLabel>
            )} */}
      </SubLabel>
      <NicknameInputWrapper>
        <ProfileInput
          style={{ marginBottom: "0px" }}
          //   value={nicknameTest.currentNickname}
          //   onChange={checkValidNickname}
          //   disabled={!isModify}
        />
        {/* {nicknameTest.errorCode !== "" && <AlertImg />}

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
            </NicknameModifySection> */}
      </NicknameInputWrapper>
    </Profile>
  );
};

export default UserInfoBox;
