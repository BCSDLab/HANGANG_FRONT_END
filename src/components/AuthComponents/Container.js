import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 30px;
`;

const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </ContainerWrapper>
  );
};

export default Container;
