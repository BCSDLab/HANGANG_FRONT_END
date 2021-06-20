import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import styled from "styled-components";
import {
  setLectureReviewFilter,
  requestLectureReviews,
} from "store/modules/lectureDetailModule";
import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

const ModalWrapper = styled.div`
  position: absolute;
  margin-left: 595px;
  margin-top: 140px;
  width: 112px;
  height: 112px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 22px 16px;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #eeeeee;
  background-color: #ffffff;

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

FilterModal.propTypes = {
  isFilterModalOpened: PropTypes.bool,
};

function FilterModal({ lectureId, isLoggedIn, isCheckedToken = false }) {
  const dispatch = useDispatch();
  const fetchReviewWithFilter = async (sortLabel) => {
    try {
      dispatch(setLectureReviewFilter({ sort: sortLabel }));
      dispatch(requestLectureReviews());
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper>
      <FilterLabel onClick={() => fetchReviewWithFilter("좋아요 순")}>
        좋아요 순
      </FilterLabel>
      <FilterLabel onClick={() => fetchReviewWithFilter("최신 순")}>최신 순</FilterLabel>
    </ModalWrapper>
  );
}

export default FilterModal;
