import React from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  NoDataImg,
  Notify,
  PushResourcesPageButton,
} from "components/MyPageComponents/styles/NoData.style";

const NoData = ({ type }) => {
  const history = useHistory();
  return (
    <Wrapper>
      <NoDataImg />
      <Notify>{NODATA_LABEL[type]}</Notify>
      <PushResourcesPageButton onClick={() => history.push(PATH[type])}>
        {BUTTON_LABEL[type]}
      </PushResourcesPageButton>
    </Wrapper>
  );
};

const NODATA_LABEL = {
  PURCHASED: "아직 구매한 강의자료가 없습니다.",
  SCRAPPED_LECTURES: "아직 스크랩한 강의평이 없습니다.",
  SCRAPPED_RESOURCES: "아직 스크랩한 강의자료가 없습니다.",
};

const BUTTON_LABEL = {
  PURCHASED: "강의자료 구매하러 가기",
  SCRAPPED_LECTURES: "강의평 보러가기",
  SCRAPPED_RESOURCES: "강의자료 보러가기",
};

const PATH = {
  PURCHASED: "/resources",
  SCRAPPED_LECTURES: "/lectures",
  SCRAPPED_RESOURCES: "/resources",
};

export default NoData;
