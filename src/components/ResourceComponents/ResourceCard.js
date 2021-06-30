import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ResourceAPI from "api/resources";
import { SERVICE_NEEDED_LOGIN } from "static/ErrorComments";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { NOT_PUSHED_THUMB_URL, PUSHED_THUMB_URL } from "static/Shared/imageUrls";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 557px;
  height: 133px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
  background-color: "#fff";
  cursor: pointer;
`;
const Thumbnail = styled.div`
  width: 131px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  /* background */
  background-image: url(${({ uri }) => uri});
  background-repeat: no-repeat;
  background-size: 65px;
  background-position: center;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 131px);
  padding: 20px 17px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

const Nickname = styled(Title)`
  font-weight: normal;
  margin-top: 13px;
`;

const LectureInfos = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
`;

const LectureName = styled(Link)`
  all: unset;
  font-size: 14px;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

const Delimiter = styled.div`
  width: 1px;
  height: 8px;
  margin: 0px 8px;
  background-color: ${PlaceholderColor};
`;

const LectureProfessor = styled(LectureName)`
  cursor: default;
`;

const Category = styled.span`
  position: absolute;
  top: 21px;
  right: 15px;
  font-size: 14px;
  color: ${ConceptColor};
`;

const HitWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 20px;
  right: 15px;
`;

const HitAmount = styled.div`
  margin-left: 4px;
  font-size: 16px;
  color: ${({ isHit }) => (isHit ? `${ConceptColor}` : `${PlaceholderColor}`)};
`;

const HitIcon = styled.img.attrs(({ isHit }) => ({
  src: isHit ? PUSHED_THUMB_URL : NOT_PUSHED_THUMB_URL,
  alt: "hit_icon",
}))`
  width: 19px;
  cursor: pointer;
`;

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

/**
 * Request "Hit API" when user pushed hit icon.
 * If user not logged in, show alert screen and request log in.
 * If user logged in, Request hit API with id of resource and token of user.
 * @param {boolean} isLoggedIn A boolean to check user is logged in.
 * @param {number} id A number of resource id.
 * @param {function} setHits A function to change state of hits.
 */
const clickHitIcon = async (
  isLoggedIn = false,
  id = undefined,
  setHitInfos = () => {}
) => {
  if (!isLoggedIn) alert(SERVICE_NEEDED_LOGIN);
  else {
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

/**
 * ResourceCard
 * A Component used to present resources in db at ~/resources
 */
const ResourceCard = ({ data: { is_hit, hits, ...rest } }) => {
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const [hitInfos, setHitInfos] = useState({ is_hit, hits });

  return (
    <Wrapper onClick={() => history.push(`/resource/${rest.id}`)}>
      <Thumbnail uri={rest.thumbnail} />
      <Content>
        <Title>{sliceString(rest.title, 26)}</Title>
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
          <HitIcon
            isHit={hitInfos.is_hit}
            onClick={() => clickHitIcon(isLoggedIn, rest.id, setHitInfos)}
          />
          <HitAmount isHit={hitInfos.is_hit}>{hitInfos.hits}</HitAmount>
        </HitWrapper>
      </Content>
    </Wrapper>
  );
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
