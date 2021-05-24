import React from "react";
import PropTypes from "prop-types";

import { Content, Date, Report, Wrapper, Writer } from "./styles/Comment.style";
import { useHistory } from "react-router-dom";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showConfirmModal, showReportModal } from "store/modules/modalModule";
import { useDispatch, useSelector } from "react-redux";

Comment.propTypes = {
  id: PropTypes.number,
  nickname: PropTypes.string,
  elapsedMinutes: PropTypes.number,
  comments: PropTypes.string,
};

function Comment({ id = 0, nickname = "", elapsedMinutes = 0, comments = "" }) {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const isAuthenticated = !isLoggedIn && isCheckedToken ? false : true;
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Wrapper>
      <Writer>{nickname}</Writer>
      <Date>{getDateTextOnElapsedMinutes(elapsedMinutes)}</Date>
      <Content>{comments}</Content>
      <Report onClick={() => handleReportComment(id, isAuthenticated, history, dispatch)}>
        신고
      </Report>
    </Wrapper>
  );
}

/**
 * 로그인 되어있지 않은 유저가 기능에 접근할 시 로그인 모달을 띄웁니다.
 */
const triggerWhenNotLoggedIn = (history, dispatch) => {
  const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notLoggedIn"];
  const onConfirm = () => history.push("/login");
  dispatch(showConfirmModal({ title, content, onConfirm }));
};

/**
 * 로그인 여부를 파악하고 로그인이 되어있다면 reportModal을 띄웁니다.
 */
const handleReportComment = (contentId, isAuthenticated, history, dispatch) => {
  if (!isAuthenticated) triggerWhenNotLoggedIn(history, dispatch);
  else dispatch(showReportModal({ contentId, reportType: "comment" }));
};

const MINUTE_BY_ONE_YEAR = 525600;
const MINUTE_BY_ONE_MONTH = 43800;
const MINUTE_BY_ONE_DAY = 1440;
const MINUTE_BY_ONE_HOUR = 60;

const getDateTextOnElapsedMinutes = (elapsedMinutes) => {
  if (elapsedMinutes >= MINUTE_BY_ONE_YEAR)
    return `${Math.round(elapsedMinutes / MINUTE_BY_ONE_YEAR)}년전`;
  else if (elapsedMinutes >= MINUTE_BY_ONE_MONTH)
    return `${Math.round(elapsedMinutes / MINUTE_BY_ONE_MONTH)}달전`;
  else if (elapsedMinutes >= MINUTE_BY_ONE_DAY)
    return `${Math.round(elapsedMinutes / MINUTE_BY_ONE_DAY)}일전`;
  else if (elapsedMinutes >= MINUTE_BY_ONE_HOUR)
    return `${Math.round(elapsedMinutes / MINUTE_BY_ONE_HOUR)}시간전`;
  else return `${elapsedMinutes}분전`;
};

export default Comment;
