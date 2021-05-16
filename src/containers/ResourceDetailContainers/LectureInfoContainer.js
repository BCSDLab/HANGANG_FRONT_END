import React from "react";
import { MorePath } from "static/ResourceDetailPage.js/imgPath";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";

const Delimiter = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0;
  background-color: ${BorderColor};
`;

const Title = styled.div`
  margin-bottom: 12px;
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
  alt: "",
})`
  position: absolute;
  top: 27px;
  right: 27px;
  width: 24px;
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

  background-color: ${ConceptColor};
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

const LectureInfoContainer = () => {
  return (
    <>
      <Title>디논 레전드 필기 풉니다.</Title>
      <Writer>무야호</Writer>
      <CreatedAt>작성일 2020-11-03</CreatedAt>
      <More />
      <Delimiter />
      <ResourceInfoSection>
        <Thumbnail
          thumbnailURL={
            "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/sample_thumbnail.png"
          }
        />
        <InfoWrapper>
          <TopPart>
            <ResourceTitle>문명과 역사</ResourceTitle>
            <ResourceCode>AEB1234</ResourceCode>
            <ResourceType>필기자료</ResourceType>
          </TopPart>
          <Professor>김유진</Professor>
          <Semester>개설학기 2020-1, 2019-2, 2019-1</Semester>
          <Content>
            문명과 역사 필기본인데 한글파일입니다. 개인적인 공유는 자제해주시기 바랍니다.
          </Content>
          <PurchaseButton />
        </InfoWrapper>
      </ResourceInfoSection>
    </>
  );
};

export default LectureInfoContainer;
