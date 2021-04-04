import React from "react";
import styled from "styled-components";

const defaultPath =
  "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/icon";

const Doc = styled.img.attrs({
  src: `${defaultPath}/doc.png`,
  alt: "doc",
})`
  width: 24px;
  height: 24px;
`;

const Hwp = styled.img.attrs({
  src: `${defaultPath}/hwp.png`,
  alt: "hwp",
})`
  width: 24px;
  height: 24px;
`;

const Pdf = styled.img.attrs({
  src: `${defaultPath}/pdf.png`,
  alt: "pdf",
})`
  width: 24px;
  height: 24px;
`;

const Png = styled.img.attrs({
  src: `${defaultPath}/png.png`,
  alt: "png",
})`
  width: 24px;
  height: 24px;
`;

const Ppt = styled.img.attrs({
  src: `${defaultPath}/ppt.png`,
  alt: "ppt",
})`
  width: 24px;
  height: 24px;
`;

const Xls = styled.img.attrs({
  src: `${defaultPath}/xls.png`,
  alt: "xls",
})`
  width: 24px;
  height: 24px;
`;

export default {
  doc: <Doc />,
  hwp: <Hwp />,
  pdf: <Pdf />,
  png: <Png />,
  ppt: <Ppt />,
  xls: <Xls />,
};
