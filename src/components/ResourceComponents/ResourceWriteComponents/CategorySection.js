import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import ResourceFilterList from "static/ResourcesPage/ResourceFilterList.json";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  height: 30px;

  margin-top: 18px;
`;

const Label = styled.label.attrs({
  htmlFor: "category",
})`
  margin-right: 37px;
  color: ${PlaceholderColor};
  font-size: 12px;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 77px;
  height: 30px;
  padding: 6px 16px;
  border-radius: 20px;

  background-color: ${({ selected }) =>
    selected ? `${ConceptColor}` : `${BorderColor}`};

  font-size: 12px;
  color: ${({ selected }) => (selected ? `#fff` : `${FontColor}`)};

  cursor: pointer;
`;

const CategoryWrapper = styled.div`
  display: flex;

  ${Category}:not(:last-child) {
    margin-right: 8px;
  }
`;

const CategorySection = ({ category, setForm }) => (
  <Wrapper>
    <Label>자료유형</Label>
    <CategoryWrapper>
      {ResourceFilterList.category.map(({ label, value }) => (
        <Category
          key={label}
          selected={category[0] === value}
          onClick={() => setForm((prev) => ({ ...prev, category: [value] }))}
        >
          {label}
        </Category>
      ))}
    </CategoryWrapper>
  </Wrapper>
);

CategorySection.defaultProps = {
  category: ["기출자료"],
  setForm: () => {},
};

CategorySection.propTypes = {
  category: PropTypes.arrayOf(PropTypes.string),
  setForm: PropTypes.func,
};

export default CategorySection;
