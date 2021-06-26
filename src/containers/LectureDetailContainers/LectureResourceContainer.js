import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { FontColor, PlaceholderColor, BorderColor } from "static/Shared/commonStyles";

const Section = styled.section`
  width: 100%;
  height: 120px;
  margin-bottom: 32px;
`;

const InfoLabel = styled.label`
  display: block;

  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

const SubWarningLabel = styled.p`
  margin-top: 50px;
  text-align: center;
  font-size: 12px;
  line-height: normal;
  letter-spacing: normal;
  color: ${PlaceholderColor};
`;

const ResourceSection = styled.section`
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  overflow-x: hidden;
  min-height: 109px;
`;

const ResourceWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  transition: transform 0.3s ease;

  > div:not(:last-child) {
    margin-right: 8px;
  }
`;

const RightImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/ResourceDetailPage/move_right.png",
  alt: "right",
})`
  width: 20px;
`;

const LeftImg = styled(RightImg)`
  transform: rotate(180deg);
`;

const MoveRightButton = styled.div`
  position: absolute;

  top: calc(50% + -35px);
  right: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border: solid 1px #eeeeee;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
const MoveLeftButton = styled(MoveRightButton)`
  left: 0;
`;

const ResourceBox = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};

  cursor: pointer;
`;

const Thumbnail = styled.img.attrs(({ thumbnail }) => ({
  src: thumbnail,
  alt: "thumbnail",
}))`
  position: absolute;
  top: calc(50% - 14px);
  left: calc(50% - 14px);
  width: 28px;
`;

const ResourceTitle = styled.p`
  margin-top: 4px;
  text-align: left;

  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;

  color: ${FontColor};
`;

const Resource = styled.div``;

const MoveLeftButtonComponent = ({ move }) => (
  <MoveLeftButton onClick={() => move("left")}>
    <LeftImg />
  </MoveLeftButton>
);

const MoveRightButtonComponent = ({ move }) => (
  <MoveRightButton onClick={() => move("right")}>
    <RightImg />
  </MoveRightButton>
);

const LectureResourceContainer = ({ lectureResource = {} }) => {
  const SLIDING_DISTANCE = 90;
  const FILE_AMOUNT_ON_ROW = 7;

  const history = useHistory();
  const resourceWrapperRef = useRef();
  const [widthOffset, setWidthOffset] = React.useState(0);
  const hiddenFiles = lectureResource.count - FILE_AMOUNT_ON_ROW;
  /**
   * A function to set width offset.
   * If offset change, useEffect triggered.
   * @param {string} dir A string to use to know direction.
   */
  const move = (dir) => {
    if (dir === "right") setWidthOffset(widthOffset - FILE_AMOUNT_ON_ROW);
    else setWidthOffset(widthOffset + FILE_AMOUNT_ON_ROW);
  };

  useEffect(() => {
    resourceWrapperRef.current.style.transform = `translateX(${
      widthOffset * SLIDING_DISTANCE
    }px)`;
  }, [widthOffset]);

  return (
    <Section>
      <InfoLabel>강의자료 추천</InfoLabel>
      <ResourceSection>
        {lectureResource.count === 0 && (
          <SubWarningLabel>등록된 강의자료 추천 정보가 없습니다.</SubWarningLabel>
        )}

        {lectureResource.result && (
          <Wrapper>
            <ResourceWrapper
              ref={resourceWrapperRef}
              FILE_AMOUNT_ON_ROW={FILE_AMOUNT_ON_ROW}
            >
              {lectureResource.result.map(({ id, title, thumbnail, isPurchased }) => (
                <Resource
                  key={id}
                  onClick={() => {
                    history.push("/resource/" + id);
                  }}
                >
                  <ResourceBox>
                    <Thumbnail thumbnail={thumbnail} />
                  </ResourceBox>
                  <ResourceTitle>{sliceString(title, 7)}</ResourceTitle>
                </Resource>
              ))}
            </ResourceWrapper>
          </Wrapper>
        )}

        {widthOffset !== 0 && <MoveLeftButtonComponent move={move} />}
        {widthOffset >= -hiddenFiles && hiddenFiles > 0 && (
          <MoveRightButtonComponent move={move} />
        )}
      </ResourceSection>
    </Section>
  );
};

const sliceString = (string, max) => {
  if (string.length > max) {
    string = string.slice(0, max) + "・・・";
  }
  return string;
};

export default LectureResourceContainer;
