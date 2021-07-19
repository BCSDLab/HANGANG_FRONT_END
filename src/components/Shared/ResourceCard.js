import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import ResourceAPI from "api/resources";
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
import { changeResourceIsHitStatus } from "store/modules/myPageModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const ResourceCard = ({ data, isEditMode, chooseScrap, isChosen }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
        <HitsBlock onClick={(e) => onClickHitIcon(e, data.id, dispatch)}>
          <Thumb isHitted={data.is_hit} />
          <Amount isHitted={data.is_hit}>{data.hits}</Amount>
        </HitsBlock>
      </InfoLayout>
    </Layout>
  );
};

const onClickHitIcon = async (e, id, dispatch) => {
  e.stopPropagation();
  try {
    const { data } = await ResourceAPI.requestHit(id);
    if (data.httpStatus === "OK") {
      dispatch(changeResourceIsHitStatus({ id }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
  }
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
