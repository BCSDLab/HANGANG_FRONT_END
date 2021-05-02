import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

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
  font-weight: 500;
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
  font-weight: normal;
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

const HitAmount = styled.span`
  margin-left: 4px;
  font-size: 16px;
  color: ${PlaceholderColor};
`;

const HitIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up.png",
  alt: "hit_icon",
})`
  width: 20px;
  cursor: pointer;
`;

/**
 * ResourceCard
 * A Component used to present resources in db at ~/resources
 */
const ResourceCard = ({ isLiked = false, ...rest }) => {
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

  return (
    <Wrapper>
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
          <HitIcon onClick={() => alert("hi")} />
          <HitAmount>{rest.data.hits}</HitAmount>
        </HitWrapper>
      </Content>
    </Wrapper>
  );
};

ResourceCard.defaultProps = {
  isScrapped: false,
  rest: {},
};

ResourceCard.propTypes = {
  isScrapped: PropTypes.bool,
  rest: PropTypes.object,
};

export default ResourceCard;
