import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ResourceDetailAPI from "api/resourceDetail";
import {
  closeAdditionalModal,
  setResourceInfo,
} from "store/modules/resourceDetailModule";
import { BorderColor } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import AttachmentsContainer from "./AttachmentsContainer";
import ResourceInfoContainer from "./ResourceInfoContainer";
import CommentsContainer from "./CommentsContainer";
import LoadingSpinner from "components/Shared/LoadingSpinner";
import { Promise } from "core-js";
import { showAlertModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 40px 0px;
  min-height: 1000px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  width: 752px;
  min-height: 972px;
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
    id,
    isAdditionalModalOpened,
    is_purchase,
    user_scrap_id,
    comments, //
    comment_amount,
    limit,
    uploadFiles,
    ...rest
  } = useSelector((state) => state.resourceDetailReducer);
  /**
   * 첫 마운트 시 강의 자료 세부 정보를 요청합니다.
   * 만약 존재하지 않는 id로 접근할 시 ~/resources로 내보냅니다.
   */
  const [isFetched, setIsFetched] = useState(false);
  const fetchResourceDetailInfo = async () => {
    try {
      let token = getValueOnLocalStorage("hangangToken");
      const fetchedData = await Promise.all([
        ResourceDetailAPI.getResourceDetailInfo(resourceId, token),
        ResourceDetailAPI.getCommentsOnResource(resourceId, limit, 1),
      ]);
      dispatch(setResourceInfo(fetchedData));
    } catch (error) {
      if (error.response.data.code === 30) {
        dispatch(
          showAlertModal({
            content: "존재하지 않는 게시물입니다.",
          })
        );
      } else {
        const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
        dispatch(showAlertModal({ title, content }));
      }
      history.push("/resources");
    } finally {
      setIsFetched(true);
    }
  };

  useEffect(() => {
    if (id !== parseInt(resourceId)) fetchResourceDetailInfo();
    else setIsFetched(true);
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
            <ResourceInfoContainer
              resourceInfo={rest}
              contentId={resourceId}
              isAdditionalModalOpened={isAdditionalModalOpened}
              isPurchased={is_purchase}
              isScrapped={user_scrap_id !== 0}
            />
            <AttachmentsContainer isPurchased={is_purchase} uploadFiles={uploadFiles} />
            <CommentsContainer comments={comments} amount={comment_amount} />
          </Content>
        )}
      </Wrapper>
    </>
  );
};

export default ResourceDetailContainer;
