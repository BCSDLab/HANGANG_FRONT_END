import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Title,
  Icon,
  Name,
  Slash,
  Author,
  LectureNameAndAuthor,
  ThumbnailWrapper,
} from "./Thumbnail.style";

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
      <Title index={index}>{recommendResources[index].title}</Title>

      <LectureNameAndAuthor>
        <Name>{recommendResources[index].lecture.name}</Name>
        <Slash>/</Slash>
        <Author>{recommendResources[index].lecture.professor}</Author>
      </LectureNameAndAuthor>
    </ThumbnailWrapper>
  );
};

export default Thumbnail;
