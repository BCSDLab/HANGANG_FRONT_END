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
import {
  removeScrappedLectures,
  removeScrappedResources,
} from "store/modules/myPageModule";
import NoData from "./NoData";
import {
  SCRAPPED_LECTURES,
  SCRAPPED_RESOURCES,
} from "static/MyPage/MYPAGE_CURRENT_STATE";
import ResourceCard from "components/Shared/ResourceCard";
import { showAlertModal, showConfirmModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const ScrapSection = ({ current }) => {
  const dispatch = useDispatch();
  const { scrappedLectures, scrappedResources } = useSelector(
    (state) => state.myPageReducer
  );
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
    const target = current === SCRAPPED_LECTURES ? scrappedLectures : scrappedResources;
    target.forEach(({ id }) => {
      if (!selectedScrap.includes(id)) {
        setSelectedScrap((prev) => [...prev, id]);
      }
    });
  };

  const checkDeleteRequest = () => {
    dispatch(
      showConfirmModal({
        title: "",
        content: "정말로 삭제하시겠습니까?",
        onConfirm: () => deleteScrap(),
      })
    );
  };

  /**
   * deleteScrap
   * 선택된 자료를 삭제합니다.
   */
  const deleteScrap = async () => {
    if (selectedScrap.length === 0) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["INVALID_DELETE_REQUEST"];
      dispatch(showAlertModal({ title, content }));
    } else {
      if (current === SCRAPPED_LECTURES) {
        requestDeleteScrappedLecture(
          { lectures: selectedScrap, setIsEditMode, setSelectedScrap },
          dispatch
        );
      } else if (current === SCRAPPED_RESOURCES) {
        requestDeleteScrappedResources(
          { resources: selectedScrap, setIsEditMode, setSelectedScrap },
          dispatch
        );
      }
    }
  };

  const EditController = () => {
    return (
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
            <ActionLabel onClick={() => checkDeleteRequest()}>삭제</ActionLabel>
          </>
        )}
      </ActionRow>
    );
  };

  return (
    <ScrapSectionWrapper>
      {current === SCRAPPED_LECTURES && scrappedLectures.length === 0 && (
        <>
          <NoData type={current} />
        </>
      )}
      {current === SCRAPPED_RESOURCES && scrappedResources.length === 0 && (
        <>
          <NoData type={current} />
        </>
      )}
      {current === SCRAPPED_LECTURES && scrappedLectures.length !== 0 && (
        <>
          <EditController />
          <ScrapGrid>
            {scrappedLectures.map((data) => (
              <LectureCard
                key={data.id}
                data={data}
                isChosen={selectedScrap.includes(data.id)}
                chooseScrap={chooseScrap}
                isEditMode={isEditMode}
                isScrapped={true}
              />
            ))}
          </ScrapGrid>
        </>
      )}
      {current === SCRAPPED_RESOURCES && scrappedResources.length !== 0 && (
        <>
          <EditController />
          <ScrapGrid>
            {scrappedResources.map((data) => (
              <ResourceCard
                key={data.id}
                data={data}
                isChosen={selectedScrap.includes(data.scrap_id)}
                chooseScrap={chooseScrap}
                isEditMode={isEditMode}
              />
            ))}
          </ScrapGrid>
        </>
      )}
    </ScrapSectionWrapper>
  );
};

const requestDeleteScrappedResources = async (
  { resources, setIsEditMode, setSelectedScrap },
  dispatch
) => {
  try {
    const { data } = await MypageAPI.deleteScrapResources(resources);
    if (data.httpStatus === "OK") {
      dispatch(removeScrappedResources({ selected: resources }));
      setIsEditMode(false);
      setSelectedScrap([]);
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
  }
};

const requestDeleteScrappedLecture = async (
  { lectures, setIsEditMode, setSelectedScrap },
  dispatch
) => {
  try {
    const { data } = await MypageAPI.deleteScrapLecture(lectures);
    if (data.httpStatus === "OK") {
      dispatch(removeScrappedLectures({ selected: lectures }));
      setIsEditMode(false);
      setSelectedScrap([]);
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
  }
};

export default ScrapSection;
