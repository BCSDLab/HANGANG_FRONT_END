import styled from "styled-components";
import {
  notPurchasedIconPath,
  purchasedIconPath,
} from "static/ResourceDetailPage/imgPath";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  position: relative;
  min-width: 90px;
  height: 90px;
  border-radius: 8px;
  border: 1px solid ${BorderColor};

  cursor: ${({ isPurchased }) => (isPurchased ? "pointer" : "default")};
`;

export const File = styled.img.attrs(({ ext, isPurchased }) => ({
  src: isPurchased ? purchasedIconPath(ext) : notPurchasedIconPath(ext),
  alt: "file",
}))`
  position: absolute;
  top: 7px;
  left: 7px;
  width: 24px;
`;

export const Name = styled.span`
  position: absolute;
  right: 7px;
  bottom: 7px;
  font-size: 12px;
  color: ${({ isPurchased }) => (isPurchased ? `${FontColor}` : `${PlaceholderColor}`)};
`;
