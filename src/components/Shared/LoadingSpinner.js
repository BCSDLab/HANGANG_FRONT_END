import React from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
    from{
        transform:rotate(0deg);
    }to{
        transform:rotate(360deg);
    }
`;

const Spinner = styled.img.attrs({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/spinner.png",
  alt: "spinner",
})`
  width: 70px;
  height: 70px;
  animation: ${rotate} 0.8s ease infinite;

  // https://codepen.io/sosuke/pen/Pjoqqp
  // 추후에 스피너 바꾸는것도..?
  filter: invert(52%) sepia(99%) saturate(3632%) hue-rotate(194deg) brightness(101%)
    contrast(99%);
`;

const LoadingSpinner = ({ height }) => {
  return (
    <Wrapper height={height}>
      <Spinner />
    </Wrapper>
  );
};

export default LoadingSpinner;
