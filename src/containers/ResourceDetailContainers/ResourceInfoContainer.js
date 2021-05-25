import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import lectureDetailAPI from "api/resourceDetail";
import AdditionalModal from "components/ResourceDetailComponents/AdditionalModal";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal, showConfirmModal } from "store/modules/modalModule";
import {
  clickHitIcon,
  openAdditionalModal,
  purchaseResource,
} from "store/modules/resourceDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import {
  Content,
  CreatedAt,
  Delimiter,
  HitAmount,
  HitIcon,
  HitWrapper,
  InfoWrapper,
  More,
  Professor,
  PurchaseButton,
  ResourceCode,
  ResourceInfoSection,
  ResourceTitle,
  ResourceType,
  Semester,
  Thumbnail,
  Title,
  TopPart,
  Writer,
} from "./styles/ResourceInfoContainer.style";

ResourceInfoContainer.propTypes = {
  resourceInfo: PropTypes.object,
  contentId: PropTypes.string,
  isAdditionalModalOpened: PropTypes.bool,
  isPurchased: PropTypes.bool,
  isScrapped: PropTypes.bool,
};

function ResourceInfoContainer({
  resourceInfo = {},
  contentId = "",
  isAdditionalModalOpened = false,
  isPurchased = false,
  isScrapped = false,
}) {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const clickThumb = async () => {
    try {
      if (!isLoggedIn && isCheckedToken) {
        const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notLoggedIn"];
        const onConfirm = () => history.push("/login");
        dispatch(showConfirmModal({ title, content, onConfirm }));
      } else {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
        let { data } = await lectureDetailAPI.postHit(contentId, accessToken);
        if (data.httpStatus === "OK") dispatch(clickHitIcon());
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const buyResource = async () => {
    const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
    try {
      const { data } = await lectureDetailAPI.purchaseResource(contentId, accessToken);
      if (data.httpStatus === "OK") {
        dispatch(purchaseResource());
        dispatch(showAlertModal({ content: "구매에 성공하였습니다." }));
      }
    } catch (error) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
      dispatch(showAlertModal({ title, content }));
    }
  };

  const onPurchaseButtonClick = () => {
    if (!isLoggedIn && isCheckedToken) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notLoggedIn"];
      const onConfirm = () => history.push("/login");
      dispatch(showConfirmModal({ title, content, onConfirm }));
    } else {
      if (!isPurchased) {
        const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["confirmBuyingResource"];
        dispatch(showConfirmModal({ title, content, onConfirm: buyResource }));
      }
    }
  };

  return (
    <>
      <Title>{resourceInfo.title}</Title>
      <Writer>{resourceInfo.user.nickname}</Writer>
      <CreatedAt>{convertCreatedAt(resourceInfo.created_at)}</CreatedAt>
      <More onClick={() => dispatch(openAdditionalModal())} />
      {isAdditionalModalOpened && (
        <AdditionalModal
          contentId={contentId}
          isScrapped={isScrapped}
          isLoggedIn={isLoggedIn}
          isCheckedToken={isCheckedToken}
        />
      )}
      <HitWrapper>
        <HitIcon isHit={resourceInfo.is_hit} onClick={() => clickThumb(dispatch)} />
        <HitAmount>{resourceInfo.hits}</HitAmount>
      </HitWrapper>
      <Delimiter />
      <ResourceInfoSection>
        <Thumbnail thumbnailURL={resourceInfo.thumbnail} />
        <InfoWrapper>
          <TopPart>
            <ResourceTitle>{resourceInfo.lecture.name}</ResourceTitle>
            <ResourceCode>{resourceInfo.lecture.code}</ResourceCode>
            <ResourceType>{resourceInfo.category[0]}</ResourceType>
          </TopPart>
          <Professor>{resourceInfo.lecture.professor}</Professor>
          <Semester>{convertresourceInfoSemester(resourceInfo.semester_date)}</Semester>
          <Content>{resourceInfo.content}</Content>
          <PurchaseButton isPurchased={isPurchased} onClick={onPurchaseButtonClick} />
        </InfoWrapper>
      </ResourceInfoSection>
    </>
  );
}

const convertCreatedAt = (createdAt) => {
  let createdInfo = createdAt.split("T")[0].split("-");
  return `작성일 ${createdInfo[0]}-${createdInfo[1]}-${createdInfo[2]}`;
};

const convertresourceInfoSemester = (semester) => {
  let dateData = semester.split("년 ");
  return `개설학기 ${dateData[0]}-${dateData[1]}`;
};

export default ResourceInfoContainer;
