import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CopyRight from "./CopyRight";
import Logo from "./Logo";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 16px;
`;

const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      <ChildrenWrapper>
        <Logo />
        {children}
        <CopyRight />
      </ChildrenWrapper>
    </ContainerWrapper>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
