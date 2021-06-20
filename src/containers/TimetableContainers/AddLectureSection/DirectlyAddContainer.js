import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import {
  AddFormGrid,
  AddTime,
  Background,
  ConfirmButton,
  Input,
  Label,
  PlusImg,
  TimeSection,
  Title,
} from "containers/TimetableContainers/AddLectureSection/styles/DirectlyAddContainer.style";
import TimeOnDirectlyAddContainer from "components/TimetableComponents/TimeComponent";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";
import { setLectureOnLectureList } from "store/modules/timetableModule";

const DirectlyAddContainer = () => {
  const dispatch = useDispatch();
  const { displayTimetable } = useSelector((state) => state.timetableReducer);
  const [directlyAddForm, setDirectlyAddForm] = useState(DEFAULT_ADD_FORM);

  const onChangeInput = (e) => {
    setDirectlyAddForm({ ...directlyAddForm, [e.target.name]: e.target.value });
  };

  const onClickAddTime = () => {
    let currentClassTimes = directlyAddForm["class_times"];
    let lastOrderNumber = currentClassTimes[currentClassTimes.length - 1].order;

    setDirectlyAddForm({
      ...directlyAddForm,
      class_times: [
        ...currentClassTimes,
        {
          order: lastOrderNumber + 1,
          day: 0,
          time: {
            startTime: "00",
            endTime: "02",
          },
        },
      ],
    });
  };

  const submitDirectlyAddForm = (e) => {
    e.preventDefault();

    if (directlyAddForm.name === "" || directlyAddForm.professor === "") {
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[
        "invalidDirectlyAddFormError"
      ];
      dispatch(showAlertModal({ title, content }));
      return;
    }

    const body = changeStateFormAsAPIBody(directlyAddForm, displayTimetable.id);
    requestReflectCustomLecture(body, dispatch);
  };

  return (
    <Background>
      <Title>직접 추가</Title>
      <AddFormGrid onSubmit={submitDirectlyAddForm}>
        <ConfirmButton />
        <Label>수업명</Label>
        <Input name="name" onChange={onChangeInput} maxLength="30" />
        <Label>교수명</Label>
        <Input name="professor" onChange={onChangeInput} maxLength="30" />
        <Label>시간</Label>
        <TimeSection>
          {directlyAddForm.class_times.map((info) => (
            <TimeOnDirectlyAddContainer
              info={info}
              key={info.order}
              class_times={directlyAddForm.class_times}
              directlyAddForm={directlyAddForm}
              setDirectlyAddForm={setDirectlyAddForm}
            />
          ))}
          <AddTime onClick={onClickAddTime}>
            <PlusImg />
            시간 추가하기
          </AddTime>
        </TimeSection>
      </AddFormGrid>
    </Background>
  );
};

const changeStateFormAsAPIBody = (stateForm, timetableId) => {
  const { name, professor, class_times } = stateForm;

  let class_time = class_times.reduce((acc, { day, time }) => {
    let { startTime, endTime } = time;
    startTime = parseInt(`${day}${startTime}`);
    endTime = parseInt(`${day}${endTime}`);

    for (startTime; startTime <= endTime; startTime++) {
      acc.push(startTime);
    }
    return acc;
  }, []);

  const body = {
    class_time: `[${class_time.join(", ")}]`,
    name,
    professor,
    user_timetable_id: timetableId,
  };

  return body;
};

const requestReflectCustomLecture = async (body, dispatch) => {
  try {
    const { data, status } = await TimetableAPI.setCustomLectureOnTimetable(body);
    if (status === 200) {
      dispatch(setLectureOnLectureList({ lecture: data }));
    }
  } catch (error) {
    const { title } = ALERT_MESSAGE_ON_ERROR_TYPE["overlappedLectureError"];
    const content = `해당 시간표에 ${error.response.data.errorMessage}`;
    dispatch(showAlertModal({ title, content }));
  }
};

const DEFAULT_ADD_FORM = {
  class_times: [
    {
      order: 0,
      day: 0,
      time: {
        startTime: "00",
        endTime: "02",
      },
    },
  ],
  name: "",
  professor: "",
};

export default DirectlyAddContainer;
