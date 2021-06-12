import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ResourceAPI from "api/resources";
import { FontColor, PlaceholderColor, BorderColor } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import {
  addNextPageResources,
  setLectureResources,
} from "store/modules/lectureDetailModule";

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
const SubLabel = styled.label`
  margin: 4px 8px 71px 0;

  font-size: 14px;
  color: #999999;
`;
//ㅇㅇㅇ
const ResourceSection = styled.section`
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  overflow-x: hidden;
  min-height: 109px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${PlaceholderColor};
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

  cursor: ${({ isPurchased }) => (isPurchased ? "pointer" : "default")};
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

/**
 * TODO:
 * - 강의자료 불러오는 API연동
 * @param {*} param0
 * @returns
 */

const LectureResourceContainer = ({ options, lectureResource = {} }) => {
  const dispatch = useDispatch();

  const resourceWrapperRef = useRef();
  const [widthOffset, setWidthOffset] = React.useState(0);
  const slidingDistance = 700;
  const fileAmountOnRow = 7;

  const { lectureResources, resourcePage, ...orderOption } = useSelector(
    (state) => state.lectureDetailReducer
  );
  const hiddenFiles = lectureResources.result.length - fileAmountOnRow;
  const [isFetched, setIsFetched] = useState(false);

  const fetchLectureResources = async () => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
      console.log(options, lectureResource);

      const { data: resources } = await ResourceAPI.getResources(
        // {
        //   order: "hits",
        //   page: resourcePage + 1,
        // },
        {
          department: orderOption.department,
          order: "hits",
          keyword: orderOption.name,
          page: resourcePage + 1,
        },
        accessToken
      );
      console.log("resources=>", resources);
      dispatch(addNextPageResources(resources));
    } catch (error) {
      console.dir(error);
      if (error.response.data.code === 30) {
        history.push("/lectures");
      }
      throw new Error(error);
    } finally {
      setIsFetched(true);
    }
  };

  /**
   * A function to set width offset.
   * If offset change, useEffect triggered.
   * @param {string} dir A string to use to know direction.
   */
  const move = (dir) => {
    if (dir === "right") setWidthOffset(widthOffset - 1);
    else setWidthOffset(widthOffset + 1);
  };

  useEffect(() => {
    fetchLectureResources();
    resourceWrapperRef.current.style.transform = `translateX(${
      widthOffset * slidingDistance
    }px)`;
  }, [widthOffset]);

  console.log("[resources] => " + lectureResources);
  return (
    <Section>
      <InfoLabel>강의자료 추천</InfoLabel>
      <ResourceSection>
        {lectureResources.result.length === 0 && (
          <SubWarningLabel>등록된 강의자료 추천 정보가 없습니다.</SubWarningLabel>
        )}
        {lectureResources.result && (
          <Wrapper>
            <ResourceWrapper ref={resourceWrapperRef} fileAmountOnRow={fileAmountOnRow}>
              {lectureResources.result.map(({ id, title, thumbnail, isPurchased }) => (
                <Resource>
                  <ResourceBox isPurchased={isPurchased}>
                    <Thumbnail thumbnail={thumbnail} />
                  </ResourceBox>
                  <ResourceTitle isPurchased={isPurchased}>
                    {sliceString(title, 7)}
                  </ResourceTitle>
                </Resource>
              ))}
            </ResourceWrapper>
          </Wrapper>
        )}

        {widthOffset !== 0 && <MoveLeftButtonComponent move={move} />}
        {widthOffset !== -hiddenFiles && hiddenFiles > 0 && (
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
