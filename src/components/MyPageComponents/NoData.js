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
  purchased: "아직 구매한 강의자료가 없습니다.",
  scrappedLectures: "아직 스크랩한 강의평이 없습니다.",
  scrappedResources: "아직 스크랩한 강의자료가 없습니다.",
};

const BUTTON_LABEL = {
  purchased: "강의자료 구매하러 가기",
  scrappedLectures: "강의평 보러가기",
  scrappedResources: "강의자료 보러가기",
};

const PATH = {
  purchased: "/resources",
  scrappedLectures: "/lectures",
  scrappedResources: "/resources",
};

export default NoData;
