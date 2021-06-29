import React from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  NoDataImg,
  Notify,
  PushResourcesPageButton,
} from "components/MyPageComponents/styles/NoPurchasedResource.style";

const NoPurchasedResource = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <NoDataImg />
      <Notify>{NOTIFY_CONTENT}</Notify>
      <PushResourcesPageButton onClick={() => history.push("/resources")}>
        {RESOURCES_BUTTON_LABEL}
      </PushResourcesPageButton>
    </Wrapper>
  );
};

const RESOURCES_BUTTON_LABEL = "강의자료 구매하러 가기";
const NOTIFY_CONTENT = "아직 구매한 강의자료가 없습니다.";

export default NoPurchasedResource;
