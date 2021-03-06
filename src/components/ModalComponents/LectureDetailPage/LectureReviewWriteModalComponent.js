import {
  AlertImg,
  Bold,
  Button,
  ButtonNotify,
  ButtonRow,
  CloseButton,
  CommentAlert,
  CommentArea,
  Delimiter,
  DownImage,
  Grid,
  Label,
  LectureReviewWriteModal,
  LectureReviewWriteModalBackground,
  Professor,
  RatingContainer,
  Semester,
  SemesterSelectBar,
  SubmitButton,
  Title,
} from "./styles/LectureReviewWriteModalComponent.style";
/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react";
import { hideLectureReviewWriteModal, showAlertModal } from "store/modules/modalModule";
import { useDispatch, useSelector } from "react-redux";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import LectureDetailAPI from "api/lectureDetail";
import LectureRating from "./LectureRating/LectureRating";
import { addLectureReview } from "store/modules/lectureDetailModule";
import debounce from "lodash.debounce";
import { getSemesterOptions } from "utils/timetablePage/getSemesterOptions";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const LectureReviewWriteModalComponent = () => {
  const dispatch = useDispatch();
  const { basicLectureInfos, isLectureReviewWriteModalShowing } = useSelector(
    (state) => state.modalReducer
  );
  const defaultOptions = getSemesterOptions();
  defaultOptions.sort((prev, next) => next.value - prev.value);

  const [form, setForm] = useState({});
  const RatingRef = React.useRef();
  const [semesterOptions, setSemesterOptions] = useState(defaultOptions);

  useEffect(() => {
    const form = createDefaultLectureWriteForm(defaultOptions[0], basicLectureInfos?.id);
    setForm(form);
  }, [basicLectureInfos]);

  const onButtonClick = (e, key, value) => {
    e.preventDefault();
    switch (key) {
      case "semester_id":
        setForm((prev) => ({ ...prev, [key]: value }));
        const options = semesterOptions.sort((curr, next) => {
          let isCurrChoiced = curr.value === value;
          let isNextChoiced = next.value === value;

          if (isCurrChoiced > isNextChoiced) return -1;
          else return 1;
        });
        setSemesterOptions(options);
        return;
      case "attendance_frequency":
      case "assignment_amount":
      case "difficulty":
      case "grade_portion":
        setForm((prev) => ({ ...prev, [key]: value }));
        return;
      case "assignment":
        if (form[key].some(({ id }) => id === value)) {
          if (form[key].length === 1) return;

          setForm((prev) => ({
            ...prev,
            [key]: prev[key].filter(({ id }) => id !== value),
          }));
        } else {
          setForm((prev) => ({ ...prev, [key]: [...prev[key], { id: value }] }));
        }
        return;
      case "hash_tags":
        if (form[key].some(({ id }) => id === value)) {
          if (form[key].length === 1) return;

          setForm((prev) => ({
            ...prev,
            [key]: prev[key].filter(({ id }) => id !== value),
          }));
        } else {
          if (form[key].length === 3) return;
          setForm((prev) => ({ ...prev, [key]: [...prev[key], { id: value }] }));
        }
        return;
      default:
        return;
    }
  };

  const checkButtonChoiced = (key, value) => {
    switch (key) {
      case "semester_id":
      case "attendance_frequency":
      case "assignment_amount":
      case "difficulty":
      case "grade_portion":
        return form[key] === value;
      case "assignment":
      case "hash_tags":
        return form[key].some(({ id }) => id === value);
      default:
        return;
    }
  };

  const onChangeTextarea = (e) => {
    setForm((prev) => ({ ...prev, comment: e.target.value }));
  };

  return (
    isLectureReviewWriteModalShowing && (
      <LectureReviewWriteModalBackground
        screenHeight={document.querySelector("main").clientHeight}
        onClick={() => dispatch(hideLectureReviewWriteModal())}
      >
        <LectureReviewWriteModal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={() => dispatch(hideLectureReviewWriteModal())} />
          <Title>{basicLectureInfos.name}</Title>
          <Professor>
            <Bold>{basicLectureInfos.professor}</Bold> ?????????
          </Professor>
          <Delimiter />
          <Grid>
            <Label>{ROW_LABEL["semester_id"]}</Label>
            <SemesterSelectBar>
              <DownImage />
              {semesterOptions.map(({ year, label, value }) => (
                <Semester
                  key={value}
                  onClick={(e) => onButtonClick(e, "semester_id", value)}
                >{`${year}??? ${label}`}</Semester>
              ))}
            </SemesterSelectBar>

            {Object.values(FORM_KEYS).map((key) => (
              <React.Fragment key={key}>
                <Label>{ROW_LABEL[key]}</Label>
                <ButtonRow>
                  {BUTTON_VALUE[key].map(({ label, value }) => (
                    <Button
                      key={label}
                      type={key}
                      onClick={(e) => onButtonClick(e, key, value)}
                      isChoiced={checkButtonChoiced(key, value)}
                    >
                      {label}
                    </Button>
                  ))}
                  {key === "assignment" && (
                    <ButtonNotify>{ASSIGNMENT_NOTIFY}</ButtonNotify>
                  )}
                  {key === "hash_tags" && <ButtonNotify>{HASHTAGS_NOTIFY}</ButtonNotify>}
                </ButtonRow>
              </React.Fragment>
            ))}

            <Label>{ROW_LABEL["rating"]}</Label>
            <RatingContainer>
              <LectureRating ref={RatingRef} />
            </RatingContainer>
          </Grid>
          <CommentAlert>
            {form.comment === "" && (
              <>
                <AlertImg />
                {NO_COMMENT_ALERT}
              </>
            )}
            {form.comment !== "" && form.comment.length < 10 && (
              <>
                <AlertImg />
                {INVALID_COMMENT_ALERT}
              </>
            )}
          </CommentAlert>
          <CommentArea onChange={onChangeTextarea} value={form.comment} />
          <SubmitButton
            isValidForm={form.comment.length >= 10}
            onClick={(e) => requestWriteLectureReview(e, Object.assign(form, {rating: RatingRef.current.value}), dispatch)}
          >
            {SUBMIT_BUTTON_LABEL}
          </SubmitButton>
        </LectureReviewWriteModal>
      </LectureReviewWriteModalBackground>
    )
  );
};

