import React from "react";
import styled from "styled-components";

import { InnerContentWidth } from "static/Shared/commonStyles";
import LectureSearchForm from "components/LecturesComponents/LectureSearchForm";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  height: 833px;
  margin: 90px auto 98px auto;
`;

const SearchSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LecturesContainer = () => {
  return (
    <Wrapper>
      <SearchSection>
        <LectureSearchForm />
      </SearchSection>
    </Wrapper>
  );
};

export default LecturesContainer;
