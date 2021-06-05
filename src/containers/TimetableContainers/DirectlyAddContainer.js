import React, { useState } from "react";
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
} from "containers/TimetableContainers/styles/DirectlyAddContainer.style";
import TimeOnDirectlyAddContainer from "components/TimetableComponents/TimeComponent";

const DirectlyAddContainer = () => {
  const [directlyAddForm, setDirectlyAddForm] = useState({
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
  });

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

  React.useEffect(() => {
    console.log(directlyAddForm);
  });

  return (
    <Background>
      <Title>직접 추가</Title>
      <ConfirmButton />
      <AddFormGrid>
        <Label>수업명</Label>
        <Input name="name" onChange={onChangeInput} />
        <Label>교수명</Label>
        <Input name="professor" onChange={onChangeInput} />
        <Label>시간</Label>
        <TimeSection>
          {directlyAddForm.class_times.map((info) => (
            <TimeOnDirectlyAddContainer
              info={info}
              key={info.order}
              class_times={directlyAddForm.class_times}
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

export default DirectlyAddContainer;
