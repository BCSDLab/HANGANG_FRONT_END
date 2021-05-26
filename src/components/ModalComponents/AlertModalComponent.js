import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { hideAlertModal } from "store/modules/modalModule";
import { ConceptColor, CopyRightColor, FontColor } from "static/Shared/commonStyles";

const Wrapper = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
`;

const AlertModalBox = styled.div`
  position: fixed;
  top: 40px;
  left: calc(50% - 148px);
  width: 295px;
  height: 147px;
  background-color: #fff;
  border-radius: 8px;
  border: solid 1px ${CopyRightColor};
  padding: 16px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  color: ${FontColor};
`;

const Content = styled.div`
  width: 100%;
  font-size: 12px;
  margin-top: 12px;
  color: ${FontColor};
  line-height: 1.4;
  white-space: pre-wrap;
`;

const Confirm = styled.span`
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${ConceptColor};
  cursor: pointer;
`;

const AlertModalComponent = () => {
  const dispatch = useDispatch();
  const { isAlertModalShowing, alertModalTitle, alertModalContent } = useSelector(
    (state) => state.modalReducer
  );

  return (
    isAlertModalShowing && (
      <Wrapper>
        <AlertModalBox>
          <Title>{alertModalTitle}</Title>
          <Content>{alertModalContent}</Content>
          <Confirm onClick={() => dispatch(hideAlertModal())}>확인</Confirm>
        </AlertModalBox>
      </Wrapper>
    )
  );
};

export default AlertModalComponent;
