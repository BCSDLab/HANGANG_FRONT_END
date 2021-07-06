import {
  Author,
  Icon,
  LectureNameAndAuthor,
  Name,
  Slash,
  ThumbnailWrapper,
  Title,
} from "./Thumbnail.style";

import React from "react";
import { convertHTMLEntities } from "utils/convertHTMLEntities";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * 인덱스를 받아 해당 인덱스에 맞는 썸네일 반환
 * @param {number} index
 */
const Thumbnail = ({ index }) => {
  const { recommendResources } = useSelector((state) => state.mainPageReducer);
  const history = useHistory();
  return (
    <ThumbnailWrapper
      index={index}
      onClick={() => history.push(`/resource/${recommendResources[index].id}`)}
    >
      <Icon thumbnailURL={recommendResources[index].thumbnail} />
      <Title index={index}>{convertHTMLEntities(recommendResources[index].title)}</Title>

      <LectureNameAndAuthor>
        <Name>{convertHTMLEntities(recommendResources[index].lecture.name)}</Name>
        <Slash>/</Slash>
        <Author>
          {convertHTMLEntities(recommendResources[index].lecture.professor)}
        </Author>
      </LectureNameAndAuthor>
    </ThumbnailWrapper>
  );
};

export default Thumbnail;
