import styled from "styled-components";
import { CopyRightColor, FontColor } from "static/Shared/commonStyles";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 48px;
  right: 24px;
  width: 103px;
  height: 111px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 23px 16px;
  border-radius: 8px;
  border: 1px solid ${CopyRightColor};
  background-color: #fff;

  z-index: 1;
`;

export const Report = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
  cursor: pointer;
`;

export const Scrap = styled(Report)``;
