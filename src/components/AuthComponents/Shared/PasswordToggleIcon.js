import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CanSeeIcon = styled.img.attrs(() => ({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/eye_on.png",
  alt: "패스워드 토글 아이콘",
}))`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  cursor: pointer;
`;

const CantSeeIcon = styled(CanSeeIcon).attrs(() => ({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/eye_off.png",
  alt: "패스워드 토글 아이콘",
}))``;

const PasswordToggleIcon = ({ target }) => {
  const [canSee, setCanSee] = useState(false);

  const togglePw = (ref) => {
    if (ref.current.type === "password") {
      ref.current.type = "text";
      setCanSee(true);
    } else {
      ref.current.type = "password";
      setCanSee(false);
    }
  };

  return (
    <div onClick={() => togglePw(target)}>
      {canSee ? <CanSeeIcon /> : <CantSeeIcon />}
    </div>
  );
};

PasswordToggleIcon.propTypes = {
  target: PropTypes.object.isRequired,
};

export default PasswordToggleIcon;
