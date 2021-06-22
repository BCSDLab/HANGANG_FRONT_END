import React from "react";
import { Title, LectureNameAndAuthor, ThumbnailWrapper } from "./Thumbnail.style";

/**
 * 인덱스를 받아 해당 인덱스에 맞는 썸네일 반환
 * @param {number} index
 */
const Thumbnail = ({ index, recommendResources }) => (
  <ThumbnailWrapper index={index} thumbnailURL={recommendResources[index].thumbnail}>
    <Title index={index}>{recommendResources[index].title}</Title>
    <LectureNameAndAuthor>
      {recommendResources[index].lectureName} / {recommendResources[index].author}
    </LectureNameAndAuthor>
  </ThumbnailWrapper>
);

export default Thumbnail;
