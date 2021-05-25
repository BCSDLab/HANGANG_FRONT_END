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
import { addNewComment } from "store/modules/resourceDetailModule";

CommentsContainer.propTypes = {
  comments: PropTypes.array,
};

// TODO: CommentWrapper 높이 정해야함... 지금 매우 이상
function CommentsContainer({ comments }) {
  // state
  let { resourceId } = useParams();
  const [comment, setComment] = useState("");
  const { isLoggedIn, isCheckedToken, nickname } = useSelector(
    (state) => state.authReducer
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

  // JSX
  return (
    <Wrapper>
      <CountComment>{`댓글 (${comments.length})`}</CountComment>
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
      <CommentWrapper>
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
