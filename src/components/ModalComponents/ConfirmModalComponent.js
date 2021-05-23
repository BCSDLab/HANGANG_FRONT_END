import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { hideConfirmModal } from "store/modules/modalModule";
import {
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

const Wrapper = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
`;

const ConfirmModalBox = styled.div`
  position: fixed;
  top: 40px;
  left: calc(50% - 160px);
  width: 320px;
  height: 112px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  border: solid 1px ${CopyRightColor};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
`;

const Content = styled.div`
  font-size: 14px;
  color: ${FontColor};
  white-space: pre-wrap;
`;

const Close = styled.span`
  position: absolute;
  bottom: 14px;
  right: 100px;
  font-size: 14px;
  font-weight: 500;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

const Confirm = styled(Close)`
  right: 24px;
  color: ${ConceptColor};
`;

const ConfirmModalComponent = () => {
  const dispatch = useDispatch();
  const { isConfirmModalShowing, confirmModalContent, onConfirm } = useSelector(
    (state) => state.modalReducer
  );

  return (
    isConfirmModalShowing && (
      <Wrapper>
        <ConfirmModalBox>
          <Content>{confirmModalContent}</Content>
          <Close onClick={() => dispatch(hideConfirmModal())}>닫기</Close>
          <Confirm
            onClick={() => {
              dispatch(hideConfirmModal());
              onConfirm();
            }}
          >
            확인
          </Confirm>
        </ConfirmModalBox>
      </Wrapper>
    )
  );
};

export default ConfirmModalComponent;
