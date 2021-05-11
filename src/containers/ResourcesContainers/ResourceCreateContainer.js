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
  background-color: ${({ isValid }) => (isValid ? `${ConceptColor}` : "#bddcff")};

  font-size: 14px;
  color: #fff;

  cursor: ${({ isValid }) => (isValid ? "pointer" : "default")};
`;

/**
 * A function to check validation of form.
 * It it is valid, return true.
 */
const checkValidation = (form) => {
  if (
    form.title.length !== 0 &&
    form.semester_date !== "" &&
    form.lecture_id !== -1 &&
    form.term.id !== -1 &&
    form.term.name !== "" &&
    form.category.length !== 0 &&
    form.content !== "" &&
    form.materials.length !== 0
  )
    return true;
  else return false;
};

/**
 * A function to submit write form if it is valid.
 * @param {object} form A object that user created for creating resource.
 * @param {function} setIsFetched A function to update component when resources updated.
 * @param {function} setIsCreateFormOpened A function to close write form when resources submitted.
 * @returns
 */
const submitWriteForm = async (form, setIsFetched, setIsCreateFormOpened) => {
  if (!checkValidation(form)) return;
  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;
    const { status } = await ResourceAPI.postResourceWrite(form, accessToken);
    if (status === 200) {
      setIsCreateFormOpened(false);
      alert("강의자료 작성이 성공적으로 완료되었습니다.");
      setIsFetched(false);
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Main Component to create resource.
 */
const ResourceCreateContainer = ({
  createFormId,
  isCreateFormOpened,
  setIsFetched,
  setIsCreateFormOpened,
}) => {
  const [form, setForm] = useState({
    title: "",
    semester_date: "5",
    lecture_id: -1,
    term: {
      id: -1,
      name: "",
      code: "",
      professor: "",
    },
    category: ["기출자료"],
    content: "",
    materials: [], //  exclude when request ~/lecture-banks/write(POST) api bcz its already added.
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, id: createFormId }));
  }, [createFormId]);

  /**
   * If user want to cancel writing, request delete itself.
   */
  const cancelResourceCreate = async (setForm) => {
    if (confirm("강의자료 작성을 취소하시겠습니까?")) {
      try {
        setIsCreateFormOpened(false);
        let accessToken = getValueOnLocalStorage("hangangToken").access_token;
        await ResourceAPI.cancelResourceWrite(createFormId, accessToken);
        // Set form as default form.
        setForm({
          title: "",
          semester_date: "5",
          lecture_id: -1,
          term: {
            id: -1,
            name: "",
            code: "",
            professor: "",
          },
          category: ["기출자료"],
          content: "",
          materials: [],
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <Wrapper show={isCreateFormOpened}>
      <Container>
        <CloseButton onClick={() => cancelResourceCreate(setForm)} />
        <Title
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        />
        <Delimiter />
        <SemesterSection semester={form.semester_date} setForm={setForm} />
        <LectureSearchSection term={form.term} setForm={setForm} />
        <CategorySection category={form.category} setForm={setForm} />
        <ContentSection content={form.content} setForm={setForm} />
        <MaterialSection
          createFormId={createFormId}
          materials={form.materials}
          setForm={setForm}
        />
        <SubmitButton
          isValid={checkValidation(form)}
          onClick={() => submitWriteForm(form, setIsFetched, setIsCreateFormOpened)}
        />
      </Container>
    </Wrapper>
  );
};

ResourceCreateContainer.defaultProps = {
  createFormId: -1,
  isCreateFormOpened: false,
  setIsFetched: () => {},
  setIsCreateFormOpened: () => {},
};

ResourceCreateContainer.propTypes = {
  createFormId: PropTypes.number,
  isCreateFormOpened: PropTypes.bool,
  setIsFetched: PropTypes.func,
  setIsCreateFormOpened: PropTypes.func,
};

export default ResourceCreateContainer;
