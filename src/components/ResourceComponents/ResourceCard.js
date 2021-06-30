import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import ResourceAPI from "api/resources";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import {
  Wrapper,
  Thumbnail,
  Content,
  Title,
  Nickname,
  LectureInfos,
  LectureName,
  Delimiter,
  LectureProfessor,
  Category,
  HitWrapper,
  HitAmount,
  HitIcon,
} from "./styles/ResourceCard.style";
import { convertHTMLEntities } from "utils/convertHTMLEntities";
import { showConfirmModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

/**
 * ResourceCard
 * A Component used to present resources in db at ~/resources
 */
const ResourceCard = ({ data: { is_hit, hits, ...rest } }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const [hitInfos, setHitInfos] = useState({ is_hit, hits });

  /**
   * Request "Hit API" when user pushed hit icon.
   * If user not logged in, show alert screen and request log in.
   * If user logged in, Request hit API with id of resource and token of user.
   */
  const clickHitIcon = async (e, id) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_LOGGED_IN"];
      const onConfirm = () => history.push("/login");
      dispatch(showConfirmModal({ title, content, onConfirm }));
      return;
    } else {
      try {
        const accessToken = getValueOnLocalStorage("hangangToken").access_token;
        const { data } = await ResourceAPI.requestHit(id, accessToken);
        if (data.httpStatus === "OK") {
          setHitInfos((prev) =>
            prev.is_hit
              ? { is_hit: false, hits: prev.hits - 1 }
              : { is_hit: true, hits: prev.hits + 1 }
          );
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  return (
    <Wrapper onClick={() => history.push(`/resource/${rest.id}`)}>
      <Thumbnail uri={rest.thumbnail} />
      <Content>
        <Title>{convertHTMLEntities(sliceString(rest.title, 26))}</Title>
        <Nickname>{rest.user.nickname}</Nickname>
        <LectureInfos>
          <LectureName to={`lectures/${rest.lecture_id}`}>
            {sliceString(rest.lecture.name, 7)}
          </LectureName>
          <Delimiter />
          <LectureProfessor as="span">
            {sliceString(rest.lecture.professor, 10)}
          </LectureProfessor>
        </LectureInfos>
        <Category>
          {rest.category // e.g. 강의자료 -> 강의, 과제자료 -> 과제
            .map((elem) => elem.slice(0, 2))
            .join(", ")}
        </Category>
        <HitWrapper>
          <HitIcon isHit={hitInfos.is_hit} onClick={(e) => clickHitIcon(e, rest.id)} />
          <HitAmount isHit={hitInfos.is_hit}>{hitInfos.hits}</HitAmount>
        </HitWrapper>
      </Content>
    </Wrapper>
  );
};

/**
 * Return the sliced string that maximum length is 'max'.
 * @param string A string needed to slice.
 * @param max A number that set maximum value to slice string.
 */
const sliceString = (string, max) => {
  if (string.length > max) {
    string = string.slice(0, max) + "...";
  }
  return string;
};

ResourceCard.defaultProps = {
  data: {
    is_hit: false,
    hits: 0,
    rest: {},
  },
};

ResourceCard.propTypes = {
  data: PropTypes.shape({
    is_hit: PropTypes.bool,
    hits: PropTypes.number,
    rest: PropTypes.object,
  }),
};

export default ResourceCard;
