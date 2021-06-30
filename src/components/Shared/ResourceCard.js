import React from "react";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";

import {
  Layout,
  ThumbnailLayout,
  Thumbnail,
  InfoLayout,
  Bookmark,
  Title,
  Writer,
  Category,
  HitsBlock,
  Thumb,
  Amount,
  ResourceDetailInfoBlock,
  Lecture,
  Delimiter,
  Professor,
} from "components/Shared/styles/ResourceCard.style";
import { useHistory } from "react-router-dom";

const ResourceCard = ({ data, isEditMode, chooseScrap, isChosen }) => {
  const history = useHistory();

  console.log(data);
  return (
    <Layout
      onClick={() => {
        if (isEditMode) {
          chooseScrap(data.scrap_id);
        } else {
          history.push(`/resource/${data.id}`);
        }
      }}
      isEditMode={isEditMode}
      isChosen={isChosen}
    >
      <Bookmark />
      <ThumbnailLayout>
        <Thumbnail src={data.thumbnail} />
      </ThumbnailLayout>
      <InfoLayout>
        <Title>{sliceContent(data.title, "title")}</Title>
        <Writer>{sliceContent(data.user.nickname, "writer")}</Writer>
        <Category>{data.category.map((s) => s.slice(0, 2)).join(", ")}</Category>
        <ResourceDetailInfoBlock>
          <Lecture>{sliceContent(data.lecture.name, "lecture")}</Lecture>
          <Delimiter />
          <Professor>{sliceContent(data.lecture.professor, "professor")}</Professor>
        </ResourceDetailInfoBlock>
        {/* {TODO: 엄지 클릭 시 true, false 변경} */}
        <HitsBlock>
          <Thumb isHitted={true} />
          <Amount isHitted={true}>{data.hits}</Amount>
        </HitsBlock>
      </InfoLayout>
    </Layout>
  );
};

const sliceContent = (content, type) => {
  if (content.length > CONTENT_MAX_LENGTH[type]) {
    content = content.slice(0, CONTENT_MAX_LENGTH[type]) + "...";
  }
  return content;
};

const CONTENT_MAX_LENGTH = {
  title: 26,
  writer: 10,
  lecture: 8,
  professor: 8,
};

export default ResourceCard;
