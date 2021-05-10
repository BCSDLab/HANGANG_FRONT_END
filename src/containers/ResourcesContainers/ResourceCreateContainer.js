import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ResourceAPI from "api/resources";

import SemesterSection from "components/ResourceComponents/ResourceWriteComponents/SemesterSection";
import LectureSearchSection from "components/ResourceComponents/ResourceWriteComponents/LectureSearchSection";
import CategorySection from "components/ResourceComponents/ResourceWriteComponents/CategorySection";
import ContentSection from "components/ResourceComponents/ResourceWriteComponents/ContentSection";
import MaterialSection from "components/ResourceComponents/ResourceWriteComponents/MaterialSection";

import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
} from "static/Shared/commonStyles";
import { CLOSE_WRITE_FORM_URL } from "static/Shared/imageUrls";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const Wrapper = styled.div`
  position: absolute;
  display: ${({ show }) => (show ? "block" : "none")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  position: absolute;
  top: 222px;
  /* top: calc(50% - 333.5px); 정중앙에 위치 시키는게 이상해서 zeppelin 따름 문제 될 시 해당 코드 사용*/
  left: calc(50% - 424px);
  width: 848px;
  height: 667px;

  padding: 24px;

  border-radius: 24px;
  border: solid 1px ${CopyRightColor};
  background-color: #fff;
`;

const CloseButton = styled.img.attrs({
  src: CLOSE_WRITE_FORM_URL,
  alt: "close_resource_form_btn",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  cursor: pointer;
`;

const Title = styled.input.attrs({
  type: "text",
  placeholder: "제목을 입력해 주세요.",
})`
  width: calc(100% - 40px); // 40px is space for "X button"
  height: 30px;

  border: none;
  outline: none;

  font-size: 20px;
  color: ${FontColor};
  ::placeholder {
    color: #999999;
  }
`;

const Delimiter = styled.div`
  width: 100%;
  height: 1px;
  margin: 14px 0px 21.5px 0px;
  background-color: ${BorderColor};
`;

const SubmitButton = styled.input.attrs({
  type: "button",
  value: "작성완료 (+10P)",
})`
  position: absolute;
  left: calc(50% - 171.5px);
  bottom: 24px;
  width: 343px;
  height: 36px;
  border: none;
  border-radius: 24px;
  background-color: ${ConceptColor};

  font-size: 14px;
  color: #fff;
`;

const ResourceCreateContainer = ({
  createFormId,
  isCreateFormOpened,
  setIsCreateFormOpened,
}) => {
  const [form, setForm] = useState({
    category: ["기출자료"],
    content: "",
    id: -1,
    lecture_id: -1,
    point_price: -1,
    semester_date: "5",
    title: "",
    materials: [],
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  /**
   * If user want to cancel writing, request delete itself.
   */
  const cancelResourceCreate = async () => {
    if (confirm("강의자료 작성을 취소하시겠습니까?")) {
      try {
        setIsCreateFormOpened(false);
        let accessToken = getValueOnLocalStorage("hangangToken").access_token;
        await ResourceAPI.cancelResourceWrite(createFormId, accessToken);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <Wrapper show={isCreateFormOpened}>
      <Container>
        <CloseButton onClick={() => cancelResourceCreate()} />
        <Title
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        />
        <Delimiter />
        <SemesterSection setForm={setForm} />
        <LectureSearchSection setForm={setForm} />
        <CategorySection category={form.category} setForm={setForm} />
        <ContentSection setForm={setForm} />
        <MaterialSection
          createFormId={createFormId}
          materials={form.materials}
          setForm={setForm}
        />
        <SubmitButton />
      </Container>
    </Wrapper>
  );
};

ResourceCreateContainer.defaultProps = {
  createFormId: -1,
  isCreateFormOpened: false,
  setIsCreateFormOpened: () => {},
};

ResourceCreateContainer.propTypes = {
  createFormId: PropTypes.number,
  isCreateFormOpened: PropTypes.bool,
  setIsCreateFormOpened: PropTypes.func,
};

export default ResourceCreateContainer;
