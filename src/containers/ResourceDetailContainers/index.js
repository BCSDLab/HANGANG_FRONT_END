import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";

import SampleResourceResponse from "static/ResourceDetailPage/sampleResourceResponse.json";
import { BorderColor } from "static/Shared/commonStyles";
import AttachmentsContainer from "./AttachmentsContainer";
import LectureInfoContainer from "./LectureInfoContainer";
import CommentsContainer from "./CommentsContainer";
import ReportModalContainer from "./ReportModalContianer";

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
  const isPurchased = true;
  const { comments, uploadFiles, ...rest } = SampleResourceResponse;

  return (
    <>
      <Wrapper>
        <Content>
          <LectureInfoContainer isPurchased={isPurchased} lectureInfo={rest} />
          <AttachmentsContainer isPurchased={isPurchased} uploadFiles={uploadFiles} />
          <CommentsContainer comments={comments} />
        </Content>
      </Wrapper>
      <ReportModalContainer />
    </>
  );
};

export default ResourceDetailContainer;
