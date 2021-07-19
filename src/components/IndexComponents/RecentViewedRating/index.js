import {
  Content,
  Label,
  Lecture,
  Name,
  NoViewedLectureMaterial,
  Professor,
  Rating,
} from "./RecentlyViewedRating.style";

import React from "react";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { useHistory } from "react-router-dom";

/**
 * RecentlyViewedLectureContainer
 * 최근 본 강의 컨테이너입니다.
 * lectureMaterials의 크기에 따라 없으면 안내 문구, 있으면 최근 본 강의를 보여줍니다.
 */
const RecentlyViewedLectureContainer = () => {
  const history = useHistory();
  const recentlyViewedLectures = getValueOnLocalStorage("recentlyViewedLectures");

  return (
    <>
      <Label>최근 본 강의</Label>
      <Content>
        {(recentlyViewedLectures === null || recentlyViewedLectures.length === 0) && (
          <NoViewedLectureMaterial>최근에 본 강의평이 없습니다.</NoViewedLectureMaterial>
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
