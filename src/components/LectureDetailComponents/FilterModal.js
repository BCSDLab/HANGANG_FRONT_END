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
  margin-left: 640px;
  margin-top: 125px;
  width: 100px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 23px 16px;
  border-radius: 8px;
  border: 1px solid ${PlaceholderColor};
  background-color: #fff;

  z-index: 1;
`;

const FilterLabel = styled.p`
  font-size: 12px;
  cursor: pointer;
  color: ${FontColor};
`;

FilterModal.propTypes = {
  isFilterModalOpened: PropTypes.bool,
};

function FilterModal({ lectureId, isLoggedIn, isCheckedToken = false }) {
  const dispatch = useDispatch();
  const fetchReviewWithFilter = async (sortLabel) => {
    console.log("[fetchReviewWithFilter] => " + sortLabel);
    try {
      dispatch(setLectureReviewFilter({ sort: sortLabel }));
      dispatch(requestLectureReviews());
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper>
      <FilterLabel onClick={() => fetchReviewWithFilter("좋아요순")}>
        좋아요순
      </FilterLabel>
      <FilterLabel onClick={() => fetchReviewWithFilter("최신순")}>최신순</FilterLabel>
    </ModalWrapper>
  );
}

export default FilterModal;
