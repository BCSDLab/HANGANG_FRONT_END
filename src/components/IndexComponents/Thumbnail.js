import React from "react";
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
const Thumbnail = ({ index, recommendResources }) => (
  <ThumbnailWrapper index={index}>
    <Icon thumbnailURL={recommendResources[index].thumbnail} />
    <Title index={index}>{recommendResources[index].title}</Title>

    <LectureNameAndAuthor>
      <Name>CMF</Name>
      <Slash>/</Slash>
      <Author>카페스트라니 파올로</Author>
      {/* FIXME: Change when api revised */}
      {/* {recommendResources[index].lectureName} / {recommendResources[index].author} */}
    </LectureNameAndAuthor>
  </ThumbnailWrapper>
);

export default Thumbnail;
