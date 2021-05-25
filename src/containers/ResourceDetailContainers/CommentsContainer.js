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

CommentsContainer.propTypes = {
  comments: PropTypes.array,
};

// TODO: CommentWrapper 높이 정해야함... 지금 매우 이상
function CommentsContainer({ comments }) {
  let { resourceId } = useParams();
  const [comment, setComment] = useState("");
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const isAuthenticated = !isLoggedIn && isCheckedToken ? false : true;
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Wrapper>
      <CountComment>{`댓글 (${comments.length})`}</CountComment>
      <WriteSectionWrapper lineAmount={comment.split("\n").length - 1}>
        <CommentWriteInput value={comment} onChange={(e) => setComment(e.target.value)} />
        {comment !== "" && (
          <>
            <CommentLetterCounter>{`${comment.length}/300자`}</CommentLetterCounter>
            {comment.length <= 300 && (
              <CommentIcon
                onClick={() =>
                  createCommentIfLoggedIn(
                    isAuthenticated,
                    resourceId,
                    comment,
                    history,
                    dispatch
                  )
                }
              />
            )}
          </>
        )}
      </WriteSectionWrapper>
      <CommentWrapper>
        {console.log(comments)}
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

const createCommentIfLoggedIn = (
  isAuthenticated,
  resourceId,
  comment,
  history,
  dispatch
) => {
  if (!isAuthenticated) triggerWhenNotLoggedIn(history, dispatch);
  else requestCreateComment(resourceId, comment, dispatch);
};

const requestCreateComment = async (resourceId, comment, dispatch) => {
  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;
    const data = await ResourceDetailAPI.createComment(resourceId, comment, accessToken);
    console.dir(data);
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
    dispatch(showAlertModal({ title, content }));
  }
};

export default CommentsContainer;
