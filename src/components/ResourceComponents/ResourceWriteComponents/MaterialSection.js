import React, { createRef, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes, { number } from "prop-types";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import {
  ADD_FILE_ICON_URL,
  FILE_ERASE_BUTTON_URL,
  UPLOAD_FILE_ICON_URL,
} from "static/Shared/imageUrls";

const ACCEPT_FILE_TYPES = [
  "zip",
  "xls",
  "txt",
  "show",
  "ppt",
  "pptx",
  "png",
  "pdf",
  "jpg",
  "jpeg",
  "hwp",
  "doc",
  "docx",
  "cell",
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const Label = styled.label.attrs({
  htmlFor: "semesters",
})`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const AddFileIcon = styled.img.attrs({
  src: ADD_FILE_ICON_URL,
  alt: "file",
})`
  width: 24px;
  margin: 16px 0px;
  cursor: pointer;
`;

const FakeFileDom = styled.input.attrs({
  type: "file",
  accept: "." + ACCEPT_FILE_TYPES.join(", ."),
  multiple: "multiple",
})`
  display: none;
`;

const MaterialContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};
`;

const MaterialWrapper = styled.div`
  display: flex;
  ${MaterialContainer}:not(:last-child) {
    margin-right: 8px;
  }
`;

const FileIcon = styled.img.attrs(({ type }) => ({
  src: UPLOAD_FILE_ICON_URL(type),
  alt: "file",
}))`
  position: absolute;
  top: 7px;
  left: 7px;
  width: 24px;
`;

const FileEraseIcon = styled.img.attrs({
  src: FILE_ERASE_BUTTON_URL,
  alt: "erase",
})`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  cursor: pointer;
`;

const MaterialName = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  color: ${FontColor};
`;

/**
 * A Function to check extension on file name
 * @param {string} type A String which file type is
 * @returns Return true if file type is in validation array, else false.
 */
const hasExtensionOnFileName = (type) => {
  type = type.toLowerCase();
  if (ACCEPT_FILE_TYPES.includes(type)) return true;
  else return false;
};

/**
 * A Function to convert MIME type to extension if type if MIME type.
 * e.g. application/vnd.openxmlformats-officedocument.presentationml.presentation => pptx
 * 참고 : https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types.
 * @param {*} type
 * @returns
 */
const convertMIMETypeToExtension = (type) => {
  let trimmedType = type.split("/")[1];
  console.log(trimmedType);
  if (trimmedType.slice(0, 3) === "msw") trimmedType = "doc"; //  .doc / application/msword
  if (trimmedType.slice(4, 6) === "ms") trimmedType = "ppt"; //  .ppt / application/vnd.ms-powerpoint
  if (trimmedType.slice(0, 3) === "vnd") {
    switch (trimmedType.split(".")[3]) {
      case "document":
        return "docx";
      case "presentation":
        return "pptx";
      case "sheet":
        return "xlsx";
      default:
        return trimmedType;
    }
  }

  return trimmedType;
};

/**
 * A Function to handle user-selected files
 * Iterate chosen files and get name, size, type
 * name : erase file type
 * type : get only type (e.g. application/pdf => pdf)
 * @param {object} files An Array which contains file DOM of user-selected files
 * @param {function} setForm A Function of write form
 */
const getFilesFromUser = (files, setForm) => {
  let trimmedFiles = [];

  files.forEach((f) => {
    let { name, size, type } = f;
    if (hasExtensionOnFileName(name.slice(-4))) name = name.slice(0, -5); // show, jpeg, cell, ...
    if (hasExtensionOnFileName(name.slice(-3))) name = name.slice(0, -4); // jpg, pdf, ...
    type = convertMIMETypeToExtension(type);
    trimmedFiles.push({ name, size, type });
  });

  setForm((prev) => ({
    ...prev,
    materials: [...prev.materials, ...trimmedFiles],
  }));
};

/**
 * A Function to calculate length and size of material.
 * @param {object} material A Object to contain material info.
 * @returns A String to contain notify sentence with size.
 */
const getLabelOfMaterialsInfo = (material) => {
  const KB = 1000;
  const MB = 1000 * KB;
  let size = material.reduce((acc, curr) => acc + curr.size, 0).toString();

  if (material.length === 0)
    return "자료를 최소 1개 이상 업로드 해주세요. ( 0KB / 50MB )";
  else if (size < KB) return `총 ${material.length}개 ( ${size}B / 50MB )`;
  else if (size < MB)
    return `총 ${material.length}개 ( ${(size / KB).toFixed(2)}KB / 50MB )`;
  else if (size / MB >= 1)
    return `총 ${material.length}개 ( ${(size / MB).toFixed(2)}MB / 50MB )`;
};

const Material = ({ name, type }) => {
  return (
    <MaterialContainer>
      <FileIcon type={type.toUpperCase()} />
      <FileEraseIcon />
      <MaterialName>{`${name.slice(0, 4)}···.${type}`}</MaterialName>
    </MaterialContainer>
  );
};

const MaterialSection = ({ materials, setForm }) => {
  const file = createRef();

  React.useEffect(() => {
    console.log(materials);
  }, [materials]);

  return (
    <Wrapper>
      <Label>{getLabelOfMaterialsInfo(materials)}</Label>
      <AddFileIcon onClick={() => file.current.click()} />
      <FakeFileDom
        ref={file}
        onChange={() => getFilesFromUser(file.current.files, setForm)}
      />
      <MaterialWrapper>
        {materials.map((m, idx) => (
          <Material key={idx} name={m.name} type={m.type} />
        ))}
      </MaterialWrapper>
    </Wrapper>
  );
};

MaterialSection.defaultProps = {
  setForm: () => {},
};

MaterialSection.propTypes = {
  setForm: PropTypes.func,
};

export default MaterialSection;
