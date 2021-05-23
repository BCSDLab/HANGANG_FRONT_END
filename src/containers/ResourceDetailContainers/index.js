import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ResourceDetailAPI from "api/resourceDetail";

import { closeAdditionalModal, setLectureInfo } from "store/modules/resourceDetailModule";
import { BorderColor } from "static/Shared/commonStyles";

import AttachmentsContainer from "./AttachmentsContainer";
import LectureInfoContainer from "./ResourceInfoContainer";
import CommentsContainer from "./CommentsContainer";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import LoadingSpinner from "components/Shared/LoadingSpinner";

const sampleAttachments = [
  {
    id: 1,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
  {
    id: 2,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
  {
    id: 3,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
  {
    id: 4,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
  {
    id: 5,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
  {
    id: 6,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
  {
    id: 7,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
  {
    id: 8,
    fileName: "김이정.hwp",
    ext: "hwp",
  },
];

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
  max-height: 1274px;
  padding: 27px 27px 16px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};
  background-color: #fff;
`;

const ResourceDetailContainer = () => {
  let { resourceId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isAdditionalModalOpened,
    isPurchased,
    comments, //
    uploadFiles,
    ...rest
  } = useSelector((state) => state.resourceDetailReducer);

  const [isFetched, setIsFetched] = useState(false);

  // const fetch;

  useEffect(async () => {
    try {
      let token = getValueOnLocalStorage("hangangToken");
      const { data } = await ResourceDetailAPI.getResourceDetailInfo(resourceId, token);
      dispatch(setLectureInfo(data));
    } catch (error) {
      if (error.response.data.code === 30) {
        alert("존재하지 않는 게시물입니다.");
      } else {
        alert("확인되지 않은 오류입니다. 관리자에게 문의하세요.");
      }
      history.push("/resources");
    } finally {
      setIsFetched(true);
    }
  }, []);

  const closeAdditionalModalEventTriggered = () => {
    if (isAdditionalModalOpened) dispatch(closeAdditionalModal());
  };

  return (
    <>
      <Wrapper onClick={() => closeAdditionalModalEventTriggered()}>
        {!isFetched && <LoadingSpinner />}
        {isFetched && (
          <Content>
            <LectureInfoContainer
              lectureInfo={rest}
              isAdditionalModalOpened={isAdditionalModalOpened}
              isPurchased={isPurchased}
            />
            <AttachmentsContainer
              isPurchased={isPurchased}
              uploadFiles={sampleAttachments}
            />
            {/* <AttachmentsContainer isPurchased={isPurchased} uploadFiles={uploadFiles} /> */}
            <CommentsContainer comments={comments} />
          </Content>
        )}
      </Wrapper>
      {/* <ReportModalContainer /> */}
    </>
  );
};

export default ResourceDetailContainer;
