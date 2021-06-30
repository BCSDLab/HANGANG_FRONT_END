import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import {
  POINTS,
  PURCHASED,
  SCRAPPED_LECTURES,
  SCRAPPED_RESOURCES,
  SETTING,
} from "static/MyPage/MYPAGE_CURRENT_STATE";

import {
  Wrapper,
  UserInfoWrapper,
  Nickname,
  Major,
  Point,
  ActivityAmountWrapper,
  ActivityWrapper,
  Amount,
  Label,
  CurrentNavigator,
  Current,
  CurrentBottomBar,
} from "components/MyPageComponents/styles/UserInfo.style";

/**
 * current를 받아 navigation 바의 width, 움직여야 할 거리를 반환합니다.
 * @param {string} current
 * @returns [width, translateX]
 */

const Activity = ({ amount, label }) => (
  <ActivityWrapper>
    <Amount>{amount}</Amount>
    <Label>{label}</Label>
  </ActivityWrapper>
);

const UserInfo = ({ current, setCurrent }) => {
  const { activityAmount, infos } = useSelector((state) => state.myPageReducer);

  return (
    <Wrapper>
      <UserInfoWrapper>
        <Nickname>{infos.nickname}</Nickname>
        <Major>{convertMajor(infos.major)}</Major>
        <Point>
          <span>{infos.point}P</span>
        </Point>
      </UserInfoWrapper>
      <ActivityAmountWrapper>
        <Activity amount={activityAmount.LectureReview} label={"강의평가"} />
        <Activity amount={activityAmount.getLectureBankCount} label={"강의자료"} />
        <Activity amount={activityAmount.getLectureBankCommentCount} label={"댓글"} />
      </ActivityAmountWrapper>
      <CurrentNavigator>
        <Current onClick={() => setCurrent(POINTS)} value={POINTS_LABEL} />
        <Current onClick={() => setCurrent(PURCHASED)} value={PURCHASED_LABEL} />
        <Current
          onClick={() => setCurrent(SCRAPPED_LECTURES)}
          value={SCRAPPED_LECTURES_LABEL}
        />
        <Current
          onClick={() => setCurrent(SCRAPPED_RESOURCES)}
          value={SCRAPPED_RESOURCES_LABEL}
        />
        <Current onClick={() => setCurrent(SETTING)} value={SETTING_LABEL} />
        <CurrentBottomBar current={current} />
      </CurrentNavigator>
    </Wrapper>
  );
};

UserInfo.defaultProps = {
  userInfo: {
    activityAmount: {
      getLectureBankCommentCount: 0,
      LectureReview: 0,
      getLectureBankCount: 0,
    },
    infos: {
      id: 0,
      portal_account: "",
      nickname: "",
      major: [""],
      point: 0,
      is_deleted: false,
      created_at: "",
      updated_at: "",
    },
  },
  current: "pointRecords",
  setCurrent: () => {},
};

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    activityAmount: PropTypes.shape({
      getLectureBankCommentCount: PropTypes.number,
      LectureReview: PropTypes.number,
      getLectureBankCount: PropTypes.number,
    }),
    infos: PropTypes.shape({
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
  current: PropTypes.string,
  setCurrent: PropTypes.func,
};

/**
 * 디자인건축공학부 => 디자인·건축공학부 로 변경합니다.
 */
const convertMajor = (majors) => {
  const convertedMajor = majors.reduce((acc, curr) => {
    if (curr === "디자인건축공학부") acc.push("디자인·건축공학부");
    else acc.push(curr);
    return acc;
  }, []);
  return convertedMajor.join(", ");
};

const POINTS_LABEL = "포인트";
const PURCHASED_LABEL = "구매한 강의자료";
const SCRAPPED_LECTURES_LABEL = "강의평 스크랩";
const SCRAPPED_RESOURCES_LABEL = "강의자료 스크랩";
const SETTING_LABEL = "환경설정";

export default UserInfo;
