import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ResourceAPI from "api/resources";

import SemesterSection from "components/ResourceComponents/ResourceWriteComponents/SemesterSection";
import LectureSearchSection from "components/ResourceComponents/ResourceWriteComponents/LectureSearchSection";
import CategorySection from "components/ResourceComponents/ResourceWriteComponents/CategorySection";
import ContentSection from "components/ResourceComponents/ResourceWriteComponents/ContentSection";
import FileSection from "components/ResourceComponents/ResourceWriteComponents/FileSection";

import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
} from "static/Shared/commonStyles";
import { CLOSE_WRITE_FORM_URL } from "static/Shared/imageUrls";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultForm, setForm } from "store/modules/resourceCreateModule";

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
    form.category.length !== 0 &&
    form.content !== "" &&
    form.files.length !== 0 &&
    form.lecture_id !== -1 &&
    form.semester_date !== "" &&
    form.title.length !== 0 &&
    form.term.id !== -1 &&
    form.term.name !== ""
  )
    return true;
  else return false;
};

/**
 * A function to submit write form if it is valid.
 * @param {object} form A object that user created for creating resource.
 * @param {function} setIsCreateFormOpened A function to close write form when resources submitted.
 * @returns
 */
const submitWriteForm = async (form, setIsCreateFormOpened) => {
  if (!checkValidation(form)) return;
  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;
    const { data } = await ResourceAPI.requestWriteResource(form, accessToken);
    if (data.httpStatus === "CREATED") {
      setIsCreateFormOpened(false);
      alert("강의자료 작성이 성공적으로 완료되었습니다.");
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Main Component to create resource.
 */
const ResourceCreateContainer = ({ isCreateFormOpened, setIsCreateFormOpened }) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.resourceCreateReducer);

  /**
   * If user want to cancel writing, request delete itself.
   */
  const cancelResourceCreate = () => {
    if (confirm("강의자료 작성을 취소하시겠습니까?")) {
      setIsCreateFormOpened(false);
      dispatch(setDefaultForm());
    }
  };

  return (
    <Wrapper show={isCreateFormOpened}>
      <Container>
        <CloseButton onClick={() => cancelResourceCreate()} />
        <Title
          value={form.title}
          onChange={(e) => dispatch(setForm("title", e.target.value))}
        />
        <Delimiter />
        <SemesterSection semester={form.semester_id} />
        <LectureSearchSection term={form.term} />
        <CategorySection category={form.category} />
        <ContentSection content={form.content} />
        <FileSection fileInfos={form.file_infos} />
        <SubmitButton
          isValid={checkValidation(form)}
          onClick={() => submitWriteForm(form, setIsCreateFormOpened)}
        />
      </Container>
    </Wrapper>
  );
};

ResourceCreateContainer.defaultProps = {
  isCreateFormOpened: false,
  setIsCreateFormOpened: () => {},
};

ResourceCreateContainer.propTypes = {
  isCreateFormOpened: PropTypes.bool,
  setIsCreateFormOpened: PropTypes.func,
};

export default ResourceCreateContainer;
