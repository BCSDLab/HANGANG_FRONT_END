import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import ResourceDetailAPI from "api/resourceDetail";
import { scrapResource, unscrapResource } from "store/modules/resourceDetailModule";
import { ModalWrapper, Report, Scrap } from "./styles/AdditionalModal.style";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { triggerWhenNotLoggedIn, callReportModal } from "utils/reportUtils";

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

  const handleScrapClick = () => {
    if (!isAuthenticated) triggerWhenNotLoggedIn(dispatch, history);
    else requestScrap(isScrapped, user_scrap_id, contentId, dispatch);
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

const requestScrap = async (isScrapped, user_scrap_id, contentId, dispatch) => {
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

export default AdditionalModal;
