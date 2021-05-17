import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Attachment from "components/ResourceDetailComponents/Attachment";
import { PlaceholderColor } from "static/Shared/commonStyles";

const AttachmentSection = styled.section`
  position: relative;
  width: 100%;
  margin-top: 32px;
`;

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${PlaceholderColor};
`;

const AttachmentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  margin-top: 10px;
  transition: transform 0.3s ease;

  > div:not(:last-child) {
    margin-right: 10px;
  }
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
  top: calc(50% + -13px);
  right: -18px;
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
  left: -24px;
`;

const MoveLeftButtonComponent = ({ move }) => (
  <MoveLeftButton onClick={() => move("left")}>
    <LeftImg />
  </MoveLeftButton>
);

const MoveRightButtonComponent = ({ move }) => (
  <MoveRightButton onClick={() => move("right")}>
    <RightImg />
  </MoveRightButton>
);

const AttachmentsContainer = ({ isPurchased, uploadFiles }) => {
  const attachmentWrapperRef = useRef();
  const [widthOffset, setWidthOffset] = React.useState(0);
  const slidingDistance = 100;
  const fileAmountOnRow = 7;
  const hiddenFiles = uploadFiles.length - fileAmountOnRow;

  /**
   * A function to set width offset.
   * If offset change, useEffect triggered.
   * @param {string} dir A string to use to know direction.
   */
  const move = (dir) => {
    if (dir === "right") setWidthOffset(widthOffset - 1);
    else setWidthOffset(widthOffset + 1);
  };

  useEffect(() => {
    attachmentWrapperRef.current.style.transform = `translateX(${
      widthOffset * slidingDistance
    }px)`;
  }, [widthOffset]);

  return (
    <AttachmentSection>
      <Wrapper>
        <Label>첨부파일 (12.3MB)</Label>
        <AttachmentWrapper ref={attachmentWrapperRef} fileAmountOnRow={fileAmountOnRow}>
          {uploadFiles.map(({ id, fileName, ext }) => (
            <Attachment
              key={id}
              fileName={fileName}
              ext={ext}
              isPurchased={isPurchased}
            />
          ))}
        </AttachmentWrapper>
      </Wrapper>
      {widthOffset !== 0 && <MoveLeftButtonComponent move={move} />}
      {widthOffset !== -hiddenFiles && hiddenFiles > 0 && (
        <MoveRightButtonComponent move={move} />
      )}
    </AttachmentSection>
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
