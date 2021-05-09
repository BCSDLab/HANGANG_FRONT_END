import React, { useState } from "react";
import PropTypes from "prop-types";

import { CopyRightColor } from "static/Shared/commonStyles";
import { CLOSE_WRITE_FORM_URL } from "static/Shared/imageUrls";
import styled from "styled-components";

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

const ResourceWriteContainer = ({ isWriteFormOpened, setIsWriteFormOpened }) => {
  const form = useState({
    title: "",
    semester_date: "5",
    lecture_id: false,
    category: true,
    content: false,
    material: false,
  });

  return (
    <Wrapper show={isWriteFormOpened}>
      <Container>
        <CloseButton
          onClick={() => {
            if (confirm("강의자료 작성을 취소하시겠습니까?")) setIsWriteFormOpened(false);
          }}
        />
      </Container>
    </Wrapper>
  );
};

ResourceWriteContainer.defaultProps = {
  isWriteFormOpened: false,
  setIsWriteFormOpened: () => {},
};

ResourceWriteContainer.propTypes = {
  isWriteFormOpened: PropTypes.bool,
  setIsWriteFormOpened: PropTypes.func,
};

export default ResourceWriteContainer;
