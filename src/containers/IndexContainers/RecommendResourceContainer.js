import React, { useState } from "react";
import styled from "styled-components";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";

const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 183px;
  border: 1px solid ${({ isData }) => (isData ? "transparent" : `${BorderColor}`)};
  border-radius: 8px;
  margin-top: 16px;
`;

const LeftSide = styled.div`
  width: 465px;
  margin-right: 16px;
`;

const LeftTopSide = styled.div`
  display: flex;
  height: 80px;
  margin-bottom: 16px;
`;

const LeftBottomSide = styled.div`
  display: flex;
  height: 87px;
`;

const RightSide = styled.div``;

const widthConverter = (index) => {
  switch (index) {
    case 0:
    case 3:
      return "273px";
    case 1:
    case 2:
      return "176px";
    case 4:
      return "174px";
    default:
      return;
  }
};

const heightConverter = (index) => {
  switch (index) {
    case 0:
    case 1:
      return "80px";
    case 2:
    case 3:
      return "87px";
    case 4:
      return "183px";
    default:
      return;
  }
};

const ThumbnailWrapper = styled.div`
  position: relative;

  width: ${({ index }) => widthConverter(index)};
  height: ${({ index }) => heightConverter(index)};
  margin-right: ${({ index }) => (index === 0 || index === 2 ? "16px" : "0px")};
  border-radius: 8px;

  //background
  background-color: rgba(153, 153, 153, 0.7);
  background-image: url(${({ thumbnailURL }) => thumbnailURL});
  background-blend-mode: saturation;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.span`
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: ${({ index }) => (index === 1 || index === 2 ? "94px" : "111px")};
  padding: 1px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 500;

  color: #fff;
`;

const LectureNameAndAuthor = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 500;
  color: #fff;
`;

const NoResource = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const RecommendResourceContainer = () => {
  const sampleRecommenResources = [
    {
      title: "이것만 알면 디자인사는 A+",
      lectureName: "디자인사",
      author: "김태균",
      thumbnail:
        "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/sample_thumbnail.png",
    },
    {
      title: "디자인 특허 족보팔아요",
      lectureName: "디자인특허",
      author: "김효광",
      thumbnail:
        "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/sample_thumbnail.png",
    },
    {
      title: "디자인 특허 족보팔아요",
      lectureName: "디자인특허",
      author: "김효광",
      thumbnail:
        "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/sample_thumbnail.png",
    },
    {
      title: "CF 과제 레퍼런스 입니다.",
      lectureName: "CMF",
      author: "카페스트라니 파울로",
      thumbnail:
        "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/sample_thumbnail.png",
    },
    {
      title: "CF 과제 레퍼런스 입니다.",
      lectureName: "CMF",
      author: "카페스트라니 파울로",
      thumbnail:
        "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/sample_thumbnail.png",
    },
  ];

  // API 연결 후 아래 주석 해제
  // eslint-disable-next-line no-unused-vars
  const [recommendResources, setRecommendResources] = useState(sampleRecommenResources);

  // useEffect(() => {
  //   // API call
  //   setTimetableLectures(~~~)
  // }, [])

  const Thumbnail = ({ index }) => (
    <ThumbnailWrapper index={index} thumbnailURL={recommendResources[index].thumbnail}>
      <Title index={index}>{recommendResources[index].title}</Title>
      <LectureNameAndAuthor>
        {recommendResources[index].lectureName} / {recommendResources[index].author}
      </LectureNameAndAuthor>
    </ThumbnailWrapper>
  );

  return (
    <>
      <Label>추천 강의자료</Label>
      <Content isData={recommendResources.length !== 0}>
        {recommendResources.length === 0 && (
          <NoResource>
            시간표를 작성하지 않았거나 업로드된 강의자료가 없습니다.
          </NoResource>
        )}
        {recommendResources.length !== 0 && (
          <>
            <LeftSide>
              <LeftTopSide>
                <Thumbnail index={0} />
                <Thumbnail index={1} />
              </LeftTopSide>
              <LeftBottomSide>
                <Thumbnail index={2} />
                <Thumbnail index={3} />
              </LeftBottomSide>
            </LeftSide>
            <RightSide>
              <Thumbnail index={4} />
            </RightSide>
          </>
        )}
      </Content>
    </>
  );
};

export default RecommendResourceContainer;
