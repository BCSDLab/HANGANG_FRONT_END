import React, { useState } from "react";
import styled from "styled-components";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";

const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 276px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  margin-top: 16px;
  padding: 12px 20px;
`;

const Lecture = styled.div`
  position: relative;
  width: 100%;
  height: 39px;
  margin: 12px 0px;
`;

const Name = styled.span`
  position: absolute;
  top: 2px;
  left: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

const Professor = styled.span`
  position: absolute;
  bottom: 2px;
  left: 0;
  font-size: 12px;
  color: #828282;
`;

const Rating = styled.span`
  position: absolute;
  top: calc(50% - 9px);
  right: 0;
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
`;

const NoViewedLectureMaterial = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

/**
 * RecentlyViewedLectureContainer
 * 최근 본 강의 컨테이너입니다.
 * lectureMaterials의 크기에 따라 없으면 안내 문구, 있으면 최근 본 강의를 보여줍니다.
 * 추후에 API 연결이 필요합니다.
 */
const RecentlyViewedLectureContainer = () => {
  const sampleLectureMaterials = [
    { name: "사랑의 역사", professor: "김사랑", total_rating: "1.2" },
    { name: "하트의 역사", professor: "박사랑", total_rating: "3.2" },
    { name: "사랑의 히스토리", professor: "김하트", total_rating: "2.2" },
    { name: "사랑역사", professor: "최사랑", total_rating: "0.8" },
  ];
  // API 연결 후 아래 주석 해제, sampleLectureMaterials 삭제
  // eslint-disable-next-line no-unused-vars
  const [lectureMaterials, setLectureMaterials] = useState(sampleLectureMaterials);

  // useEffect(() => {
  //   // API call
  //   setLectureMaterials(~~~)
  // }, [])

  return (
    <>
      <Label>최근 본 강의</Label>
      <Content>
        {lectureMaterials.length === 0 && (
          <NoViewedLectureMaterial>최근에 본 강의평이 없습니다.</NoViewedLectureMaterial>
        )}
        {lectureMaterials.length !== 0 &&
          lectureMaterials.map(({ name, professor, total_rating }, index) => (
            <Lecture key={index}>
              <Name>{name}</Name>
              <Professor>{professor}</Professor>
              <Rating>{total_rating}</Rating>
            </Lecture>
          ))}
      </Content>
    </>
  );
};

export default RecentlyViewedLectureContainer;
