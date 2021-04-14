import React from "react";
import styled from "styled-components";

import { InnerContentWidth } from "static/Shared/commonStyles";
import SearchForm from "components/Shared/SearchForm";

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

const ResourceContainer = () => {
  return (
    <Wrapper>
      <SearchSection>
        <SearchForm type="resources" />
      </SearchSection>

      <span>sdfsdf</span>
      <span>sdfsdf</span>
    </Wrapper>
  );
};

export default ResourceContainer;
