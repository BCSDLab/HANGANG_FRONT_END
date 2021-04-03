import React from "react";
import {
  ConceptColor,
  FontColor,
  InnerContentWidth,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: ${InnerContentWidth};
  height: 100%;
  margin: 0 auto;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

const Nickname = styled.span`
  font-size: 24px;
  height: 24px;
  font-weight: 500;
  color: ${FontColor};
  margin-bottom: 10px;
`;

const Major = styled.span`
  height: 24px;
  color: ${PlaceholderColor};
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  margin-bottom: 22px;
`;

const Point = styled.div`
  width: 328px;
  height: 56px;
  border-radius: 8px;
  padding-left: 16px;
  background-color: ${ConceptColor};

  span {
    line-height: 60px;
    font-size: 24px;
    font-weight: 500;
    color: #fff;
  }
`;

const ActivityAmountWrapper = styled.div`
  position: absolute;
  top: 138px;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 240px;
  height: 45px;
  /* background-color: red; */
`;

const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Amount = styled.div`
  font-size: 16px;
  color: ${FontColor};
`;

const Label = styled.label`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const Activity = ({ amount, label }) => (
  <ActivityWrapper>
    <Amount>{amount}</Amount>
    <Label>{label}</Label>
  </ActivityWrapper>
);

const CurrentNavigator = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
`;

const Current = styled.input.attrs({
  type: "button",
})`
  all: unset;
  padding: 18px 40px;
  font-size: 14px;
  color: ${FontColor};
  cursor: pointer;
`;

/**
 * current를 받아 navigation 바의 width, 움직여야 할 거리를 반환합니다.
 * @param {string} current
 * @returns [width, translateX]
 */
const currentConverter = (current) => {
  switch (current) {
    case "pointRecords":
      return [116.35, 0];
    case "purchased":
      return [168.46, 116.5];
    case "scrapped":
      return [132.13, 285];
    case "setting":
      return [128.46, 416];
    default:
      return;
  }
};

const CurrentBottomBar = styled.div`
  position: absolute;
  bottom: 0;
  width: ${({ current }) => currentConverter(current)[0]}px;
  height: 2px;
  background-color: ${ConceptColor};
  transition: all 0.3s ease;
  transform: translateX(${({ current }) => currentConverter(current)[1]}px);
`;

const UserInfo = ({ userInfo: { activityAmount, infoDatas }, current, setCurrent }) => {
  return (
    <Wrapper>
      <UserInfoWrapper>
        <Nickname>{infoDatas.nickname}</Nickname>
        <Major>{infoDatas.major.join(", ")}</Major>
        <Point>
          <span>{infoDatas.point}P</span>
        </Point>
      </UserInfoWrapper>
      <ActivityAmountWrapper>
        <Activity amount={activityAmount.LectureReview} label={"강의평가"} />
        <Activity amount={activityAmount.getLectureBankCount} label={"강의자료"} />
        <Activity amount={activityAmount.getLectureBankCommentCount} label={"댓글"} />
      </ActivityAmountWrapper>
      <CurrentNavigator>
        <Current onClick={() => setCurrent("pointRecords")} value={"포인트"} />
        <Current onClick={() => setCurrent("purchased")} value={"구매한 강의자료"} />
        <Current onClick={() => setCurrent("scrapped")} value={"내 스크랩"} />
        <Current onClick={() => setCurrent("setting")} value={"환경설정"} />
        <CurrentBottomBar current={current} />
      </CurrentNavigator>
    </Wrapper>
  );
};

export default UserInfo;
