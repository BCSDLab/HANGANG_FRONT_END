import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import EtcBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/EtcBox";
import MajorChoiceBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/MajorChoiceBox";
import SettingBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/SettingBox";
import UserInfoBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/UserInfoBox";

const ProfileBox = styled.section`
  display: flex;
  margin-top: 50px;
`;

const EnvironmentSettingSectionContainer = () => {
  const { infos } = useSelector((state) => state.myPageReducer);

  return (
    <>
      <ProfileBox>
        <UserInfoBox infos={infos} />
        <MajorChoiceBox infos={infos} />
      </ProfileBox>
      <SettingBox />
      <EtcBox />
    </>
  );
};

export default EnvironmentSettingSectionContainer;

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
// const nicknameCheckApiCall = async (nickname) => {
//   if (nickname.length === 0) return;
//   try {
//     const res = await MypageAPI.checkValidNickname(nickname);
//     if (res.data.httpStatus === "OK") {
//       setNicknameTest((prev) => ({ ...prev, tried: true, errorCode: "" }));
//     }
//   } catch ({ response }) {
//     setNicknameTest((prev) => ({
//       ...prev,
//       tried: true,
//       errorCode: response.data.code,
//     }));
//   }
// };
// const delayedApiCall = useRef(debounce((q) => nicknameCheckApiCall(q), 200)).current;
// const checkValidNickname = (e) => {
//   setNicknameTest((prev) => ({ ...prev, currentNickname: e.target.value }));
//   delayedApiCall(e.target.value);
// };

/**
 * 앞서 닉네임 유효 검사를 통과했을 경우, 닉네임 변경 요청을 할 수 있다.
 * API 요청을 하고 현재 닉네임 상태 값을 변경해준다.
 */
// const changeNickname = async () => {
//   if (confirm("닉네임을 변경하시겠습니까?")) {
//     try {
//       await MypageAPI.updateUserInfo(
//         userInfo.infoDatas.major,
//         nicknameTest.currentNickname
//       );

//       setUserInfo((prev) => ({
//         ...prev,
//         infoDatas: {
//           ...prev.infoDatas,
//           nickname: nicknameTest.currentNickname,
//         },
//       }));
//       alert("닉네임을 성공적으로 변경하였습니다.");
//     } catch (err) {
//       alert("닉네임 변경 중 오류가 발생하였습니다.");
//     }
//   }
// };
