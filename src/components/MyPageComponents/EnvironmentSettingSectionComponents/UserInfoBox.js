import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

import AuthAPI from "api/auth";
import MypageAPI from "api/mypage";
import { changeUserInfos } from "store/modules/myPageModule";

import {
  EditModeButton,
  Label,
  Profile,
  SubLabel,
  ProfileInput,
  AlertLabel,
  NicknameInputWrapper,
  AlertImg,
} from "./styles/EnvironmentSettingSection.style";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const UserInfoBox = ({ infos }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [temporaryProfile, setTemporaryProfile] = useState({
    name: infos.name,
    nickname: infos.nickname,
    isValid: true,
  });
  const dispatch = useDispatch();

  const onTemporaryProfileChange = (e, type) => {
    if (isEditMode) {
      setTemporaryProfile((prev) => ({ ...prev, [type]: e.target.value }));
      if (type === "nickname") {
        delayedQueryCall(e.target.value);
      }
    }
  };

  const delayedQueryCall = useRef(debounce((q) => checkCurrentNicknameIsValid(q), 300))
    .current;

  const checkCurrentNicknameIsValid = async (query) => {
    if (query.length === 0) return;

    try {
      const res = await AuthAPI.checkValidNickname(query);
      if (res.data.httpStatus === "OK") {
        setTemporaryProfile((prev) => ({ ...prev, isValid: true }));
      }
    } catch (err) {
      setTemporaryProfile((prev) => ({ ...prev, isValid: false }));
    }
  };

  const onEditButtonClick = () => {
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }
    if (!temporaryProfile.isValid) return;

    requestChangeProfileInfo(infos, temporaryProfile, dispatch);
    setIsEditMode(false);
  };

  return (
    <Profile>
      <EditModeButton
        isEditMode={isEditMode}
        isValidNickname={temporaryProfile.isValid}
        onClick={onEditButtonClick}
      >
        {isEditMode ? "프로필 저장" : "수정"}
      </EditModeButton>
      <Label>{PROFILE_LABEL}</Label>
      <SubLabel>{NAME_WITH_STUDENT_NO_LABEL}</SubLabel>
      <ProfileInput
        value={temporaryProfile.name}
        onChange={(e) => onTemporaryProfileChange(e, "name")}
        disabled={!isEditMode}
        placeholder={NAME_PLACEHOLDER}
      />
      <SubLabel>{ID_LABEL}</SubLabel>
      <ProfileInput value={infos.portal_account} disabled />
      <SubLabel>
        {NICKNAME_LABEL}
        {!temporaryProfile.isValid && <AlertLabel>{ALERT_ON_USED_NICKNAME}</AlertLabel>}
      </SubLabel>
      <NicknameInputWrapper>
        <ProfileInput
          style={{ marginBottom: "0px" }}
          value={temporaryProfile.nickname}
          onChange={(e) => onTemporaryProfileChange(e, "nickname")}
          disabled={!isEditMode}
          placeholder={NICKNAME_PLACEHOLDER}
        />
        {!temporaryProfile.isValid && <AlertImg />}
      </NicknameInputWrapper>
    </Profile>
  );
};

const requestChangeProfileInfo = async (infos, temporaryProfile, dispatch) => {
  try {
    const { name, nickname } = temporaryProfile;
    const { data } = await MypageAPI.updateUserInfo(infos.major, nickname, name);
    if (data.httpStatus === "OK") {
      const content = "프로필 정보 변경이 완료되었습니다.";
      dispatch(showAlertModal({ content }));
      dispatch(changeUserInfos({ name, nickname }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
  }
};

const PROFILE_LABEL = "프로필";
const NAME_WITH_STUDENT_NO_LABEL = "이름 (학번)";
const ID_LABEL = "아이디";
const NICKNAME_LABEL = "닉네임";

const ALERT_ON_USED_NICKNAME = "사용중인 닉네임입니다!";

const NICKNAME_PLACEHOLDER = "닉네임을 입력해주세요.";
const NAME_PLACEHOLDER = "이름과 학번을 입력해주세요.";

export default UserInfoBox;
