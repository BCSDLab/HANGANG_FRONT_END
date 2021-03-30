import React from "react";
import styled from "styled-components";

import { CopyRightColor } from "static/styles/authPageStyle";

const CopyRightText = styled.footer`
  margin-top: 48px;
  color: ${CopyRightColor};
  font-size: 12px;
`;

const Mark = styled.mark`
  all: unset;
  /* color: #acabab; */
`;

const CopyRight = () => {
  return (
    <CopyRightText>
      COPYRIGHT ⓒ {new Date().getFullYear()} BY <Mark>BCSDLab</Mark> ALL RIGHTS RESERVED.
    </CopyRightText>
  );
};

export default CopyRight;