export default LectureReviewWriteModalComponent;

const requestWriteLectureReview = async (e, form, dispatch) => {
  e.preventDefault();
  debounce(async () => {
    if (form.comment.length < 10) return;

    try {
      const accessToken = getValueOnLocalStorage("hangangToken").access_token;
      const { data } = await LectureDetailAPI.postLectureReview(accessToken, form);
      dispatch(addLectureReview({ data }));
      dispatch(hideLectureReviewWriteModal());
      dispatch(showAlertModal({ content: "???????????? ?????????????????????." }));
    } catch (error) {
      dispatch(hideLectureReviewWriteModal());
      const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
      dispatch(showAlertModal({ title, content }));
    }
  }, 1000);
};

const createDefaultLectureWriteForm = (currentSemester, lectureId) => {
  let form = DEFAULT_LECTURE_WRITE_FORM;
  form = { ...form, semester_id: currentSemester.value, lecture_id: lectureId };
  return form;
};

const NO_COMMENT_ALERT = "?????? ????????? ???????????? ???????????????.";
const INVALID_COMMENT_ALERT = "????????? 10??? ?????? ???????????? ?????????.";
const ASSIGNMENT_NOTIFY = "????????? ?????? ??????";
const HASHTAGS_NOTIFY = "???1~3??? ?????? ??????";
const SUBMIT_BUTTON_LABEL = "???????????? (+30P)";

const BUTTON_VALUE = {
  attendance_frequency: [
    { label: "???", value: 1 },
    { label: "???", value: 2 },
    { label: "???", value: 3 },
  ],
  assignment: [
    { label: "??????", value: 1 },
    { label: "?????????", value: 2 },
    { label: "??????", value: 3 },
    { label: "??????", value: 4 },
  ],
  assignment_amount: [
    { label: "???", value: 1 },
    { label: "???", value: 2 },
    { label: "???", value: 3 },
  ],
  difficulty: [
    { label: "???", value: 1 },
    { label: "???", value: 2 },
    { label: "???", value: 3 },
  ],
  grade_portion: [
    { label: "???????????????", value: 1 },
    { label: "???????????????", value: 2 },
    { label: "???????????????", value: 3 },
  ],
  hash_tags: [
    { label: "#???????????????", value: 1 },
    { label: "#???????????????", value: 2 },
    { label: "#???????????????", value: 3 },
    { label: "#???????????????", value: 4 },
    { label: "#???????????????", value: 5 },
    { label: "#???????????????", value: 6 },
    { label: "#???????????????", value: 7 },
    { label: "#???????????????", value: 8 },
    { label: "#???????????????", value: 9 },
  ],
};

const FORM_KEYS = {
  ATTENDANCE_FREQUENCY: "attendance_frequency",
  ASSIGNMENT: "assignment",
  ASSIGNMENT_AMOUNT: "assignment_amount",
  DIFFICULTY: "difficulty",
  GRADE_PORTION: "grade_portion",
  HASH_TAGS: "hash_tags",
};

const DEFAULT_LECTURE_WRITE_FORM = {
  lecture_id: null,
  semester_id: null,
  attendance_frequency: 1,
  assignment: [
    {
      id: 1,
    },
  ],
  assignment_amount: 1,
  difficulty: 1,
  grade_portion: 1,
  hash_tags: [
    {
      id: 1,
    },
  ],
  rating: 3,
  comment: "",
};

const ROW_LABEL = {
  semester_id: "????????????",
  attendance_frequency: "?????? ??????",
  assignment: "????????????",
  assignment_amount: "?????????",
  difficulty: "?????? ?????????",
  grade_portion: "????????????",
  hash_tags: "????????????",
  rating: "??????",
};
