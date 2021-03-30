import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)``;

const LogoImage = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/hangang_logo.png",
  alt: "한강 로고 이미지",
})`
  width: 176px;
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
