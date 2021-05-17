import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Attachment from "components/ResourceDetailComponents/Attachment";
import { PlaceholderColor } from "static/Shared/commonStyles";

const sampleAttachments = [
  {
    id: 1,
    name: "김이정.hwp",
    type: "hwp",
  },
  {
    id: 2,
    name: "김이정.hwp",
    type: "hwp",
  },
  {
    id: 3,
    name: "김이정.hwp",
    type: "hwp",
  },
  {
    id: 4,
    name: "김이정.hwp",
    type: "hwp",
  },
  {
    id: 5,
    name: "김이정.hwp",
    type: "hwp",
  },
  {
    id: 6,
    name: "김이정.hwp",
    type: "hwp",
  },
  {
    id: 7,
    name: "김이정.hwp",
    type: "hwp",
  },
  {
    id: 8,
    name: "김이정.hwp",
    type: "hwp",
  },
];

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  margin-top: 32px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${PlaceholderColor};
`;

const AttachmentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow-x: hidden;
  margin-top: 10px;
  /* ${Attachment}:not(:last-child) {
    margin-right: 10px;
  } */
`;

const RightImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/ResourceDetailPage/move_right.png",
  alt: "right",
})`
  width: 20px;
`;

const LeftImg = styled(RightImg)`
  transform: rotate(180deg);
`;

const MoveRightButton = styled.div`
  position: absolute;
  top: calc(50% - 25px + 13px);
  right: -23px;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border: solid 1px #eeeeee;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const MoveLeftButton = styled(MoveRightButton)`
  left: -23px;
`;

const MoveLeftButtonComponent = () => (
  <MoveLeftButton>
    <LeftImg />
  </MoveLeftButton>
);

const MoveRightButtonComponent = () => (
  <MoveRightButton>
    <RightImg />
  </MoveRightButton>
);

const AttachmentsContainer = ({ isPurchased, uploadFiles }) => {
  return (
    <Wrapper>
      <Label>첨부파일 (12.3MB)</Label>
      <AttachmentWrapper>
        {uploadFiles.map(({ id, fileName, ext }) => (
          <Attachment key={id} fileName={fileName} ext={ext} isPurchased={isPurchased} />
        ))}
      </AttachmentWrapper>
      <MoveLeftButtonComponent />
      <MoveRightButtonComponent />
    </Wrapper>
  );
};

AttachmentsContainer.defaultProps = {
  isPurchased: false,
  uploadFiles: [],
};

AttachmentsContainer.propTypes = {
  isPurchased: PropTypes.bool,
  uploadFiles: PropTypes.array,
};

export default AttachmentsContainer;
