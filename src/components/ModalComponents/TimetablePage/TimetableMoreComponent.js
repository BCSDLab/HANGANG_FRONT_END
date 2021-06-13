import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import {
  hideTimetableMoreModal,
  showAlertModal,
  showConfirmModal,
} from "store/modules/modalModule";
import {
  CloseButton,
  Label,
  MainButton,
  ModifyButton,
  NotMainButton,
  SetMainTimetableSection,
  SettingTimetableLabel,
  SubLabel,
  TimetableMoreComponentBackground,
  TimetableMoreModal,
  TimetableNameInput,
  TimetableNameModifySection,
  Title,
} from "./styles/TimetableMoreComponent.style";
import {
  changeMainTimetableOnList,
  changeNameOfTimetable,
  removeTimetableOnList,
  setDisplayTimetable,
} from "store/modules/timetableModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const TimetableMoreComponent = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { isTimetableMoreModalShowing } = useSelector((state) => state.modalReducer);
  const { userCreatedTimetable, displayTimetable } = useSelector(
    (state) => state.timetableReducer
  );
  const mainTable = userCreatedTimetable.filter(({ isMain }) => isMain)[0];
  const [timetableInputState, setTimetableInputState] = useState({
    tableName: "",
    editable: false,
  });

  useEffect(() => {
    setTimetableInputState((prev) => ({
      ...prev,
      tableName: displayTimetable.tableName,
    }));
  }, [displayTimetable]);

  const handleClickModifyButton = () => {
    if (timetableInputState.editable) {
      setTimetableInputState((prev) => ({ ...prev, editable: false }));
      changeTimetableName(displayTimetable.id, timetableInputState.tableName, dispatch);
    } else {
      setTimetableInputState((prev) => ({ ...prev, editable: true }));
      inputRef.current.focus();
    }
  };

  return (
    isTimetableMoreModalShowing && (
      <TimetableMoreComponentBackground
        screenHeight={document.querySelector("main").clientHeight}
        onClick={() => dispatch(hideTimetableMoreModal())}
      >
        <TimetableMoreModal onClick={(e) => e.stopPropagation()}>
          <Title>시간표 더보기</Title>
          <CloseButton onClick={() => dispatch(hideTimetableMoreModal())} />
          <TimetableNameModifySection>
            <TimetableNameInput
              ref={inputRef}
              value={timetableInputState.tableName}
              readOnly={!timetableInputState.editable}
              onChange={(e) =>
                setTimetableInputState((prev) => ({ ...prev, tableName: e.target.value }))
              }
            />
            <ModifyButton
              onClick={handleClickModifyButton}
              isEditable={timetableInputState.editable}
            >
              {!timetableInputState.editable ? "수정" : "완료"}
            </ModifyButton>
          </TimetableNameModifySection>
          <SetMainTimetableSection>
            {mainTable.id === displayTimetable.id ? (
              <MainButton />
            ) : (
              <NotMainButton
                onClick={() => changeMainTimetable(displayTimetable.id, dispatch)}
              />
            )}
            <SettingTimetableLabel>메인시간표 설정</SettingTimetableLabel>
            <SubLabel>해당 시간표가 메인으로 나타납니다.</SubLabel>
          </SetMainTimetableSection>
          <Label
            onClick={() => {
              const { title } = ALERT_MESSAGE_ON_ERROR_TYPE["confirmDeleteTimetable"];
              dispatch(
                showConfirmModal({
                  title,
                  onConfirm: () =>
                    removeTimetable(
                      displayTimetable.id,
                      dispatch,
                      userCreatedTimetable[1].id
                    ),
                })
              );
            }}
          >
            시간표 삭제
          </Label>
          <Label onClick={() => captureScreenshot(displayTimetable.tableName)}>
            이미지 저장
          </Label>
        </TimetableMoreModal>
      </TimetableMoreComponentBackground>
    )
  );
};

const changeTimetableName = async (id, name, dispatch) => {
  try {
    const { data } = await TimetableAPI.requestChangeTimetableName(id, name);
    if (data.httpStatus === "OK") {
      dispatch(changeNameOfTimetable({ id, name }));
      dispatch(hideTimetableMoreModal());
      const content = "시간표 이름이 정상적으로 변경되었습니다.";
      dispatch(showAlertModal({ content }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

const changeMainTimetable = async (timetableId, dispatch) => {
  try {
    const { data } = await TimetableAPI.requestChangeMainTimetable(timetableId);
    if (data.httpStatus === "OK") {
      dispatch(changeMainTimetableOnList({ id: timetableId }));
      dispatch(hideTimetableMoreModal());
      const content = "메인 시간표가 정상적으로 변경되었습니다.";
      dispatch(showAlertModal({ content }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

const removeTimetable = async (timetableId, dispatch, otherTableId) => {
  try {
    const { data } = await TimetableAPI.requestRemoveTimetable(timetableId);
    if (data.httpStatus === "OK") {
      dispatch(removeTimetableOnList({ id: timetableId }));
      dispatch(hideTimetableMoreModal());
      const content = "시간표가 정상적으로 삭제되었습니다.";
      dispatch(showAlertModal({ content }));
      const { data } = await TimetableAPI.fetchTimetableInfo(otherTableId);
      dispatch(setDisplayTimetable({ displayTimetable: data }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

const captureScreenshot = (tableName) => {
  const canvas = document.querySelector("canvas");
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = tableName;
  link.click();
};

export default TimetableMoreComponent;
