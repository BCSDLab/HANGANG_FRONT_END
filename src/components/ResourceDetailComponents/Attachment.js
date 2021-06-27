import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ResourceDetailAPI from "api/resourceDetail";
import {
  notPurchasedIconPath,
  purchasedIconPath,
} from "static/ResourceDetailPage/imgPath";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { showAlertModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const Wrapper = styled.div`
  position: relative;
  min-width: 90px;
  height: 90px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};

  cursor: ${({ isPurchased }) => (isPurchased ? "pointer" : "default")};
`;

const File = styled.img.attrs(({ ext, isPurchased }) => ({
  src: isPurchased ? purchasedIconPath(ext) : notPurchasedIconPath(ext),
  alt: "file",
}))`
  position: absolute;
  top: 7px;
  left: 7px;
  width: 24px;
`;

const Name = styled.span`
  position: absolute;
  right: 7px;
  bottom: 7px;
  font-size: 12px;
  color: ${({ isPurchased }) => (isPurchased ? `${FontColor}` : `${PlaceholderColor}`)};
`;

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
