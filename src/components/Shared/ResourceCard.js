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
        {/* {TODO: 키 값 수정되면 writer, lecture, professor 변경} */}
        <Title>{sliceContent(data.title, "title")}</Title>
        <Writer>{sliceContent("닉네임은130까지가요요요요...", "writer")}</Writer>
        <Category>필기</Category>
        <ResourceDetailInfoBlock>
          <Lecture>{sliceContent("디자인논리 및 실습인지뭔지", "lecture")}</Lecture>
          <Delimiter />
          <Professor>{sliceContent("디자인논리 및 실습인지뭔지", "professor")}</Professor>
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
