import React, { useRef } from "react";
import MaterialIcon from "static/MyPage/MateriaIcon";
import {
  BorderColor,
  FontColor,
  MyPageSectionHeight,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
`;

const SectionWrapper = styled.div`
  min-height: ${MyPageSectionHeight};
  padding-top: 48px;

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
`;

const MaterialName = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: ${FontColor};
`;

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

const Purchased = ({ label, className, professor, materialArr }) => {
  const rowRef = useRef();

  const move = (direction) => {
    // console.log(rowRef.current.offsetWidth);
    let slidingDistance = "300px";
    if (direction === "right") {
      slidingDistance = `-${slidingDistance}`;
    }

    rowRef.current.style.transform = `translateX(${slidingDistance})`;
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <SubLabel>
        {className}
        <MiddleLine />
        {professor}
      </SubLabel>
      <MaterialRow ref={rowRef}>
        {materialArr.map(({ type, name }, index) => (
          <Material type={type} name={name} key={index} />
        ))}
      </MaterialRow>
      <LeftIcon onClick={() => move("left")} />
      <RightIcon onClick={() => move("right")} />
    </Wrapper>
  );
};

const PurchasedSection = () => {
  let label = "디자인논리논술 필기본인데 참고하세요.";
  let className = "디자인논리 및 경영";
  let professor = "카페스트라니 파올로";
  let materialArr = [
    {
      type: "doc",
      name: "박종호",
    },
    {
      type: "pdf",
      name: "박종호",
    },
    {
      type: "xls",
      name: "박종호박종호박종호박종호박종호박종호박종호",
    },
    {
      type: "ppt",
      name: "박종호",
    },
    {
      type: "xls",
      name: "박종호",
    },
    {
      type: "doc",
      name: "박종호",
    },
    {
      type: "pdf",
      name: "박종호",
    },
    {
      type: "xls",
      name: "박종호박종호박종호박종호박종호박종호박종호",
    },
    {
      type: "ppt",
      name: "박종호",
    },
    {
      type: "doc",
      name: "박종호",
    },
    {
      type: "pdf",
      name: "박종호",
    },
    {
      type: "xls",
      name: "박종호박종호박종호박종호박종호박종호박종호",
    },
    {
      type: "ppt",
      name: "박종호",
    },
    {
      type: "hwp",
      name: "박종호",
    },
    {
      type: "ppt",
      name: "박종호",
    },
    {
      type: "png",
      name: "박종호",
    },
    {
      type: "xls",
      name: "박종호",
    },
  ];

  return (
    <SectionWrapper>
      <Purchased
        label={label}
        className={className}
        professor={professor}
        materialArr={materialArr}
      />
      <Purchased
        label={label}
        className={className}
        professor={professor}
        materialArr={materialArr}
      />
    </SectionWrapper>
  );
};

export default PurchasedSection;
