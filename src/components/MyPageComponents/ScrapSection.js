import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import MypageAPI from "api/mypage";
import { FontColor, MyPageSectionHeight } from "static/Shared/commonStyles";

import LectureCard from "../Shared/LectureCard";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const ScrapSectionWrapper = styled.div`
  height: calc(${MyPageSectionHeight} - 48px);
  min-height: calc(${MyPageSectionHeight} - 48px);
  padding-top: 26px;
  margin-bottom: 48px;
  overflow-y: scroll;

  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // FireFox

  //Chrome
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ActionRow = styled.div`
  position: relative;
`;

const ActionLabel = styled.label`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${FontColor};
  cursor: pointer;
`;

const AllChoose = styled(ActionLabel)`
  top: -4px;
  left: 0;
  width: fit-content;
  text-align: center;
`;

const CheckImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/check_mypage.png",
  alt: "체크 이미지",
})`
  width: 18px;
  margin-right: 4px;
  margin-bottom: 2px;
`;

const ScrapGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 18px;
  width: 100%;
  margin-top: 30px;
`;

const ScrapSection = ({ scrapped, setScrapped }) => {
  const [selectedScrap, setSelectedScrap] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  /**
   * chooseScrap
   * id를 받아 selectedScrap에 추가 또는 제거합니다.
   * @param {number} id
   */
  const chooseScrap = (id) => {
    if (selectedScrap.includes(id)) {
      setSelectedScrap((prev) => prev.filter((elem) => elem !== id));
    } else {
      setSelectedScrap((prev) => [...prev, id]);
    }
  };

  /**
   * chooseAll
   * 전체 선택 클릭 시 모든 내 스크랩 id를 selectedScrap에 추가합니다.
   */
  const chooseAll = () => {
    scrapped.forEach(({ id }) => {
      if (!selectedScrap.includes(id)) {
        setSelectedScrap((prev) => [...prev, id]);
      }
    });
  };

  /**
   * deleteScrap
   * 선택된 자료를 삭제합니다.
   * 자료가 선택되어 있지 않을 경우 alert 창을 내보냅니다.
   * 자료가 선택되었을 경우 delete API 호출과 함께 현재 scrap state도 변경시켜 줍니다.
   */
  const deleteScrap = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      if (selectedScrap.length === 0) {
        alert("자료를 선택해주세요.");
      } else {
        try {
          let accessToken = getValueOnLocalStorage("hangangToken").access_token;

          await MypageAPI.deleteScrapLecture(accessToken, selectedScrap);
          setScrapped((prev) => prev.filter((elem) => !selectedScrap.includes(elem.id)));
          setIsEditMode(false);
          alert("정상적으로 자료들을 삭제하였습니다.");
        } catch (err) {
          console.dir(err);
          alert("자료 삭제에 실패하였습니다.");
        }
      }
    }
  };

  return (
    <ScrapSectionWrapper>
      <ActionRow>
        {!isEditMode && (
          <ActionLabel onClick={() => setIsEditMode(true)}>편집</ActionLabel>
        )}
        {isEditMode && <ActionLabel onClick={() => deleteScrap()}>삭제</ActionLabel>}
        {isEditMode && (
          <AllChoose onClick={() => chooseAll()}>
            <CheckImg />
            전체선택
          </AllChoose>
        )}
      </ActionRow>
      <ScrapGrid>
        {scrapped.map((data) => (
          <LectureCard
            key={data.id}
            data={data}
            isScrapped={true}
            isChosen={selectedScrap.includes(data.id)}
            isEditMode={isEditMode}
            chooseScrap={chooseScrap}
          />
        ))}
      </ScrapGrid>
    </ScrapSectionWrapper>
  );
};

ScrapSection.defaultProps = {
  scrapped: [
    {
      classification: "",
      created_at: "",
      department: "",
      id: 0,
      is_deleted: false,
      name: "",
      professor: "",
      review_count: 0,
      semested_data: [""],
      top3_hash_tag: [
        {
          id: 0,
          tag: "",
        },
      ],
      total_rating: 0,
      updated_at: "",
    },
  ],
  setScrapped: () => {},
};

ScrapSection.propTypes = {
  scrapped: PropTypes.arrayOf(
    PropTypes.shape({
      classification: PropTypes.string,
      created_at: PropTypes.string,
      department: PropTypes.string,
      id: PropTypes.number,
      is_deleted: PropTypes.bool,
      name: PropTypes.string,
      professor: PropTypes.string,
      review_count: PropTypes.number,
      semested_data: PropTypes.arrayOf(PropTypes.string),
      top3_hash_tag: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          tag: PropTypes.string,
        })
      ),
      total_rating: PropTypes.number,
      updated_at: PropTypes.string,
    })
  ),
  setScrapped: PropTypes.func,
};

export default ScrapSection;
