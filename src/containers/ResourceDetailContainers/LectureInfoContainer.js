import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MorePath, notPushedThumb, pushedThumb } from "static/ResourceDetailPage/imgPath";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

const Delimiter = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0;
  background-color: ${BorderColor};
`;

const Title = styled.div`
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
`;

const Writer = styled.div`
  font-size: 16px;
  color: ${PlaceholderColor};
  margin-bottom: 17px;
`;

const CreatedAt = styled(Writer)`
  font-size: 14px;
  margin-bottom: 22px;
`;

const More = styled.img.attrs({
  src: MorePath,
  alt: "more",
})`
  position: absolute;
  top: 27px;
  right: 27px;
  width: 24px;
`;

const HitWrapper = styled.div`
  position: absolute;
  top: 83px;
  right: 27px;

  display: flex;
  align-items: center;
  height: 24px;
  display: flex;
`;

const HitIcon = styled.img.attrs(({ isHit }) => ({
  src: isHit ? pushedThumb : notPushedThumb,
  alt: "hit",
}))`
  margin-top: 2px;
  width: 24px;
`;

const HitAmount = styled.span`
  margin: 8px 0 0 6px;
  font-size: 16px;
  color: ${PlaceholderColor};
`;

const ResourceInfoSection = styled.section`
  width: 100%;
  height: 337px;
  display: flex;
  justify-content: space-between;
`;

const Thumbnail = styled.div`
  width: 337px;
  height: 100%;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  //background
  background-image: url(${({ thumbnailURL }) => thumbnailURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(34, 34, 34, 0.1);
  background-blend-mode: saturation;
`;

const InfoWrapper = styled.div`
  position: relative;
  width: 343px;
  height: 100%;
`;

const ResourceTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
  margin-right: 16px;
`;

const ResourceCode = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
`;

const ResourceType = styled(ResourceCode)`
  position: absolute;
  right: 0;
  color: ${ConceptColor};
`;

const TopPart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 21px;
  margin: 3px 0 16px 0;
`;

const Professor = styled.div`
  margin-bottom: 17px;
  font-size: 16px;
  color: ${FontColor};
`;

const Semester = styled.div`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-bottom: 26px;
`;

const Content = styled.div`
  width: 223px;
  font-size: 14px;
  color: ${FontColor};
  line-height: 1.5em;
`;

const PurchaseButton = styled.input.attrs({
  type: "button",
  value: "구입하기(-100P)",
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;

  border-radius: 24px;
  border: none;

  background-color: ${({ isPurchased }) => (isPurchased ? "#bddcff" : `${ConceptColor}`)};
  font-size: 14px;
  font-weight: 500;
  color: #fff;

  cursor: ${({ isPurchased }) => (isPurchased ? "default" : "pointer")};
`;

const convertCreatedAt = (createdAt) => {
  let createdInfo = createdAt.split("T")[0].split("-");
  return `작성일 ${createdInfo[0]}-${createdInfo[1]}-${createdInfo[2]}`;
};

const convertLectureInfoSemester = (semester) => {
  let dateData = semester.split("년 ");
  return `개설학기 ${dateData[0]}-${dateData[1]}`;
};

const LectureInfoContainer = ({ isPurchased, lectureInfo }) => {
  console.log(lectureInfo);
  return (
    <>
      <Title>{lectureInfo.title}</Title>
      <Writer>{lectureInfo.user.nickname}</Writer>
      <CreatedAt>{convertCreatedAt(lectureInfo.created_at)}</CreatedAt>
      <More />
      <HitWrapper>
        <HitIcon isHit={lectureInfo.is_hit} />
        <HitAmount>{lectureInfo.hits}</HitAmount>
      </HitWrapper>
      <Delimiter />
      <ResourceInfoSection>
        <Thumbnail thumbnailURL={lectureInfo.thumbnail} />
        <InfoWrapper>
          <TopPart>
            <ResourceTitle>{lectureInfo.lecture.name}</ResourceTitle>
            <ResourceCode>{lectureInfo.lecture.code}</ResourceCode>
            <ResourceType>{lectureInfo.category[0]}</ResourceType>
          </TopPart>
          <Professor>{lectureInfo.lecture.professor}</Professor>
          <Semester>{convertLectureInfoSemester(lectureInfo.semester_date)}</Semester>
          <Content>{lectureInfo.content}</Content>
          <PurchaseButton isPurchased={isPurchased} />
        </InfoWrapper>
      </ResourceInfoSection>
    </>
  );
};

LectureInfoContainer.defaultProps = {
  isPurchased: false,
  lectureInfo: {},
};

LectureInfoContainer.propTypes = {
  isPurchased: PropTypes.bool,
  lectureInfo: PropTypes.object,
};

export default LectureInfoContainer;
