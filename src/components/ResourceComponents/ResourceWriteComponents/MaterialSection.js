import React, { createRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ResourceAPI from "api/resources";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import {
  ADD_FILE_ICON_URL,
  FILE_ERASE_BUTTON_URL,
  UPLOAD_FILE_ICON_URL,
} from "static/Shared/imageUrls";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

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
  min-width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};
`;

const MaterialWrapper = styled.div`
  overflow-x: auto;
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
 * Reference : https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * @param {string} type A String which has MIME type of file.
 * @returns A String to converted into extension.
 */
const convertMIMETypeToExtension = (type) => {
  let trimmedType = type.split("/")[1];
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
 * At First, request Backend to upload files.
 * And then iterate chosen files and get name, size, type
 *  - name : erase file type
 *  - type : get only type (e.g. application/pdf => pdf)
 * @param {array} files An Array which contains file DOM of user-selected files.
 * @param {number} createFormId A number that has id of create form.
 * @param {function} setForm A Function of write form.
 */
const getFilesFromUser = async (files, createFormId, setForm) => {
  let trimmedFiles = [];

  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;
    let { data } = await ResourceAPI.uploadFiles(files, createFormId, accessToken);

    files.forEach((f, index) => {
      let { name, size, type } = f;
      if (hasExtensionOnFileName(name.slice(-4))) name = name.slice(0, -5); // show, jpeg, cell, ...
      if (hasExtensionOnFileName(name.slice(-3))) name = name.slice(0, -4); // jpg, pdf, ...
      type = convertMIMETypeToExtension(type);
      let id = files.length > 1 ? data[index] : data;
      trimmedFiles.push({ id, name, size, type });
    });

    setForm((prev) => ({
      ...prev,
      materials: [...prev.materials, ...trimmedFiles],
    }));
  } catch (error) {
    alert("파일 업로드 중 문제가 발생하였습니다. 관리자에게 문의하세요.");
    throw new Error(error);
  }
};

/**
 * A Function to calculate length and size of material.
 * @param {array} material A Array to contain material info.
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
    return `총 ${material.length}개 ( ${(size / KB).toFixed(1)}KB / 50MB )`;
  else if (size / MB >= 1)
    return `총 ${material.length}개 ( ${(size / MB).toFixed(1)}MB / 50MB )`;
};

/**
 * A Function to request remove file from waiting list.
 * At First, check is valid to remove file to backend.
 * And then, remove file from write form.
 * @param {number} fId A number to store file id.
 * @param {function} setForm A function to access file write form.
 */
const eraseFileFromWaitingList = async (fId, setForm) => {
  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;
    await ResourceAPI.cancelUploadFile(fId, accessToken);

    setForm((prev) => ({
      ...prev,
      materials: prev.materials.filter(({ id }) => id !== fId),
    }));
  } catch (error) {
    alert("파일 업로드 취소 중 문제가 발생하였습니다. 관리자에게 문의하세요.");
    throw new Error(error);
  }
};

const Material = ({ id, name, type, setForm }) => {
  return (
    <MaterialContainer>
      <FileIcon type={type.toUpperCase()} />
      <FileEraseIcon onClick={() => eraseFileFromWaitingList(id, setForm)} />
      <MaterialName>{`${name.slice(0, 4)}···.${type}`}</MaterialName>
    </MaterialContainer>
  );
};

const MaterialSection = ({ createFormId, materials, setForm }) => {
  const file = createRef();

  return (
    <Wrapper>
      <Label>{getLabelOfMaterialsInfo(materials)}</Label>
      <AddFileIcon onClick={() => file.current.click()} />
      <FakeFileDom
        ref={file}
        onChange={() => getFilesFromUser(file.current.files, createFormId, setForm)}
        // onChange={() => getFilesFromUser(file.current.files, 48, setForm)}
      />
      <MaterialWrapper>
        {materials.map((m) => (
          <Material key={m.id} id={m.id} name={m.name} type={m.type} setForm={setForm} />
        ))}
      </MaterialWrapper>
    </Wrapper>
  );
};

MaterialSection.defaultProps = {
  createFormId: -1,
  materials: [],
  setForm: () => {},
};

MaterialSection.propTypes = {
  createFormId: PropTypes.number,
  materials: PropTypes.array,
  setForm: PropTypes.func,
};

export default MaterialSection;
