import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import {
  CommentIcon,
  CommentLetterCounter,
  CommentWrapper,
  CommentWriteInput,
  CountComment,
  Wrapper,
  WriteSectionWrapper,
} from "./styles/CommentsContainer.style";
import ResourceDetailAPI from "api/resourceDetail";
import Comment from "components/ResourceDetailComponents/Comment";
import { triggerWhenNotLoggedIn } from "utils/reportUtils";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";
import { addCommentOnNextPage, addNewComment } from "store/modules/resourceDetailModule";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import debounce from "lodash.debounce";

CommentsContainer.propTypes = {
  comments: PropTypes.array,
};

// TODO: CommentWrapper 높이 정해야함... 지금 매우 이상
function CommentsContainer({ comments, amount }) {
  // state
  let { resourceId } = useParams();
  const [comment, setComment] = useState("");
  const { isLoggedIn, isCheckedToken, nickname } = useSelector(
    (state) => state.authReducer
  );
  const { limit, pageOnComment, maxPageOnComment } = useSelector(
    (state) => state.resourceDetailReducer
  );
  const isAuthenticated = !isLoggedIn && isCheckedToken ? false : true;
  const dispatch = useDispatch();
  const history = useHistory();

  // function
  const createCommentIfLoggedIn = () => {
    if (!isAuthenticated) triggerWhenNotLoggedIn(history, dispatch);
    else requestCreateComment();
  };

  const requestCreateComment = async () => {
    try {
      let accessToken = getValueOnLocalStorage("hangangToken").access_token;
      const { data } = await ResourceDetailAPI.createComment(
        resourceId,
        comment,
        accessToken
      );

      dispatch(
        addNewComment({ id: data, comments: comment, elapsedMinutes: 0, nickname })
      );
      setComment("");
    } catch (error) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
      dispatch(showAlertModal({ title, content }));
    }
  };

  /**
   * 스크린이 댓글 중 마지막 3번째 댓글을 보이게 되면 fetchMore를 호출합니다.
   * fetchMore는 현재 페이지와 최대 페이지를 비교하여, 최대 페이지를 넘어가지 않았다면
   * 새로운 페이지의 댓글을 호출합니다.
   */
  const fetchCommentOnNextPage = async () => {
    try {
      const {
        data: { comments },
        status,
      } = await ResourceDetailAPI.getComment(resourceId, limit, pageOnComment + 1);
      if (status === 200) dispatch(addCommentOnNextPage({ comments }));
    } catch (error) {
      throw new Error(error);
    }
  };
  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && pageOnComment < maxPageOnComment) {
      fetchCommentOnNextPage();
    }
  }, 200);
  const { targetRef } = useInfiniteScroll(fetchMore, 5);

  // JSX
  return (
    <Wrapper>
      <CountComment>{`댓글 (${amount})`}</CountComment>
      <WriteSectionWrapper lineAmount={comment.split("\n").length - 1}>
        <CommentWriteInput value={comment} onChange={(e) => setComment(e.target.value)} />
        {comment !== "" && (
          <>
            <CommentLetterCounter>{`${comment.length}/300자`}</CommentLetterCounter>
            {comment.length <= 300 && (
              <CommentIcon onClick={() => createCommentIfLoggedIn()} />
            )}
          </>
        )}
      </WriteSectionWrapper>
      <CommentWrapper ref={targetRef}>
        {comments.map((props) => (
          <Comment
            key={props.id}
            id={props.id}
            nickname={props.nickname}
            elapsedMinutes={props.elapsedMinutes}
            comments={props.comments}
          />
        ))}
      </CommentWrapper>
    </Wrapper>
  );
}

export default CommentsContainer;
