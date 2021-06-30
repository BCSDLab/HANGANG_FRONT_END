import React from "react";
import { useDispatch } from "react-redux";

import {
  Label,
  Content,
  MajorCard,
  MajorLabel,
} from "containers/IndexContainers/styles/MajorSearchContainer.style";
import MajorInfoArray from "static/IndexPage/majorInfoArray";
import { setDepartmentOnLectures } from "store/modules/lecturesModule";

/**
 * MajorSearchContainer
 * 학부별 탐색 란에 해당하며,
 * 클릭 시 담긴 value 값과 함께 lectures로 이동합니다.
 */
const MajorSearchContainer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Label>학부별 탐색</Label>
      <Content>
        {MajorInfoArray.map(({ src, label, value }) => (
          <MajorCard
            to="/lectures"
            key={label}
            imagesrc={src}
            onClick={() => dispatch(setDepartmentOnLectures({ department: value }))}
          >
            <MajorLabel>{label}</MajorLabel>
          </MajorCard>
        ))}
      </Content>
    </>
  );
};

export default MajorSearchContainer;
