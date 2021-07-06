import {
  Content,
  Label,
  MajorCard,
  MajorLabel,
} from "components/IndexComponents/MajorLinkList/MajorLinkList.style";

import MajorInfoArray from "static/IndexPage/majorInfoArray";
import React from "react";
import { setDepartmentOnLectures } from "store/modules/lecturesModule";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

/**
 * MajorSearchContainer
 * 학부별 탐색 란에 해당하며,
 * 클릭 시 담긴 value 값과 함께 lectures로 이동합니다.
 */
const MajorSearchContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Label>학부별 탐색</Label>
      <Content>
        {MajorInfoArray.map(({ src, label, value }) => (
          <MajorCard
            key={label}
            onClick={() => {
              dispatch(
                setDepartmentOnLectures({ department: value, allowDuplicate: true })
              );
              history.push("/lectures");
            }}
            img={src}
          >
            <MajorLabel>{label}</MajorLabel>
          </MajorCard>
        ))}
      </Content>
    </>
  );
};

export default MajorSearchContainer;
