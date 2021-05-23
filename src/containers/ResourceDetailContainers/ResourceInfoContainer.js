import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import lectureDetailAPI from "api/resourceDetail";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE.json";
import { MorePath, notPushedThumb, pushedThumb } from "static/ResourceDetailPage/imgPath";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import {
  showAlertModal,
  showConfirmModal,
  showReportModal,
} from "store/modules/modalModule";
import {
  clickHitIcon,
  closeAdditionalModal,
  openAdditionalModal,
} from "store/modules/resourceDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { useHistory } from "react-router-dom";

const Delimiter = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0;
  background-color: ${BorderColor};
`;

const Title = styled.div`
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
`;

const Writer = styled.div`
  font-size: 16px;
  color: ${PlaceholderColor};
  margin-bottom: 17px;
`;

const CreatedAt = styled(Writer)`
  font-size: 14px;
  margin-bottom: 22px;
`;

const More = styled.img.attrs({
  src: MorePath,
  alt: "more",
})`
  position: absolute;
  top: 27px;
  right: 27px;
  width: 24px;

  cursor: pointer;
`;

const HitWrapper = styled.div`
  position: absolute;
  top: 83px;
  right: 27px;

  display: flex;
  align-items: center;
  height: 24px;
  display: flex;
`;

const HitIcon = styled.img.attrs(({ isHit }) => ({
  src: isHit ? pushedThumb : notPushedThumb,
  alt: "hit",
}))`
  margin-top: 2px;
  width: 24px;
  cursor: pointer;
`;

const HitAmount = styled.span`
  margin: 8px 0 0 6px;
  font-size: 16px;
  color: ${PlaceholderColor};
`;

const ResourceInfoSection = styled.section`
  width: 100%;
  height: 337px;
  display: flex;
  justify-content: space-between;
`;

const Thumbnail = styled.div`
  width: 337px;
  height: 100%;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  //background
  background-image: url(${({ thumbnailURL }) => thumbnailURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(34, 34, 34, 0.1);
  background-blend-mode: saturation;
`;

const InfoWrapper = styled.div`
  position: relative;
  width: 343px;
  height: 100%;
`;

const ResourceTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
  margin-right: 16px;
`;

const ResourceCode = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
`;

const ResourceType = styled(ResourceCode)`
  position: absolute;
  right: 0;
  color: ${ConceptColor};
`;

const TopPart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 21px;
  margin: 3px 0 16px 0;
`;

const Professor = styled.div`
  margin-bottom: 17px;
  font-size: 16px;
  color: ${FontColor};
`;

const Semester = styled.div`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-bottom: 26px;
`;

const Content = styled.div`
  width: 223px;
  font-size: 14px;
  color: ${FontColor};
  line-height: 1.5em;
`;

const PurchaseButton = styled.input.attrs({
  type: "button",
  value: "구입하기(-100P)",
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;

  border-radius: 24px;
  border: none;

  background-color: ${({ isPurchased }) => (isPurchased ? "#bddcff" : `${ConceptColor}`)};
  font-size: 14px;
  font-weight: 500;
  color: #fff;

  cursor: ${({ isPurchased }) => (isPurchased ? "default" : "pointer")};
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 48px;
  right: 24px;
  width: 103px;
  height: 111px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 23px 16px;
  border-radius: 8px;
  border: 1px solid ${CopyRightColor};
  background-color: #fff;

  z-index: 1;
`;

const Report = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
  cursor: pointer;
`;

const Scrap = styled(Report)``;

const convertCreatedAt = (createdAt) => {
  let createdInfo = createdAt.split("T")[0].split("-");
  return `작성일 ${createdInfo[0]}-${createdInfo[1]}-${createdInfo[2]}`;
};

const convertresourceInfoSemester = (semester) => {
  let dateData = semester.split("년 ");
  return `개설학기 ${dateData[0]}-${dateData[1]}`;
};

const AdditionalModal = ({ contentId, isScrapped, isLoggedIn, isCheckedToken }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = !isLoggedIn && isCheckedToken ? false : true;

  const handleReportClick = () => {
    if (!isAuthenticated) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notLoggedIn"];
      const onConfirm = () => history.push("/login");
      dispatch(showConfirmModal({ title, content, onConfirm }));
    } else {
      dispatch(closeAdditionalModal());
      dispatch(showReportModal({ contentId }));
    }
  };
  return (
    <ModalWrapper>
      <Report onClick={() => handleReportClick()}>신고</Report>
      <Scrap>{isScrapped ? "스크랩 취소" : "스크랩"}</Scrap>
    </ModalWrapper>
  );
};

const ResourceInfoContainer = ({
  resourceInfo,
  contentId,
  isAdditionalModalOpened,
  isPurchased,
  isScrapped,
}) => {
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
        let { data } = await lectureDetailAPI.postHit(resourceInfo.id, accessToken);
        if (data.httpStatus === "OK") dispatch(clickHitIcon());
      }
    } catch (error) {
      throw new Error(error);
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
          <PurchaseButton isPurchased={isPurchased} />
        </InfoWrapper>
      </ResourceInfoSection>
    </>
  );
};

ResourceInfoContainer.defaultProps = {
  isPurchased: false,
  resourceInfo: {},
};

ResourceInfoContainer.propTypes = {
  isPurchased: PropTypes.bool,
  resourceInfo: PropTypes.object,
};

export default ResourceInfoContainer;
