import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)``;

const LogoImage = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/logo_primary.png",
})`
  width: 125px;
  cursor: pointer;
`;

const Logo = () => {
  return (
    <StyledLink to="/">
      <LogoImage />
    </StyledLink>
  );
};

export default Logo;
