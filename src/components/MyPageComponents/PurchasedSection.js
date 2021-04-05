import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MaterialIcon from "static/MyPage/MateriaIcon";
import {
  BorderColor,
  FontColor,
  MyPageSectionHeight,
  PlaceholderColor,
} from "static/Shared/commonStyles";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
`;

const SectionWrapper = styled.div`
  height: calc(${MyPageSectionHeight} - 48px);
  min-height: calc(${MyPageSectionHeight} - 48px);
  padding-top: 48px;
  margin-bottom: 48px;
  overflow-y: scroll;

  // hide overflow scrollbar
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // FireFox
  //Chrome
  ::-webkit-scrollbar {
    display: none;
  }

  ${Wrapper}:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const Label = styled.label`
  margin-bottom: 13px;
  color: ${FontColor};
  font-size: 14px;
  font-weight: 500;
`;

const SubLabel = styled(Label)`
  margin-bottom: 17px;
  color: ${PlaceholderColor};
  font-size: 12px;
  font-weight: normal;
`;

const MiddleLine = styled.div`
  display: inline-block;
  width: 1px;
  height: 8px;
  margin: 0px 8px;
  background-color: ${PlaceholderColor};
`;

const MaterialWrapper = styled.div`
  position: relative;
  min-width: 123px;
  height: 64px;
  padding: 7px 4px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};
`;

const MaterialRow = styled.div`
  display: flex;

  transition: transform 0.3s ease;

  ${MaterialWrapper}:not(:last-child) {
    margin-right: 12px;
  }
`;

const RightIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/bold_right.png",
  alt: "right button",
})`
  position: absolute;
  top: calc(50% + 20px);
  right: 0;
  width: 18px;
  cursor: pointer;
`;

const LeftIcon = styled(RightIcon)`
  left: 0;
  transform: rotate(180deg);
`;

const MaterialName = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: ${FontColor};
`;

/**
 * type, name을 parameter로 받습니다.
 * type에 따라 확장자 아이콘을 보여줍니다.
 * name은 7글자가 넘어갈 경우 말줄임표로 보여줍니다.
 */
const Material = ({ type, name }) => {
  const nameSlicer = (name) => {
    let convertedName = name;
    if (name.length > 7) {
      convertedName = name.slice(0, 7) + "..";
    }
    return convertedName;
  };

  return (
    <MaterialWrapper>
      {MaterialIcon[type]}
      <MaterialName>
        {nameSlicer(name)}.{type}
      </MaterialName>
    </MaterialWrapper>
  );
};

const Purchased = ({ label, lecture, uploadFiles }) => {
  const slidingDistance = 400;
  const materialRef = useRef();
  const [current, setCurrent] = useState(0);
  const [coverage, setCoverage] = useState(0);

  /**
   * 마운트 되면서 자료들의 총 길이를 이동해야 할 거리로 나눕니다.
   * coverage는 섹션이라고 생각하면 될 것 같습니다.
   * 처음, 그리고 끝 섹션에서 커서를 없애기 위해 두었습니다.
   */
  useEffect(() => {
    setCoverage(Math.ceil(materialRef.current.offsetWidth / slidingDistance));
  }, []);

  /**
   * current가 변화할 때마다 X축으로 이동시킵니다.
   */
  useEffect(() => {
    materialRef.current.style.transform = `translateX(${current * slidingDistance}px)`;
  }, [current]);

  /**
   * right일 경우 current에 -1, left는 +1을 해줍니다.
   * @param {string} direction
   */
  const move = (direction) => {
    if (direction === "right") {
      setCurrent((prev) => prev - 1);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <SubLabel>
        {lecture.name}
        <MiddleLine />
        {lecture.professor}
      </SubLabel>
      <MaterialRow ref={materialRef}>
        {uploadFiles.map(({ id, ext, fileName }) => (
          <Material type={ext} name={fileName} key={id} />
        ))}
      </MaterialRow>
      {current !== 0 && <LeftIcon onClick={() => move("left")} />}
      {current !== 0 && current !== -coverage && (
        <RightIcon onClick={() => move("right")} />
      )}
    </Wrapper>
  );
};

const PurchasedSection = ({ purchased }) => {
  return (
    <SectionWrapper>
      {purchased.map(({ id, title, lecture, uploadFiles }) => (
        <Purchased key={id} label={title} lecture={lecture} uploadFiles={uploadFiles} />
      ))}
    </SectionWrapper>
  );
};

PurchasedSection.propTypes = {
  purchased: PropTypes.arrayOf(PropTypes.object),
};

export default PurchasedSection;
