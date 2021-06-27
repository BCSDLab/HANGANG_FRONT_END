import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import PropTypes from "prop-types";

import MypageAPI from "api/mypage";
import { logout } from "store/modules/auth";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
} from "utils/localStorageUtils";

import SettingSection from "components/MyPageComponents/SettingSection";

const SettingSectionContainer = ({
  nicknameTest,
  setNicknameTest,
  userInfo,
  setUserInfo,
}) => {
  const dispatch = useDispatch();

  /**
   * Nickname validation check
   *
   * checkValidNickname => delayedApiCall => nicknameCheckApiCall 순으로 호출된다.
   *
   * checkValidNickname
   * onChange 이벤트마다 닉네임 상태 값을 변경시키며 delayedApiCall을 호출합니다.
   *
   * delayedApiCall
   * value가 바뀔 때 nicknameCheckApiCall 콜백 함수를 실행시킵니다.
   * 글자가 바뀔 때마다 요청하지 못하도록 debounce를 걸어두었습니다.
   *
   * nicknameCheckApiCall
   * 해당 nickname을 사용해도 되는지 요청을 합니다.
   */
  const nicknameCheckApiCall = async (nickname) => {
    if (nickname.length === 0) return;
    try {
      const res = await MypageAPI.checkValidNickname(nickname);
      if (res.data.httpStatus === "OK") {
        setNicknameTest((prev) => ({ ...prev, tried: true, errorCode: "" }));
      }
    } catch ({ response }) {
      setNicknameTest((prev) => ({
        ...prev,
        tried: true,
        errorCode: response.data.code,
      }));
    }
  };
  const delayedApiCall = useRef(debounce((q) => nicknameCheckApiCall(q), 200)).current;
  const checkValidNickname = (e) => {
    setNicknameTest((prev) => ({ ...prev, currentNickname: e.target.value }));
    delayedApiCall(e.target.value);
  };

  /**
   * 앞서 닉네임 유효 검사를 통과했을 경우, 닉네임 변경 요청을 할 수 있다.
   * API 요청을 하고 현재 닉네임 상태 값을 변경해준다.
   */
  const changeNickname = async () => {
    if (confirm("닉네임을 변경하시겠습니까?")) {
      try {
        await MypageAPI.updateUserInfo(
          userInfo.infoDatas.major,
          nicknameTest.currentNickname
        );

        setUserInfo((prev) => ({
          ...prev,
          infoDatas: {
            ...prev.infoDatas,
            nickname: nicknameTest.currentNickname,
          },
        }));
        alert("닉네임을 성공적으로 변경하였습니다.");
      } catch (err) {
        alert("닉네임 변경 중 오류가 발생하였습니다.");
      }
    }
  };

  /**
   * Setting 창에서 전공을 바꾸려 시도할 경우 전공명을 파라미터에 담아 changeMajor를 호출한다.
   * @param {string} target
   */
  const changeMajor = async (target) => {
    let currentMajor = userInfo.infoDatas.major;
    if (currentMajor.includes(target)) {
      currentMajor = currentMajor.filter((elem) => elem !== target);
    } else {
      currentMajor = [...currentMajor, target];
    }

    try {
      await MypageAPI.updateUserInfo(currentMajor, userInfo.infoDatas.nickname);

      setUserInfo((prev) => ({
        ...prev,
        infoDatas: {
          ...prev.infoDatas,
          major: currentMajor,
        },
      }));
    } catch (err) {
      if (err.response.data.code === 10) {
        alert("1개 이상의 전공이 선택되어야 합니다.");
      } else {
        alert("전공 변경 중 오류가 발생하였습니다.");
      }
    }
  };

  /**
   * 회원 탈퇴 요청 시 가진 데이터를 모두 날리고 탈퇴시킨다.
   */
  const membershipWithdrawal = async () => {
    if (confirm("회원 탈퇴를 하시겠습니까?")) {
      try {
        let accessToken = getValueOnLocalStorage("hangangToken").access_token;

        await MypageAPI.deleteUser(accessToken);
        alert("성공적으로 탈퇴 처리가 되었습니다.");

        dispatch(logout());
        removeValueOnLocalStorage("hangangToken");
        history.push("/");
      } catch (err) {
        alert("회원 탈퇴 처리 중 오류가 발생하였습니다.");
      }
    }
  };

  return (
    <SettingSection
      nicknameTest={nicknameTest}
      checkValidNickname={checkValidNickname}
      changeNickname={changeNickname}
      changeMajor={changeMajor}
      userInfo={userInfo.infoDatas}
      membershipWithdrawal={membershipWithdrawal}
    />
  );
};

SettingSectionContainer.defaultProps = {
  userInfo: {
    activityAmount: {
      getLectureBankCommentCount: 0,
      LectureReview: 0,
      getLectureBankCount: 0,
    },
    infoDatas: {
      id: 0,
      portal_account: "",
      nickname: "",
      major: ["", ""],
      point: 0,
      is_deleted: false,
      created_at: "",
      updated_at: "",
    },
  },
  setUserInfo: () => {},
  nicknameTest: {
    currentNickname: "",
    tried: false,
    errorCode: "",
  },
  setNicknameTest: () => {},
};

SettingSectionContainer.propTypes = {
  userInfo: PropTypes.shape({
    activityAmount: PropTypes.shape({
      getLectureBankCommentCount: PropTypes.number,
      LectureReview: PropTypes.number,
      getLectureBankCount: PropTypes.number,
    }),
    infoDatas: PropTypes.shape({
      id: PropTypes.number,
      portal_account: PropTypes.string,
      nickname: PropTypes.string,
      major: PropTypes.arrayOf(PropTypes.string),
      point: PropTypes.number,
      is_deleted: PropTypes.bool,
      created_at: PropTypes.string,
      updated_at: PropTypes.string,
    }),
  }),
  setUserInfo: PropTypes.func,
  nicknameTest: PropTypes.shape({
    currentNickname: PropTypes.string,
    tried: PropTypes.bool,
    errorCode: PropTypes.string,
  }),
  setNicknameTest: PropTypes.func,
};

export default SettingSectionContainer;
