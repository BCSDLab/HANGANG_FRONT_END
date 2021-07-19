import React from "react";
import styled from "styled-components";

const defaultPath =
  "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/icon";

const Cell = styled.img.attrs({
  src: `${defaultPath}/CELL.png`,
  alt: "cell",
})`
  width: 24px;
  height: 24px;
`;

const Doc = styled(Cell).attrs({
  src: `${defaultPath}/DOC.png`,
  alt: "DOC",
})``;

const Hwp = styled(Cell).attrs({
  src: `${defaultPath}/HWP.png`,
  alt: "HWP",
})``;

const Jpg = styled(Cell).attrs({
  src: `${defaultPath}/JPG.png`,
  alt: "JPG",
})``;

const Pdf = styled(Cell).attrs({
  src: `${defaultPath}/PDF.png`,
  alt: "PDF",
})``;

const Png = styled(Cell).attrs({
  src: `${defaultPath}/PNG.png`,
  alt: "PNG",
})``;

const Ppt = styled(Cell).attrs({
  src: `${defaultPath}/PPT.png`,
  alt: "PPT",
})``;

const Pptx = styled(Cell).attrs({
  src: `${defaultPath}/PPTX.png`,
  alt: "PPTX",
})``;

const Show = styled(Cell).attrs({
  src: `${defaultPath}/SHOW.png`,
  alt: "SHOW",
})``;

const Txt = styled(Cell).attrs({
  src: `${defaultPath}/TXT.png`,
  alt: "TXT",
})``;

const Xls = styled(Cell).attrs({
  src: `${defaultPath}/XLS.png`,
  alt: "XLS",
})``;

const Zip = styled(Cell).attrs({
  src: `${defaultPath}/ZIP.png`,
  alt: "ZIP",
})``;

export default {
  doc: <Doc />,
  hwp: <Hwp />,
  pdf: <Pdf />,
  png: <Png />,
  ppt: <Ppt />,
  xls: <Xls />,
  jpg: <Jpg />,
  pptx: <Pptx />,
  show: <Show />,
  txt: <Txt />,
  zip: <Zip />,
};
