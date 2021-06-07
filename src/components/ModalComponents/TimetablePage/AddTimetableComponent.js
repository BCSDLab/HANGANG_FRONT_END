import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeAddTimetableFormValue,
  hideAddTimetableModal,
} from "store/modules/modalModule";
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

const AddTimetableComponent = () => {
  const dispatch = useDispatch();
  const [screenHeight, setScreenHeight] = React.useState();
  const { isAddTimetableModalShowing, name, semester_date_id } = useSelector(
    (state) => state.modalReducer
  );

  const requestCreateTimetable = (e) => {
    e.preventDefault();
    console.log(name, semester_date_id);
  };

  React.useEffect(() => {
    setScreenHeight(document.querySelector("main").clientHeight);
  });

  return (
    isAddTimetableModalShowing && (
      <AddTimetableComponentBackground
        screenHeight={screenHeight}
        onClick={() => dispatch(hideAddTimetableModal())}
      >
        <AddTimetableModal
          onClick={(e) => e.stopPropagation()}
          onSubmit={requestCreateTimetable}
        >
          <Title>시간표 추가</Title>
          <CloseButton onClick={() => dispatch(hideAddTimetableModal())} />
          <Label>시간표 이름</Label>
          <TimetableNameInput
            onChange={(e) =>
              dispatch(changeAddTimetableFormValue("name", e.target.value))
            }
          />
          <Label>학기 설정 (2020년)</Label>
          <SubLabel>이번 연도 시간표만 생성 가능합니다.</SubLabel>
          {SEMESTER_LABEL.map(({ label, semester_date_id: value }) => (
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

const SEMESTER_LABEL = [
  { label: "1학기", semester_date_id: 5 },
  { label: "여름학기", semester_date_id: 998 },
  { label: "2학기", semester_date_id: 6 },
  { label: "겨울학기", semester_date_id: 999 },
];

export default AddTimetableComponent;
