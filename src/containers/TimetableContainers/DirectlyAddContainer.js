import React, { useState } from "react";
import {
  AddFormGrid,
  Background,
  ConfirmButton,
  Input,
  Label,
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
        time: ["00", "01"],
      },
      {
        order: 1,
        day: 2,
        time: ["00", "01"],
      },
      {
        order: 2,
        day: 4,
        time: ["00", "01"],
      },
    ],
    name: "",
    professor: "",
  });

  const onChangeInput = (e) => {
    setDirectlyAddForm({ ...directlyAddForm, [e.target.name]: e.target.value });
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
        </TimeSection>
      </AddFormGrid>
    </Background>
  );
};

export default DirectlyAddContainer;
