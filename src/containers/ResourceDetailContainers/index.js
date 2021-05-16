import React from "react";
// import { useParams } from "react-router-dom";
import { BorderColor } from "static/Shared/commonStyles";
import styled from "styled-components";
import LectureInfoContainer from "./LectureInfoContainer";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  width: 752px;
  height: calc(100% - 80px);
  /* max-height: 1274px; */
  padding: 27px 27px 16px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};
  background-color: #fff;
`;

const ResourceDetailContainer = () => {
  // let { resourceId } = useParams();
  return (
    <Wrapper>
      {/* <span>{resourceId}</span> */}
      <Content>
        <LectureInfoContainer />
      </Content>
    </Wrapper>
  );
};

export default ResourceDetailContainer;
