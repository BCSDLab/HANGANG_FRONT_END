import React from "react";
import { useDispatch } from "react-redux";

import MypageAPI from "api/mypage";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { logout } from "store/modules/auth";
import { showAlertModal, showConfirmModal } from "store/modules/modalModule";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
} from "utils/localStorageUtils";

import {
  Etc,
  Label,
  Row,
  NotifyLabel,
  RightButton,
  WithdrawalButton,
} from "./styles/EnvironmentSettingSection.style";

const EtcBox = () => {
  const dispatch = useDispatch();

  return (
    <Etc>
      <Label>{ETC_LABEL}</Label>
      <Row>
        <NotifyLabel>{INQUIRE_LABEL}</NotifyLabel>
        <RightButton onClick={() => onInquireButtonClick()} />
      </Row>
      <Row>
        <NotifyLabel>{WITHDRAWAL_LABEL}</NotifyLabel>
        <WithdrawalButton onClick={() => onWithdrawlButtonClick(dispatch)}>
          <RightButton />
        </WithdrawalButton>
      </Row>
    </Etc>
  );
};

const onInquireButtonClick = () => window.open(BCSD_FACEBOOK_LINK, "_blank");

const onWithdrawlButtonClick = (dispatch) => {
  dispatch(
    showConfirmModal({
      title: "정말 탈퇴하시겠습니까?",
      onConfirm: () => withdrawMembership(dispatch),
    })
  );
};

/**
 * 회원 탈퇴 요청 시 가진 데이터를 모두 날리고 탈퇴시킨다.
 */
const withdrawMembership = async (dispatch) => {
  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;

    await MypageAPI.deleteUser(accessToken);

    dispatch(logout());
    removeValueOnLocalStorage("hangangToken");
    history.push("/");

    const { content } = ALERT_MESSAGE_ON_ERROR_TYPE["SUCCESS_MEMBERSHIP_WITHDRAWAL"];
    dispatch(showAlertModal({ content }));
  } catch (err) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
  }
};

const ETC_LABEL = "기타";
const INQUIRE_LABEL = "문의하기";
const WITHDRAWAL_LABEL = "회원탈퇴";
const BCSD_FACEBOOK_LINK = "https://www.facebook.com/BCSD-Lab-1727922507422214/";

export default EtcBox;
