import React from "react";
import { useDispatch } from "react-redux";

import MypageAPI from "api/mypage";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { logout } from "store/modules/auth";
import { showAlertModal } from "store/modules/modalModule";
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
      <Label>기타</Label>
      <Row style={{ marginTop: "16px" }}>
        <NotifyLabel>문의하기</NotifyLabel>
        <RightButton />
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <NotifyLabel>회원탈퇴</NotifyLabel>
        <WithdrawalButton onClick={() => withdrawMembership(dispatch)}>
          <RightButton />
        </WithdrawalButton>
      </Row>
    </Etc>
  );
};

/**
 * 회원 탈퇴 요청 시 가진 데이터를 모두 날리고 탈퇴시킨다.
 */
const withdrawMembership = async (dispatch) => {
  if (confirm("회원 탈퇴를 하시겠습니까?")) {
    try {
      let accessToken = getValueOnLocalStorage("hangangToken").access_token;

      await MypageAPI.deleteUser(accessToken);
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[
        "SUCCESS_MEMBERSHIP_WITHDRAWAL"
      ];
      dispatch(showAlertModal({ title, content }));

      dispatch(logout());
      removeValueOnLocalStorage("hangangToken");
      history.push("/");
    } catch (err) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
      dispatch(showAlertModal({ title, content }));
    }
  }
};

export default EtcBox;
