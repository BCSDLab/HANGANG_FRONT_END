import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { DOWN_URL, X_URL } from "static/Shared/imageUrls";

import styled from "styled-components";

export const LectureReviewWriteModalBackground = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ screenHeight }) => screenHeight}px;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9995;
`;

export const LectureReviewWriteModal = styled.form`
  position: fixed;
  top: calc(50% - 388.5px);
  left: calc(50% - 376px);
  height: 777px;
  width: 752px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${CopyRightColor};
  background-color: #fff;
`;

export const CloseButton = styled.img.attrs({
  src: X_URL,
  alt: "close",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  position: absolute;
  left: calc(50% - 171.5px);
  bottom: 24px;
  width: 343px;
  height: 36px;
  border: none;
  outline: none;
  border-radius: 24px;
  background-color: ${({ isValidForm }) => (isValidForm ? `${ConceptColor}` : "#bddcff")};
  color: #fff;
  cursor: ${({ isValidForm }) => (isValidForm ? `pointer` : "default")};
`;

export const Title = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 500;
  color: ${FontColor};
  margin-bottom: 16px;
`;

export const Professor = styled.span`
  display: block;
  font-size: 16px;
  color: ${PlaceholderColor};
  margin-bottom: 24px;
`;

export const Bold = styled.span`
  font-weight: 500;
  color: ${FontColor};
`;

export const Delimiter = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${BorderColor};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 82px auto;
  grid-template-rows: 30px;
  row-gap: 16px;
  margin-top: 16px;
`;

export const ButtonRow = styled.div`
  display: flex;
  width: 615px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ButtonNotify = styled.span`
  display: flex;
  align-items: center;
  margin-left: 5px;
  height: 30px;
  font-size: 11px;
  color: ${PlaceholderColor};
`;

export const Label = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
  align-self: center;
`;

export const Button = styled.button`
  width: ${({ type }) => getButtonWidth(type)};
  height: 30px;
  border-radius: 20px;
  border: none;
  background-color: ${({ isChoiced }) =>
    isChoiced ? `${ConceptColor}` : `${BorderColor}`};
  color: ${({ isChoiced }) => (isChoiced ? `#fff` : `${FontColor}`)};
  cursor: pointer;
`;

const getButtonWidth = (type) => {
  if (["attendance_frequency", "assignment_amount", "difficulty"].includes(type))
    return "48px";
  if (["assignment"].includes(type)) return "64px";
  if (["grade_portion", "hash_tags"].includes(type)) return "96px";
};

export const SemesterSelectBar = styled.div`
  overflow-y: hidden;
  position: relative;
  z-index: 9999;
  width: 160px;
  height: 30px;
  border-radius: 4px;
  border: solid 1px ${BorderColor};
  background-color: #fff;

  :hover {
    height: fit-content;
  }
`;

export const DownImage = styled.img.attrs({
  src: DOWN_URL,
  alt: "down",
})`
  position: absolute;
  top: 6px;
  right: 8px;
  width: 16px;
`;

export const Semester = styled.span`
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
  padding-left: 12px;
  font-size: 12px;
  cursor: pointer;
`;

export const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 82px);
`;

export const CommentAlert = styled.span`
  display: flex;
  align-items: center;
  height: 16px;
  margin-top: 15px;
  font-size: 11px;
  color: #ffab2e;
`;

export const AlertImg = styled.img.attrs({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/alert.png",
  alt: "경고 이미지",
})`
  width: 16px;
  margin-right: 4px;
`;

const COMMENT_AREA_PLACEHOLDER = `이 강의에 대한 총평을 자유롭게 적어주세요! (시험정보, 과제정보, 팁 등)

허위사실이나 지나친 비방 내용을 작성할 시, 승인이 불가할 수 있습니다.

강의평 작성이 완료될 시, 수정이나 삭제가 불가합니다. 
`;

export const CommentArea = styled.textarea.attrs({
  placeholder: `${COMMENT_AREA_PLACEHOLDER}`,
})`
  width: 100%;
  height: 146px;
  margin-top: 10px;
  padding: 19px 12px;
  background-color: ${BorderColor};
  border: none;
  border-radius: 15px;
  resize: none;
  outline: none;
  font-family: NotoSansCJKKR;

  font-size: 12px;
  ::placeholder {
    line-height: 1.2;
  }
`;
