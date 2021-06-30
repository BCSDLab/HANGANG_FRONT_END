import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import {
  Section,
  Wrapper,
  InfoLabel,
  SubWarningLabel,
  ResourceSection,
  ResourceWrapper,
  RightImg,
  LeftImg,
  MoveRightButton,
  MoveLeftButton,
  ResourceBox,
  Resource,
  Thumbnail,
  ResourceTitle,
} from "containers/LectureDetailContainers/styles/LectureResourceContainer.style";

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
              {lectureResource.result.map(({ id, title, thumbnail }) => (
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
