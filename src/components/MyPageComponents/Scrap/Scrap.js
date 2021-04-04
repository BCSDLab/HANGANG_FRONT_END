import React, { useState } from "react";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";

const ScrapWrapper = styled.div`
  position: relative;
  display: flex;
  width: 555px;
  height: 133px;
  padding: 24px 0px 16px 28px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
  background-color: ${({ isChosen }) => (isChosen ? `${BorderColor}` : "#fff")};
`;

const LeftSide = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 447px;
  flex-direction: column;
`;

const RightSide = styled.div`
  position: relative;
  width: calc(555px - 447px);
  right: 28px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

const Amount = styled.span`
  font-size: 13px;
  color: ${PlaceholderColor};
  margin-left: 4px;
`;

const Professor = styled(Title)`
  font-weight: normal;
  margin-top: 16px;
`;

const HashTagWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;

  margin-top: 16px;
`;

const HashTag = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-right: 7px;
`;

const Classification = styled.span`
  position: absolute;
  right: 0;
  font-size: 14px;
  color: ${ConceptColor};
`;

const Rating = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 22px;
  color: ${FontColor};
`;

const Bookmark = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/bookmark.png",
  alt: "북마크",
})`
  position: absolute;
  top: -8px;
  left: 0;
  width: 32px;
`;

const Scrap = ({ isChosen, setIsChosen, ...rest }) => {
  console.log(rest);
  return (
    <ScrapWrapper onClick={() => setIsChosen((prev) => !prev)} isChosen={isChosen}>
      <Bookmark />
      <LeftSide>
        <Title>
          문명과 역사<Amount>(0)</Amount>
        </Title>
        <Professor>김유진</Professor>
        <HashTagWrapper>
          {["배운거많음", "진심수면제", "교수님좋음"].map((elem, index) => (
            <HashTag key={index}>{`# ${elem} `} </HashTag>
          ))}
        </HashTagWrapper>
      </LeftSide>
      <RightSide>
        <Classification>교양필수</Classification>
        <Rating>3.5</Rating>
      </RightSide>
    </ScrapWrapper>
  );
};

export default Scrap;
