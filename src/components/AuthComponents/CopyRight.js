import React from "react";
import styled from "styled-components";

const CopyRightText = styled.div`
  margin-top: 48px;
  letter-spacing: -0.7px;
  color: #7d7d7d;
  font-size: 13px;
`;

const CopyRight = () => {
  return (
    <CopyRightText>
      COPYRIGHT ⓒ {new Date().getFullYear()} BY <strong style={{ color: "#acabab" }}>BCSDLab</strong> ALL RIGHTS
      RESERVED.
    </CopyRightText>
  );
};

export default CopyRight;
