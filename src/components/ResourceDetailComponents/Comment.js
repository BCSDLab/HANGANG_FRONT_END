import React from "react";
import PropTypes from "prop-types";
import { Content, Date, Report, Wrapper, Writer } from "./styles/Comment.style";

Comment.propTypes = {
  id: PropTypes.number,
  nickname: PropTypes.string,
  elapsedMinutes: PropTypes.number,
  comments: PropTypes.string,
};

function Comment({ id = 0, nickname = "", elapsedMinutes = 0, comments = "" }) {
  return (
    <Wrapper>
      <Writer>{nickname}</Writer>
      <Date>{getDateTextOnElapsedMinutes(elapsedMinutes)}</Date>
      <Content>{comments}</Content>
      <Report>신고</Report>
    </Wrapper>
  );
}

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
