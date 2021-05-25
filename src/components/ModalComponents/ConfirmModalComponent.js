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
  left: calc(50% - 162px);
  width: 324px;
  height: 185px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  border: solid 1px ${CopyRightColor};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  color: ${FontColor};
`;

const Content = styled.div`
  color: ${FontColor};
  font-size: 14px;
  line-height: 1.3;
  white-space: pre-wrap;
`;

const Close = styled.span`
  position: absolute;
  bottom: 24px;
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
  const {
    isConfirmModalShowing,
    confirmModalTitle,
    confirmModalContent,
    onConfirm,
  } = useSelector((state) => state.modalReducer);

  return (
    isConfirmModalShowing && (
      <Wrapper>
        <ConfirmModalBox>
          {confirmModalTitle !== "" && <Title>{confirmModalTitle}</Title>}
          <Content>{confirmModalContent}</Content>
          <Close onClick={() => dispatch(hideConfirmModal())}>닫기</Close>
          <Confirm
            onClick={() => {
              onConfirm();
              dispatch(hideConfirmModal());
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
