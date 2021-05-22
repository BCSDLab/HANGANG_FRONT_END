import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { FontColor } from "static/Shared/commonStyles";
import MajorInfoArray from "static/IndexPage/majorInfoArray";

import { setDepartmentOnLectures } from "store/modules/lecturesModule";

const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

const MajorCard = styled(Link)`
  all: unset;
  position: relative;
  width: 100px;
  height: 87px;
  background-image: url(${({ imagesrc }) => imagesrc});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const MajorLabel = styled.label`
  position: absolute;
  left: calc(50% - 34px);
  bottom: 5px;
  width: 68px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  color: #fff;
  text-align: center;
`;

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
        {MajorInfoArray.map(({ src, label, value }) => {
          return (
            <MajorCard
              to="/lectures"
              key={label}
              imagesrc={src}
              onClick={() => dispatch(setDepartmentOnLectures({ department: value }))}
            >
              <MajorLabel>{label}</MajorLabel>
            </MajorCard>
          );
        })}
      </Content>
    </>
  );
};

export default MajorSearchContainer;
