import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import ResourceAPI from "api/resources";

import {
  Wrapper,
  Container,
  CloseButton,
  Title,
  Delimiter,
  SubmitButton,
} from "containers/ResourcesContainers/styles/ResourceCreateContainer.style";
import SemesterSection from "components/ResourceComponents/ResourceWriteComponents/SemesterSection";
import LectureSearchSection from "components/ResourceComponents/ResourceWriteComponents/LectureSearchSection";
import CategorySection from "components/ResourceComponents/ResourceWriteComponents/CategorySection";
import ContentSection from "components/ResourceComponents/ResourceWriteComponents/ContentSection";
import FileSection from "components/ResourceComponents/ResourceWriteComponents/FileSection";

import {
  resetResourceCreateModuleState,
  setDefaultForm,
  setForm,
} from "store/modules/resourceCreateModule";
import { setCreateResource } from "store/modules/resourcesModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { showAlertModal, showConfirmModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

/**
 * Main Component to create resource.
 */
const ResourceCreateContainer = ({ isCreateFormOpened, setIsCreateFormOpened }) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.resourceCreateReducer);

  return (
    isCreateFormOpened && (
      <Wrapper
        screenHeight={document.querySelector("main").clientHeight}
        onClick={() => cancelResourceCreate(setIsCreateFormOpened, dispatch)}
      >
        <Container onClick={(e) => e.stopPropagation()}>
          <CloseButton
            onClick={() => cancelResourceCreate(setIsCreateFormOpened, dispatch)}
          />
          <Title
            value={form.title}
            onChange={(e) => dispatch(setForm("title", e.target.value))}
            maxLength={26}
          />
          <Delimiter />
          <SemesterSection semester={form.semester_id} />
          <LectureSearchSection term={form.term} />
          <CategorySection category={form.category} />
          <ContentSection content={form.content} />
          <FileSection fileInfos={form.file_infos} />
          <SubmitButton
            isValid={checkValidation(form)}
            onClick={() => {
              submitWriteForm(form, setIsCreateFormOpened, dispatch);
            }}
          />
        </Container>
      </Wrapper>
    )
  );
};

/**
 * If user want to cancel writing, request delete itself.
 */
const cancelResourceCreate = (setIsCreateFormOpened, dispatch) => {
  dispatch(
    showConfirmModal({
      title: "강의자료 작성을 취소하시겠습니까?",
      onConfirm: () => {
        setIsCreateFormOpened(false);
        dispatch(setDefaultForm());
      },
    })
  );
};

/**
 * A function to submit write form if it is valid.
 * @param {object} form A object that user created for creating resource.
 * @param {function} setIsCreateFormOpened A function to close write form when resources submitted.
 * @returns
 */
const submitWriteForm = async (form, setIsCreateFormOpened, dispatch) => {
  if (!checkValidation(form)) return;
  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;
    const { data } = await ResourceAPI.requestWriteResource(form, accessToken);
    setIsCreateFormOpened(false);
    dispatch(setCreateResource({ resource: data }));
    dispatch(resetResourceCreateModuleState());
    dispatch(
      showAlertModal({
        content: "강의자료 작성이 성공적으로 완료되었습니다.",
      })
    );
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

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

ResourceCreateContainer.defaultProps = {
  isCreateFormOpened: false,
  setIsCreateFormOpened: () => {},
};

ResourceCreateContainer.propTypes = {
  isCreateFormOpened: PropTypes.bool,
  setIsCreateFormOpened: PropTypes.func,
};

export default ResourceCreateContainer;
