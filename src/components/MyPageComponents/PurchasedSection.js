import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import NoData from "components/MyPageComponents/NoData";
import {
  Wrapper,
  SectionWrapper,
  Label,
  SubLabel,
  MiddleLine,
  MaterialWrapper,
  MaterialRow,
  MaterialName,
  RightIcon,
  LeftIcon,
} from "components/MyPageComponents/styles/PurchasedSection.style";
import MaterialIcon from "static/MyPage/MateriaIcon";
import { convertHTMLEntities } from "utils/convertHTMLEntities";
import { PURCHASED } from "static/MyPage/MYPAGE_CURRENT_STATE";

const PurchasedSection = () => {
  const { purchasedResource } = useSelector((state) => state.myPageReducer);

  return (
    <SectionWrapper>
      {purchasedResource.length === 0 && <NoData type={PURCHASED} />}
      {purchasedResource.length !== 0 &&
        purchasedResource.map(({ id, title, lecture, uploadFiles }) => (
          <Purchased
            key={id}
            id={id}
            label={title}
            lecture={lecture}
            uploadFiles={uploadFiles}
          />
        ))}
    </SectionWrapper>
  );
};

const Purchased = ({ id, label, lecture, uploadFiles }) => {
  const history = useHistory();
  const SLIDING_DISTANCE = 400;
  const MAX_ROW_WIDTH = 1135;
  const maxRowCoverage = Math.floor(MAX_ROW_WIDTH / SLIDING_DISTANCE);
  const materialRef = useRef();
  const [current, setCurrent] = useState(0);
  const [coverage, setCoverage] = useState(0);

  useEffect(() => {
    setCoverage(Math.floor(materialRef.current.offsetWidth / SLIDING_DISTANCE));
  }, []);

  useEffect(() => {
    materialRef.current.style.transform = `translateX(${current * SLIDING_DISTANCE}px)`;
  }, [current]);

  /**
   * right일 경우 current에 -1, left는 +1을 해줍니다.
   * @param {string} direction
   */
  const move = (e, direction) => {
    e.stopPropagation();
    if (direction === "right") {
      setCurrent((prev) => prev - 1);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };
  return (
    <Wrapper onClick={() => history.push(`/resource/${id}`)}>
      <Label>{convertHTMLEntities(label)}</Label>
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
      {current !== 0 && <LeftIcon onClick={(e) => move(e, "left")} />}
      {coverage > maxRowCoverage && current !== maxRowCoverage - coverage && (
        <RightIcon onClick={(e) => move(e, "right")} />
      )}
    </Wrapper>
  );
};

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
      {MaterialIcon[type.toLowerCase()]}
      <MaterialName>
        {nameSlicer(name)}.{type}
      </MaterialName>
    </MaterialWrapper>
  );
};

export default PurchasedSection;
