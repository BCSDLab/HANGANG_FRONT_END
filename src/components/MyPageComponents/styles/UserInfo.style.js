import styled from "styled-components";
import {
  POINTS,
  PURCHASED,
  SCRAPPED_LECTURES,
  SCRAPPED_RESOURCES,
  SETTING,
} from "static/MyPage/MYPAGE_CURRENT_STATE";
import {
  ConceptColor,
  FontColor,
  InnerContentWidth,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  position: relative;
  width: ${InnerContentWidth};
  height: 100%;
  margin: 0 auto;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

export const Nickname = styled.span`
  font-size: 24px;
  height: 24px;
  font-weight: 500;
  color: ${FontColor};
  margin-bottom: 10px;
`;

export const Major = styled.span`
  height: 24px;
  color: ${PlaceholderColor};
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  margin-bottom: 22px;
`;

export const Point = styled.div`
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

export const ActivityAmountWrapper = styled.div`
  position: absolute;
  top: 138px;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 240px;
  height: 45px;
`;

export const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const Amount = styled.div`
  font-size: 16px;
  color: ${FontColor};
`;

export const Label = styled.label`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const CurrentNavigator = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
`;

export const Current = styled.input.attrs({
  type: "button",
})`
  all: unset;
  padding: 18px 40px;
  font-size: 14px;
  color: ${FontColor};
  cursor: pointer;
`;

export const CurrentBottomBar = styled.div`
  position: absolute;
  bottom: 0;
  width: ${({ current }) => currentConverter(current)[0]}px;
  height: 2px;
  background-color: ${ConceptColor};
  transition: all 0.3s ease;
  transform: translateX(${({ current }) => currentConverter(current)[1]}px);
`;

const currentConverter = (current) => {
  switch (current) {
    case POINTS:
      return [POINTS_LABEL_WIDTH, 0];
    case PURCHASED:
      return [PURCHASED_LABEL_WIDTH, POINTS_LABEL_WIDTH];
    case SCRAPPED_LECTURES:
      return [SCRAPPED_LECTURES_LABEL_WIDTH, POINTS_LABEL_WIDTH + PURCHASED_LABEL_WIDTH];
    case SCRAPPED_RESOURCES:
      return [
        SCRAPPED_RESOURCES_LABEL_WIDTH,
        POINTS_LABEL_WIDTH + PURCHASED_LABEL_WIDTH + SCRAPPED_LECTURES_LABEL_WIDTH,
      ];
    case SETTING:
      return [
        SETTING_LABEL_WIDTH,
        POINTS_LABEL_WIDTH +
          PURCHASED_LABEL_WIDTH +
          SCRAPPED_LECTURES_LABEL_WIDTH +
          SCRAPPED_RESOURCES_LABEL_WIDTH,
      ];
    default:
      return;
  }
};

const POINTS_LABEL_WIDTH = 118.65;
const PURCHASED_LABEL_WIDTH = 173.31;
const SCRAPPED_LECTURES_LABEL_WIDTH = 160.42;
const SCRAPPED_RESOURCES_LABEL_WIDTH = 173.31;
const SETTING_LABEL_WIDTH = 131.52;
