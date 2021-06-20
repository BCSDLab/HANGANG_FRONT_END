import React from "react";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import {
  changeAddTimetableFormValue,
  hideAddTimetableModal,
  showAlertModal,
} from "store/modules/modalModule";
import { getSemesterOptions } from "utils/timetablePage/getSemesterOptions";
import {
  AddTimetableComponentBackground,
  AddTimetableModal,
  CloseButton,
  Label,
  SemesterButton,
  SubLabel,
  SubmitButton,
  TimetableNameInput,
  Title,
} from "./styles/AddTimetableComponents.style";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { addTimetableOnList } from "store/modules/timetableModule";

const AddTimetableComponent = () => {
  const dispatch = useDispatch();
  const { isAddTimetableModalShowing, name, semester_date_id } = useSelector(
    (state) => state.modalReducer
  );

  const currentYear = new Date().getFullYear().toString();
  const semesterData = getSemesterOptions().filter(({ year }) => year === currentYear);

  const createTimetable = (e) => {
    e.preventDefault();
    if (name === null) {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["inValidAddTimetableError"];
      dispatch(hideAddTimetableModal());
      dispatch(showAlertModal({ title, content }));
      return;
    }
    requestCreateTimetable({ name, semester_date_id }, dispatch);
  };

  return (
    isAddTimetableModalShowing && (
      <AddTimetableComponentBackground
        screenHeight={document.querySelector("main").clientHeight}
        onClick={() => dispatch(hideAddTimetableModal())}
      >
        <AddTimetableModal
          onClick={(e) => e.stopPropagation()}
          onSubmit={createTimetable}
        >
          <Title>시간표 추가</Title>
          <CloseButton onClick={() => dispatch(hideAddTimetableModal())} />
          <Label>시간표 이름</Label>
          <TimetableNameInput
            onChange={(e) =>
              dispatch(changeAddTimetableFormValue("name", e.target.value))
            }
            maxLength={35}
          />
          <Label>{`학기 설정 (${currentYear}년)`}</Label>
          <SubLabel>이번 연도 시간표만 생성 가능합니다.</SubLabel>
          {semesterData.map(({ label, value }) => (
            <SemesterButton
              key={label}
              label={label}
              choiced={value === semester_date_id}
              onClick={() =>
                dispatch(changeAddTimetableFormValue("semester_date_id", value))
              }
            />
          ))}
          <SubmitButton>완료</SubmitButton>
        </AddTimetableModal>
      </AddTimetableComponentBackground>
    )
  );
};

const requestCreateTimetable = async (body, dispatch) => {
  try {
    const { data } = await TimetableAPI.createTimetable(body);

    const successTitle = "시간표가 생성되었습니다.";
    const successContent = "해당 학기 시간표 드롭다운에서 확인할 수 있습니다.";
    dispatch(showAlertModal({ title: successTitle, content: successContent }));
    dispatch(hideAddTimetableModal());

    const newTimetableId = parseInt(data.split(":")[1].trim());
    const newTimetableData = {
      id: newTimetableId,
      isMain: false,
      ...body,
    };

    dispatch(addTimetableOnList({ timetable: newTimetableData }));
  } catch (error) {
    dispatch(hideAddTimetableModal());

    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
    dispatch(showAlertModal({ title, content }));
  }
};

export default AddTimetableComponent;
