import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import ResourceDetailAPI from "api/resourceDetail";
import { scrapResource, unscrapResource } from "store/modules/resourceDetailModule";
import { ModalWrapper, Report, Scrap } from "./styles/AdditionalModal.style";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { triggerWhenNotLoggedIn, callReportModal } from "utils/reportUtils";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

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

  /**
   * 로그인 여부를 체크하고,
   * 로그인이 되어있다면 scrap 또는 unscrap을 요청합니다.
   */
  const handleScrapClick = () => {
    if (!isAuthenticated) triggerWhenNotLoggedIn({ dispatch, history });
    else {
      if (!isScrapped) requestScrap(contentId, dispatch);
      else requestUnscrap(user_scrap_id, dispatch);
    }
  };

  return (
    <ModalWrapper>
      <Report
        onClick={() =>
          callReportModal("resource", contentId, isAuthenticated, history, dispatch)
        }
      >
        신고
      </Report>
      <Scrap onClick={() => handleScrapClick()}>
        {isScrapped ? "스크랩 취소" : "스크랩"}
      </Scrap>
    </ModalWrapper>
  );
}

const requestScrap = async (contentId, dispatch) => {
  try {
    const accessToken = getValueOnLocalStorage("hangangToken").access_token;
    const { data, status } = await ResourceDetailAPI.scrapResource(
      contentId,
      accessToken
    );
    if (status === 200) dispatch(scrapResource({ user_scrap_id: data }));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

const requestUnscrap = async (userScrapId, dispatch) => {
  try {
    const accessToken = getValueOnLocalStorage("hangangToken").access_token;
    const { data } = await ResourceDetailAPI.unscrapResource(userScrapId, accessToken);
    if (data.httpStatus === "OK") dispatch(unscrapResource());
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

export default AdditionalModal;
