import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FontColor } from "static/Shared/commonStyles";

const Placeholder = `자료에 대한 설명을 작성해주세요. (저작권법 제 133조에 따라 타인 또는 유포금지 자료를 업로드할 경우,

저작권에 위배되어 경고 없이 삭제될 수 있습니다.)
        
    
강의자료 작성이 완료될 시, 수정이나 삭제가 불가합니다.
`;

const Wrapper = styled.div`
  margin-top: 22px;
`;

const Content = styled.textarea.attrs({
  placeholder: Placeholder,
})`
  overflow-y: none;
  width: 100%;
  height: 146px;
  background-color: #f5f5f5;
  padding: 16px;

  font-size: 12px;
  border: none;
  outline: none;
  resize: none;

  color: ${FontColor};

  ::placeholder {
    font-family: NotoSansCJKKR;
    color: #999999;
  }
`;

const ContentSection = ({ content, setForm }) => (
  <Wrapper>
    <Content
      value={content}
      onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
    />
  </Wrapper>
);

ContentSection.defaultProps = {
  content: "",
  setForm: () => {},
};

ContentSection.propTypes = {
  content: PropTypes.string,
  setForm: PropTypes.func,
};

export default ContentSection;
