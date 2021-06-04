import React, { useState } from "react";
import {
  AddFormGrid,
  Background,
  ConfirmButton,
  Input,
  Label,
  Title,
} from "components/TimetableComponents/styles/DirectlyAddContainer.style";

const DirectlyAddContainer = () => {
  const [directlyAddForm, setDirectlyAddForm] = useState({
    class_times: [["000", "001"]],
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
      </AddFormGrid>
    </Background>
  );
};

export default DirectlyAddContainer;
