import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import styled from "styled-components";
import {
  setLectureReviewFilter,
  requestLectureReviews,
  closeTimetableModal,
} from "store/modules/lectureDetailModule";
import { FontColor, PlaceholderColor, ConceptColor } from "static/Shared/commonStyles";

const ModalWrapper = styled.div`
  position: absolute;
  width: 320px;
  height: auto;
  margin: 10px 0 0;
  padding: 36px 24px 8px;

  flex-grow: 0;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #eee;
  background-color: #fff;
  z-index: 1;
`;

const TimetableLabel = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  cursor: pointer;
  color: ${FontColor};
`;

const ButtonSection = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  bottom: 8px;
  right: 0;
`;

const Close = styled.span`
  display: inline-flex;
  padding: 10px 23px;
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  cursor: pointer;
  width: auto;
  justify-content: flex-end;
  margin-right: 8px;
`;

const Confirm = styled(Close)`
  right: 24px;
  padding-right: 0px;
  margin: 0;
  color: ${ConceptColor};
`;

const Check = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/check.png",
  alt: "checked",
})`
  position: absolute;
  width: 16px;
  display: inline-flex;
  justify-content: flex-end;
  right: 24px;
  align-items: center;
  align-content: center;
`;

TimetableModal.propTypes = {
  isTimetableModalOpened: PropTypes.bool,
};

function TimetableModal({ ...rest }) {
  const dispatch = useDispatch();
  console.log(rest);

  const fetchReviewWithFilter = async (id) => {
    // console.log("[fetchReviewWithFilter] => " + sortLabel);
    try {
      // dispatch(setLectureReviewFilter({ sort: sortLabel }));
      // dispatch(requestLectureReviews());
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper>
      <TimetableLabel onClick={() => fetchReviewWithFilter("")}>
        시간표 1 <Check />{" "}
      </TimetableLabel>
      <TimetableLabel onClick={() => fetchReviewWithFilter("")}>
        시간표 2 <Check />
      </TimetableLabel>
      <ButtonSection>
        <Close onClick={() => dispatch(closeTimetableModal())}>닫기</Close>
        <Confirm
          onClick={() => {
            onConfirm();
            dispatch(closeTimetableModal());
          }}
        >
          확인
        </Confirm>
      </ButtonSection>
    </ModalWrapper>
  );
}

export default TimetableModal;
