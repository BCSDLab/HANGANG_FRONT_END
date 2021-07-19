import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import ResourceDetailAPI from "api/resourceDetail";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { showAlertModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

import { Wrapper, File, Name } from "./styles/Attachment.style";

const convertName = (name, ext) => {
  if (name.length <= 7) return name.slice(0, 3) + "." + ext;
  else return name.slice(0, 3) + "···." + ext;
};

const Attachment = ({ id = -1, fileName = "", ext = "", isPurchased = false }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);

  const downloadAttachment = async () => {
    if (!isPurchased || (!isLoggedIn && isCheckedToken)) return;

    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
      const { data } = await ResourceDetailAPI.requestAttachmentUri(id, accessToken);
      if (data) window.location.assign(data);
    } catch (error) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
      dispatch(showAlertModal({ title, content }));
      throw new Error(error);
    }
  };

  return (
    <Wrapper isPurchased={isPurchased} onClick={downloadAttachment}>
      <File ext={ext} isPurchased={isPurchased} />
      <Name isPurchased={isPurchased}>{convertName(fileName, ext)}</Name>
    </Wrapper>
  );
};

Attachment.propTypes = {
  fileName: PropTypes.string,
  ext: PropTypes.string,
  isPurchased: PropTypes.bool,
};

export default Attachment;
