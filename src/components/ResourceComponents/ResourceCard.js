import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Promise } from "core-js";

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
`;
const Thumbnail = styled.div`
  width: 131px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  /* background */
  background-image: url(${({ uri }) => uri});
  background-repeat: no-repeat;
  background-size: 131px 100%;
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
  align-items: flex-end;
  bottom: 21px;
  right: 15px;
`;

const HitAmount = styled.div`
  height: 15px;
  margin-left: 4px;
  font-size: 17px;
  color: ${({ pushed }) => (pushed ? `${ConceptColor}` : `${PlaceholderColor}`)};
`;

const HitIcon = styled.img.attrs(({ pushed }) => ({
  src: pushed ? PUSHED_THUMB_URL : NOT_PUSHED_THUMB_URL,
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
 * If user logged in, Request API with id of resource and token of user.
 * @param {boolean} isLoggedIn A boolean to check user is logged in.
 * @param {number} id A number of resource id.
 * @param {string} accessToken A string of access_token of user token.
 * @param {function} setHits A function to change state of hits.
 */
const pushHitIcon = async (
  isLoggedIn = false,
  id = undefined,
  accessToken = null,
  setHits = () => {}
) => {
  if (!isLoggedIn) alert(SERVICE_NEEDED_LOGIN);
  else {
    try {
      await Promise.all([
        ResourceAPI.pushHitResource(id, accessToken),
        ResourceAPI.checkUserHitResource(id, accessToken),
      ]);

      setHits((prev) =>
        prev.pushed
          ? { amount: prev.amount - 1, pushed: false }
          : { amount: prev.amount + 1, pushed: true }
      );
    } catch (err) {
      throw new Error(err);
    }
  }
};

/**
 * ResourceCard
 * A Component used to present resources in db at ~/resources
 */
//TODO: Check hits state when pushHit api revised
const ResourceCard = ({ isHitted, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const token = getValueOnLocalStorage("hangangToken") || null;
  const [hits, setHits] = useState({
    amount: rest.data.hits,
    pushed: isHitted,
  });

  return (
    <Wrapper>
      {/* FIXME: Convert uri if backend api revised */}
      <Thumbnail uri="https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/sample_resource_thumbnail.png" />
      <Content>
        <Title>{sliceString(rest.data.title, 26)}</Title>
        <Nickname>{rest.data.user.nickname}</Nickname>
        <LectureInfos>
          <LectureName to={`lectures/${rest.data.lecture_id}`}>
            {sliceString(rest.data.lecture.name, 7)}
          </LectureName>
          <Delimiter />
          <LectureProfessor as="span">
            {sliceString(rest.data.lecture.professor, 10)}
          </LectureProfessor>
        </LectureInfos>
        <Category>
          {rest.data.category // e.g. 강의자료 -> 강의, 과제자료 -> 과제
            .map((elem) => elem.slice(0, 2))
            .join(", ")}
        </Category>
        <HitWrapper>
          <HitIcon
            pushed={hits.pushed}
            onClick={() =>
              pushHitIcon(isLoggedIn, rest.data.id, token.access_token, setHits)
            }
          />
          <HitAmount pushed={hits.pushed}>{hits.amount}</HitAmount>
        </HitWrapper>
      </Content>
    </Wrapper>
  );
};

ResourceCard.defaultProps = {
  isHitted: false,
  rest: {},
};

ResourceCard.propTypes = {
  isHitted: PropTypes.bool,
  rest: PropTypes.object,
};

export default ResourceCard;
