import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import ResourceDetailAPI from "api/resourceDetail";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showConfirmModal, showReportModal } from "store/modules/modalModule";
import { scrapResource, unscrapResource } from "store/modules/resourceDetailModule";
import { ModalWrapper, Report, Scrap } from "./styles/AdditionalModal.style";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

AdditionalModal.propTypes = {
  contentId: PropTypes.string.isRequired,
  isAdditionalModalOpened: PropTypes.bool,
  isPurchased: PropTypes.bool,
  isScrapped: PropTypes.bool,
};

function AdditionalModal({
  contentId = "",
  isScrapped = false,
  isLoggedIn = false,
  isCheckedToken = false,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user_scrap_id } = useSelector((state) => state.resourceDetailReducer);
  const isAuthenticated = !isLoggedIn && isCheckedToken ? false : true;

  const requestScrap = async () => {
    try {
      const accessToken = getValueOnLocalStorage("hangangToken").access_token;
      let data;
      let prevScrappedInfo = isScrapped;
      if (isScrapped)
        data = await ResourceDetailAPI.unscrapResource(
          parseInt(user_scrap_id),
          accessToken
        );
      else data = await ResourceDetailAPI.scrapResource(contentId, accessToken);

      if (data.data.httpStatus === "OK") {
        if (!prevScrappedInfo) dispatch(scrapResource({ contentId }));
        else dispatch(unscrapResource());
      }
      console.log(isScrapped);
      console.dir(data);
    } catch (error) {
      console.dir(error);
    }
  };

  const handleReportClick = () => {
    if (!isAuthenticated) triggerWhenNotLoggedIn(dispatch, history);
    else dispatch(showReportModal({ contentId, type: "resource" }));
  };

  const handleScrapClick = () => {
    if (!isAuthenticated) triggerWhenNotLoggedIn(dispatch, history);
    else requestScrap();
  };

  return (
    <ModalWrapper>
      <Report onClick={() => handleReportClick()}>신고</Report>
      <Scrap onClick={() => handleScrapClick()}>
        {isScrapped ? "스크랩 취소" : "스크랩"}
      </Scrap>
    </ModalWrapper>
  );
}

/**
 * 로그인 되어있지 않은 유저가 기능에 접근할 시 로그인 알람을 띄웁니다.
 */
const triggerWhenNotLoggedIn = (dispatch, history) => {
  const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notLoggedIn"];
  const onConfirm = () => history.push("/login");
  dispatch(showConfirmModal({ title, content, onConfirm }));
};

export default AdditionalModal;
