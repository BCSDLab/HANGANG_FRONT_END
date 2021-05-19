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
import { useDispatch } from "react-redux";
import { eraseFile, setFiles, setForm } from "store/modules/resourceCreateModule";

const ACCEPT_FILE_TYPES = [
  "zip",
  "xls",
  "xlsx",
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
 * At First, compare file size.
 * And then request Backend to upload files.
 * And finally, iterate chosen files and get name, size, type
 *  - name : erase file type
 *  - type : get only type (e.g. application/pdf => pdf)
 * @param {array} inputFiles An array which contains file DOM of user-selected files.
 * @param {array} currentFiles An array which contains file of write form currently.
 * @param {function} dispatch A Function to request form to write.
 */
const getFilesFromUser = async (inputFiles, currentFiles, dispatch) => {
  const KB = 1000;
  const MB = 1000 * KB;
  let trimmedFiles = [];

  let currSize = currentFiles.reduce((acc, curr) => acc + curr.size, 0);
  let inputFilesSize = Object.values(inputFiles).reduce((acc, { size }) => acc + size, 0);

  if (currSize + inputFilesSize > 50 * MB) {
    alert("총 파일 크기가 50MB를 넘을 수 없습니다.");
    return;
  }

  try {
    let accessToken = getValueOnLocalStorage("hangangToken").access_token;
    let { data: fileUrl } = await ResourceAPI.uploadFiles(inputFiles, accessToken);

    inputFiles.forEach((f, index) => {
      let { name, size, type } = f;
      if (hasExtensionOnFileName(name.slice(-4))) name = name.slice(0, -5); // show, jpeg, cell, ...
      if (hasExtensionOnFileName(name.slice(-3))) name = name.slice(0, -4); // jpg, pdf, ...
      type = convertMIMETypeToExtension(type);
      let id = fileUrl[index].split("-")[5].split(".")[0];
      trimmedFiles.push({ id, name, size, type });
    });

    dispatch(setFiles({ fileUrl, trimmedFiles }));
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

const Material = ({ id, name, type, dispatch }) => {
  return (
    <MaterialContainer>
      <FileIcon type={type.toUpperCase()} />
      <FileEraseIcon onClick={() => dispatch(eraseFile(id))} />
      <MaterialName>{`${name.slice(0, 4)}···.${type}`}</MaterialName>
    </MaterialContainer>
  );
};

const FileSection = ({ fileInfos }) => {
  const dispatch = useDispatch();
  const fileRef = createRef();

  return (
    <Wrapper>
      <Label>{getLabelOfMaterialsInfo(fileInfos)}</Label>
      <AddFileIcon onClick={() => fileRef.current.click()} />
      <FakeFileDom
        ref={fileRef}
        onChange={() => getFilesFromUser(fileRef.current.files, fileInfos, dispatch)}
      />
      <MaterialWrapper>
        {fileInfos.map((m) => (
          <Material
            key={m.id}
            id={m.id}
            name={m.name}
            type={m.type}
            dispatch={dispatch}
          />
        ))}
      </MaterialWrapper>
    </Wrapper>
  );
};

FileSection.defaultProps = {
  fileInfos: [],
};

FileSection.propTypes = {
  files: PropTypes.array,
};

export default FileSection;
