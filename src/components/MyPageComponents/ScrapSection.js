import React, { useState } from "react";

import MypageAPI from "api/mypage";
import {
  ScrapSectionWrapper,
  ActionRow,
  ActionLabel,
  AllChoose,
  CheckImg,
  ScrapGrid,
} from "components/MyPageComponents/styles/ScrapSection.style";
import LectureCard from "components/Shared/LectureCard";
import { useDispatch, useSelector } from "react-redux";
import { showAlertModal } from "store/modules/modalModule";
import { removeScrappedLectures } from "store/modules/myPageModule";
import NoData from "./NoData";

const ScrapSection = () => {
  const dispatch = useDispatch();
  const { scrappedLectures } = useSelector((state) => state.myPageReducer);
  const [selectedScrap, setSelectedScrap] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  React.useEffect(() => {
    console.log(scrappedLectures);
  });

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
    scrappedLectures.forEach(({ id }) => {
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
          const { data } = await MypageAPI.deleteScrapLecture(selectedScrap);
          if (data.httpStatus === "OK") {
            setIsEditMode(false);
            setSelectedScrap([]);
            dispatch(removeScrappedLectures({ selected: selectedScrap }));
          }
        } catch (err) {
          alert("자료 삭제에 실패하였습니다.");
        }
      }
    }
  };

  return (
    <ScrapSectionWrapper>
      {scrappedLectures.length === 0 && <NoData type="scrappedLectures" />}
      {scrappedLectures.length !== 0 && (
        <>
          <ActionRow>
            {!isEditMode && (
              <ActionLabel onClick={() => setIsEditMode(true)}>편집</ActionLabel>
            )}
            {isEditMode && (
              <>
                <AllChoose onClick={() => chooseAll()}>
                  <CheckImg />
                  전체선택
                </AllChoose>
                <ActionLabel onClick={() => deleteScrap()}>삭제</ActionLabel>
              </>
            )}
          </ActionRow>
          <ScrapGrid>
            {scrappedLectures.map((data) => (
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
        </>
      )}
    </ScrapSectionWrapper>
  );
};

export default ScrapSection;
