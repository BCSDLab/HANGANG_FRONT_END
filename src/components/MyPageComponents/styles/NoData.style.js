import styled from "styled-components";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { NO_DATA_URL } from "static/Shared/imageUrls";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const NoDataImg = styled.img.attrs({
  src: NO_DATA_URL,
  alt: "no-data",
})`
  width: 200px;
  margin-bottom: 16px;
`;

export const Notify = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const PushResourcesPageButton = styled.button`
  width: 166px;
  height: 28px;
  padding: 5px 25px;
  background-color: ${BorderColor};
  border-radius: 20px;
  border: none;
  margin-top: 8px;
  color: ${FontColor};
  font-size: 12px;
  cursor: pointer;
`;
