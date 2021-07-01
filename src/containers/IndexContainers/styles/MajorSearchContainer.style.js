import { Link } from "react-router-dom";
import styled from "styled-components";

import { FontColor } from "static/Shared/commonStyles";

export const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

export const MajorCard = styled(Link)`
  all: unset;
  position: relative;
  width: 100px;
  height: 87px;
  background-image: url(${({ img }) => img});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const MajorLabel = styled.label`
  position: absolute;
  left: calc(50% - 34px);
  bottom: 5px;
  width: 68px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  color: #fff;
  text-align: center;
  cursor: pointer;
`;
