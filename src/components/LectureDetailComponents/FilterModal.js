import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import {
  setLectureReviewFilter,
  requestLectureReviews,
} from "store/modules/lectureDetailModule";
import { FontColor } from "static/Shared/commonStyles";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const ModalWrapper = styled.div`
  display: flex;

  position: absolute;

  width: 112px;
  height: 112px;

  margin-left: 595px;
  margin-top: 140px;
  padding: 22px 16px;

  border: solid 1px #eeeeee;

  background-color: #ffffff;

  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);

  z-index: 1;
`;

const FilterLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: normal;
  cursor: pointer;
  color: ${FontColor};
`;

const FilterModal = () => {
  const dispatch = useDispatch();
  const fetchReviewWithFilter = async (sortLabel) => {
    if (![LIKE_ORDER, RECENT_ORDER].includes(sortLabel)) return;

    try {
      dispatch(setLectureReviewFilter({ sort: sortLabel }));
      dispatch(requestLectureReviews());
    } catch (error) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
      dispatch(showAlertModal({ title, content }));
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper onClick={(e) => fetchReviewWithFilter(e.target.innerText)}>
      <FilterLabel>{LIKE_ORDER}</FilterLabel>
      <FilterLabel>{RECENT_ORDER}</FilterLabel>
    </ModalWrapper>
  );
};

const LIKE_ORDER = "좋아요 순";
const RECENT_ORDER = "최신 순";

export default FilterModal;
