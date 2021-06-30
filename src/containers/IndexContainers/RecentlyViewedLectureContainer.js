import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import {
  Label,
  Content,
  Lecture,
  Name,
  Professor,
  Rating,
  NoViewedLectureMaterial,
} from "./styles/RecentlyViewedLecutrecontainer.style";

/**
 * RecentlyViewedLectureContainer
 * 최근 본 강의 컨테이너입니다.
 * lectureMaterials의 크기에 따라 없으면 안내 문구, 있으면 최근 본 강의를 보여줍니다.
 * 추후에 API 연결이 필요합니다.
 */
const RecentlyViewedLectureContainer = () => {
  const history = useHistory();
  const recentlyViewedLectures = getValueOnLocalStorage("recentlyViewedLectures");

  return (
    <>
      <Label>최근 본 강의</Label>
      <Content>
        {(recentlyViewedLectures === null || recentlyViewedLectures.length === 0) && (
          <NoViewedLectureMaterial>
            <span>최근에 본 강의평이 없습니다.</span>
          </NoViewedLectureMaterial>
        )}
        {recentlyViewedLectures !== null &&
          recentlyViewedLectures.length !== 0 &&
          recentlyViewedLectures.map(({ id, name, professor, total_rating }) => (
            <Lecture key={id} onClick={() => history.push(`/lecture/${id}`)}>
              <Name>{name}</Name>
              <Professor>{professor}</Professor>
              <Rating>{total_rating.toFixed(1)}</Rating>
            </Lecture>
          ))}
      </Content>
    </>
  );
};

export default RecentlyViewedLectureContainer;
