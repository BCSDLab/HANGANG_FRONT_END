import React from "react";
import { useDispatch } from "react-redux";

import MypageAPI from "api/mypage";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";
import { setUserMajor } from "store/modules/myPageModule";

import {
  ProfileLayout,
  SubLabel,
  MajorSubLabel,
  MajorGrid,
  Major,
} from "./styles/EnvironmentSettingSection.style";

const MajorChoiceSection = ({ infos }) => {
  const dispatch = useDispatch();

  return (
    <ProfileLayout>
      <SubLabel>
        {MAJOR_CHOICE_LABEL}
        <MajorSubLabel>{MAJOR_CHOICE_SUB_LABEL}</MajorSubLabel>
      </SubLabel>
      <MajorGrid>
        {MAJORS.map(({ label, value }) => (
          <Major
            key={value}
            value={label}
            choiced={infos.major.includes(value)}
            onClick={() => changeMajor(value, infos, dispatch)}
          />
        ))}
      </MajorGrid>
    </ProfileLayout>
  );
};

/**
 * Setting 창에서 전공을 바꾸려 시도할 경우,
 * 전공명을 파라미터에 담아 changeMajor를 호출한다.
 */
const changeMajor = async (target, infos, dispatch) => {
  let currentMajor = infos.major;

  if (currentMajor.includes(target)) {
    currentMajor = currentMajor.filter((elem) => elem !== target);
  } else {
    currentMajor = [...currentMajor, target];
  }

  try {
    const { data } = await MypageAPI.updateUserInfo(
      currentMajor,
      infos.nickname,
      infos.name
    );
    if (data.httpStatus === "OK") {
      dispatch(setUserMajor({ major: currentMajor }));
    }
  } catch (err) {
    if (err.response.data.code === 10 || err.response.data.code === 16) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["INVALID_MAJOR_AMOUNT"];
      dispatch(showAlertModal({ title, content }));
    } else {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
      dispatch(showAlertModal({ title, content }));
    }
  }
};

const MAJORS = [
  { label: "기계공학부", value: "기계공학부" },
  { label: "디자인·건축공학부", value: "디자인건축공학부" },
  { label: "메카트로닉스공학부", value: "메카트로닉스공학부" },
  { label: "산업경영학부", value: "산업경영학부" },
  { label: "에너지신소재화학공학부", value: "에너지신소재화학공학부" },
  { label: "전기전자통신공학부", value: "전기전자통신공학부" },
  { label: "컴퓨터공학부", value: "컴퓨터공학부" },
  { label: "융합학과", value: "융합학과" },
];

const MAJOR_CHOICE_LABEL = "전공 선택";
const MAJOR_CHOICE_SUB_LABEL = "복수선택 가능";

export default MajorChoiceSection;
